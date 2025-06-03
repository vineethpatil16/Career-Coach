// src/config/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Helper functions for common operations
export const authHelpers = {
  // Sign up new user
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData, // This will be stored in raw_user_meta_data
      },
    })
    return { data, error }
  },

  // Sign in user
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out user
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  getCurrentSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  },
}

// Database helpers
export const dbHelpers = {
  // Users
  users: {
    getProfile: async (userId) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    },

    updateProfile: async (userId, updates) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
      return { data, error }
    },
  },

  // User Profiles
  userProfiles: {
    get: async (userId) => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
      return { data, error }
    },

    create: async (profileData) => {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single()
      return { data, error }
    },

    update: async (userId, updates) => {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single()
      return { data, error }
    },
  },

  // Ikigai
  ikigai: {
    get: async (userId) => {
      const { data, error } = await supabase
        .from('ikigai')
        .select('*')
        .eq('user_id', userId)
        .single()
      return { data, error }
    },

    create: async (ikigaiData) => {
      const { data, error } = await supabase
        .from('ikigai')
        .insert(ikigaiData)
        .select()
        .single()
      return { data, error }
    },

    update: async (userId, updates) => {
      const { data, error } = await supabase
        .from('ikigai')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single()
      return { data, error }
    },
  },

  // Phase Progress
  phaseProgress: {
    getAll: async (userId) => {
      const { data, error } = await supabase
        .from('phase_progress')
        .select('*')
        .eq('user_id', userId)
        .order('phase_number')
      return { data, error }
    },

    updateProgress: async (userId, phaseNumber, progressData) => {
      const { data, error } = await supabase
        .from('phase_progress')
        .update(progressData)
        .eq('user_id', userId)
        .eq('phase_number', phaseNumber)
        .select()
        .single()
      return { data, error }
    },
  },

  // Projects
  projects: {
    getAll: async (userId) => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    create: async (projectData) => {
      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single()
      return { data, error }
    },

    update: async (projectId, updates) => {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single()
      return { data, error }
    },

    delete: async (projectId) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
      return { error }
    },
  },

  // Target Companies
  targetCompanies: {
    getAll: async (userId) => {
      const { data, error } = await supabase
        .from('target_companies')
        .select('*')
        .eq('user_id', userId)
        .order('priority_level', { ascending: false })
      return { data, error }
    },

    create: async (companyData) => {
      const { data, error } = await supabase
        .from('target_companies')
        .insert(companyData)
        .select()
        .single()
      return { data, error }
    },

    update: async (companyId, updates) => {
      const { data, error } = await supabase
        .from('target_companies')
        .update(updates)
        .eq('id', companyId)
        .select()
        .single()
      return { data, error }
    },

    delete: async (companyId) => {
      const { error } = await supabase
        .from('target_companies')
        .delete()
        .eq('id', companyId)
      return { error }
    },
  },

  // Skill Assessments
  skillAssessments: {
    getAll: async (userId) => {
      const { data, error } = await supabase
        .from('skill_assessments')
        .select('*')
        .eq('user_id', userId)
        .order('taken_at', { ascending: false })
      return { data, error }
    },

    create: async (assessmentData) => {
      const { data, error } = await supabase
        .from('skill_assessments')
        .insert(assessmentData)
        .select()
        .single()
      return { data, error }
    },

    getByCategory: async (userId, category) => {
      const { data, error } = await supabase
        .from('skill_assessments')
        .select('*')
        .eq('user_id', userId)
        .eq('skill_category', category)
        .order('taken_at', { ascending: false })
      return { data, error }
    },
  },

  // Social Posts
  socialPosts: {
    getAll: async (userId, platform = null) => {
      let query = supabase
        .from('social_posts')
        .select('*')
        .eq('user_id', userId)

      if (platform) {
        query = query.eq('platform', platform)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      return { data, error }
    },

    create: async (postData) => {
      const { data, error } = await supabase
        .from('social_posts')
        .insert(postData)
        .select()
        .single()
      return { data, error }
    },

    update: async (postId, updates) => {
      const { data, error } = await supabase
        .from('social_posts')
        .update(updates)
        .eq('id', postId)
        .select()
        .single()
      return { data, error }
    },

    delete: async (postId) => {
      const { error } = await supabase
        .from('social_posts')
        .delete()
        .eq('id', postId)
      return { error }
    },
  },

  // Case Studies
  caseStudies: {
    getAll: async (userId, category = null) => {
      let query = supabase
        .from('case_studies')
        .select('*')
        .eq('user_id', userId)

      if (category) {
        query = query.eq('category', category)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      return { data, error }
    },

    create: async (studyData) => {
      const { data, error } = await supabase
        .from('case_studies')
        .insert(studyData)
        .select()
        .single()
      return { data, error }
    },

    update: async (studyId, updates) => {
      const { data, error } = await supabase
        .from('case_studies')
        .update(updates)
        .eq('id', studyId)
        .select()
        .single()
      return { data, error }
    },

    delete: async (studyId) => {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', studyId)
      return { error }
    },
  },

  // Job Applications
  jobApplications: {
    getAll: async (userId) => {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          target_companies (
            company_name,
            industry,
            location
          )
        `)
        .eq('user_id', userId)
        .order('applied_date', { ascending: false })
      return { data, error }
    },

    create: async (applicationData) => {
      const { data, error } = await supabase
        .from('job_applications')
        .insert(applicationData)
        .select()
        .single()
      return { data, error }
    },

    update: async (applicationId, updates) => {
      const { data, error } = await supabase
        .from('job_applications')
        .update(updates)
        .eq('id', applicationId)
        .select()
        .single()
      return { data, error }
    },

    delete: async (applicationId) => {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', applicationId)
      return { error }
    },
  },

  // Journal Entries
  journalEntries: {
    getAll: async (userId, limit = null) => {
      let query = supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('entry_date', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query
      return { data, error }
    },

    create: async (entryData) => {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert(entryData)
        .select()
        .single()
      return { data, error }
    },

    update: async (entryId, updates) => {
      const { data, error } = await supabase
        .from('journal_entries')
        .update(updates)
        .eq('id', entryId)
        .select()
        .single()
      return { data, error }
    },

    delete: async (entryId) => {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', entryId)
      return { error }
    },
  },

  // Message Templates
  messageTemplates: {
    getAll: async (userId, templateType = null) => {
      let query = supabase
        .from('message_templates')
        .select('*')
        .eq('user_id', userId)

      if (templateType) {
        query = query.eq('template_type', templateType)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      return { data, error }
    },

    create: async (templateData) => {
      const { data, error } = await supabase
        .from('message_templates')
        .insert(templateData)
        .select()
        .single()
      return { data, error }
    },

    update: async (templateId, updates) => {
      const { data, error } = await supabase
        .from('message_templates')
        .update(updates)
        .eq('id', templateId)
        .select()
        .single()
      return { data, error }
    },

    delete: async (templateId) => {
      const { error } = await supabase
        .from('message_templates')
        .delete()
        .eq('id', templateId)
      return { error }
    },

    incrementUsage: async (templateId) => {
      // First get current usage count
      const { data: template, error: fetchError } = await supabase
        .from('message_templates')
        .select('usage_count')
        .eq('id', templateId)
        .single()

      if (fetchError) return { error: fetchError }

      // Then increment it
      const { data, error } = await supabase
        .from('message_templates')
        .update({ usage_count: (template.usage_count || 0) + 1 })
        .eq('id', templateId)
        .select()
        .single()

      return { data, error }
    },
  },
}