'use client'

import { useApp } from '@/context/AppContext'

const bodyNeeds = [
  { icon: '🥗', name: 'حمض الفوليك', desc: '400 ميكروغرام يومياً' },
  { icon: '🥚', name: 'بروتين', desc: 'بيض، دجاج، أسماك' },
  { icon: '🥛', name: 'كالسيوم', desc: 'حليب، جبنة، زبادي' },
  { icon: '🍎', name: 'حديد', desc: 'لحم أحمر، عدس' },
  { icon: '🫐', name: 'فيتامينات', desc: 'فواكه وخضار متنوعة' },
  { icon: '💧', name: 'ماء', desc: '8 أكواب يومياً' }
]

export default function TabNeeds() {
  const { state, addWater, removeWater } = useApp()

  return (
    <div className="w-full max-w-2xl mx-auto px-5 pb-20">
      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4 mb-3">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-2">احتياجات الجسم</h2>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-[#24463A] font-[Reem_Kufi]">{Math.round((state.waterCount / 8) * 100)}%</div>
          <div className="text-sm text-[#6F6A5C]">عناصر اليوم المكتملة</div>
        </div>
      </div>

      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4 mb-3">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-4">العناصر الأساسية</h2>
        <div className="flex flex-col gap-2">
          {bodyNeeds.map(item => (
            <div key={item.name} className="flex items-center gap-3 p-3 bg-[#F3EBDA] rounded-2xl">
              <div className="text-2xl flex-shrink-0">{item.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#2C2A24]">{item.name}</div>
                <div className="text-xs text-[#6F6A5C]">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-4">💧 كوب الماء</h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-4xl font-bold text-[#24463A] font-[Reem_Kufi] min-w-20 text-center">{state.waterCount}</div>
          <div className="text-sm text-[#6F6A5C]">من 8 أكواب</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addWater}
            disabled={state.waterCount >= 8}
            className="flex-1 p-3 bg-gradient-to-r from-[#E3A06B] to-[#D08B53] text-white rounded-2xl font-semibold disabled:opacity-50"
          >
            + كوب
          </button>
          <button
            onClick={removeWater}
            disabled={state.waterCount <= 0}
            className="flex-1 p-3 bg-white text-[#24463A] border border-[#EADFC7] rounded-2xl font-semibold disabled:opacity-50"
          >
            − كوب
          </button>
        </div>
      </div>
    </div>
  )
}
