import { supabase } from './supabase'

export const journalService = {
  // Get all journal entries
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

  // Create journal entry
  create: async (entryData) => {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert(entryData)
      .select()
      .single()
    return { data, error }
  },

  // Update journal entry
  update: async (entryId, updates) => {
    const { data, error } = await supabase
      .from('journal_entries')
      .update(updates)
      .eq('id', entryId)
      .select()
      .single()
    return { data, error }
  },

  // Delete journal entry
  delete: async (entryId) => {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', entryId)
    return { error }
  },
}