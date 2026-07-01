'use client'

import { useApp } from '@/context/AppContext'
import { useState } from 'react'

const symptoms = ['غثيان 🤢', 'تعب 😴', 'دوخة 😵', 'إمساك 🚫', 'طبيعي ✨']

export default function TabStatus() {
  const { state, setSelectedSymptom } = useApp()
  const [note, setNote] = useState('')
  const [advice, setAdvice] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGetAdvice = async () => {
    if (!state.selectedSymptom) return

    setLoading(true)
    try {
      const response = await fetch('/api/symptom-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptom: state.selectedSymptom,
          note: note
        })
      })
      const data = await response.json()
      setAdvice(data.advice || 'خدمة Claude معطلة حالياً')
    } catch (error) {
      setAdvice('حدث خطأ أثناء الحصول على النصيحة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-5 pb-20">
      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4 mb-3">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-2">كيف حالك اليوم؟</h2>
        <div className="text-sm text-[#6F6A5C] mb-4">اختاري الحالة التي تناسبك</div>
        <div className="flex flex-col gap-2">
          {symptoms.map(symptom => (
            <button
              key={symptom}
              onClick={() => setSelectedSymptom(state.selectedSymptom === symptom ? null : symptom)}
              className={`w-full p-3 rounded-2xl font-semibold text-center transition ${
                state.selectedSymptom === symptom
                  ? 'bg-[#E3A06B] text-white'
                  : 'bg-white text-[#24463A] border border-[#EADFC7]'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4 mb-3">
        <label className="block font-semibold text-[#24463A] text-sm mb-2">ملاحظة إضافية (اختياري)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="مثال: عندي غثيان بعد الأكل..."
          className="w-full p-3 border border-[#EADFC7] rounded-2xl bg-[#F3EBDA] text-sm"
          rows={4}
        />
        <button
          onClick={handleGetAdvice}
          disabled={!state.selectedSymptom || loading}
          className="w-full mt-4 p-3 bg-gradient-to-r from-[#E3A06B] to-[#D08B53] text-white rounded-2xl font-semibold text-center disabled:opacity-50"
        >
          {loading ? '⏳ جاري...' : 'احصلي على نصيحة 🤖'}
        </button>
      </div>

      {advice && (
        <div className="bg-white border border-[#EADFC7] rounded-2xl p-4">
          <div className="text-sm text-[#2C2A24] leading-loose">{advice}</div>
        </div>
      )}
    </div>
  )
}
