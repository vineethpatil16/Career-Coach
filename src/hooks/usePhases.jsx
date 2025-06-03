// src/hooks/usePhases.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { phaseService } from '../services/supabase'

export const usePhases = () => {
  const { user } = useAuth()
  const [phases, setPhases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPhases = async () => {
    if (!user) {
      setPhases([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await phaseService.getAll(user.id)
      
      if (fetchError) throw fetchError
      
      setPhases(data || [])
    } catch (err) {
      setError(err)
      console.error('Error fetching phases:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhases()
  }, [user?.id])

  const updateProgress = async (phaseNumber, progressData) => {
    if (!user) return { data: null, error: new Error('No user logged in') }
    
    try {
      const { data, error } = await phaseService.updateProgress(user.id, phaseNumber, progressData)
      
      if (error) throw error
      
      await fetchPhases() // Refresh list
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const completePhase = async (phaseNumber) => {
    if (!user) return { data: null, error: new Error('No user logged in') }
    
    try {
      const { data, error } = await phaseService.completePhase(user.id, phaseNumber)
      
      if (error) throw error
      
      await fetchPhases() // Refresh list
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const getCurrentPhase = () => {
    if (!phases || phases.length === 0) return null
    return phases.find(phase => !phase.is_completed) || phases[phases.length - 1]
  }

  const getOverallProgress = () => {
    if (!phases || phases.length === 0) return 0
    const totalProgress = phases.reduce((sum, phase) => sum + (phase.progress_percentage || 0), 0)
    return Math.round(totalProgress / phases.length)
  }

  return {
    phases,
    loading,
    error,
    updateProgress,
    completePhase,
    getCurrentPhase,
    getOverallProgress,
    refetch: fetchPhases,
  }
}
