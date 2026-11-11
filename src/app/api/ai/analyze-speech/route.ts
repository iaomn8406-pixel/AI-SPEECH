import { NextRequest, NextResponse } from 'next/server';
import { analyzeChildSpeech } from '@/lib/ai/speech';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { spokenText, targetText } = body;

    if (!spokenText || !targetText) {
      return NextResponse.json({ error: 'النص المنطوق والنص المستهدف مطلوبان' }, { status: 400 });
    }

    const result = analyzeChildSpeech(spokenText, targetText);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'فشل تحليل النطق';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
