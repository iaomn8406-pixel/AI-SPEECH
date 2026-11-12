'use client';

import { 
  Child, 
  SessionResult, 
  ChildGoal, 
  ConsultationMessage, 
  Session, 
  RegisteredAccount, 
  VideoCategory, 
  EducationalVideo, 
  SpecialistPost 
} from '@/types/models';
import { 
  DEMO_CHILDREN, 
  DEMO_SESSION_RESULTS, 
  DEMO_GOALS, 
  DEMO_CONSULTATION_MESSAGES,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASS,
  DEMO_REGISTERED_ACCOUNTS,
  DEMO_VIDEO_CATEGORIES,
  DEMO_EDUCATIONAL_VIDEOS,
  DEMO_SPECIALIST_POSTS
} from './sample-data';
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
  REGISTERED_ACCOUNTS: 'ai_speech_registered_accounts',
  EDUCATIONAL_VIDEOS: 'ai_speech_educational_videos',
  VIDEO_CATEGORIES: 'ai_speech_video_categories',
  SPECIALIST_POSTS: 'ai_speech_specialist_posts',
  FOLLOWED_SPECIALISTS: 'ai_speech_followed_specialists',
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

  static isSuperAdmin(): boolean {
    if (typeof window === 'undefined') return false;
    const email = (this.getUserEmail() || '').trim().toLowerCase();
    return email === SUPER_ADMIN_EMAIL.toLowerCase();
  }

  // --- Registered Accounts & Admin Control ---
  static getRegisteredAccounts(): RegisteredAccount[] {
    if (typeof window === 'undefined') return DEMO_REGISTERED_ACCOUNTS;
    const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_ACCOUNTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_ACCOUNTS, JSON.stringify(DEMO_REGISTERED_ACCOUNTS));
      return DEMO_REGISTERED_ACCOUNTS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEMO_REGISTERED_ACCOUNTS;
    }
  }

  static addRegisteredAccount(account: RegisteredAccount): void {
    if (typeof window === 'undefined') return;
    const accounts = this.getRegisteredAccounts();
    const updated = [account, ...accounts.filter(a => a.email.toLowerCase() !== account.email.toLowerCase())];
    localStorage.setItem(STORAGE_KEYS.REGISTERED_ACCOUNTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('accounts-updated'));
  }

  static verifyPromoCode(code: string): { valid: boolean; specialist?: RegisteredAccount } {
    if (!code || !code.trim()) return { valid: false };
    const clean = code.trim().toUpperCase();
    const accounts = this.getRegisteredAccounts();
    const found = accounts.find(a => a.role === 'specialist' && a.promo_code?.toUpperCase() === clean);
    if (found) {
      return { valid: true, specialist: found };
    }
    return { valid: false };
  }

  // --- Educational Videos Library ---
  static getVideoCategories(): VideoCategory[] {
    if (typeof window === 'undefined') return DEMO_VIDEO_CATEGORIES;
    const stored = localStorage.getItem(STORAGE_KEYS.VIDEO_CATEGORIES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.VIDEO_CATEGORIES, JSON.stringify(DEMO_VIDEO_CATEGORIES));
      return DEMO_VIDEO_CATEGORIES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEMO_VIDEO_CATEGORIES;
    }
  }

  static addVideoCategory(cat: VideoCategory): void {
    if (typeof window === 'undefined') return;
    const cats = this.getVideoCategories();
    const updated = [...cats, cat];
    localStorage.setItem(STORAGE_KEYS.VIDEO_CATEGORIES, JSON.stringify(updated));
    window.dispatchEvent(new Event('videos-updated'));
  }

  static getEducationalVideos(categoryId?: string): EducationalVideo[] {
    if (typeof window === 'undefined') return DEMO_EDUCATIONAL_VIDEOS;
    const stored = localStorage.getItem(STORAGE_KEYS.EDUCATIONAL_VIDEOS);
    let list: EducationalVideo[] = DEMO_EDUCATIONAL_VIDEOS;
    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch {
        list = DEMO_EDUCATIONAL_VIDEOS;
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.EDUCATIONAL_VIDEOS, JSON.stringify(DEMO_EDUCATIONAL_VIDEOS));
    }
    if (categoryId && categoryId !== 'all') {
      return list.filter(v => v.category_id === categoryId);
    }
    return list;
  }

  static addEducationalVideo(videoData: Omit<EducationalVideo, 'id' | 'views_count' | 'likes_count' | 'created_at'>): EducationalVideo {
    const list = this.getEducationalVideos();
    const newVideo: EducationalVideo = {
      ...videoData,
      id: `vid-${Date.now()}`,
      views_count: 1,
      likes_count: 0,
      created_at: new Date().toISOString(),
    };
    const updated = [newVideo, ...list];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.EDUCATIONAL_VIDEOS, JSON.stringify(updated));
      window.dispatchEvent(new Event('videos-updated'));
    }
    return newVideo;
  }

  // --- Specialist Posts & Feed ---
  static getSpecialistPosts(): SpecialistPost[] {
    if (typeof window === 'undefined') return DEMO_SPECIALIST_POSTS;
    const stored = localStorage.getItem(STORAGE_KEYS.SPECIALIST_POSTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.SPECIALIST_POSTS, JSON.stringify(DEMO_SPECIALIST_POSTS));
      return DEMO_SPECIALIST_POSTS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEMO_SPECIALIST_POSTS;
    }
  }

  static addSpecialistPost(postData: Omit<SpecialistPost, 'id' | 'likes_count' | 'created_at'>): SpecialistPost {
    const posts = this.getSpecialistPosts();
    const newPost: SpecialistPost = {
      ...postData,
      id: `post-${Date.now()}`,
      likes_count: 0,
      created_at: 'الآن',
    };
    const updated = [newPost, ...posts];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SPECIALIST_POSTS, JSON.stringify(updated));
      window.dispatchEvent(new Event('posts-updated'));
    }
    return newPost;
  }

  // --- Following Specialists ---
  static getFollowedSpecialistIds(): string[] {
    if (typeof window === 'undefined') return ['acc-spec-aml'];
    const stored = localStorage.getItem(STORAGE_KEYS.FOLLOWED_SPECIALISTS);
    if (!stored) return ['acc-spec-aml'];
    try {
      return JSON.parse(stored);
    } catch {
      return ['acc-spec-aml'];
    }
  }

  static toggleFollowSpecialist(specialistId: string): boolean {
    if (typeof window === 'undefined') return false;
    const followed = this.getFollowedSpecialistIds();
    let updated: string[];
    let isNowFollowing: boolean;
    if (followed.includes(specialistId)) {
      updated = followed.filter(id => id !== specialistId);
      isNowFollowing = false;
    } else {
      updated = [...followed, specialistId];
      isNowFollowing = true;
    }
    localStorage.setItem(STORAGE_KEYS.FOLLOWED_SPECIALISTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('follow-changed'));
    return isNowFollowing;
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
