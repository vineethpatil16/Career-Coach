export const DATABASE_CONFIG = {
    tables: {
      USERS: 'users',
      USER_PROFILES: 'user_profiles',
      IKIGAI: 'ikigai',
      PHASE_PROGRESS: 'phase_progress',
      PROJECTS: 'projects',
      TARGET_COMPANIES: 'target_companies',
      SKILL_ASSESSMENTS: 'skill_assessments',
      SOCIAL_POSTS: 'social_posts',
      CASE_STUDIES: 'case_studies',
      JOB_APPLICATIONS: 'job_applications',
      JOURNAL_ENTRIES: 'journal_entries',
      MESSAGE_TEMPLATES: 'message_templates',
    },
    
    policies: {
      RLS_ENABLED: true,
      USER_ISOLATION: true,
    }
  }