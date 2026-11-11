import { NextRequest, NextResponse } from 'next/server';
import { AIOrchestrator } from '@/lib/ai/orchestrator';
import { Child, SessionResult, Session } from '@/types/models';
import { PREBUILT_SESSIONS } from '@/lib/demo/prebuilt-curriculum';
import { DEMO_CHILDREN, DEMO_SESSION_RESULTS } from '@/lib/demo/sample-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { childId, message, conversationHistory = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'الرسالة مطلوبة' }, { status: 400 });
    }

    // Find child from demo or provided
    const child: Child = DEMO_CHILDREN.find(c => c.id === childId) || DEMO_CHILDREN[0];
    const recentResults: SessionResult[] = DEMO_SESSION_RESULTS.filter(r => r.child_id === child.id);
    const availableSessions: Session[] = PREBUILT_SESSIONS;

    const response = await AIOrchestrator.handleParentConsultation({
      child,
      recentResults,
      availableSessions,
      conversationHistory,
      userMessage: message,
    });

    return NextResponse.json(response);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'حدث خطأ في معالجة الاستشارة';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
