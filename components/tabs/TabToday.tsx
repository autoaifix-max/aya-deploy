'use client'

import { useApp } from '@/context/AppContext'

const ahmedMessages = [
  "آية، هذا التطبيق مو بس عشان الحمل…\nهذا عشان أقول لك كل يوم: أنا أحبك، وأنتِ مو لحالك 🤍",
  "آية، راحتك اليوم أهم من أي شيء. خذي وقتك، والباقي عليّ 🤍",
  "وجودك في حياتي نعمة، ووجود البيبي زادها جمال.",
  "لا تشيلين هم التعب لحالك، أنا موجود معك في كل لحظة.",
  "أحبك يا آية، وأحب كل شيء يطمّنك ويريّحك.",
  "اليوم لا تبذلين مجهود. أحمد يتكفل بالباقي.",
  "أنتِ مو مطالبة تكونين قوية طول الوقت، أنا معك.",
  "إذا تعبتي أو خفتي، قولي لي. وجودي جنبك حقك عليّ.",
  "أحبك في هدوئك، في خوفك، في تعبك، وفي كل لحظة تجمعنا."
]

const babyMessages = [
  "ماما آية، خذي نفس وارتاحي…\nبابا أحمد يحبك، وأنا أحتاجك مبسوطة وهادية 👶🤍",
  "ماما آية، لا تتعبين نفسك اليوم. أنا أحتاجك مرتاحة وهادية 👶🤍",
  "بابا أحمد يقول لك: ابتسمي، وأنا أقول لك: خذي راحتك يا ماما.",
  "أنا صغير الآن، بس أحس بحبكم لي من بدري 🤍",
  "ماما، اشربي ماء وخذي لقيمات بسيطة… أنا معك.",
  "اليوم نبي هدوء وراحة، والباقي على بابا أحمد.",
  "ماما آية، كل ما ترتاحين أحس الدنيا أهدأ.",
  "أنا والبابا نحبك، فلا تتعبين نفسك فوق طاقتها.",
  "خذي نفس، اشربي ماء، وابتسمي شوي… أنا هنا معك 👶🤍"
]

const quickMessages = {
  reassure: "أنا بخير يا أحمد، بس حبيت أطمنك 🤍",
  hug: "أحمد، محتاجة وجودك شوي 🤍",
  water: "أحمد، جيب لي ماء لو سمحت 🤍",
  food: "أحمد، أبي أكل خفيف يناسب الغثيان 🤍",
  call: "أحمد، اتصل علي إذا تقدر.",
  comfort: "أحمد، محتاجة أطمئن. كلمني شوي 🤍"
}

export default function TabToday() {
  const { state, nextAhmedMessage, nextBabyMessage } = useApp()

  return (
    <div className="w-full max-w-2xl mx-auto px-5 pb-20">
      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4 mb-3">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-2">أهلاً يا آية 🤍</h2>
        <div className="text-sm text-[#6F6A5C]">بداية الحمل تحتاج هدوء، ماء، غذاء بسيط، وراحة</div>
      </div>

      {/* Ahmed's Message */}
      <div className="bg-gradient-to-br from-[#F3EBDA] to-[#EADFC7] border border-[#D58B7C] rounded-2xl p-4 mb-3">
        <h3 className="font-[Aref_Ruqaa] text-base text-[#D58B7C] mb-2">💌 رسالة أحمد اليوم</h3>
        <div className="text-sm text-[#2C2A24] leading-loose whitespace-pre-line mb-3">
          {ahmedMessages[state.ahmedMessageIndex]}
        </div>
        <button
          onClick={nextAhmedMessage}
          className="bg-[#D58B7C] text-white px-3 py-2 rounded-full text-xs font-semibold hover:brightness-90 transition"
        >
          رسالة ثانية
        </button>
      </div>

      {/* Baby's Message */}
      <div className="bg-gradient-to-br from-[#F3EBDA] to-[#EADFC7] border border-[#D58B7C] rounded-2xl p-4 mb-3">
        <h3 className="font-[Aref_Ruqaa] text-base text-[#D58B7C] mb-2">👶 رسالة من البيبي</h3>
        <div className="text-sm text-[#2C2A24] leading-loose whitespace-pre-line mb-3">
          {babyMessages[state.babyMessageIndex]}
        </div>
        <button
          onClick={nextBabyMessage}
          className="bg-[#D58B7C] text-white px-3 py-2 rounded-full text-xs font-semibold hover:brightness-90 transition"
        >
          رسالة جديدة من البيبي
        </button>
      </div>

      {/* Quick Messages */}
      <div className="bg-white border border-[#EADFC7] rounded-2xl p-4">
        <h2 className="font-[Reem_Kufi] font-semibold text-[#24463A] text-lg mb-2">💬 رسالة سريعة لأحمد</h2>
        <div className="text-sm text-[#6F6A5C] mb-3">اختاري ما تريدين أن تقولي له</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(quickMessages).map(([key, msg]) => (
            <button
              key={key}
              onClick={() => {
                const whatsappNumber = '966535473565'
                const text = encodeURIComponent(msg)
                window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank')
              }}
              className="px-3 py-2 bg-[#F3EBDA] border border-[#EADFC7] rounded-full text-xs text-[#24463A] font-semibold hover:bg-[#E3A06B] hover:text-white transition"
            >
              {msg.split('،')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
