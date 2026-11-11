import { NextResponse } from 'next/server';
import { AIProviderFactory } from '@/lib/ai/providers/factory';
import { MODEL_RECOMMENDATIONS } from '@/lib/ai/providers/recommendations';

export async function GET() {
  try {
    const providers = AIProviderFactory.getAvailableProvidersConfig();
    const models = await AIProviderFactory.listAllModels();
    
    return NextResponse.json({
      providers,
      models,
      recommendations: MODEL_RECOMMENDATIONS,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'فشل جلب قائمة الموديلات';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
