-- =========================================================================
-- منصة نطق وتأهيل الأطفال بالذكاء الاصطناعي - AI Child Speech Platform
-- Supabase PostgreSQL Database Schema
-- =========================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'specialist', 'admin')),
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Children Table
CREATE TABLE IF NOT EXISTS public.children (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    avatar TEXT NOT NULL DEFAULT 'bear',
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
    primary_language TEXT NOT NULL DEFAULT 'العربية',
    dialect TEXT NOT NULL DEFAULT 'اللهجة المصرية',
    primary_issue TEXT NOT NULL,
    additional_issues TEXT[] DEFAULT '{}',
    description TEXT,
    speech_level INT DEFAULT 1 CHECK (speech_level BETWEEN 1 AND 5),
    comprehension_level INT DEFAULT 1 CHECK (comprehension_level BETWEEN 1 AND 5),
    communication_level INT DEFAULT 1 CHECK (communication_level BETWEEN 1 AND 5),
    pronunciation_level INT DEFAULT 1 CHECK (pronunciation_level BETWEEN 1 AND 5),
    reading_level INT DEFAULT 1 CHECK (reading_level BETWEEN 1 AND 5),
    writing_level INT DEFAULT 1 CHECK (writing_level BETWEEN 1 AND 5),
    social_level INT DEFAULT 1 CHECK (social_level BETWEEN 1 AND 5),
    parent_notes TEXT,
    specialist_notes TEXT,
    is_demo BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Specialists Table
CREATE TABLE IF NOT EXISTS public.specialists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    specialization TEXT NOT NULL,
    license_number TEXT,
    bio TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Specialist Assignments
CREATE TABLE IF NOT EXISTS public.specialist_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    specialist_id UUID NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(specialist_id, child_id)
);

-- 5. Specializations Table
CREATE TABLE IF NOT EXISTS public.learning_specializations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- 6. Learning Paths Table
CREATE TABLE IF NOT EXISTS public.learning_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    specialization_id UUID NOT NULL REFERENCES public.learning_specializations(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    target_age_min INT NOT NULL DEFAULT 3,
    target_age_max INT NOT NULL DEFAULT 12,
    level TEXT NOT NULL DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    display_order INT DEFAULT 0,
    UNIQUE(specialization_id, slug)
);

-- 7. Learning Stages Table
CREATE TABLE IF NOT EXISTS public.learning_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path_id UUID NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
    stage_number INT NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    goals_ar TEXT[] DEFAULT '{}',
    UNIQUE(path_id, stage_number)
);

-- 8. Sessions Table
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stage_id UUID REFERENCES public.learning_stages(id) ON DELETE CASCADE,
    specialization_slug TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 15,
    difficulty TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    target_age_range TEXT NOT NULL DEFAULT '3-6 سنوات',
    target_skills_ar TEXT[] DEFAULT '{}',
    prerequisites_ar TEXT[] DEFAULT '{}',
    order_number INT DEFAULT 1,
    is_published BOOLEAN DEFAULT true,
    is_generated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Session Activities Table
CREATE TABLE IF NOT EXISTS public.session_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
    order_number INT NOT NULL,
    type TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    instruction_ar TEXT NOT NULL,
    prompt_content TEXT NOT NULL,
    visual_cue TEXT,
    audio_sample_url TEXT,
    expected_speech_target TEXT,
    options JSONB,
    hint_ar TEXT,
    success_feedback_ar TEXT NOT NULL,
    encouragement_feedback_ar TEXT NOT NULL
);

-- 10. Child Session Results Table
CREATE TABLE IF NOT EXISTS public.child_session_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
    session_title_ar TEXT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    score INT NOT NULL DEFAULT 0,
    max_score INT NOT NULL DEFAULT 100,
    accuracy_percentage INT NOT NULL DEFAULT 0,
    attempts_count INT NOT NULL DEFAULT 1,
    duration_seconds INT NOT NULL DEFAULT 0,
    skills_practiced TEXT[] DEFAULT '{}',
    notes TEXT,
    ai_summary TEXT,
    pronunciation_accuracy INT
);

-- 11. Child Goals Table
CREATE TABLE IF NOT EXISTS public.child_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    title_ar TEXT NOT NULL,
    category TEXT NOT NULL,
    target_date DATE,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('pending', 'in_progress', 'completed')),
    progress_percentage INT DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    approved_by_specialist BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Consultation Conversations Table
CREATE TABLE IF NOT EXISTS public.consultation_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'استشارة جديدة',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. Consultation Messages Table
CREATE TABLE IF NOT EXISTS public.consultation_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.consultation_conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    media_url TEXT,
    suggested_action JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. Child Memory Table (AI Orchestration Context)
CREATE TABLE IF NOT EXISTS public.child_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    memory_type TEXT NOT NULL CHECK (memory_type IN ('profile', 'assessment', 'plan', 'session', 'progress')),
    summary TEXT NOT NULL,
    details JSONB DEFAULT '{}',
    importance INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. AI Providers & Keys Config Table
CREATE TABLE IF NOT EXISTS public.ai_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    provider_type TEXT NOT NULL CHECK (provider_type IN ('gemini', 'openai', 'anthropic', 'custom')),
    is_active BOOLEAN DEFAULT true,
    encrypted_key TEXT,
    masked_key TEXT,
    base_url TEXT,
    is_default BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. Task Model Mappings
CREATE TABLE IF NOT EXISTS public.task_model_mappings (
    task_type TEXT PRIMARY KEY,
    title_ar TEXT NOT NULL,
    selected_provider TEXT NOT NULL,
    selected_model TEXT NOT NULL,
    use_main_key BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. Usage & Token Logs Table
CREATE TABLE IF NOT EXISTS public.usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    child_id UUID REFERENCES public.children(id) ON DELETE SET NULL,
    task_type TEXT NOT NULL,
    provider TEXT NOT NULL,
    model TEXT NOT NULL,
    tokens_used INT DEFAULT 0,
    duration_ms INT DEFAULT 0,
    cost_estimate NUMERIC(10, 6) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- Indexes for High Performance
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_children_parent ON public.children(parent_id);
CREATE INDEX IF NOT EXISTS idx_sessions_stage ON public.sessions(stage_id);
CREATE INDEX IF NOT EXISTS idx_session_activities_session ON public.session_activities(session_id);
CREATE INDEX IF NOT EXISTS idx_child_results_child ON public.child_session_results(child_id);
CREATE INDEX IF NOT EXISTS idx_child_memory_child ON public.child_memory(child_id);
CREATE INDEX IF NOT EXISTS idx_consultation_messages_conversation ON public.consultation_messages(conversation_id);

-- =========================================================================
-- Row Level Security (RLS) Policies
-- =========================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialist_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_session_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_memory ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Users can view and update their own profile" ON public.profiles
    FOR ALL USING (auth.uid() = id);

-- 2. Children Policies
CREATE POLICY "Parents can manage their own children" ON public.children
    FOR ALL USING (auth.uid() = parent_id);

CREATE POLICY "Specialists can view assigned children" ON public.children
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.specialist_assignments sa
            JOIN public.specialists s ON s.id = sa.specialist_id
            WHERE sa.child_id = children.id AND s.profile_id = auth.uid()
        )
    );

-- 3. Public Curriculums (Read-Only for authenticated users)
CREATE POLICY "Everyone can view published specializations" ON public.learning_specializations
    FOR SELECT USING (true);

CREATE POLICY "Everyone can view published paths" ON public.learning_paths
    FOR SELECT USING (true);

CREATE POLICY "Everyone can view published stages" ON public.learning_stages
    FOR SELECT USING (true);

CREATE POLICY "Everyone can view published sessions" ON public.sessions
    FOR SELECT USING (is_published = true);

CREATE POLICY "Everyone can view session activities" ON public.session_activities
    FOR SELECT USING (true);

-- 4. Session Results Policies
CREATE POLICY "Parents can view their children results" ON public.child_session_results
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.children c
            WHERE c.id = child_session_results.child_id AND c.parent_id = auth.uid()
        )
    );

-- 5. Consultation Conversations Policies
CREATE POLICY "Parents can manage their own consultations" ON public.consultation_conversations
    FOR ALL USING (auth.uid() = parent_id);

CREATE POLICY "Parents can manage their consultation messages" ON public.consultation_messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.consultation_conversations cc
            WHERE cc.id = consultation_messages.conversation_id AND cc.parent_id = auth.uid()
        )
    );

-- 6. Child Memory Policies
CREATE POLICY "Parents can access memory of their children" ON public.child_memory
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.children c
            WHERE c.id = child_memory.child_id AND c.parent_id = auth.uid()
        )
    );
