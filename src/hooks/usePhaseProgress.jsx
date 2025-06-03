// src/hooks/usePhaseProgress.js
import { useAuth } from './useAuth'
import { useSupabaseQuery, useSupabaseMutation } from './useSupabaseQuery'
import { dbHelpers } from '../config/supabase'

export const usePhaseProgress = () => {
  const { user } = useAuth()

  const {
    data: phases,
    loading,
    error,
    refetch
  } = useSupabaseQuery(
    () => user ? dbHelpers.phaseProgress.getAll(user.id) : Promise.resolve({ data: [], error: null }),
    [user?.id]
  )

  const updateProgress = useSupabaseMutation(dbHelpers.phaseProgress.updateProgress)

  const handleUpdateProgress = async (phaseNumber, progressData) => {
    if (!user) return { data: null, error: new Error('No user logged in') }
    
    const result = await updateProgress.mutate(user.id, phaseNumber, progressData)
    
    if (!result.error) {
      refetch()
    }
    
    return result
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
    phases: phases || [],
    loading,
    error,
    refetch,
    updateProgress: handleUpdateProgress,
    getCurrentPhase,
    getOverallProgress,
    isUpdating: updateProgress.loading,
  }
}
