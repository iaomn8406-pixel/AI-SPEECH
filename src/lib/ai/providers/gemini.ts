import { AIProviderAdapter } from './types';
import { AIModelInfo } from '@/types/models';
import { KNOWN_MODELS } from './recommendations';

export class GeminiProviderAdapter implements AIProviderAdapter {
  id = 'gemini';
  name = 'Google Gemini';
  providerType = 'gemini' as const;

  async testConnection(apiKey: string): Promise<{ success: boolean; message: string }> {
    if (!apiKey || apiKey.trim() === '') {
      return { success: false, message: 'مفتاح API غير متوفر أو فارغ.' };
    }
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return { 
          success: false, 
          message: errorData?.error?.message || `خطأ في الاتصال بالخدمة (${res.status})` 
        };
      }
      return { success: true, message: 'تم الاتصال بنجاح بخوادم Google Gemini!' };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'فشل الاتصال بالإنترنت أو بالمزود';
      return { success: false, message: errorMsg };
    }
  }

  async listModels(apiKey?: string): Promise<AIModelInfo[]> {
    if (!apiKey) {
      return KNOWN_MODELS.filter(m => m.provider === 'gemini');
    }
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (!res.ok) return KNOWN_MODELS.filter(m => m.provider === 'gemini');
      const data = await res.json();
      if (!data.models || !Array.isArray(data.models)) {
        return KNOWN_MODELS.filter(m => m.provider === 'gemini');
      }
      // Map returned models
      return data.models
        .filter((m: { name: string }) => m.name.includes('gemini'))
        .map((m: { name: string; displayName?: string; inputTokenLimit?: number }) => {
          const modelId = m.name.replace('models/', '');
          return {
            id: modelId,
            name: m.displayName || modelId,
            provider: 'gemini' as const,
            capabilities: {
              text: true,
              speech_to_text: true,
              text_to_speech: false,
              realtime_voice: modelId.includes('flash'),
              image_generation: false,
              image_understanding: true,
            },
            context_window: m.inputTokenLimit || 1048576,
          };
        });
    } catch {
      return KNOWN_MODELS.filter(m => m.provider === 'gemini');
    }
  }

  async generateChatCompletion(params: {
    apiKey?: string;
    model: string;
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    temperature?: number;
    maxTokens?: number;
  }): Promise<{ content: string; tokensUsed?: number }> {
    const key = params.apiKey || process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('API Key غير متوفر لمزود Google Gemini.');
    }

    const modelName = params.model.replace('models/', '') || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;

    // Extract system instructions and conversation contents
    const systemInstruction = params.messages.find(m => m.role === 'system')?.content;
    const contents = params.messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    const bodyPayload: Record<string, unknown> = {
      contents,
      generationConfig: {
        temperature: params.temperature ?? 0.7,
        maxOutputTokens: params.maxTokens ?? 1024,
      },
    };

    if (systemInstruction) {
      bodyPayload.systemInstruction = {
        parts: [{ text: systemInstruction }],
      };
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyPayload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `فشل في استجابة Gemini (${res.status})`);
    }

    const data = await res.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const tokensUsed = data?.usageMetadata?.totalTokenCount || 0;

    return { content: replyText, tokensUsed };
  }
}
