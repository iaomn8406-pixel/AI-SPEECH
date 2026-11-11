# PROJECT KNOWLEDGE BASE

## AI Speech, Learning & Child Development Platform

**Document type:** Master Project Context / Agent Handover\
**Version:** 1.0\
**Last updated:** 11 November 2026\
**Purpose:** Give any new AI coding agent, product agent, designer, or
technical contributor enough context to understand the product, its
requirements, decisions, constraints, and current unknowns without
requiring the founder to explain the project again.

------------------------------------------------------------------------

# 1. How to use this document

This document is the project's central reference. Any agent receiving it
must:

1.  Read the entire document before proposing changes or writing code.
2.  Treat requirements marked **Confirmed direction** as agreed product
    direction unless the owner changes them.
3.  Treat items marked **Proposed / needs validation** as
    recommendations, not implemented facts.
4.  Never claim a feature is implemented, tested, deployed, or connected
    unless the repository, database, deployment, or test evidence
    confirms it.
5.  Inspect the existing codebase and database before changing
    architecture. Preserve working functionality.
6.  Update this document when an important decision, implementation,
    schema, integration, or limitation changes.
7.  When handing work to another agent, report: what was inspected, what
    changed, files touched, migrations created, tests run, known
    defects, and exact next steps.

**Important status rule:** This document describes the intended product
and architecture. It does not prove that any feature has already been
built. The actual implementation status must be verified from the
codebase and connected services.

## Status vocabulary

-   **Confirmed direction:** Explicitly requested or agreed as part of
    the product concept.
-   **Recommended:** A sound product/technical approach that still needs
    owner or specialist approval.
-   **Needs decision:** Missing information that must not be guessed.
-   **Implemented:** Use only after inspecting the actual project and
    verifying it.
-   **Deferred:** Intentionally postponed.

------------------------------------------------------------------------

# 2. Product overview

## 2.1 Product concept

A web-based AI-assisted learning, speech-support, and child-development
platform. It is intended to help parents and qualified specialists
support children through structured, personalized, repeatable learning
and practice sessions.

The platform focuses on: - Speech and language development. - Learning
difficulties, including dyslexia-related learning support. -
Communication and social interaction skills. - Emotional awareness and
self-regulation skills.

The child interacts with guided activities and an AI assistant through
text and voice, with visual support where useful. Parents can create
child profiles, consult the AI, review session history, and monitor
progress. Specialists may review or supervise plans and progress.
Administrators manage platform configuration, content, users, and AI
provider settings.

## 2.2 The product is not

-   Not an autonomous doctor, speech-language pathologist, psychologist,
    or diagnostician.
-   Not a replacement for an individualized assessment by a qualified
    professional.
-   Not a guarantee that every child will improve.
-   Not simply an open-ended chatbot. Its core value is structured
    goals, activities, session records, adaptation, and measurable
    outcomes.
-   Not an AI model running locally on the child's device. The intended
    experience is accessed through a browser; AI processing is provided
    by configured cloud APIs or hosted inference services.

## 2.3 Intended outcome

Help a child practice relevant skills through suitable, engaging,
individualized activities; help parents understand and support that
practice; and help specialists review evidence of performance over time.

Improvement must be measured from real session evidence. The system must
never invent progress, scores, diagnoses, or clinical conclusions.

## 2.4 Core product principle

**Every child has an individual profile. Every plan has explicit goals.
Every session has measurable activities. Every result is recorded.
Future activities may adapt to observed performance.**

------------------------------------------------------------------------

# 3. Users, roles, and permissions

## 3.1 Parent / guardian

Primary account owner for one or more children.

Expected capabilities: - Register and sign in. - Create and manage
multiple child profiles. - Provide relevant background and
observations. - Start a parent consultation chat. - Review suggested
plans and sessions. - Start or supervise child sessions. - View session
summaries, activity results, and progress history. - Manage consent,
recordings, and child data where supported. - Access
billing/subscription features if introduced.

A parent must only access children linked to their account, subject to
the platform's permission model.

## 3.2 Child

Uses a child-friendly experience, usually under a parent's account and
supervision.

Expected capabilities: - Enter an assigned session. - Interact with the
AI using supported voice/text controls. - Complete activities and
receive age-appropriate feedback. - View simple progress or rewards if
enabled.

The child interface must not expose API keys, provider configuration,
administrative functions, other children's data, or sensitive parent
notes.

## 3.3 Specialist

A qualified professional who may review or supervise children and plans,
depending on the final business model.

Potential capabilities: - View only assigned/authorized child
profiles. - Review parent-provided information and session history. -
Review, edit, approve, or reject suggested goals and plans. - Add
professional notes. - Review progress evidence and flag concerns. -
Provide human oversight where needed.

**Needs decision:** Whether specialists are internal staff, independent
paid professionals, invited collaborators, or all three. The final role
and assignment model must reflect the business model and local legal
requirements.

## 3.4 Administrator

Platform-level operations role.

Expected capabilities: - Manage users, roles, and access. - Manage
content libraries and session templates. - Configure AI providers and
model assignments. - Review system health, usage, errors, and costs. -
Manage platform settings and feature flags. - Audit administrative
actions.

Admin access must be tightly restricted and logged.

------------------------------------------------------------------------

# 4. Main user journeys

## 4.1 Parent onboarding

1.  Parent creates an account using email and password.
2.  Parent enters the application after successful registration.
3.  Parent creates a child profile.
4.  Parent provides relevant information and observations.
5.  Parent may start a consultation chat to clarify needs.
6.  The system summarizes known information, identifies missing details,
    and proposes an initial support plan.
7.  The parent reviews the plan. Where required, a specialist reviews it
    before use.
8.  The parent starts an appropriate session.

Authentication direction: - Email/password registration and login. -
Direct entry after successful registration. - A visible "Forgot
password?" entry may be shown but should remain disabled until a secure
recovery mechanism (such as verified email/OTP) is configured and
tested. - Do not implement a fake password-reset flow.

## 4.2 Parent consultation journey

1.  Parent opens a separate AI consultation chat, distinct from the
    child's live practice session.
2.  Parent describes concerns and may attach relevant images or files if
    the feature is enabled.
3.  The AI asks focused follow-up questions progressively; it should not
    overwhelm the parent with a long generic questionnaire.
4.  It distinguishes parent observations from verified assessment
    findings.
5.  It summarizes the information and identifies uncertainty or missing
    details.
6.  It proposes goals and a structured support plan.
7.  The plan is saved and linked to the selected child.
8.  The parent can review it and, where configured, request specialist
    review.
9.  Approved plan goals are used to select or generate appropriate
    sessions.

The AI must not produce a medical diagnosis. It may explain general
concepts and suggest that the parent seek professional assessment when
warranted.

## 4.3 Child session journey

1.  Child or parent selects an assigned session.
2.  The system loads the session goal, activities, instructions, assets,
    and evaluation criteria.
3.  The AI greets the child in an age-appropriate way and explains the
    activity.
4.  The child responds using voice, text, or supported interaction.
5.  The system captures the response and evaluates it using
    task-specific criteria.
6.  The AI provides constructive feedback and may simplify, repeat,
    scaffold, or increase difficulty based on evidence.
7.  If a visual explanation is useful and image generation is enabled,
    the AI can request an appropriate illustration and show it in the
    session.
8.  The session ends with a summary and recorded results.
9.  Parent/specialist dashboards update from the recorded evidence.

## 4.4 Returning parent journey

The parent should be able to ask questions about a child's prior
sessions and plan. The AI should retrieve relevant stored records,
summarize them accurately, and link or direct the parent to the relevant
session. It must not pretend to remember a session if no corresponding
record exists.

------------------------------------------------------------------------

# 5. Child profile and data model requirements

Each child profile should support the following fields, subject to data
minimization and consent.

## 5.1 Identity and basics

-   Display name.
-   Date of birth or age (prefer date of birth with age calculated where
    appropriate).
-   Gender only if genuinely needed for a defined product purpose.
-   Preferred language.
-   Preferred dialect/accent where relevant.
-   Parent/guardian relationship and account linkage.

## 5.2 Development and learning context

-   Parent-reported concerns.
-   Existing professional assessments, if voluntarily supplied.
-   Known support needs and relevant accommodations.
-   Communication preferences.
-   Current learning level, where assessed.
-   Parent observations.
-   Specialist observations, clearly distinguished from parent reports.
-   Goals and areas selected for practice.

Do not infer diagnoses from a child's behavior or a short conversation.

## 5.3 Skill areas that may be tracked

-   Receptive language / understanding.
-   Expressive language.
-   Vocabulary.
-   Articulation and pronunciation.
-   Sentence formation.
-   Listening and auditory comprehension.
-   Phonological awareness.
-   Letter-sound association.
-   Reading accuracy and fluency.
-   Spelling and writing.
-   Reading comprehension.
-   Social communication.
-   Turn-taking and conversational interaction.
-   Emotion recognition.
-   Emotional expression and self-regulation.

These are candidate skill dimensions, not a claim that every child needs
all of them.

## 5.4 History

-   Session records.
-   Activity-level attempts and outcomes.
-   Goal history.
-   Plan revisions.
-   Parent notes.
-   Specialist notes.
-   Uploaded files, if enabled.
-   Consent and data-retention settings.

## 5.5 Multiple children

One parent account must be able to manage more than one child. Every
query, file, session, plan, and report must be scoped to the correct
child and authorized account.

------------------------------------------------------------------------

# 6. Learning domains and content architecture

The content library should be structured and searchable, not a flat
collection of chatbot prompts.

Recommended hierarchy:

**Domain → Program / Skill Path → Level or Stage → Session → Activity**

Each session should contain: - Unique identifier. - Domain and skill
tags. - Target age/ability range, if validated. - Prerequisite skills
where relevant. - Learning objective(s). - Materials/assets. -
Step-by-step activity flow. - AI instructions and boundaries. - Expected
response types. - Evaluation rubric. - Adaptation rules. - Completion
criteria. - Parent/specialist notes. - Version and review metadata. -
Source/reviewer information where applicable.

## 6.1 Speech and language support

Possible content areas: - Receptive language: following instructions,
identifying objects/actions, understanding concepts. - Expressive
language: naming, describing, answering, requesting, telling. -
Vocabulary development. - Sentence construction and expansion. -
Listening and comprehension. - Articulation/pronunciation practice where
the system can evaluate reliably. - Conversation and turn-taking.

Do not score speech sounds or pronunciation with false precision.
Accuracy depends on language, dialect, microphone, noise, age, and model
capability. If confidence is low, record "unable to assess reliably"
rather than inventing a score.

## 6.2 Dyslexia-related learning support

Possible content areas: - Phonological awareness. - Rhyming and sound
identification. - Syllable awareness and segmentation. - Letter-sound
association. - Arabic letter forms and position-dependent shapes, if
Arabic is supported. - Diacritics/harakat and decoding, where
appropriate. - Word and sentence reading. - Spelling. - Reading
comprehension. - Structured repetition and multisensory practice.

The system must not diagnose dyslexia. It can support practice and
explain that a qualified assessment is needed for diagnosis.

## 6.3 Social communication and emotional skills

Possible content areas: - Recognizing emotions. - Naming and expressing
feelings. - Asking for help. - Turn-taking. - Starting and maintaining
interaction. - Understanding social situations through stories and
role-play. - Self-regulation strategies. - Recognizing boundaries and
safe/unsafe situations.

Avoid framing neurodivergent communication differences as misbehavior.
Activities should respect the child's dignity, autonomy, sensory needs,
and communication style.

## 6.4 Content volume and quality

An earlier planning target discussed a large starter library (for
example, 5 domains × 10 paths × 5 stages × 5 sessions = 1,250 sessions).
This is a **content-volume target, not proof of existing content** and
not a reason to generate repetitive or low-quality sessions.

Recommended approach: - Start with a smaller, professionally reviewed
MVP library. - Build reusable templates and evaluation rubrics. - Expand
in batches. - Track reviewer, version, and review date. - Test content
with intended age groups and accessibility needs. - Do not publish
AI-generated child-development content as clinically validated without
qualified review.

------------------------------------------------------------------------

# 7. AI system architecture and behavior

## 7.1 Central orchestration concept

The platform may use a central orchestration layer to route tasks to
different AI capabilities. It should not assume one model is best at
every task.

Potential task types: - Main session agent. - Parent consultation
chat. - General chat / historical Q&A. - Speech-to-text (STT). -
Text-to-speech (TTS). - Realtime voice conversation. - Image
understanding. - Image generation. - Video understanding or generation,
only if a clear use case and provider capability justify it.

A task router should choose a configured provider/model based on
capability, availability, latency, quality, language support, cost, and
fallback policy.

## 7.2 Model/provider configuration

Admin settings should allow authorized administrators to: - Add
supported AI providers. - Store provider API keys securely on the
server. - Validate keys through a safe test request. - Retrieve provider
model catalogs where APIs support it. - Use a maintained fallback
catalog when model discovery is unavailable. - Display supported
capabilities and limitations. - Assign a model separately to each task
type. - Select "Use Main API Key" only where the provider supports the
same credential for that task. - Configure fallback models and error
handling. - Monitor usage and estimated cost.

**Critical:** One API key does not guarantee that every modality or
model is available. Provider access, account permissions, region,
billing, model deprecation, rate limits, and separate endpoints may
apply. The UI must show unavailable capabilities clearly.

## 7.3 Secure key handling

-   Never expose provider API keys in browser code, HTML, client-side
    bundles, or browser storage.
-   Store keys server-side using encrypted secrets or an equivalent
    secure secret-management design.
-   Restrict access to authorized administrators.
-   Never return raw keys after saving; show masked values.
-   Do not write keys into application logs.
-   Rotate/revoke keys when compromised.
-   Validate provider responses and handle rate limits, timeouts, and
    outages.

## 7.4 Session agent behavior

The session agent should: - Know the active child profile only to the
extent needed for the session. - Know the active session objective and
activity instructions. - Use age-appropriate, simple language. - Keep
the child focused on the activity. - Ask one clear question or give one
instruction at a time when appropriate. - Wait for the child and allow
pauses. - Support interruption/barge-in when the chosen voice stack
supports it. - Stop speaking when interrupted, then listen and respond
to the new input. - Repeat or rephrase instructions when needed. -
Adjust difficulty based on recorded performance, not arbitrary
intuition. - Avoid shame, threats, pressure, or manipulative rewards. -
Avoid pretending to be a human or licensed professional. - End the
session safely and save results.

## 7.5 Visual support during sessions

If a child does not understand a concept, the agent may determine that a
visual explanation could help. If image generation is available: 1.
Create a safe, child-appropriate prompt based on the learning objective.
2. Generate the visual through a server-side provider. 3. Validate the
output and ensure it is appropriate. 4. Display it in the active
session. 5. Ask a simple follow-up question to check understanding. 6.
Record that a visual aid was used.

Image generation should not be triggered for every misunderstanding
automatically; the system should also try rephrasing, examples, and
simpler steps. Generated images must not contain unsafe, frightening,
sexual, violent, or otherwise inappropriate material.

## 7.6 Memory and retrieval

The platform should use structured records as its source of truth: -
Child profile. - Current plan and goals. - Session definitions. -
Session results. - Parent consultation summaries. - Specialist notes. -
Consent and permissions.

The AI must retrieve relevant records from the database when answering
historical questions. Do not rely on a model's conversational context as
the only memory store. Use access controls so one child's data cannot
leak into another child's conversation.

## 7.7 Evaluation and progress

Each activity should define what counts as a response, an attempt,
success, partial success, or not assessable. The system should preserve
raw evidence where appropriate and derive summaries transparently.

Potential measures: - Attempts. - Correct/partially correct/incorrect
outcomes. - Prompt level required. - Response latency, only if
meaningful and ethically justified. - Repetition count. - Skill-specific
rubric. - Completion status. - Confidence/assessment reliability.

Never convert weak model confidence into a definitive developmental
score. Show uncertainty and "not enough evidence" when appropriate.

------------------------------------------------------------------------

# 8. Voice and multimodal experience

## 8.1 Voice interaction

Desired experience: - Child can speak naturally. - AI can respond with
speech. - The child can interrupt the AI while it is speaking
(barge-in), if supported by the selected realtime stack. - The system
handles silence, background noise, and failed recognition gracefully. -
Parent can choose text mode or disable voice where appropriate.

Technical components may include: - Microphone permission and capture. -
Realtime transport or separate STT/LLM/TTS pipeline. - Voice activity
detection. - Turn detection. - Interruption handling. - Audio playback
cancellation. - Transcript storage according to consent and retention
settings.

Do not promise low-latency realtime voice until it has been implemented
and tested on target browsers and devices.

## 8.2 Text interaction

Text must remain available as an alternative to voice. The interface
should support clear instructions, readable typography, and
child-appropriate layout.

## 8.3 Image understanding and attachments

If parents can upload files or images: - Validate file type and size. -
Scan/secure uploads as appropriate. - Store in private storage. - Use
short-lived signed URLs where possible. - Apply strict child/account
authorization. - Avoid exposing private files publicly. - Explain what
the AI can and cannot infer from the image. - Do not treat a photo as a
substitute for a professional assessment.

## 8.4 Video

Video is optional and should be treated as a later-stage capability
unless there is a clear, validated use case. It introduces additional
privacy, storage, processing, and safeguarding requirements. Do not
build video capture or analysis merely because a provider offers it.

------------------------------------------------------------------------

# 9. Dashboards and application areas

## 9.1 Parent dashboard

Should provide: - Child selector for multiple children. - Child overview
and active goals. - Recommended/assigned sessions. - Recent session
history. - Progress trends based on actual recorded data. - Parent
consultation entry. - Plan overview and pending review status. -
Notifications and reminders, if enabled. - Data/consent controls.

## 9.2 Child experience

Should provide: - Simple, distraction-aware navigation. - Clear "start
session" action. - Friendly visual design. - Large readable controls. -
Voice and text options where available. - Immediate, constructive
feedback. - No access to sensitive parent/specialist/admin information.

## 9.3 Specialist dashboard

Potential features: - Assigned children list. - Profile and relevant
history. - Plans awaiting review. - Session evidence and progress. -
Goal editing and approval. - Professional notes. - Flags for sessions
needing attention.

Specialist access must be based on explicit assignment and
authorization.

## 9.4 Admin dashboard

Potential sections: - Users and roles. - Content/program management. -
Provider/API configuration. - Model/task routing. - Usage and cost
monitoring. - Errors and service health. - Consent and retention
configuration. - Audit logs. - Feature flags and system settings.

------------------------------------------------------------------------

# 10. Technical architecture direction

## 10.1 Intended deployment model

The intended product is a browser-based web application. The
child/parent accesses it online; AI processing is not intended to run
locally on the child's device.

Current intended technology direction discussed: - Frontend/web
deployment: Vercel. - Database/backend services: Supabase. - AI
inference: external provider APIs or hosted inference. - File storage:
private managed storage, potentially Supabase Storage or an equivalent
service.

These are intended choices, not verified current implementation facts.
The agent must inspect the repository and deployment before assuming the
stack is already configured.

## 10.2 High-level architecture

Browser application\
→ Authenticated backend/server routes\
→ Authorization and validation\
→ Database/storage\
→ AI orchestration service\
→ Provider-specific adapters\
→ AI providers / speech services / image services\
→ Persisted outputs and activity evidence\
→ Parent/specialist dashboards

All privileged operations and provider API calls should run server-side.

## 10.3 Database entities (conceptual)

A suitable schema may include: - users - user_roles - parent_profiles -
child_profiles - parent_child_links - specialist_profiles -
specialist_child_assignments - consent_records - programs -
skill_paths - stages - sessions - session_activities - session_assets -
child_plans - plan_goals - session_instances - activity_attempts -
session_summaries - parent_consultations - consultation_messages -
specialist_notes - provider_configs - model_catalog -
task_model_assignments - usage_events - notifications - audit_logs

This is a conceptual inventory, not a mandatory one-table-per-item
schema. Inspect the existing database before creating or renaming
tables. Use migrations, foreign keys, indexes, constraints, and Row
Level Security (RLS) where supported.

## 10.4 Data access rules

-   Parent can access only their linked children.
-   Child session can access only its active child/session context.
-   Specialist can access only assigned children and permitted fields.
-   Admin privileges are limited and audited.
-   Server-side service credentials must never be exposed to the client.
-   RLS policies must be tested, not merely enabled.
-   Every child-scoped record must have a secure ownership/authorization
    path.

## 10.5 Environment and deployment

-   Keep secrets in deployment environment variables or a secure secret
    manager.
-   Separate development, staging, and production environments where
    feasible.
-   Use database migrations and backups.
-   Configure production domains, HTTPS, and security headers.
-   Monitor logs without including sensitive child content
    unnecessarily.
-   Set usage limits and provider budget alerts.
-   Test deployment from a clean build.

------------------------------------------------------------------------

# 11. Privacy, child safety, and responsible use

This product processes information about children. Privacy and safety
are core requirements, not optional polish.

## 11.1 Consent and transparency

-   Obtain appropriate parent/guardian consent before collecting or
    processing child data.
-   Explain what data is collected, why, which providers process it, and
    how long it is retained.
-   Make voice recording and transcript behavior clear.
-   Provide deletion/export controls where required.
-   Obtain separate permission for optional features such as audio/video
    storage where appropriate.

## 11.2 Data minimization

-   Collect only information needed for a defined product purpose.
-   Avoid collecting sensitive details without a clear need.
-   Do not store raw audio/video by default unless there is a justified,
    consented feature.
-   Prefer structured outcomes and short summaries where raw media is
    unnecessary.

## 11.3 AI provider processing

-   Review each provider's data-processing terms, retention rules, and
    training-use policy.
-   Do not assume a free API tier is suitable for child data.
-   Do not send identifiable child data to external providers unless the
    data flow, contractual terms, and consent are appropriate.
-   Use pseudonymous identifiers and minimize prompt content where
    possible.

## 11.4 Safety behavior

The AI must: - Avoid diagnosis and unsupported clinical claims. - Avoid
humiliating, frightening, coercive, or shaming language. - Not encourage
secrecy from parents or trusted adults. - Not ask children for
unnecessary personal information. - Not provide dangerous
instructions. - Handle disclosures of immediate danger or abuse
according to a professionally reviewed safeguarding protocol and
applicable law. - Escalate to a parent/guardian or qualified
professional when the system cannot safely handle a concern. - Make
clear that a human professional is needed for clinical assessment.

## 11.5 Legal and professional review

Before public launch, obtain qualified advice on child privacy, consumer
protection, medical/health claims, professional practice, data
transfers, and applicable laws in every target market. The product's
exact regulatory classification depends on its claims and functions.

------------------------------------------------------------------------

# 12. UX and design principles

-   Modern, polished, trustworthy, and accessible.
-   Child-facing experience should be friendly and simple, not visually
    overwhelming.
-   Parent-facing experience should be clear, informative, and credible.
-   Specialist-facing experience should prioritize evidence and workflow
    efficiency.
-   Admin-facing experience should prioritize control, traceability, and
    safety.
-   Arabic-first support is a likely product requirement; confirm
    supported languages and dialects before implementation.
-   Support responsive desktop, tablet, and mobile layouts.
-   Provide keyboard accessibility and readable contrast.
-   Avoid excessive animation, distracting effects, and reward loops
    that pressure children.
-   Clearly distinguish AI-generated suggestions from
    specialist-approved plans.
-   Show loading, error, empty, permission-denied, and offline states
    properly.
-   Never ship a dashboard full of fake metrics or placeholder content
    presented as real.

------------------------------------------------------------------------

# 13. MVP strategy and scope control

The full vision is broad. Building every domain, realtime voice, image
generation, video, specialist workflows, and a huge content library at
once creates avoidable risk.

Recommended staged delivery:

## Phase 0 --- Discovery and technical audit

-   Inspect existing repository, branches, dependencies, environment,
    database, deployment, and current UI.
-   Produce a verified implementation inventory.
-   Identify security issues and broken flows.
-   Confirm target age range, languages, country/market, and specialist
    involvement.
-   Decide the first validated learning domain.

## Phase 1 --- Secure foundation

-   Auth and role model.
-   Parent account and multiple child profiles.
-   Database schema and RLS.
-   Basic parent dashboard.
-   Secure server-side AI provider configuration.
-   Logging, error handling, and consent baseline.

## Phase 2 --- One complete learning loop

-   One carefully selected skill program.
-   Professionally reviewed starter sessions.
-   Session runner.
-   Text-based AI interaction.
-   Structured activity results.
-   Session history and basic progress view.
-   Parent review.

## Phase 3 --- Voice

-   STT/TTS or realtime voice integration.
-   Interruption/barge-in if supported.
-   Browser/device testing.
-   Consent and retention controls.
-   Reliability and cost monitoring.

## Phase 4 --- Parent consultation and plan creation

-   Consultation chat.
-   Structured question flow.
-   Plan and goal generation.
-   Human review workflow.
-   Historical session Q&A.

## Phase 5 --- Visual support and additional domains

-   Image understanding/generation where justified.
-   Additional reviewed programs.
-   Specialist workflows.
-   More sophisticated progress analytics.

## Phase 6 --- Scale and commercial readiness

-   Billing/subscriptions if required.
-   Operational monitoring.
-   Load and security testing.
-   Provider fallback and budget controls.
-   Legal/privacy review.
-   Controlled pilot and outcomes evaluation.

The phases may be rearranged based on the actual repository and business
priorities. Do not implement all phases in one giant unreviewed code
change.

------------------------------------------------------------------------

# 14. Quality assurance and acceptance criteria

A feature is not complete merely because its screen exists.

Minimum acceptance checks: - Authentication works and access is
correctly restricted. - A parent can create and manage multiple
children. - Parent A cannot access Parent B's child data. - Specialist
cannot access unassigned children. - Child session cannot access another
child's context. - API keys never appear in client responses or browser
bundles. - Provider failure, timeout, rate limit, and invalid key states
are handled. - Session results are persisted and retrievable. - Progress
summaries are calculated from actual data. - Empty states and error
states are implemented. - Voice permissions and failure states are
handled where voice exists. - Uploaded files are private and
authorization-tested. - Consent and deletion behavior work as
described. - No placeholder analytics are presented as real. - Mobile
and desktop flows are tested. - Critical flows have automated tests
where practical.

For AI evaluation: - Test age-appropriate language. - Test
dialect/language recognition. - Test incorrect or unclear child
responses. - Test interruptions and silence. - Test hallucination
resistance on historical session questions. - Test unsafe or
out-of-scope requests. - Test that the system says "I can't assess this
reliably" when evidence is insufficient.

------------------------------------------------------------------------

# 15. Product and technical decisions register

  -------------------------------------------------------------------------
  Topic                   Current direction       Status
  ----------------------- ----------------------- -------------------------
  Product                 AI-assisted speech,     Confirmed direction
                          learning, and           
                          child-development       
                          support                 

  Access                  Browser-based web       Confirmed direction
                          application             

  Local AI on child's     Not intended            Confirmed direction
  device                                          

  Hosting                 Vercel discussed        Intended; verify actual
                                                  setup

  Database/backend        Supabase discussed      Intended; verify actual
                                                  setup

  AI processing           Cloud APIs / hosted     Confirmed direction
                          inference               

  Multiple children per   Required                Confirmed direction
  parent                                          

  Parent consultation     Separate from child     Confirmed direction
  chat                    session                 

  Structured sessions     Required                Confirmed direction

  Child voice interaction Desired                 Confirmed direction;
                                                  implementation/provider
                                                  TBD

  Barge-in                Desired                 Confirmed direction;
                                                  technical support must be
                                                  verified

  In-session generated    Desired when useful     Confirmed direction;
  visuals                                         provider TBD

  Provider/model          Separate task-level     Confirmed direction
  selection               assignments             

  One key for all         Not guaranteed          Confirmed constraint
  modalities                                      

  Specialist review       Intended as a           Needs business-model
                          safety/quality layer    decision

  Initial content count   1,250 discussed as an   Not validated; avoid
                          ambition                low-quality bulk
                                                  generation

  Password recovery       Disabled until secure   Confirmed direction
                          flow exists             

  Video                   Optional/later-stage    Recommended

  Clinical diagnosis      Not a platform function Confirmed boundary
  -------------------------------------------------------------------------

------------------------------------------------------------------------

# 16. Open questions that must be resolved

Agents must not silently invent answers to these questions. Record
answers here when the owner decides.

1.  What is the initial target age range?
2.  Which launch market/country is first?
3.  Which languages and dialects must be supported at launch (Egyptian
    Arabic, Modern Standard Arabic, English, etc.)?
4.  Which single learning domain should be the MVP focus?
5.  Will specialists be employed by the platform, independent partners,
    or invited by parents?
6.  Will specialist review be mandatory for some plans or optional?
7.  What is the exact role of the platform: home practice support,
    professional workflow software, or a hybrid?
8.  Which AI providers are approved for child-related data after
    privacy/contract review?
9.  Will raw audio be stored, or only transcripts and structured
    results?
10. What is the retention period for transcripts, files, and session
    records?
11. What pricing/subscription model is planned?
12. Is the current codebase already started? If yes, what repository and
    branch are authoritative?
13. Is Supabase already configured with production RLS and migrations?
14. Is Vercel already connected to the production project?
15. Which domain and brand identity are final?

------------------------------------------------------------------------

# 17. Instructions for any future AI agent

When you receive this file, follow this operating protocol:

## Before coding

1.  Read this document fully.
2.  Inspect the project files and current git state.
3.  Inspect package/dependency versions and build scripts.
4.  Inspect database schema, migrations, RLS policies, storage buckets,
    and environment variable names (never print secret values).
5.  Inspect existing routes, components, server actions/API routes, and
    integrations.
6.  Create a concise "Verified Current State" report separating working,
    partial, broken, and missing functionality.
7.  Identify the smallest safe next implementation step.

## While coding

-   Do not rebuild the project from scratch unless explicitly instructed
    and justified.
-   Do not replace the existing stack without approval.
-   Do not delete or rewrite working features to simplify your task.
-   Do not hardcode API keys or secrets.
-   Do not place privileged provider calls in frontend code.
-   Do not create fake data that looks like real user data.
-   Do not create placeholder buttons that appear functional.
-   Do not fabricate model capabilities or provider support.
-   Do not claim clinical validity.
-   Use migrations for schema changes.
-   Add or update tests for critical behavior.
-   Keep UI, data model, and authorization consistent.
-   Ask one focused question when a decision blocks safe progress;
    otherwise proceed with clearly stated assumptions.

## After coding

Return a handover report with: 1. Summary of completed work. 2. Exact
files created/changed. 3. Database migrations and policies changed. 4.
Environment variables required (names only; never values). 5.
Integrations configured and their verified capabilities. 6.
Tests/build/lint run and results. 7. Known issues and risks. 8. What
remains incomplete. 9. Exact next recommended task. 10. Updates required
to this Knowledge Base.

## Source-of-truth hierarchy

When information conflicts: 1. The owner's latest explicit instruction.
2. Verified current code, database, and deployment state for what is
implemented. 3. This Knowledge Base for intended product direction. 4.
Agent assumptions (lowest priority).

Do not mistake a product requirement for an implemented feature. Do not
mistake a mockup for a working integration. Do not mistake a generated
AI response for a validated assessment.

------------------------------------------------------------------------

# 18. Change log

-   **v1.0 --- 11 November 2026:** Initial master knowledge base
    assembled from the product concept, feature requirements,
    architecture direction, and decisions discussed so far. No
    implementation status was assumed.

------------------------------------------------------------------------

# 19. Short project brief (for quick agent orientation)

We are building a browser-based AI-assisted platform for children's
speech/language practice, learning support (including dyslexia-related
skills), and social/emotional skill development. Parents create accounts
and manage multiple child profiles. Each child has an individualized
profile, goals, structured sessions, activity records, and progress
history. Parents have a separate consultation chat that asks follow-up
questions and can create a structured plan linked to a child. Children
use a simple session experience with text and, when configured, voice
interaction. The AI should support interruption/barge-in where the
selected realtime stack allows it, adapt activities based on recorded
evidence, and optionally generate visual aids when useful. Specialists
may review plans and progress; admins manage content, roles, providers,
and model routing. The intended deployment is a web app using Vercel and
Supabase, with AI processing through secure server-side cloud APIs or
hosted inference. Child privacy, consent, access control, specialist
oversight, honest evaluation, and no unsupported diagnosis or guaranteed
outcomes are foundational requirements. Always inspect the actual
codebase before claiming anything is implemented.
