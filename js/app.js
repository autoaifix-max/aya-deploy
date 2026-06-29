// ============================================================
// دليل آية الغذائي — التطبيق الرئيسي
// ============================================================

// CONFIG
var SUPA_URL='';
var SUPA_KEY='';
var FAMILY_ID='';

// Supabase Client
let supabase = null;

// State
let state = {
  todayDate: new Date().toISOString().slice(0, 10),
  waterCount: 0,
  checklist: {},
  darkMode: localStorage.getItem('darkMode') === 'true',
  selectedSymptom: null
};

// ============================================================
// INIT
// ============================================================

window.addEventListener('DOMContentLoaded', async () => {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(e => console.log('SW:', e));
  }

  // Initialize Supabase
  if (SUPA_URL && SUPA_KEY) {
    const { createClient } = window.supabase;
    supabase = createClient(SUPA_URL, SUPA_KEY);
  }

  // Load state
  loadState();
  renderUI();

  // Setup listeners
  setupListeners();
});

// ============================================================
// DARK MODE
// ============================================================

function setupListeners() {
  document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);
  document.getElementById('whatsappBtn').addEventListener('click', openWhatsApp);

  // Tab Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => switchTab(item.dataset.tab));
  });

  // Tab 2: Symptom Selector
  document.querySelectorAll('[data-symptom]').forEach(btn => {
    btn.addEventListener('click', () => selectSymptom(btn.dataset.symptom, btn));
  });

  // Tab 2: Send to Claude
  document.getElementById('sendToClaudeBtn').addEventListener('click', sendToClaudeAPI);

  // Tab 3: Water Buttons
  document.getElementById('waterAddBtn').addEventListener('click', () => addWater());
  document.getElementById('waterMinusBtn').addEventListener('click', () => removeWater());

  // Tab 4: Doctor Form
  document.getElementById('doctorForm').addEventListener('submit', saveDoctorAppointment);
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  localStorage.setItem('darkMode', state.darkMode);
  document.documentElement.classList.toggle('dark-mode', state.darkMode);
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById('themeToggle');
  btn.textContent = state.darkMode ? '☀️' : '🌙';
}

// ============================================================
// TAB SWITCHING
// ============================================================

function switchTab(tabName) {
  // Hide all
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show selected
  document.getElementById(`tab-${tabName}`).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Load data if needed
  if (tabName === 'today') loadTodayData();
  if (tabName === 'needs') renderBodyNeeds();
  if (tabName === 'doctor') loadDoctorData();
}

// ============================================================
// TAB 1: TODAY (اليوم)
// ============================================================

async function loadTodayData() {
  if (!supabase || !FAMILY_ID) {
    renderTodayOffline();
    return;
  }

  try {
    const { data } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('family_id', FAMILY_ID)
      .eq('log_date', state.todayDate)
      .single();

    if (data) {
      state.waterCount = data.water_count || 0;
      state.checklist = data.checklist || {};
    }
  } catch (e) {
    // اليوم الأول أو خطأ
  }

  renderTodayUI();
}

function renderTodayOffline() {
  state.waterCount = JSON.parse(localStorage.getItem('water_' + state.todayDate) || '0');
  state.checklist = JSON.parse(localStorage.getItem('checklist_' + state.todayDate) || '{}');
  renderTodayUI();
}

function renderTodayUI() {
  // Progress
  const items = Object.values(state.checklist).length;
  const done = Object.values(state.checklist).filter(v => v).length;
  const pct = items > 0 ? Math.round((done / items) * 100) : 0;
  document.getElementById('todayProgress').textContent = pct + '%';
  document.getElementById('waterCount').textContent = state.waterCount;

  // Reminders
  const remindersHtml = [
    { text: 'حمض الفوليك', emoji: '💊', key: 'folic' },
    { text: 'وجبة الإفطار', emoji: '🥣', key: 'bfast' },
    { text: 'وجبة الغداء', emoji: '🍲', key: 'lunch' },
    { text: 'وجبة العشاء', emoji: '🍽️', key: 'dinner' },
    { text: 'الحليب ومشتقاته', emoji: '🥛', key: 'milk' }
  ].map(r => {
    const done = state.checklist[r.key];
    return `<li class="item ${done ? 'done' : ''}">
      <span class="icon">${r.emoji}</span>
      <span class="text">${r.text}</span>
      <span class="status">${done ? '✓' : ''}</span>
    </li>`;
  }).join('');
  document.getElementById('todayReminders').innerHTML = remindersHtml;

  // Click handlers
  document.querySelectorAll('#todayReminders .item').forEach((item, i) => {
    const keys = ['folic', 'bfast', 'lunch', 'dinner', 'milk'];
    item.addEventListener('click', () => toggleChecklist(keys[i]));
  });
}

function toggleChecklist(key) {
  state.checklist[key] = !state.checklist[key];
  saveState();
  renderTodayUI();
}

async function saveState() {
  if (!supabase || !FAMILY_ID) {
    // Save to localStorage
    localStorage.setItem('water_' + state.todayDate, state.waterCount);
    localStorage.setItem('checklist_' + state.todayDate, JSON.stringify(state.checklist));
    return;
  }

  try {
    await supabase.from('daily_logs').upsert({
      family_id: FAMILY_ID,
      log_date: state.todayDate,
      water_count: state.waterCount,
      checklist: state.checklist,
      updated_at: new Date().toISOString()
    });
  } catch (e) {
    console.error('Save failed:', e);
  }
}

// ============================================================
// TAB 2: حالتي (SYMPTOM CHECKER)
// ============================================================

function selectSymptom(symptom, btn) {
  document.querySelectorAll('[data-symptom]').forEach(b => b.style.background = '');
  state.selectedSymptom = symptom;
  btn.style.background = 'var(--apricot)';
  btn.style.color = '#fff';
}

async function sendToClaudeAPI() {
  const note = document.getElementById('noteInput').value.trim();
  const symptom = state.selectedSymptom || 'لم تحدد الحالة';

  if (!symptom && !note) {
    alert('اختاري الحالة أو أضيفي ملاحظة');
    return;
  }

  const resultDiv = document.getElementById('adviceResult');
  const cardDiv = document.getElementById('adviceCard');

  resultDiv.style.display = 'block';
  cardDiv.innerHTML = '<div class="loading"><div class="spinner"></div> جاري الاتصال برفيقتك الذكية...</div>';

  try {
    const response = await fetch('/api/symptom-advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptom, note })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (data.error) {
      cardDiv.innerHTML = `
        <h2>⚠️ آسفة</h2>
        <p class="sub">${data.error}</p>
        <div class="alert">إذا الحالة ملحة، راجعي الطبيبة مباشرة. هذا التطبيق ليس بديلاً عن الاستشارة الطبية.</div>
      `;
    } else {
      const riskColor = data.riskLevel === 'urgent' ? '#C41E3A' : data.riskLevel === 'caution' ? '#856404' : '#2C2A24';
      cardDiv.innerHTML = `
        <h2>نصيحة آية 💡</h2>
        <div style="color:${riskColor};font-weight:600;margin:12px 0;font-size:16px">${data.riskLabel}</div>
        <p style="margin:12px 0;line-height:1.8">${escapeHtml(data.advice)}</p>
        ${data.nextSteps ? `<div class="alert">${escapeHtml(data.nextSteps)}</div>` : ''}
      `;
    }
  } catch (e) {
    cardDiv.innerHTML = `
      <h2>خطأ في الاتصال 🚫</h2>
      <p class="sub">حاولي لاحقاً</p>
      <div class="alert">البيانات محفوظة محلياً، لكن الخدمة غير متاحة الآن.</div>
    `;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================================
// TAB 3: احتياجات الجسم
// ============================================================

function renderBodyNeeds() {
  const needsHtml = [
    { text: 'حمض الفوليك 400mcg', emoji: '💊' },
    { text: 'حديد + فيتامين C', emoji: '🩸' },
    { text: 'فيتامين D', emoji: '☀️' },
    { text: 'كالسيوم ومنتجات الألبان', emoji: '🥛' },
    { text: 'بروتين (لحم، سمك، بيض، عدس)', emoji: '🍗' },
    { text: 'خضار وفواكه طازة', emoji: '🥬' }
  ].map(n => `
    <li class="item">
      <span class="icon">${n.emoji}</span>
      <span class="text">${n.text}</span>
    </li>
  `).join('');

  document.getElementById('bodyNeedsList').innerHTML = needsHtml;
  document.getElementById('waterCountDetail').textContent = state.waterCount;
  document.getElementById('needsProgress').textContent = Math.round((state.waterCount / 8) * 100) + '%';
}

function addWater() {
  state.waterCount = Math.min(state.waterCount + 1, 16);
  saveState();
  renderBodyNeeds();
  renderTodayUI();
}

function removeWater() {
  state.waterCount = Math.max(state.waterCount - 1, 0);
  saveState();
  renderBodyNeeds();
  renderTodayUI();
}

// ============================================================
// TAB 4: الطبيبة (DOCTOR)
// ============================================================

async function loadDoctorData() {
  const stored = JSON.parse(localStorage.getItem('doctorAppointment') || '{}');
  if (stored.clinicName) {
    document.getElementById('clinicName').value = stored.clinicName;
    document.getElementById('appointmentDate').value = stored.appointmentDate;
    document.getElementById('appointmentTime').value = stored.appointmentTime;
    document.getElementById('appointmentNotes').value = stored.appointmentNotes;
  }
}

async function saveDoctorAppointment(e) {
  e.preventDefault();
  const data = {
    clinicName: document.getElementById('clinicName').value,
    appointmentDate: document.getElementById('appointmentDate').value,
    appointmentTime: document.getElementById('appointmentTime').value,
    appointmentNotes: document.getElementById('appointmentNotes').value
  };
  localStorage.setItem('doctorAppointment', JSON.stringify(data));
  alert('تم حفظ الموعد ✓');
}

// ============================================================
// WHATSAPP
// ============================================================

function openWhatsApp() {
  const message = encodeURIComponent('أحتاجك يا أحمد 💚');
  const url = `https://wa.me/966535473565?text=${message}`;
  window.open(url, '_blank');
}

// ============================================================
// RENDER UI
// ============================================================

function renderUI() {
  updateThemeButton();
  document.documentElement.classList.toggle('dark-mode', state.darkMode);
  loadState();
  loadTodayData();
}

function loadState() {
  if (localStorage.getItem('water_' + state.todayDate)) {
    state.waterCount = parseInt(localStorage.getItem('water_' + state.todayDate)) || 0;
    state.checklist = JSON.parse(localStorage.getItem('checklist_' + state.todayDate) || '{}');
  }
}
