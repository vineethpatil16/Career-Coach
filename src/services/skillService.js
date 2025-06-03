import { supabase } from './supabase'

export const skillService = {
  // Get all skill assessments
  getAll: async (userId) => {
    const { data, error } = await supabase
      .from('skill_assessments')
      .select('*')
      .eq('user_id', userId)
      .order('taken_at', { ascending: false })
    return { data, error }
  },

  // Create skill assessment
  create: async (assessmentData) => {
    const { data, error } = await supabase
      .from('skill_assessments')
      .insert(assessmentData)
      .select()
      .single()
    return { data, error }
  },

  // Get assessments by category
  getByCategory: async (userId, category) => {
    const { data, error } = await supabase
      .from('skill_assessments')
      .select('*')
      .eq('user_id', userId)
      .eq('skill_category', category)
      .order('taken_at', { ascending: false })
    return { data, error }
  },
}

