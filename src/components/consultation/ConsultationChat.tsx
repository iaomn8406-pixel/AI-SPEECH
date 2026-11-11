'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, User, ArrowLeft, Loader2, PlayCircle, HelpCircle } from 'lucide-react';
import { ConsultationMessage, Child } from '@/types/models';
import { DemoStore } from '@/lib/demo/demo-store';
import SpeechAudioButton from '@/components/common/SpeechAudioButton';

export default function ConsultationChat() {
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChildren(DemoStore.getChildren());
    setActiveChild(DemoStore.getActiveChild());
    setMessages(DemoStore.getConsultationMessages());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleChildSelect = (childId: string) => {
    DemoStore.setActiveChildId(childId);
    const child = children.find(c => c.id === childId) || null;
    setActiveChild(child);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    setInputText('');

    // Add user message to UI & Store
    const userMsg = DemoStore.addConsultationMessage({
      sender: 'user',
      content: text,
    });
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId: activeChild?.id,
          message: text,
          conversationHistory: messages.slice(-6).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error('فشل الرد من خادم الذكاء الاصطناعي');
      }

      const data = await res.json();
      const assistantMsg = DemoStore.addConsultationMessage({
        sender: 'assistant',
        content: data.message,
        suggested_action: data.suggestedAction,
      });

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      // Fallback assistant response
      const fallbackMsg = DemoStore.addConsultationMessage({
        sender: 'assistant',
        content: `أشكرك على مشاركة هذا التحدي الخاص بـ ${activeChild?.name || 'طفلك'}. \n\nلتحديد الخطة التأهيلية الدقيقة، هل يمكنك إخباري بعمر الطفل الحالي، وهل سبق خضوعه لتقييم سمعي أو لغوي متخصص؟`,
        suggested_action: {
          type: 'view_session',
          label_ar: 'استكشاف جلسات التخاطب التفاعلية',
          target_id: 'sess-sl-101',
        },
      });
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'طفلي عنده تأخر في الكلام ومش بيتكلم غير كلمات مفردة',
    'عنده لدغة في حرف الراء ومش عارف ينطقها كويس',
    'بيخلط بين الحروف المتشابهة في القراءة زي الباء والتاء',
    'صعب عليه يقعد في نشاط واحد وبيتشتت بسرعة',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
      
      {/* Consultation Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-yellow-300">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
              <span>المستشار الذكي لأولياء الأمور</span>
              <span className="text-[10px] bg-yellow-400 text-purple-950 px-2 py-0.5 rounded-full font-black">AI Live</span>
            </h2>
            <p className="text-xs text-indigo-200">
              تحليل سريري لغوي، خطط مخصصة، واقتراح جلسات مباشرة لحالة طفلك
            </p>
          </div>
        </div>

        {/* Child Selector */}
        {children.length > 0 && activeChild && (
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
            <span className="text-xs font-semibold text-indigo-100">مناقشة حالة:</span>
            <select
              value={activeChild.id}
              onChange={(e) => handleChildSelect(e.target.value)}
              className="bg-transparent text-white text-xs font-bold focus:outline-hidden cursor-pointer"
            >
              {children.map(c => (
                <option key={c.id} value={c.id} className="text-gray-900 font-bold">
                  {c.avatar} {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
        
        {/* Medical Advisory Banner */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] sm:text-xs text-amber-900 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>تنبيه طبي توجيهي:</strong> الاستشارة الذكية أداة تأهيلية واستكشافية لمساعدة ولي الأمر وربطه بالجلسات والتمارين المناسبة، ولا تُعد تشخيصاً طبياً مستقلاً عن الفحص السريري المباشر.
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          // Clean all asterisks completely as requested
          const cleanContent = msg.content.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*/g, '');

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gradient-to-tr from-purple-600 to-pink-500 text-yellow-200'
                }`}
              >
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-xs shadow-md shadow-indigo-100'
                    : 'bg-white text-gray-800 border border-indigo-100/70 rounded-tl-xs shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{cleanContent}</div>

                {/* Suggested Session CTA button if AI generated a link */}
                {msg.suggested_action && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <a
                      href={`/sessions/${msg.suggested_action.target_id || 'sess-sl-101'}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-md hover:brightness-105 active:scale-95 transition-all"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>{msg.suggested_action.label_ar}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-50/50">
                  <span className={`text-[10px] ${isUser ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {msg.timestamp}
                  </span>
                  {!isUser && (
                    <SpeechAudioButton text={cleanContent} size="sm" title="الاستماع للإجابة صوتياً" />
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white p-4 rounded-3xl border border-indigo-100 text-xs font-bold text-gray-500 flex items-center gap-2 shadow-xs">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span>جاري تحليل استفساركم وصياغة التوجيه الأنسب...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions Pills */}
      <div className="px-4 py-2 bg-white border-t border-gray-100 overflow-x-auto flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-bold text-gray-400 shrink-0">أسئلة شائعة:</span>
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-xs bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-3 sm:p-4 bg-white border-t border-indigo-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`اكتب ما تلاحظه على ${activeChild?.name || 'طفلك'}، سلوكياته، أو أسئلتك...`}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-hidden focus:border-indigo-500 focus:bg-white text-gray-900 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 disabled:opacity-50 text-white rounded-2xl shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-5 h-5 rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
}
