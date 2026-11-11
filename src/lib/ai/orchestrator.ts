import { Child, SessionResult, Session } from '@/types/models';
import { AIProviderFactory } from './providers/factory';

export interface ConsultationResponse {
  message: string;
  suggestedAction?: {
    type: 'view_session' | 'create_plan' | 'view_child' | 'retry';
    label_ar: string;
    target_id?: string;
  };
  clinicalSummary?: {
    strengths: string[];
    focusAreas: string[];
    recommendedNextStep: string;
  };
}

export class AIOrchestrator {
  /**
   * Builds the comprehensive context for a child combining profile, history, and goals.
   */
  static buildChildContextPrompt(
    child: Child,
    recentResults: SessionResult[],
    availableSessions: Session[]
  ): string {
    const ageYears = Math.floor(
      (new Date().getTime() - new Date(child.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );

    const completedSummary = recentResults.map(r => 
      `- جلسة "${r.session_title_ar}" (الدقة: ${r.accuracy_percentage}%، المهارات: ${r.skills_practiced.join(', ')})`
    ).join('\n') || 'لم يتم تسجيل جلسات سابقة بعد.';

    const catalogList = availableSessions.map(s => 
      `* معرف الجلسة: ${s.id} | العنوان: ${s.title_ar} | التخصص: ${s.specialization_slug} | المهارات: ${s.target_skills_ar.join(', ')}`
    ).join('\n');

    return `
أنت "المستشار الذكي لمنصة نطق" (AI Speech & Child Development Specialist Agent).
أنت أخصائي ذكاء اصطناعي محترف في تأخر الكلام والتخاطب وصعوبات التعلم والتواصل الاجتماعي عند الأطفال.
تتحدث باللغة العربية بأسلوب دافئ ومطمئن وداعم لأولياء الأمور وبلهجة مهذبة تجمع بين الفصحى الميسرة والمصرية الودودة.

معلومات الطفل الحالية:
- الاسم: ${child.name}
- العمر التقريبي: ${ageYears} سنوات
- اللهجة: ${child.dialect}
- المشكلة الأساسية: ${child.primary_issue}
- مشكلات إضافية: ${child.additional_issues.join(', ') || 'لا توجد'}
- مستويات المهارات (من 5):
  * النطق: ${child.pronunciation_level}/5
  * الفهم والاستيعاب: ${child.comprehension_level}/5
  * التواصل والتعبير: ${child.communication_level}/5
  * القراءة والتهجئة: ${child.reading_level}/5
- ملاحظات ولي الأمر: ${child.parent_notes || 'لا توجد'}
- ملاحظات الأخصائي: ${child.specialist_notes || 'لا توجد'}

سجل الجلسات المكتملة حديثاً:
${completedSummary}

قائمة الجلسات التدريبية المتاحة في المنصة:
${catalogList}

قواعد أساسية في التعامل:
1. أنت لا تقدم تشخيصاً طبياً قاطعاً أو بديلاً كاملاً عن الفحص السريري، وتوضح ذلك برفق.
2. تطرح أسئلة استكشافية متتابعة لجمع المعلومات إذا كان السؤال عاماً.
3. تربط إجاباتك بالجلسات الفعلية المتوفرة في المنصة. إذا كان هناك جلسة تناسب ما يشكو منه ولي الأمر، اذكر اسم الجلسة واقترح تجربتها فوراً.
4. إجاباتك منظمة بنقاط واضحة ومريحة للقراءة.
`;
  }

  /**
   * Generates a consultation response for the parent
   */
  static async handleParentConsultation(params: {
    child: Child;
    recentResults: SessionResult[];
    availableSessions: Session[];
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
    userMessage: string;
  }): Promise<ConsultationResponse> {
    const { child, recentResults, availableSessions, conversationHistory, userMessage } = params;

    // Check if Gemini API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.length > 5) {
      try {
        const gemini = AIProviderFactory.getAdapter('gemini');
        if (gemini) {
          const systemPrompt = this.buildChildContextPrompt(child, recentResults, availableSessions);
          const messages = [
            { role: 'system' as const, content: systemPrompt },
            ...conversationHistory.map(m => ({ role: m.role, content: m.content })),
            { role: 'user' as const, content: userMessage },
          ];

          const response = await gemini.generateChatCompletion({
            model: 'gemini-1.5-flash',
            messages,
            temperature: 0.7,
            maxTokens: 1200,
          });

          // Check if response mentions a session to attach a quick link
          let suggestedAction: ConsultationResponse['suggestedAction'] = undefined;
          for (const s of availableSessions) {
            if (response.content.includes(s.title_ar) || response.content.includes(s.id)) {
              suggestedAction = {
                type: 'view_session',
                label_ar: `ابدأ جلسة: ${s.title_ar} ✨`,
                target_id: s.id,
              };
              break;
            }
          }

          if (!suggestedAction && availableSessions.length > 0) {
            suggestedAction = {
              type: 'view_session',
              label_ar: `جلسة مقترحة لـ ${child.name}: ${availableSessions[0].title_ar}`,
              target_id: availableSessions[0].id,
            };
          }

          return {
            message: response.content,
            suggestedAction,
          };
        }
      } catch (err) {
        console.warn('Gemini live call fallback to rule engine:', err);
      }
    }

    // Intelligent pedagogical rule engine (Fallback when no API Key is configured)
    return this.generateSimulatedConsultation(child, userMessage, availableSessions);
  }

  /**
   * Smart clinical fallback engine when AI key is not supplied
   */
  private static generateSimulatedConsultation(
    child: Child,
    userMessage: string,
    sessions: Session[]
  ): ConsultationResponse {
    const lower = userMessage.toLowerCase();

    if (lower.includes('راء') || lower.includes('الراء') || lower.includes('لدغة') || lower.includes('نطق')) {
      const artSession = sessions.find(s => s.specialization_slug === 'articulation') || sessions[1] || sessions[0];
      return {
        message: `أهلاً بك! بالنسبة لصوت حرف الراء مع ${child.name}، فهذا من أكثر التحديات شيوعاً في هذه المرحلة العمرية. \n\nنطق الراء يتطلب مهارة حركية دقيقة لطرف اللسان للاهتزاز في سقف الحلق. \n\nخطة التدريب المقترحة لعمر:\n1. تدريب اهتزاز طرف اللسان بلعبة "محرك القطار" (ررررر).\n2. نطق الراء بصوت مفرد ممدود قبل إدخالها في كلمات.\n3. الانتقال لكلمات تبدأ بالراء مثل (رأس، ريشة، رمل).\n\nأنصحك بالبدء بجلسة "قطار صوت الراء السريع" وسأتابع تقدمه معك خطوة بخطوة.`,
        suggestedAction: {
          type: 'view_session',
          label_ar: `فتح جلسة تدريب حرف الراء مع ${child.name} 🚂`,
          target_id: artSession?.id || 'sess-art-201',
        },
      };
    }

    if (lower.includes('قراءة') || lower.includes('حروف') || lower.includes('عسر') || lower.includes('تشكيل')) {
      const dysSession = sessions.find(s => s.specialization_slug === 'dyslexia-reading') || sessions[2] || sessions[0];
      return {
        message: `مرحباً بك! صعوبات القراءة والتمييز بين الحركات التشكيلية أمر يحتاج إلى مدخل حسي متعدد (سمعي + بصري + حركي). \n\nنصائح مهمة لمساعدة ${child.name}:\n• استخدام الألوان لتمييز الفتحة (أحمر) والضمة (أزرق) والكسرة (أخضر).\n• ربط شكل الفم بصوت الحركة (فتح الفم للفتحة، ضم الشفتين للضمة، والابتسامة للكسرة).\n• تدريب التهجئة التقطيعية (تحليل الكلمة لمقاطع صوتية).\n\nأعددنا جلسة مخصصة للحركات القصيرة تناسب قدرات ${child.name} تماماً.`,
        suggestedAction: {
          type: 'view_session',
          label_ar: `فتح جلسة رحلة الحركات القصيرة 📚`,
          target_id: dysSession?.id || 'sess-dys-301',
        },
      };
    }

    if (lower.includes('تواصل') || lower.includes('اصحاب') || lower.includes('خجل') || lower.includes('غضب') || lower.includes('عصبية')) {
      const socSession = sessions.find(s => s.specialization_slug === 'social-communication' || s.specialization_slug === 'behavioral-emotional') || sessions[3] || sessions[0];
      return {
        message: `سعيد بتواصلك معنا. الجانب الاجتماعي والانفعالي هو المفتاح الأساسي لتطور النطق؛ فعندما يشعر ${child.name} بالأمان والهدوء يزداد حماسه للتحدث والتعبير. \n\nالخطوات العملية:\n1. ممارسة تدريب "التنفس الهادئ" عند الشعور بالإحباط بدلاً من الصراخ.\n2. استخدام القصص الاجتماعية المصورة لفهم مشاعر الآخرين وتبادل الأدوار.\n3. تشجيع التواصل البصري بلطف ودون إجبار.`,
        suggestedAction: {
          type: 'view_session',
          label_ar: `فتح جلسة مهارات التواصل والهدوء 🤝`,
          target_id: socSession?.id || 'sess-soc-401',
        },
      };
    }

    // Default progressive exploratory response
    const defaultSession = sessions[0];
    return {
      message: `شكراً لمشاركتك هذه التفاصيل حول ${child.name}. \n\nبناءً على ملفه الحالي:\n• المشكلة المسجلة: ${child.primary_issue}\n• مستوى النطق التعبيري: ${child.pronunciation_level}/5\n\nلمساعدتك بأفضل شكل، أود معرفة:\n1. كيف يتصرف ${child.name} عندما يحتاج شيئاً في المنزل (هل يشير بيده، أم يستخدم كلمات محددة، أم يبكي)؟\n2. هل يكرر الكلمات التي يسمعها منكم بسهولة؟\n\nوفي هذه الأثناء، أنصح ببدء جلسة تفاعلية خفيفة لتنشيط الحصيلة اللغوية وتعزيز ثقته بنفسه.`,
      suggestedAction: {
        type: 'view_session',
        label_ar: `تجربة جلسة التخاطب الأولى الآن ⭐`,
        target_id: defaultSession?.id || 'sess-sl-101',
      },
    };
  }
}
