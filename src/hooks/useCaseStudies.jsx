import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../config/supabase'

export const useCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]) 
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  // Helper to fetch all case studies for the current user
  const fetchCaseStudies = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // 1) Get the current Supabase user
      const user = supabase.auth.user()
      if (!user) {
        throw new Error('No authenticated user found.')
      }

      // 2) Query `case_studies` where user_id = current user
      const { data, error: fetchError } = await supabase
        .from('case_studies')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (fetchError) throw fetchError
      setCaseStudies(data ?? [])
    } catch (err) {
      console.error('useCaseStudies →', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on initial mount
  useEffect(() => {
    fetchCaseStudies()
  }, [fetchCaseStudies])

  return {
    caseStudies,        // Array of case_study rows
    loading,            // true while loading
    error,              // any Supabase or auth error
    refetch: fetchCaseStudies
  }
}
