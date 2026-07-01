import { NextRequest, NextResponse } from 'next/server'

const DANGEROUS_KEYWORDS = ['نزيف', 'ألم شديد', 'إغماء', 'حمى', 'قيء مستمر', 'نزول دم']

export async function POST(request: NextRequest) {
  try {
    const { symptom, note } = await request.json()

    // Check for dangerous symptoms
    let riskLevel = 'normal'
    let riskLabel = '✅ حالة طبيعية'

    for (const keyword of DANGEROUS_KEYWORDS) {
      if (symptom.includes(keyword) || note.includes(keyword)) {
        riskLevel = 'urgent'
        riskLabel = '🚨 حالة طارئة'
        break
      }
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        riskLevel,
        riskLabel,
        advice: '⚠️ خدمة Claude معطلة حالياً. يرجى استشارة الطبيبة.',
        nextSteps: []
      })
    }

    // Call Claude API
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 500,
          system: `أنتِ مساعدة صحية متخصصة في دعم الحوامل. تجيبين بشكل قصير وودود بالعربية الفصحة الخليجية الدافئة.

تذكري دائماً:
- أنتِ لستِ طبيبة، فقط مساعدة دعم
- استشارة الطبيبة واجبة دائماً
- الأمان أولاً`,
          messages: [
            {
              role: 'user',
              content: `آية حامل في الشهر الثاني. تشكو من: ${symptom}. ${note ? `ملاحظات إضافية: ${note}` : ''} \n\nما النصيحة؟`
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const advice = data.content[0].text

      return NextResponse.json({
        riskLevel,
        riskLabel,
        advice,
        nextSteps: ['استشيري طبيبتك', 'اشربي ماء كافي', 'خذي راحتك']
      })
    } catch (apiError) {
      console.error('Claude API error:', apiError)
      return NextResponse.json({
        riskLevel,
        riskLabel,
        advice: '⚠️ لم أستطع الاتصال بـ Claude. يرجى استشارة الطبيبة.',
        nextSteps: []
      })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
