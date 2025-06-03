import { supabase } from './supabase'

export const ikigaiService = {
  // Get user's ikigai
  get: async (userId) => {
    const { data, error } = await supabase
      .from('ikigai')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  // Create ikigai
  create: async (ikigaiData) => {
    const { data, error } = await supabase
      .from('ikigai')
      .insert(ikigaiData)
      .select()
      .single()
    return { data, error }
  },

  // Update ikigai
  update: async (userId, updates) => {
    const { data, error } = await supabase
      .from('ikigai')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()
    return { data, error }
  },
}
