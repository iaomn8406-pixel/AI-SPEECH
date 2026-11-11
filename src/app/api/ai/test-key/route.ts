import { NextRequest, NextResponse } from 'next/server';
import { AIProviderFactory } from '@/lib/ai/providers/factory';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, apiKey } = body;

    if (!provider || !apiKey) {
      return NextResponse.json({ success: false, message: 'المزود ومفتاح API مطلوبان' }, { status: 400 });
    }

    const adapter = AIProviderFactory.getAdapter(provider);
    if (!adapter) {
      return NextResponse.json({ success: false, message: 'المزود غير مدعوم حالياً' }, { status: 400 });
    }

    const result = await adapter.testConnection(apiKey);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء فحص المفتاح';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
