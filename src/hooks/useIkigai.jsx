// src/hooks/useIkigai.jsx
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../services/supabase' // only import the client

export const useIkigai = () => {
  const [ikigai, setIkigai]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetchIkigai = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const user = supabase.auth.user()
      if (!user) {
        throw new Error('No authenticated user found.')
      }

      // Query the "ikigai" table for this user
      const { data, error: fetchError } = await supabase
        .from('ikigai')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (fetchError) throw fetchError
      setIkigai(data)
    } catch (err) {
      console.error('useIkigai →', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchIkigai()
  }, [fetchIkigai])

  return {
    ikigai,
    loading,
    error,
    refetch: fetchIkigai
  }
}
