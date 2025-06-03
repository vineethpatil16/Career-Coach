import { supabase } from './supabase'

export const phaseService = {
  // Get all phases for user
  getAll: async (userId) => {
    const { data, error } = await supabase
      .from('phase_progress')
      .select('*')
      .eq('user_id', userId)
      .order('phase_number')
    return { data, error }
  },

  // Update phase progress
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

  // Mark phase as completed
  completePhase: async (userId, phaseNumber) => {
    const { data, error } = await supabase
      .from('phase_progress')
      .update({
        is_completed: true,
        progress_percentage: 100,
        completed_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('phase_number', phaseNumber)
      .select()
      .single()
    return { data, error }
  },
}
