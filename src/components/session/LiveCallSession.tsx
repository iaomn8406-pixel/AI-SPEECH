'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  MessageSquare, 
  Volume2, 
  Sparkles, 
  HelpCircle, 
  Image as ImageIcon,
  Bot,
  User,
  Settings,
  Send,
  Loader2,
  X
} from 'lucide-react';
import { DemoStore } from '@/lib/demo/demo-store';
import { speakArabicText, analyzeChildSpeech } from '@/lib/ai/speech';
import ApiKeyNoticeModal from '@/components/common/ApiKeyNoticeModal';
import MascotAvatar from '@/components/child/MascotAvatar';

interface LiveCallSessionProps {
  onEndCall: () => void;
  sessionTopic?: string;
}

interface InCallMessage {
  id: string;
  sender: 'specialist' | 'child';
  text: string;
  visualCard?: {
    title: string;
    emoji: string;
    explanation: string;
  };
}

export default function LiveCallSession({ onEndCall, sessionTopic = 'تأهيل النطق والتخاطب' }: LiveCallSessionProps) {
  const activeChild = DemoStore.getActiveChild();
  const [callActive, setCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showInCallChat, setShowInCallChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('salma');

  const [messages, setMessages] = useState<InCallMessage[]>([
    {
      id: '1',
      sender: 'specialist',
      text: `أهلاً بك يا ${activeChild?.name || 'بطل'}! أنا أخصائيتك الذكية سارة، وسعيدة جداً بالحديث معك اليوم. عن ماذا تحب أن نتدرب اليوم؟`,
    },
  ]);

  const speechCancelRef = useRef<(() => void) | null>(null);

  // Call Duration Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initial Specialist Greeting
  useEffect(() => {
    // Check if API key is active
    if (!DemoStore.hasActiveApiKey()) {
      setShowApiKeyModal(true);
      return;
    }

    speakSpecialist(`أهلاً بك يا ${activeChild?.name || 'بطل'}! أنا أخصائيتك الذكية سارة. كيف حالك اليوم؟`);
  }, []);

  const speakSpecialist = (text: string) => {
    if (speechCancelRef.current) speechCancelRef.current();
    setIsSpeaking(true);

    const controller = speakArabicText(text, {
      pitch: 1.25, // Sweet female tone
      rate: 0.88,
      onEnd: () => setIsSpeaking(false),
      onStart: () => setIsSpeaking(true),
    });
    speechCancelRef.current = controller.cancel;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If child didn't understand -> Generate visual explanation right inside the call!
  const handleChildDidNotUnderstand = (concept: string = 'الكلمة') => {
    if (!DemoStore.hasActiveApiKey()) {
      setShowApiKeyModal(true);
      return;
    }

    setShowInCallChat(true);
    setIsGeneratingVisual(true);

    // Stop speaking immediately for barge-in
    if (speechCancelRef.current) speechCancelRef.current();

    setTimeout(() => {
      const visualCards: Record<string, { emoji: string; title: string; explanation: string }> = {
        'قطة': { emoji: '🐱', title: 'الْقِطَّةُ اللَّطِيفَةُ', explanation: 'حيوان أليف جميل له فراء ناعم ويقول: مياوو! نفتح فمنا ونقول: قِـطَّـة!' },
        'أسد': { emoji: '🦁', title: 'الْأَسَدُ الشُّجَاعُ', explanation: 'ملك الغابة القوي ذو الصوت الهادر! نضم صوتنا ونقول: أَسَـد!' },
        'راء': { emoji: '🚂', title: 'مَخْرَجُ حَرْفِ الرَّاءِ', explanation: 'نجعل طرف اللسان يرتعش في سقف الفم مثل محرك القطار: رررررر!' },
        'default': { emoji: '🌟', title: 'تَوْضِيحٌ بَصَرِيٌّ ذَكِيٌّ', explanation: 'انظر للصورة الجميلة واقرأ الكلمة معي بهدوء وابتسامة.' },
      };

      const card = visualCards[concept] || visualCards['default'];

      const newMsg: InCallMessage = {
        id: Date.now().toString(),
        sender: 'specialist',
        text: `ولا يهمك يا ${activeChild?.name || 'بطل'}! أنشأت لك هذه البطاقة المصورة لكي تفهمها بسهولة:`,
        visualCard: card,
      };

      setMessages(prev => [...prev, newMsg]);
      setIsGeneratingVisual(false);

      speakSpecialist(`انظر إلى الشاشة يا ${activeChild?.name || 'بطل'}! أنشأت لك هذه الصورة التوضيحية لكي تفهم الكلمة بسهولة.`);
    }, 1500);
  };

  const handleSendInCallChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const childMsg: InCallMessage = {
      id: Date.now().toString(),
      sender: 'child',
      text: chatInput,
    };
    setMessages(prev => [...prev, childMsg]);
    const input = chatInput;
    setChatInput('');

    if (input.includes('مش فاهم') || input.includes('صعبة') || input.includes('مش عارف')) {
      handleChildDidNotUnderstand('قطة');
    } else {
      setTimeout(() => {
        const replyText = `أحسنت التعبير يا ${activeChild?.name || 'بطل'}! كلامك واضح وجميل جداً، هيا نستمر في التدريب.`;
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'specialist',
          text: replyText,
        }]);
        speakSpecialist(replyText);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between text-white animate-fade-in">
      
      {/* Top Call Status Bar */}
      <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Bot className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base flex items-center gap-2">
              <span>أخصائية التخاطب الذكية (د. سارة)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </h3>
            <p className="text-xs text-emerald-400 font-mono">
              مكالمة جارية • {formatDuration(callDuration)}
            </p>
          </div>
        </div>

        {/* Quick Help & In-Call Chat Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleChildDidNotUnderstand('قطة')}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            title="طلب توضيح بصري فوري"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">أنا مش فاهم (اشرح بالصور)</span>
          </button>

          <button
            onClick={() => setShowInCallChat(!showInCallChat)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              showInCallChat
                ? 'bg-indigo-600 border-indigo-400 text-white'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
            title="الشات المباشر أثناء المكالمة"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Call Stage */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 flex flex-col md:flex-row items-center justify-center gap-6 overflow-hidden">
        
        {/* Left: Specialist Animated Video/Audio Avatar */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-6">
            <MascotAvatar state={isSpeaking ? 'speaking' : 'listening'} size="xl" />
            {isSpeaking && (
              <div className="absolute -bottom-3 bg-pink-600 text-white text-xs font-black px-4 py-1 rounded-full shadow-lg border border-pink-400 animate-bounce">
                د. سارة تتحدث الآن 🗣️
              </div>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black mb-1">
            {activeChild?.name} يتدرب على: {sessionTopic}
          </h2>
          <p className="text-xs text-indigo-300">
            {isSpeaking ? 'استمع إلى توجيهات الأخصائية بدقة' : 'تحدث بحرية.. الأخصائية تستمع إليك وترد فوراً!'}
          </p>
        </div>

        {/* Right: Floating In-Call Chat & Visual Explanatory Flashcard */}
        {showInCallChat && (
          <div className="w-full md:w-96 h-80 md:h-[450px] bg-slate-900 border border-white/20 rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-3 bg-slate-800 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-black text-indigo-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-pink-400" />
                <span>الشات البصري التوضيحي داخل المكالمة</span>
              </span>
              <button onClick={() => setShowInCallChat(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* In-Call Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-2xl ${
                    m.sender === 'child'
                      ? 'bg-indigo-600 text-white mr-6'
                      : 'bg-slate-800 border border-white/10 text-slate-100 ml-6'
                  }`}
                >
                  <p>{m.text}</p>
                  
                  {/* Generated Visual Card Display */}
                  {m.visualCard && (
                    <div className="mt-2.5 p-3 bg-white text-slate-900 rounded-2xl border-2 border-yellow-300 text-center space-y-2 animate-fade-in">
                      <div className="text-5xl">{m.visualCard.emoji}</div>
                      <h4 className="font-black text-sm text-indigo-900">{m.visualCard.title}</h4>
                      <p className="text-[11px] text-gray-700 leading-relaxed">{m.visualCard.explanation}</p>
                    </div>
                  )}
                </div>
              ))}

              {isGeneratingVisual && (
                <div className="p-3 bg-slate-800 text-yellow-300 rounded-2xl flex items-center gap-2 text-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-pink-400" />
                  <span>الأخصائية الذكية تنشئ بطاقة توضيحية لك الآن...</span>
                </div>
              )}
            </div>

            {/* In-Call Chat Input */}
            <form onSubmit={handleSendInCallChat} className="p-2.5 bg-slate-800 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="اكتب للأخصائية أو قل 'مش فاهم'..."
                className="flex-1 bg-slate-950 px-3 py-2 rounded-xl text-xs text-white border border-white/10 focus:outline-hidden focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom Call Controls */}
      <div className="p-4 sm:p-6 bg-black/50 border-t border-white/10 backdrop-blur-md flex items-center justify-center gap-4 sm:gap-6">
        
        {/* Mute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isMuted ? 'bg-amber-500 text-slate-950' : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          title={isMuted ? 'إلغاء كتم المايك' : 'كتم المايك'}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        {/* End Call Button */}
        <button
          onClick={onEndCall}
          className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-sm rounded-full shadow-lg shadow-rose-900/50 flex items-center gap-2 cursor-pointer transition-all"
        >
          <PhoneOff className="w-5 h-5" />
          <span>إنهاء المكالمة</span>
        </button>

        {/* Voice Selector */}
        <div className="relative">
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="bg-white/10 text-white text-xs font-bold px-3 py-3 rounded-2xl border border-white/20 focus:outline-hidden cursor-pointer"
            title="اختيار نبرة صوت الأخصائية"
          >
            <option value="salma" className="text-gray-900">صوت سلمى (أنثوي دافئ)</option>
            <option value="mariam" className="text-gray-900">صوت مريم (هادئ ومشجع)</option>
            <option value="nova" className="text-gray-900">صوت Nova (OpenAI API)</option>
          </select>
        </div>
      </div>

      {/* API Key Guard Modal */}
      <ApiKeyNoticeModal
        isOpen={showApiKeyModal}
        onClose={() => {
          setShowApiKeyModal(false);
          onEndCall();
        }}
        featureName="مكالمة التخاطب التفاعلية الحية"
      />
    </div>
  );
}
