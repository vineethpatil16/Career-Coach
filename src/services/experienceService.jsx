// src/services/experienceService.jsx
import { supabase } from '../lib/supabase';

/**
 * Fetch all experience records for a given user, ordered by start date.
 * @param {string} userId
 * @returns {{ data: Array<Object> | null, error: any }}
 */
export async function fetchExperience(userId) {
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .eq('user_id', userId)
    .order('start_date', { ascending: false });

  return { data, error };
}

/**
 * Add a new experience record.
 * @param {Object} experience - The experience object to insert.
 * @returns {{ data: any, error: any }}
 */
export async function addExperience(experience) {
  const { data, error } = await supabase
    .from('experience')
    .insert([experience]);

  return { data, error };
}

/**
 * Update an existing experience record by its ID.
 * @param {string} id - The ID of the experience to update.
 * @param {Object} updates - Partial updates to apply.
 * @returns {{ data: any, error: any }}
 */
export async function updateExperience(id, updates) {
  const { data, error } = await supabase
    .from('experience')
    .update(updates)
    .eq('id', id);

  return { data, error };
}

/**
 * Delete an experience record by its ID.
 * @param {string} id - The ID of the experience to delete.
 * @returns {{ data: any, error: any }}
 */
export async function deleteExperience(id) {
  const { data, error } = await supabase
    .from('experience')
    .delete()
    .eq('id', id);

  return { data, error };
}
