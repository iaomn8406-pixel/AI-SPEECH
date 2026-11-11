import { NextRequest, NextResponse } from 'next/server';
import { Session, SessionActivity } from '@/types/models';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { childName, targetSkill, age, specializationSlug = 'speech-language' } = body;

    const sessionId = `custom-${Date.now()}`;
    const generatedSession: Session = {
      id: sessionId,
      stage_id: 'custom-stage',
      specialization_slug: specializationSlug,
      title_ar: `جلسة مخصصة: تدريب ${targetSkill || 'الكلمات والتعبير'} لـ ${childName || 'البطل'}`,
      title_en: `Personalized Session for ${childName || 'Child'}`,
      description_ar: `جلسة ذكية تم إنشاؤها خصيصاً لمساعدة الطفل على إتقان مهارة (${targetSkill || 'التخاطب والتسمية'}) بأسلوب مرح وتدريجي.`,
      description_en: 'AI-generated personalized therapy session tailored to the child\'s current goals.',
      duration_minutes: 12,
      difficulty: 'beginner',
      target_age_range: `${age || 4}-${(age || 4) + 2} سنوات`,
      target_skills_ar: [targetSkill || 'تطوير النطق', 'الاستماع الإيجابي', 'الثقة بالنفس'],
      order_number: 99,
      is_published: true,
      is_generated: true,
      activities: [
        {
          id: `act-${sessionId}-1`,
          session_id: sessionId,
          order_number: 1,
          type: 'listen_repeat',
          title_ar: `الاستماع والتكرار: نطق كلمة (${targetSkill || 'شجرة'})`,
          instruction_ar: `انظر للشاشة واسمع النطق الجميل.. كرر معي بصوتك الحلو: "${targetSkill || 'شجرة'}"`,
          prompt_content: targetSkill || 'شجرة',
          expected_speech_target: targetSkill || 'شجرة',
          visual_cue: '🌳',
          hint_ar: 'افتح فمك بهدوء وكرر الكلمة مع البطل سمسم!',
          success_feedback_ar: `رائع جداً يا ${childName || 'بطل'}! نطقك يزداد جمالاً ووضوحاً!`,
          encouragement_feedback_ar: 'محاولة شجاعة! هيا نجربها معاً مرة ثانية بابتسامة.',
        },
        {
          id: `act-${sessionId}-2`,
          session_id: sessionId,
          order_number: 2,
          type: 'choose_correct',
          title_ar: 'اختر الصورة المناسبة للكلمة',
          instruction_ar: `أي من هذه الصور يعبر عن "${targetSkill || 'شجرة'}"؟`,
          prompt_content: targetSkill || 'شجرة',
          expected_speech_target: targetSkill || 'شجرة',
          visual_cue: '🎯',
          options: [
            { id: 'opt-gen-1', text_ar: `${targetSkill || 'شجرة'} 🌳`, is_correct: true },
            { id: 'opt-gen-2', text_ar: 'سيارة 🚗', is_correct: false },
          ],
          hint_ar: 'انظر للرمز الأخضر الجميل في الخيارات!',
          success_feedback_ar: 'إجابة عبقرية وصحيحة! أنت ذكي جداً!',
          encouragement_feedback_ar: 'انظر بدقة، الصورة الصحيحة تعبر عن الكلمة المطلوبة.',
        },
      ],
    };

    return NextResponse.json({ session: generatedSession });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'فشل إنشاء الجلسة الذكية';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
