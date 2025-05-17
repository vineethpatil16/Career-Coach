// src/services/skillsService.jsx
import { supabase } from '../lib/supabase';

// Fetch all skills for a given user
export async function fetchSkills(userId) {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('user_id', userId)
    .order('name');

  return { data, error };
}

// Add a new skill record
export async function addSkill(skill) {
  const { data, error } = await supabase
    .from('skills')
    .insert([skill]);

  return { data, error };
}

// Update an existing skill by its ID
export async function updateSkill(id, updates) {
  const { data, error } = await supabase
    .from('skills')
    .update(updates)
    .eq('id', id);

  return { data, error };
}

// Delete a skill by its ID
export async function deleteSkill(id) {
  const { data, error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);

  return { data, error };
}
