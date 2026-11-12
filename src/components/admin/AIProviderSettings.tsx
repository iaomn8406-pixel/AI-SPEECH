'use client';

import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Cpu, 
  Sliders, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Coins,
  Bot,
  Globe,
  Save,
  PlusCircle,
  Zap
} from 'lucide-react';
import { AIProviderConfig, AIModelInfo, TaskModelMapping } from '@/types/models';
import { MODEL_RECOMMENDATIONS } from '@/lib/ai/providers/recommendations';
import { DemoStore } from '@/lib/demo/demo-store';

export default function AIProviderSettings() {
  const [providers, setProviders] = useState<AIProviderConfig[]>([]);
  const [models, setModels] = useState<AIModelInfo[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai' | 'anthropic' | 'custom'>('gemini');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  // Custom Provider State
  const [customBaseUrl, setCustomBaseUrl] = useState('https://api.deepseek.com/v1');
  const [customModelName, setCustomModelName] = useState('deepseek-chat');

  const [testStatus, setTestStatus] = useState<{ testing: boolean; result?: { success: boolean; message: string } }>({
    testing: false,
  });

  // Task Mappings
  const [taskMappings, setTaskMappings] = useState<Record<string, { model: string; useMainKey: boolean }>>({
    main_agent: { model: 'gemini-2.0-flash', useMainKey: true },
    text_chat: { model: 'gemini-1.5-pro', useMainKey: true },
    speech_recognition: { model: 'whisper-1', useMainKey: true },
    text_to_speech: { model: 'tts-1', useMainKey: true },
    realtime_voice: { model: 'gemini-2.0-flash', useMainKey: true },
    image_generation: { model: 'dall-e-3', useMainKey: true },
    image_understanding: { model: 'gemini-1.5-flash', useMainKey: true },
  });

  useEffect(() => {
    fetchModelsAndProviders();
    const existingKey = DemoStore.getCustomApiKey();
    if (existingKey) {
      setApiKeyInput(existingKey);
    }
    const customConfig = DemoStore.getCustomProviderConfig();
    if (customConfig?.baseUrl) {
      setCustomBaseUrl(customConfig.baseUrl);
    }
    if (customConfig?.modelName) {
      setCustomModelName(customConfig.modelName);
    }
    if (customConfig?.provider && (['gemini', 'openai', 'anthropic', 'custom'] as const).includes(customConfig.provider as any)) {
      setSelectedProvider(customConfig.provider as any);
    }
  }, []);

  const fetchModelsAndProviders = async () => {
    try {
      const res = await fetch('/api/ai/models');
      if (res.ok) {
        const data = await res.json();
        setProviders(data.providers || []);
        setModels(data.models || []);
      }
    } catch {
      // Handled gracefully
    }
  };

  const handleApplyPreset = (preset: 'deepseek' | 'groq' | 'openrouter' | 'ollama' | 'custom') => {
    if (preset === 'deepseek') {
      setCustomBaseUrl('https://api.deepseek.com/v1');
      setCustomModelName('deepseek-chat');
    } else if (preset === 'groq') {
      setCustomBaseUrl('https://api.groq.com/openai/v1');
      setCustomModelName('llama-3.3-70b-versatile');
    } else if (preset === 'openrouter') {
      setCustomBaseUrl('https://openrouter.ai/api/v1');
      setCustomModelName('meta-llama/llama-3.3-70b-instruct');
    } else if (preset === 'ollama') {
      setCustomBaseUrl('http://localhost:11434/v1');
      setCustomModelName('llama3');
    }
  };

  const handleTestKey = async () => {
    if (!apiKeyInput.trim()) return;
    setTestStatus({ testing: true });

    try {
      const res = await fetch('/api/ai/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: selectedProvider,
          apiKey: apiKeyInput,
          baseUrl: customBaseUrl,
        }),
      });
      const data = await res.json();
      setTestStatus({ testing: false, result: data });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل الفحص';
      setTestStatus({ testing: false, result: { success: false, message: msg } });
    }
  };

  const handleSaveToPlatform = () => {
    if (!apiKeyInput.trim()) return;
    DemoStore.setCustomApiKey(apiKeyInput.trim());
    DemoStore.setCustomProviderConfig({
      provider: selectedProvider,
      baseUrl: customBaseUrl,
      modelName: customModelName,
      apiKey: apiKeyInput.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-300 text-xs font-bold mb-2">
            <Cpu className="w-4 h-4" />
            <span>AI Orchestration & Multi-Provider Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">إدارة مزودي الذكاء الاصطناعي والموديلات</h2>
          <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            المنصة تدعم الربط مع Google Gemini و OpenAI و Anthropic Claude. يمكنك تعيين موديل محدد لكل مهمة ومراقبة جودة اللغة العربية واستهلاك التكلفة.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shrink-0">
          <Coins className="w-8 h-8 text-amber-400" />
          <div>
            <p className="text-[11px] text-gray-300">الاستهلاك التقديري هذا الشهر</p>
            <p className="text-xl font-black text-white">$0.00 <span className="text-xs font-normal text-emerald-400">(وضع التجربة المجاني)</span></p>
          </div>
        </div>
      </div>

      {/* 1. API Key Setup Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-indigo-600" />
          <span>إعداد واختبار مفاتيح API (API Keys)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {(['gemini', 'openai', 'anthropic', 'custom'] as const).map((prov) => {
            const isSelected = selectedProvider === prov;
            const pConfig = providers.find(p => p.provider_type === prov);

            return (
              <button
                key={prov}
                onClick={() => setSelectedProvider(prov)}
                className={`p-4 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-sm text-gray-900">
                    {prov === 'gemini' && 'Google Gemini (الموصى به)'}
                    {prov === 'openai' && 'OpenAI (GPT & Whisper)'}
                    {prov === 'anthropic' && 'Anthropic Claude'}
                    {prov === 'custom' && 'مزود مخصص (DeepSeek / Groq)'}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${isSelected || pConfig?.has_api_key ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {prov === 'gemini' && 'يدعم Gemini 2.0 Flash، Realtime Voice، واللغة العربية الفصحى والمصرية.'}
                  {prov === 'openai' && 'يدعم GPT-4o، Whisper للتعرف على الصوت، و TTS.'}
                  {prov === 'anthropic' && 'يدعم Claude 3.5 Sonnet للاستدلال السريري العميق.'}
                  {prov === 'custom' && 'ربط أي سيرفر أو مزود متوافق مع OpenAI مثل DeepSeek، Groq، أو OpenRouter.'}
                </p>
              </button>
            );
          })}
        </div>

        {/* Custom Provider Presets (When Custom is Selected) */}
        {selectedProvider === 'custom' && (
          <div className="mb-6 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-black text-indigo-950">قوالب ربط جاهزة وسريعة لمزودي الـ AI الخارجيين:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('deepseek')}
                className="px-3 py-1.5 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 transition-colors shadow-2xs cursor-pointer"
              >
                🚀 DeepSeek V3 / R1
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('groq')}
                className="px-3 py-1.5 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 transition-colors shadow-2xs cursor-pointer"
              >
                ⚡ Groq Cloud (Llama 3.3 فائقة السرعة)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('openrouter')}
                className="px-3 py-1.5 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 transition-colors shadow-2xs cursor-pointer"
              >
                🌐 OpenRouter (كل الموديلات العالمية)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('ollama')}
                className="px-3 py-1.5 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 transition-colors shadow-2xs cursor-pointer"
              >
                💻 Ollama (محلي بدون نت)
              </button>
            </div>
          </div>
        )}

        {/* Input & Test Controls */}
        <div className="space-y-4 max-w-2xl">
          {selectedProvider === 'custom' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  رابط الـ API الأساسي (Base URL):
                </label>
                <input
                  type="text"
                  value={customBaseUrl}
                  onChange={(e) => setCustomBaseUrl(e.target.value)}
                  placeholder="https://api.deepseek.com/v1"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  اسم الموديل (Model Name):
                </label>
                <input
                  type="text"
                  value={customModelName}
                  onChange={(e) => setCustomModelName(e.target.value)}
                  placeholder="deepseek-chat أو llama-3.3-70b"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          <label className="block text-xs font-bold text-gray-700">
            أدخل مفتاح API لـ ({selectedProvider === 'custom' ? 'المزود المخصص' : selectedProvider.toUpperCase()}):
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder={
                selectedProvider === 'gemini' 
                  ? 'AIzaSy...' 
                  : selectedProvider === 'openai' 
                  ? 'sk-...' 
                  : selectedProvider === 'anthropic'
                  ? 'sk-ant-...'
                  : 'sk-...'
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-mono text-gray-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute left-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTestKey}
              disabled={!apiKeyInput.trim() || testStatus.testing}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${testStatus.testing ? 'animate-spin' : ''}`} />
              <span>{testStatus.testing ? 'جاري الفحص...' : 'فحص صحة المفتاح والاتصال'}</span>
            </button>

            <button
              onClick={handleSaveToPlatform}
              disabled={!apiKeyInput.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>حفظ وتفعيل المزود في المنصة فوراً</span>
            </button>

            {savedSuccess && (
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>تم الحفظ والتفعيل بنجاح!</span>
              </span>
            )}
          </div>

          <p className="text-[11px] text-gray-500">
            🔒 يتم تشفير المفاتيح واستخدامها محلياً في المنصة أو عبر السيرفر.
          </p>

          {testStatus.result && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 animate-fade-in ${
                testStatus.result.success
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {testStatus.result.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{testStatus.result.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Model Recommendation Engine Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>محرك ترشيحات الموديلات (Model Recommendation Engine)</span>
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          مقارنة علمية دقيقة لاختيار الموديل الأمثل لكل وظيفة في المنصة حسب جودة اللغة العربية، زمن الاستجابة، والتكلفة:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold">
                <th className="py-3 px-4">المهمة الوظيفية</th>
                <th className="py-3 px-4">الموديل المرشح</th>
                <th className="py-3 px-4">المزود</th>
                <th className="py-3 px-4">جودة العربية</th>
                <th className="py-3 px-4">مستوى التكلفة</th>
                <th className="py-3 px-4">سبب الترشيح</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MODEL_RECOMMENDATIONS.map((rec) => (
                <tr key={rec.taskType} className="hover:bg-gray-50/70">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{rec.titleAr}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-bold">
                      {rec.recommendedModelId}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 uppercase text-gray-600 font-semibold">{rec.provider}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded-full">
                      {rec.arabicQualityScore}/10 ⭐
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-gray-600 capitalize bg-gray-100 px-2 py-0.5 rounded-md font-bold">
                      {rec.costTier === 'low' ? 'اقتصادي' : rec.costTier === 'medium' ? 'متوسط' : 'مرتفع'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 max-w-xs">{rec.reasonAr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Task Assignment Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-2">
          <Sliders className="w-5 h-5 text-purple-600" />
          <span>تخصيص الموديلات للمهام السريرية (Task Model Mappings)</span>
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          يمكنك تحديد الموديل المعتمد لكل مهمة، وتفعيل خيار &quot;Use Main API Key&quot; لاستخدام المفتاح الموحد:
        </p>

        <div className="space-y-4 max-w-3xl">
          {MODEL_RECOMMENDATIONS.map((rec) => {
            const current = taskMappings[rec.taskType] || { model: rec.recommendedModelId, useMainKey: true };

            return (
              <div
                key={rec.taskType}
                className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">{rec.titleAr}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 font-mono">{rec.taskType}</p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={current.model}
                    onChange={(e) => {
                      setTaskMappings({
                        ...taskMappings,
                        [rec.taskType]: { ...current, model: e.target.value },
                      });
                    }}
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-hidden"
                  >
                    <option value={rec.recommendedModelId}>{rec.recommendedModelId} (الافتراضي)</option>
                    <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                    <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                    <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                    <option value="gpt-4o">gpt-4o</option>
                    <option value="gpt-4o-mini">gpt-4o-mini</option>
                    <option value="claude-3-5-sonnet">claude-3-5-sonnet</option>
                  </select>

                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={current.useMainKey}
                      onChange={(e) => {
                        setTaskMappings({
                          ...taskMappings,
                          [rec.taskType]: { ...current, useMainKey: e.target.checked },
                        });
                      }}
                      className="rounded-sm text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="whitespace-nowrap">Use Main API Key</span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
