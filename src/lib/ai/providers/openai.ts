import { AIProviderAdapter } from './types';
import { AIModelInfo } from '@/types/models';
import { KNOWN_MODELS } from './recommendations';

export class OpenAIProviderAdapter implements AIProviderAdapter {
  id = 'openai';
  name = 'OpenAI';
  providerType = 'openai' as const;

  async testConnection(apiKey: string): Promise<{ success: boolean; message: string }> {
    if (!apiKey || apiKey.trim() === '') {
      return { success: false, message: 'مفتاح API غير متوفر أو فارغ.' };
    }
    try {
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return { 
          success: false, 
          message: errorData?.error?.message || `خطأ في الاتصال بالخدمة (${res.status})` 
        };
      }
      return { success: true, message: 'تم الاتصال بنجاح بخوادم OpenAI!' };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'فشل الاتصال بالإنترنت أو بالمزود';
      return { success: false, message: errorMsg };
    }
  }

  async listModels(apiKey?: string): Promise<AIModelInfo[]> {
    if (!apiKey) {
      return KNOWN_MODELS.filter(m => m.provider === 'openai');
    }
    try {
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!res.ok) return KNOWN_MODELS.filter(m => m.provider === 'openai');
      return KNOWN_MODELS.filter(m => m.provider === 'openai');
    } catch {
      return KNOWN_MODELS.filter(m => m.provider === 'openai');
    }
  }

  async generateChatCompletion(params: {
    apiKey?: string;
    model: string;
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    temperature?: number;
    maxTokens?: number;
  }): Promise<{ content: string; tokensUsed?: number }> {
    const key = params.apiKey || process.env.OPENAI_API_KEY;
    if (!key) {
      throw new Error('API Key غير متوفر لمزود OpenAI.');
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: params.model || 'gpt-4o-mini',
        messages: params.messages,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? 1024,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `فشل في استجابة OpenAI (${res.status})`);
    }

    const data = await res.json();
    return {
      content: data.choices?.[0]?.message?.content || '',
      tokensUsed: data.usage?.total_tokens || 0,
    };
  }
}
