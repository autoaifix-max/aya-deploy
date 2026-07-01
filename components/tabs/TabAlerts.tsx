'use client'

export default function TabAlerts() {
  return (
    <div className="w-full max-w-2xl mx-auto px-5 pb-20">
      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4 mb-3">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-2">⚠️ متى نراجع الطوارئ؟</h2>
        <div className="bg-[#FFE5E5] border border-[#FFCCCC] rounded-xl p-3 text-[#C41E3A] text-sm leading-loose">
          راجعي الطوارئ فورًا عند: نزيف، ألم شديد مستمر، حرارة عالية، إغماء، دوخة قوية، قيء يمنع شرب السوائل، ألم كتف مع ألم بطن، أو إفرازات غير طبيعية.
        </div>
      </div>

      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4 mb-3">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-3">🚫 أشياء تُتجنب</h2>
        <ul className="space-y-2">
          {[
            'الحليب والأجبان غير المبسترة',
            'اللحم أو الدجاج أو البيض النيء',
            'تجنبي الأسماك عالية الزئبق (القرش، أبو سيف، الماكريل الملكي)',
            'الكافيين لا يتجاوز 200mg يوميًا',
            'مشروبات الطاقة والمشروبات الغازية',
            'أي دواء بدون سؤال الطبيبة'
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 p-2 bg-[#F3EBDA] rounded-xl text-sm">
              <span className="flex-shrink-0">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-3">💊 معلومات طبية</h2>
        <div className="space-y-2">
          <div className="bg-[#FFF3CD] border border-[#FFE69C] rounded-xl p-3 text-[#856404] text-sm">
            حمض الفوليك 400 ميكروغرام يوميًا في بداية الحمل، إلا إذا الطبيبة وصفت جرعة مختلفة
          </div>
          <div className="bg-[#FBEDE8] border border-[#EFC9BC] rounded-xl p-3 text-[#8C5648] text-sm leading-loose">
            هذا التطبيق للتذكير والدعم اليومي فقط، وليس بديلًا عن الطبيبة. لا توقفي أو تكملي أي دواء إلا بعد سؤال الطبيبة.
          </div>
        </div>
      </div>
    </div>
  )
}
