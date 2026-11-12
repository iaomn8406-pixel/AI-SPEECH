// Web Speech API and Phonetic Matching Utilities for Arabic

export interface SpeechAnalysisResult {
  spokenText: string;
  targetText: string;
  isMatch: boolean;
  isUnclear: boolean;
  isWrong: boolean;
  similarityScore: number; // 0 to 100
  feedbackMessageAr: string;
  phoneticNotes?: string;
}

/**
 * Normalizes Arabic text for speech matching by removing diacritics,
 * unifying alef, taa marbuta, etc.
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    // Remove diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize Alef forms
    .replace(/[أإآ]/g, 'ا')
    // Normalize Taa Marbuta
    .replace(/ة/g, 'ه')
    // Normalize Yaa
    .replace(/ى/g, 'ي')
    // Remove punctuation & extra spaces
    .replace(/[^\w\s\u0600-\u06FF]/gi, '')
    .trim()
    .toLowerCase();
}

/**
 * Calculates Levenshtein similarity between 0 and 100
 */
export function calculateArabicSimilarity(str1: string, str2: string): number {
  const s1 = normalizeArabicText(str1);
  const s2 = normalizeArabicText(str2);

  if (!s1 || !s2) return 0;
  if (s1 === s2) return 100;
  if (s1.includes(s2) || s2.includes(s1)) return 85;

  const track = Array(s2.length + 1)
    .fill(null)
    .map(() => Array(s1.length + 1).fill(null));

  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  const distance = track[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  const similarity = Math.round(((maxLength - distance) / maxLength) * 100);
  return Math.max(0, Math.min(100, similarity));
}

/**
 * Analyzes child speech attempt with strict clinical criteria:
 * - isMatch (score >= 70%): pronounced correctly.
 * - isUnclear (40% <= score < 70%): muttered, low volume, or partial.
 * - isWrong (score < 40%): incorrect pronunciation or wrong word.
 */
export function analyzeChildSpeech(spoken: string, expectedTarget: string): SpeechAnalysisResult {
  const normSpoken = normalizeArabicText(spoken);
  const normTarget = normalizeArabicText(expectedTarget);

  if (!normSpoken || normSpoken.length === 0) {
    return {
      spokenText: '',
      targetText: expectedTarget,
      isMatch: false,
      isUnclear: true,
      isWrong: false,
      similarityScore: 0,
      feedbackMessageAr: 'لم نسمع صوتك يا بطل! افتح المايك وانطق بصوت واضح.',
    };
  }

  const score = calculateArabicSimilarity(normSpoken, normTarget);
  const isMatch = score >= 70;
  const isUnclear = score >= 40 && score < 70;
  const isWrong = score < 40;

  let feedbackMessageAr = '';
  if (isMatch) {
    feedbackMessageAr = `نطق سليم وممتاز يا بطل (${score}%)! صوتك رائع.`;
  } else if (isUnclear) {
    feedbackMessageAr = `الصوت مش واضح قوي يا بطل (${score}%).. عيد تاني بهدوء وركز في مخرج الحرف.`;
  } else {
    feedbackMessageAr = `نطق غير صحيح.. الحرف المستهدف هو «${expectedTarget}»، اسمعني كويس وجرب تاني!`;
  }

  return {
    spokenText: spoken,
    targetText: expectedTarget,
    isMatch,
    isUnclear,
    isWrong,
    similarityScore: score,
    feedbackMessageAr,
  };
}

/**
 * Text-to-Speech synthesis in browser with Arabic voice support & kid pitch
 */
export function speakArabicText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
    onStart?: () => void;
  }
): { cancel: () => void } {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options?.onEnd?.();
    return { cancel: () => {} };
  }

  try {
    // Unpause if Chrome paused speech synthesis
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    // Cancel any previous speech
    window.speechSynthesis.cancel();
  } catch {
    // Ignore
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = options?.rate ?? 0.88; // Slower for clear child comprehension
  utterance.pitch = options?.pitch ?? 1.2; // Warmer friendly pitch for children

  // Load voices and select Arabic voice if available
  const setVoice = () => {
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        // Look for Arabic female or child-friendly voice
        const arVoice = voices.find(
          v => (v.lang.startsWith('ar') || v.lang.includes('ar-')) &&
               (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('hoda') || v.name.toLowerCase().includes('salma') || v.name.toLowerCase().includes('naayf') || v.name.toLowerCase().includes('arabic'))
        ) || voices.find(v => v.lang.startsWith('ar') || v.lang.includes('ar-'));

        if (arVoice) {
          utterance.voice = arVoice;
        }
      }
    } catch {
      // Fallback
    }
  };

  setVoice();

  if (options?.onStart) utterance.onstart = options.onStart;
  if (options?.onEnd) utterance.onend = options.onEnd;
  utterance.onerror = () => options?.onEnd?.();

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis speak error:', err);
    options?.onEnd?.();
  }

  return {
    cancel: () => {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    },
  };
}
