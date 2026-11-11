import { AIProviderAdapter } from './types';
import { GeminiProviderAdapter } from './gemini';
import { OpenAIProviderAdapter } from './openai';
import { AIProviderConfig, AIModelInfo } from '@/types/models';
import { KNOWN_MODELS } from './recommendations';

export class AIProviderFactory {
  private static adapters: Map<string, AIProviderAdapter> = new Map<string, AIProviderAdapter>([
    ['gemini', new GeminiProviderAdapter()],
    ['openai', new OpenAIProviderAdapter()],
  ]);

  static getAdapter(providerType: string): AIProviderAdapter | undefined {
    return this.adapters.get(providerType);
  }

  static getRegisteredProviders(): Array<{ id: string; name: string; type: 'gemini' | 'openai' | 'anthropic' }> {
    return [
      { id: 'gemini', name: 'Google Gemini', type: 'gemini' },
      { id: 'openai', name: 'OpenAI (GPT & Whisper)', type: 'openai' },
      { id: 'anthropic', name: 'Anthropic Claude', type: 'anthropic' },
    ];
  }

  static getAvailableProvidersConfig(): AIProviderConfig[] {
    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5);
    const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 5);

    return [
      {
        id: 'gemini',
        name: 'Google Gemini',
        provider_type: 'gemini',
        is_active: true,
        has_api_key: hasGeminiKey,
        masked_key: hasGeminiKey ? 'AIzaSy••••••••••••••••' : undefined,
        is_default: true,
        models: KNOWN_MODELS.filter(m => m.provider === 'gemini'),
      },
      {
        id: 'openai',
        name: 'OpenAI',
        provider_type: 'openai',
        is_active: false,
        has_api_key: hasOpenAIKey,
        masked_key: hasOpenAIKey ? 'sk-••••••••••••••••' : undefined,
        is_default: false,
        models: KNOWN_MODELS.filter(m => m.provider === 'openai'),
      },
      {
        id: 'anthropic',
        name: 'Anthropic Claude',
        provider_type: 'anthropic',
        is_active: false,
        has_api_key: false,
        is_default: false,
        models: KNOWN_MODELS.filter(m => m.provider === 'anthropic'),
      },
    ];
  }

  static async listAllModels(): Promise<AIModelInfo[]> {
    return KNOWN_MODELS;
  }
}
