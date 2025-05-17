// src/services/educationService.jsx
import { supabase } from '../lib/supabase';

/**
 * Fetch all education records for a given user, ordered by start date.
 * @param {string} userId
 * @returns {{ data: Array<Object> | null, error: any }}
 */
export async function fetchEducation(userId) {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .eq('user_id', userId)
    .order('start_date', { ascending: false });

  return { data, error };
}

/**
 * Add a new education record.
 * @param {Object} education - The education object to insert.
 * @returns {{ data: any, error: any }}
 */
export async function addEducation(education) {
  const { data, error } = await supabase
    .from('education')
    .insert([education]);

  return { data, error };
}

/**
 * Update an existing education record by its ID.
 * @param {string} id - The ID of the education to update.
 * @param {Object} updates - Partial updates to apply.
 * @returns {{ data: any, error: any }}
 */
export async function updateEducation(id, updates) {
  const { data, error } = await supabase
    .from('education')
    .update(updates)
    .eq('id', id);

  return { data, error };
}

/**
 * Delete an education record by its ID.
 * @param {string} id - The ID of the education to delete.
 * @returns {{ data: any, error: any }}
 */
export async function deleteEducation(id) {
  const { data, error } = await supabase
    .from('education')
    .delete()
    .eq('id', id);

  return { data, error };
}
