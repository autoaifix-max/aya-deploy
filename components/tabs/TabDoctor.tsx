'use client'

import { useState } from 'react'

export default function TabDoctor() {
  const [formData, setFormData] = useState({
    clinic: '',
    date: '',
    time: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('doctorAppointment', JSON.stringify(formData))
    alert('✅ تم حفظ الموعد!')
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-5 pb-20">
      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4 mb-3">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-4">موعد الطبيبة</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-[#24463A] mb-1">اسم العيادة/المستشفى</label>
            <input
              type="text"
              value={formData.clinic}
              onChange={(e) => setFormData({...formData, clinic: e.target.value})}
              placeholder="مثال: مستشفى الملك"
              className="w-full p-2 border border-[#EADFC7] rounded-xl bg-[#F3EBDA] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#24463A] mb-1">التاريخ</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-2 border border-[#EADFC7] rounded-xl bg-[#F3EBDA] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#24463A] mb-1">الوقت</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full p-2 border border-[#EADFC7] rounded-xl bg-[#F3EBDA] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#24463A] mb-1">ملاحظات</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="مثال: معي تحليل CBC..."
              className="w-full p-2 border border-[#EADFC7] rounded-xl bg-[#F3EBDA] text-sm"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-[#E3A06B] to-[#D08B53] text-white rounded-2xl font-semibold"
          >
            حفظ الموعد 💾
          </button>
        </form>
      </div>

      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-3">أسئلة نسأل الطبيبة</h2>
        <ul className="space-y-2">
          {[
            'هل جرعة حمض الفوليك مناسبة؟',
            'ما التحاليل المطلوبة الآن؟',
            'متى موعد السونار المناسب؟',
            'ما الحل الآمن للغثيان أو الإمساك؟',
            'هل هناك أطعمة أو أدوية يجب تجنبها؟'
          ].map((q, i) => (
            <li key={i} className="p-2 bg-[#F3EBDA] rounded-xl text-sm">• {q}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
