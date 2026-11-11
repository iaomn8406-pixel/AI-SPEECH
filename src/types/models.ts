export type UserRole = 'parent' | 'specialist' | 'admin';

export type SpecializationSlug = 
  | 'speech-language' 
  | 'articulation' 
  | 'dyslexia-reading' 
  | 'social-communication' 
  | 'behavioral-emotional';

export type ActivityType = 
  | 'listen_repeat'
  | 'identify_image'
  | 'choose_correct'
  | 'match_word'
  | 'complete_sentence'
  | 'storytelling'
  | 'picture_description'
  | 'pronunciation_practice'
  | 'interactive_question'
  | 'social_scenario'
  | 'phonemic_awareness';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Child {
  id: string;
  parent_id: string;
  name: string;
  avatar: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  primary_language: string;
  dialect: string;
  primary_issue: string;
  additional_issues: string[];
  description: string;
  speech_level: number; // 1 to 5
  comprehension_level: number; // 1 to 5
  communication_level: number; // 1 to 5
  pronunciation_level: number; // 1 to 5
  reading_level: number; // 1 to 5
  writing_level: number; // 1 to 5
  social_level: number; // 1 to 5
  parent_notes?: string;
  specialist_notes?: string;
  is_demo?: boolean;
  created_at: string;
  updated_at: string;
}

export interface LearningSpecialization {
  id: string;
  slug: SpecializationSlug;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
  color: string;
  paths_count?: number;
  display_order: number;
}

export interface LearningPath {
  id: string;
  specialization_id: string;
  specialization_slug: SpecializationSlug;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  target_age_min: number;
  target_age_max: number;
  level: DifficultyLevel;
  display_order: number;
  stages_count?: number;
}

export interface LearningStage {
  id: string;
  path_id: string;
  stage_number: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  goals_ar: string[];
  sessions_count?: number;
}

export interface SessionActivity {
  id: string;
  session_id: string;
  order_number: number;
  type: ActivityType;
  title_ar: string;
  instruction_ar: string;
  prompt_content: string; // The word, letter, question, or scenario
  visual_cue?: string; // SVG data or image URL
  audio_sample_url?: string; // Sample speech audio or text to synthesize
  expected_speech_target?: string; // Exact word or phrase for pronunciation comparison
  options?: Array<{
    id: string;
    text_ar: string;
    image_url?: string;
    is_correct: boolean;
  }>;
  hint_ar?: string;
  success_feedback_ar: string;
  encouragement_feedback_ar: string;
}

export interface Session {
  id: string;
  stage_id: string;
  specialization_slug: SpecializationSlug;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  duration_minutes: number;
  difficulty: DifficultyLevel;
  target_age_range: string;
  target_skills_ar: string[];
  prerequisites_ar?: string[];
  order_number: number;
  activities: SessionActivity[];
  is_published: boolean;
  is_generated?: boolean;
}

export interface SessionResult {
  id: string;
  child_id: string;
  session_id: string;
  session_title_ar: string;
  completed_at: string;
  score: number;
  max_score: number;
  accuracy_percentage: number;
  attempts_count: number;
  duration_seconds: number;
  skills_practiced: string[];
  notes?: string;
  ai_summary?: string;
  pronunciation_accuracy?: number;
}

export interface ChildGoal {
  id: string;
  child_id: string;
  title_ar: string;
  category: string;
  target_date?: string;
  status: 'pending' | 'in_progress' | 'completed';
  progress_percentage: number;
  approved_by_specialist: boolean;
  created_at: string;
}

export interface AIProviderConfig {
  id: string;
  name: string;
  provider_type: 'gemini' | 'openai' | 'anthropic' | 'custom';
  is_active: boolean;
  has_api_key: boolean;
  masked_key?: string;
  base_url?: string;
  is_default: boolean;
  models: AIModelInfo[];
}

export interface AIModelInfo {
  id: string;
  name: string;
  provider: 'gemini' | 'openai' | 'anthropic' | 'custom';
  capabilities: {
    text: boolean;
    speech_to_text: boolean;
    text_to_speech: boolean;
    realtime_voice: boolean;
    image_generation: boolean;
    image_understanding: boolean;
  };
  context_window?: number;
  cost_per_million_input?: number;
  cost_per_million_output?: number;
  is_recommended?: boolean;
  recommendation_reason?: string;
}

export type TaskType = 
  | 'main_agent'
  | 'text_chat'
  | 'speech_recognition'
  | 'text_to_speech'
  | 'realtime_voice'
  | 'image_generation'
  | 'image_understanding'
  | 'embeddings';

export interface TaskModelMapping {
  task_type: TaskType;
  title_ar: string;
  description_ar: string;
  selected_provider: string;
  selected_model: string;
  use_main_key: boolean;
  custom_key_id?: string;
}

export interface ConsultationMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  media_url?: string;
  suggested_action?: {
    type: 'view_session' | 'create_plan' | 'view_child' | 'retry';
    label_ar: string;
    target_id?: string;
    payload?: Record<string, unknown>;
  };
}

export interface ChildMemoryItem {
  id: string;
  child_id: string;
  memory_type: 'profile' | 'assessment' | 'plan' | 'session' | 'progress';
  summary: string;
  details: Record<string, unknown>;
  created_at: string;
  importance: number;
}
