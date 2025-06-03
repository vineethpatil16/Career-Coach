import { supabase } from './supabase'

export const companyService = {
  // Get all target companies
  getAll: async (userId) => {
    const { data, error } = await supabase
      .from('target_companies')
      .select('*')
      .eq('user_id', userId)
      .order('priority_level', { ascending: false })
    return { data, error }
  },

  // Create new target company
  create: async (companyData) => {
    const { data, error } = await supabase
      .from('target_companies')
      .insert(companyData)
      .select()
      .single()
    return { data, error }
  },

  // Update company
  update: async (companyId, updates) => {
    const { data, error } = await supabase
      .from('target_companies')
      .update(updates)
      .eq('id', companyId)
      .select()
      .single()
    return { data, error }
  },

  // Delete company
  delete: async (companyId) => {
    const { error } = await supabase
      .from('target_companies')
      .delete()
      .eq('id', companyId)
    return { error }
  },
}
