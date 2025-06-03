// src/hooks/useProjects.jsx
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabase'

export const useProjects = () => {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all projects for the current user
  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (fetchError) throw fetchError
      setProjects(data || [])
    } catch (err) {
      console.error('useProjects › fetchProjects error:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Create a new project and refresh list
  const createProject = async (projectData) => {
    if (!user) {
      const err = new Error('No user logged in')
      setError(err)
      return { data: null, error: err }
    }

    setLoading(true)
    setError(null)
    try {
      const payload = { ...projectData, user_id: user.id }
      const { data, error: createError } = await supabase
        .from('projects')
        .insert([payload])

      if (createError) throw createError
      await fetchProjects()
      return { data, error: null }
    } catch (err) {
      console.error('useProjects › createProject error:', err)
      setError(err)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  // Update an existing project and refresh list
  const updateProject = async (projectId, updates) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: updateError } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)

      if (updateError) throw updateError
      await fetchProjects()
      return { data, error: null }
    } catch (err) {
      console.error('useProjects › updateProject error:', err)
      setError(err)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  // Delete a project and refresh list
  const deleteProject = async (projectId) => {
    setLoading(true)
    setError(null)
    try {
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (deleteError) throw deleteError
      await fetchProjects()
      return { error: null }
    } catch (err) {
      console.error('useProjects › deleteProject error:', err)
      setError(err)
      return { error: err }
    } finally {
      setLoading(false)
    }
  }

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  }
}
