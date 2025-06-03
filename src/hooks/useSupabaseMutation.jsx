// src/hooks/useSupabaseMutation.js
import { useState } from 'react'

export const useSupabaseMutation = (mutationFn) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (...args) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await mutationFn(...args)
      
      if (result.error) {
        setError(result.error)
        return { data: null, error: result.error }
      }
      
      return { data: result.data, error: null }
    } catch (err) {
      setError(err)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
