import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../config/supabase'

export const useLinkedinStats = () => {
  const [linkedin, setLinkedin] = useState([])   // will hold an array of LinkedIn posts
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  // Helper to fetch all "linkedin" posts for the current user
  const fetchLinkedin = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // 1) Get the current Supabase user
      const user = supabase.auth.user()
      if (!user) {
        throw new Error('No authenticated user found.')
      }

      // 2) Query `social_posts` where user_id = current user AND platform = 'linkedin'
      const { data, error: fetchError } = await supabase
        .from('social_posts')
        .select('*')
        .eq('user_id', user.id)
        .eq('platform', 'linkedin')
        .order('posted_at', { ascending: false })

      if (fetchError) throw fetchError
      setLinkedin(data ?? [])
    } catch (err) {
      console.error('useLinkedinStats →', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on initial mount
  useEffect(() => {
    fetchLinkedin()
  }, [fetchLinkedin])

  return {
    linkedin,           // Array of LinkedIn‐post rows
    loading,            // true while loading
    error,              // any Supabase or auth error
    refetch: fetchLinkedin
  }
}
