import { AIModelInfo, TaskType } from '@/types/models';

export interface AIProviderAdapter {
  id: string;
  name: string;
  providerType: 'gemini' | 'openai' | 'anthropic' | 'custom';
  listModels(apiKey?: string): Promise<AIModelInfo[]>;
  testConnection(apiKey: string): Promise<{ success: boolean; message: string }>;
  generateChatCompletion(params: {
    apiKey?: string;
    model: string;
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    temperature?: number;
    maxTokens?: number;
  }): Promise<{ content: string; tokensUsed?: number }>;
}

export interface ModelRecommendation {
  taskType: TaskType;
  titleAr: string;
  recommendedModelId: string;
  provider: 'gemini' | 'openai' | 'anthropic';
  reasonAr: string;
  arabicQualityScore: number; // 1-10
  voiceSupport: boolean;
  costTier: 'free' | 'low' | 'medium' | 'high';
}
