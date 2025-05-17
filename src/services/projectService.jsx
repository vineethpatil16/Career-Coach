// src/services/projectService.jsx
import { supabase } from '../lib/supabase';

// Fetch all projects for a given user
export async function fetchProjects(userId) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

// Fetch a single project by its ID
export async function fetchProjectById(projectId) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  return { data, error };
}

// Add a new project record
export async function addProject(project) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project]);

  return { data, error };
}

// Update an existing project by its ID
export async function updateProject(id, updates) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id);

  return { data, error };
}

// Delete a project by its ID
export async function deleteProject(id) {
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  return { data, error };
}

// Fetch all milestones for a given project
export async function fetchMilestones(projectId) {
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('project_id', projectId)
    .order('due_date', { ascending: true });

  return { data, error };
}

// Add a new milestone record
export async function addMilestone(milestone) {
  const { data, error } = await supabase
    .from('milestones')
    .insert([milestone]);

  return { data, error };
}

// Update an existing milestone by its ID
export async function updateMilestone(id, updates) {
  const { data, error } = await supabase
    .from('milestones')
    .update(updates)
    .eq('id', id);

  return { data, error };
}

// Delete a milestone by its ID
export async function deleteMilestone(id) {
  const { data, error } = await supabase
    .from('milestones')
    .delete()
    .eq('id', id);

  return { data, error };
}
