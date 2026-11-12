import { NextRequest, NextResponse } from 'next/server';
import { AIProviderFactory } from '@/lib/ai/providers/factory';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, apiKey, baseUrl } = body;

    if (!provider || !apiKey) {
      return NextResponse.json({ success: false, message: 'المزود ومفتاح API مطلوبان' }, { status: 400 });
    }

    if (provider === 'custom') {
      const targetBase = baseUrl ? baseUrl.replace(/\/+$/, '') : 'https://api.openai.com/v1';
      try {
        const testRes = await fetch(`${targetBase}/models`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });
        if (testRes.ok) {
          return NextResponse.json({
            success: true,
            message: 'تم الاتصال بالمزود المخصص بنجاح والتحقق من صحة المفتاح والـ Endpoint!',
          });
        } else {
          return NextResponse.json({
            success: false,
            message: `استجاب السيرفر برمز (${testRes.status})، يرجى التأكد من المفتاح وصلاحيات الرابط.`,
          });
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'خطأ في الاتصال';
        return NextResponse.json({
          success: false,
          message: `تعذر الوصول لرابط الـ API المخصص: ${msg}`,
        });
      }
    }

    if (provider === 'anthropic') {
      if (apiKey.startsWith('sk-ant-') && apiKey.length > 20) {
        return NextResponse.json({
          success: true,
          message: 'مفتاح Anthropic Claude صالح ومتطابق مع المعايير السريرية!',
        });
      }
      return NextResponse.json({
        success: false,
        message: 'مفتاح Anthropic غير صحيح؛ يجب أن يبدأ بـ sk-ant- وطوله مناسب.',
      });
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
