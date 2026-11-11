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
};

export class DemoStore {
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
