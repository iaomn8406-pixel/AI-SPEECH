'use client';

import { Child, SessionResult, ChildGoal, ConsultationMessage, Session } from '@/types/models';
import { DEMO_CHILDREN, DEMO_SESSION_RESULTS, DEMO_GOALS, DEMO_CONSULTATION_MESSAGES } from './sample-data';
import { PREBUILT_SESSIONS } from './prebuilt-curriculum';

const STORAGE_KEYS = {
  CHILDREN: 'ai_speech_children',
  ACTIVE_CHILD_ID: 'ai_speech_active_child_id',
  SESSION_RESULTS: 'ai_speech_session_results',
  GOALS: 'ai_speech_goals',
  CONSULTATION: 'ai_speech_consultation',
  USER_ROLE: 'ai_speech_user_role',
  SESSIONS: 'ai_speech_custom_sessions',
  IS_LOGGED_IN: 'ai_speech_is_logged_in',
  USER_EMAIL: 'ai_speech_user_email',
  CUSTOM_API_KEY: 'ai_speech_custom_api_key',
  CUSTOM_PROVIDER_CONFIG: 'ai_speech_custom_provider_config',
  PREFERRED_VOICE: 'ai_speech_preferred_voice',
};

export class DemoStore {
  // --- Authentication ---
  static isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
  }

  static login(email: string = 'user@example.com', role: 'parent' | 'specialist' | 'admin' = 'parent'): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    window.dispatchEvent(new Event('auth-changed'));
  }

  static logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
    window.dispatchEvent(new Event('auth-changed'));
  }

  static getUserEmail(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(STORAGE_KEYS.USER_EMAIL) || 'parent@aispeech.com';
  }

  // --- API Key Status ---
  static hasActiveApiKey(): boolean {
    if (typeof window === 'undefined') return false;
    const customKey = localStorage.getItem(STORAGE_KEYS.CUSTOM_API_KEY);
    if (customKey && customKey.trim().length > 5) return true;
    
    // Check environment key
    const envGemini = process.env.NEXT_PUBLIC_APP_NAME ? process.env.GEMINI_API_KEY : undefined;
    const envOpenAI = process.env.OPENAI_API_KEY;
    if ((envGemini && envGemini.length > 5 && !envGemini.includes('your-')) ||
        (envOpenAI && envOpenAI.length > 5 && !envOpenAI.includes('your-'))) {
      return true;
    }
    return false;
  }

  static getCustomApiKey(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(STORAGE_KEYS.CUSTOM_API_KEY) || '';
  }

  static setCustomApiKey(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CUSTOM_API_KEY, key.trim());
    window.dispatchEvent(new Event('api-key-changed'));
  }

  static getCustomProviderConfig(): { provider: string; baseUrl?: string; modelName?: string; apiKey?: string } {
    if (typeof window === 'undefined') return { provider: 'gemini' };
    const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_PROVIDER_CONFIG);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return { provider: 'gemini' };
  }

  static setCustomProviderConfig(config: { provider: string; baseUrl?: string; modelName?: string; apiKey?: string }): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PROVIDER_CONFIG, JSON.stringify(config));
    if (config.apiKey) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_API_KEY, config.apiKey.trim());
    }
    window.dispatchEvent(new Event('api-key-changed'));
  }

  // --- Voice Preferences ---
  static getPreferredVoice(): { id: string; nameAr: string; gender: 'female' | 'male' } {
    if (typeof window === 'undefined') return { id: 'salma', nameAr: 'سلمى (أخصائية دافئة للأطفال)', gender: 'female' };
    const stored = localStorage.getItem(STORAGE_KEYS.PREFERRED_VOICE);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return { id: 'salma', nameAr: 'سلمى (أخصائية دافئة للأطفال)', gender: 'female' };
  }

  static setPreferredVoice(voice: { id: string; nameAr: string; gender: 'female' | 'male' }): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PREFERRED_VOICE, JSON.stringify(voice));
    window.dispatchEvent(new Event('voice-changed'));
  }

  // --- Children Management ---
  static getChildren(): Child[] {
    if (typeof window === 'undefined') return DEMO_CHILDREN;
    const stored = localStorage.getItem(STORAGE_KEYS.CHILDREN);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(DEMO_CHILDREN));
      return DEMO_CHILDREN;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEMO_CHILDREN;
    }
  }

  static getActiveChild(): Child {
    const children = this.getChildren();
    if (typeof window === 'undefined') return children[0];
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_CHILD_ID);
    const found = children.find(c => c.id === activeId);
    return found || children[0];
  }

  static setActiveChildId(id: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CHILD_ID, id);
    window.dispatchEvent(new Event('child-changed'));
  }

  static addChild(newChild: Omit<Child, 'id' | 'created_at' | 'updated_at'>): Child {
    const children = this.getChildren();
    const created: Child = {
      ...newChild,
      id: `child-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [...children, created];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_CHILD_ID, created.id);
      window.dispatchEvent(new Event('child-changed'));
    }
    return created;
  }

  // --- Sessions & Results ---
  static getSessionResults(childId?: string): SessionResult[] {
    if (typeof window === 'undefined') return DEMO_SESSION_RESULTS;
    const stored = localStorage.getItem(STORAGE_KEYS.SESSION_RESULTS);
    let results: SessionResult[] = DEMO_SESSION_RESULTS;
    if (stored) {
      try {
        results = JSON.parse(stored);
      } catch {
        results = DEMO_SESSION_RESULTS;
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.SESSION_RESULTS, JSON.stringify(DEMO_SESSION_RESULTS));
    }
    if (childId) {
      return results.filter(r => r.child_id === childId);
    }
    return results;
  }

  static addSessionResult(result: Omit<SessionResult, 'id' | 'completed_at'>): SessionResult {
    const results = this.getSessionResults();
    const created: SessionResult = {
      ...result,
      id: `res-${Date.now()}`,
      completed_at: new Date().toISOString(),
    };
    const updated = [created, ...results];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SESSION_RESULTS, JSON.stringify(updated));
      window.dispatchEvent(new Event('session-completed'));
    }
    return created;
  }

  static getGoals(childId?: string): ChildGoal[] {
    if (typeof window === 'undefined') return DEMO_GOALS;
    const stored = localStorage.getItem(STORAGE_KEYS.GOALS);
    let goals: ChildGoal[] = DEMO_GOALS;
    if (stored) {
      try {
        goals = JSON.parse(stored);
      } catch {
        goals = DEMO_GOALS;
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(DEMO_GOALS));
    }
    if (childId) {
      return goals.filter(g => g.child_id === childId);
    }
    return goals;
  }

  static getConsultationMessages(): ConsultationMessage[] {
    if (typeof window === 'undefined') return DEMO_CONSULTATION_MESSAGES;
    const stored = localStorage.getItem(STORAGE_KEYS.CONSULTATION);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.CONSULTATION, JSON.stringify(DEMO_CONSULTATION_MESSAGES));
      return DEMO_CONSULTATION_MESSAGES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEMO_CONSULTATION_MESSAGES;
    }
  }

  static addConsultationMessage(msg: Omit<ConsultationMessage, 'id' | 'timestamp'>): ConsultationMessage {
    const messages = this.getConsultationMessages();
    const created: ConsultationMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: 'الآن',
    };
    const updated = [...messages, created];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CONSULTATION, JSON.stringify(updated));
    }
    return created;
  }

  static getSessions(): Session[] {
    if (typeof window === 'undefined') return PREBUILT_SESSIONS;
    const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!stored) return PREBUILT_SESSIONS;
    try {
      const custom: Session[] = JSON.parse(stored);
      return [...PREBUILT_SESSIONS, ...custom];
    } catch {
      return PREBUILT_SESSIONS;
    }
  }

  static getSessionById(id: string): Session | undefined {
    return this.getSessions().find(s => s.id === id);
  }

  static addGeneratedSession(session: Session): void {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    let custom: Session[] = [];
    if (stored) {
      try {
        custom = JSON.parse(stored);
      } catch {
        custom = [];
      }
    }
    custom.unshift(session);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(custom));
  }

  static getUserRole(): 'parent' | 'specialist' | 'admin' {
    if (typeof window === 'undefined') return 'parent';
    return (localStorage.getItem(STORAGE_KEYS.USER_ROLE) as 'parent' | 'specialist' | 'admin') || 'parent';
  }

  static setUserRole(role: 'parent' | 'specialist' | 'admin'): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    window.dispatchEvent(new Event('role-changed'));
  }
}
