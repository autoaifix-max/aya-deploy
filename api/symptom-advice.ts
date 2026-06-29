import { VercelRequest, VercelResponse } from '@vercel/node';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const DANGEROUS_KEYWORDS = [
  'نزيف', 'bleeding', 'إغماء', 'faint', 'فقدان وعي', 'unconscious',
  'ألم شديد', 'severe pain', 'حرارة عالية', 'high fever', 'نوبة', 'seizure'
];

interface SymptomRequest {
  symptom: string;
  note: string;
}

interface SymptomAdvice {
  riskLevel: 'normal' | 'caution' | 'urgent';
  riskLabel: string;
  advice: string;
  nextSteps: string;
  error?: string;
}

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { symptom, note } = req.body as SymptomRequest;

  // Check for dangerous keywords
  const fullText = `${symptom} ${note}`.toLowerCase();
  if (DANGEROUS_KEYWORDS.some(kw => fullText.includes(kw.toLowerCase()))) {
    return res.status(200).json({
      riskLevel: 'urgent',
      riskLabel: '⚠️ حالة طارئة',
      advice: 'الأعراض التي تذكرينها قد تكون طارئة. راجعي الطبيبة فوراً أو توجهي إلى الطوارئ.',
      nextSteps: 'لا تؤخري الذهاب للطبيبة. هذا التطبيق ليس بديلاً عن الاستشارة الطبية المباشرة.',
      error: null
    });
  }

  try {
    const systemPrompt = `أنتِ مساعدة حمل ذكية (دليل آية). متخصصة في دعم الحوامل في الثلث الأول.

    يجب أن:
    1. تكوني دافئة وحنونة (لا طبيبة، بل رفيقة)
    2. تقدمي نصائح عملية وآمنة فقط
    3. تركزي على: الراحة، الماء، التغذية البسيطة، الهدوء
    4. تحددي مستوى الخطر: normal (طبيعي) أو caution (احذري) أو urgent (طارئ)
    5. تشجعي على استشارة الطبيبة في الحالات المستمرة
    6. لا تعطي أدوية محددة، فقط نصائح عامة
    7. الردود باللغة العربية الفصحى البسيطة
    8. كوني مختصرة (3-4 جمل أساسية)

    قدمي الرد بصيغة JSON:
    {
      "riskLevel": "normal|caution|urgent",
      "riskLabel": "طبيعي ✨|احذري 🔶|طارئ 🔴",
      "advice": "النصيحة الرئيسية",
      "nextSteps": "الخطوة التالية (اختياري)"
    }`;

    const userMessage = `الحالة الآن: ${symptom}${note ? '\nملاحظة إضافية: ' + note : ''}

اعطيني نصيحة بصيغة JSON كما هو محدد في التعليمات.`;

    const response = await fetch('https://api.anthropic.com/v1/messages/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return res.status(500).json({
        error: 'خدمة الذكاء الاصطناعي غير متاحة حالياً'
      });
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Parse JSON response
    let result: SymptomAdvice;
    try {
      // Extract JSON from response (may have extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found');
      }
    } catch (e) {
      // Fallback to formatted response
      result = {
        riskLevel: 'normal',
        riskLabel: 'نصيحة ودية 💚',
        advice: content,
        nextSteps: 'استشيري الطبيبة إذا استمرت الحالة'
      };
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'حدث خطأ في معالجة الطلب'
    });
  }
};
