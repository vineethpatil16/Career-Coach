import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { projectService } from '../services/supabase'

export const useProjects = () => {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // In useProjects.jsx
const fetchProjects = async () => {
  if (!user) return;
  
  try {
    setLoading(true);
    const { data, error } = await projectService.getAll(user.id);
    
    if (error) throw error;
    setProjects(data || []);
  } catch (err) {
    console.error('Error fetching projects:', err);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchProjects()
  }, [user?.id])

  const createProject = async (projectData) => {
    if (!user) return { data: null, error: new Error('No user logged in') }
    
    try {
      const { data, error } = await projectService.create({
        ...projectData,
        user_id: user.id
      })
      
      if (error) throw error
      
      await fetchProjects() // Refresh list
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const updateProject = async (projectId, updates) => {
    try {
      const { data, error } = await projectService.update(projectId, updates)
      
      if (error) throw error
      
      await fetchProjects() // Refresh list
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const deleteProject = async (projectId) => {
    try {
      const { error } = await projectService.delete(projectId)
      
      if (error) throw error
      
      await fetchProjects() // Refresh list
      return { error: null }
    } catch (error) {
      return { error }
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