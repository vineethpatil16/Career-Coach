// src/services/ikigaiService.jsx
import { supabase } from 'src/lib/supabase';

/**
 * Fetch all Ikigai entries for a given user, ordered by creation date.
 * @param {string} userId
 * @returns {{ data: Array<Object> | null, error: any }}
 */
export async function fetchIkigaiEntriesByType(userId) {
  const { data, error } = await supabase
    .from('ikigai_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

/**
 * Add a new Ikigai entry record.
 * @param {Object} entry - The Ikigai entry to insert.
 * @returns {{ data: Object | null, error: any }}
 */
export async function addIkigaiEntry(entry) {
  const { data, error } = await supabase
    .from('ikigai_entries')
    .insert(entry)
    .select()
    .single();

  return { data, error };
}
