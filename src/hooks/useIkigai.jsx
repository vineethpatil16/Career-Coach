import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { ikigaiService } from '../services/supabase'

export const useIkigai = () => {
  const { user } = useAuth()
  const [ikigai, setIkigai] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchIkigai = async () => {
    if (!user) {
      setIkigai(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await ikigaiService.get(user.id)
      
      if (fetchError && fetchError.code !== 'PGRST116') { // Not found error is okay
        throw fetchError
      }
      
      setIkigai(data)
    } catch (err) {
      setError(err)
      console.error('Error fetching ikigai:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIkigai()
  }, [user?.id])

  const createIkigai = async (ikigaiData) => {
    if (!user) return { data: null, error: new Error('No user logged in') }
    
    try {
      const { data, error } = await ikigaiService.create({
        ...ikigaiData,
        user_id: user.id
      })
      
      if (error) throw error
      
      setIkigai(data)
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const updateIkigai = async (updates) => {
    if (!user) return { data: null, error: new Error('No user logged in') }
    
    try {
      const { data, error } = await ikigaiService.update(user.id, updates)
      
      if (error) throw error
      
      setIkigai(data)
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  return {
    ikigai,
    loading,
    error,
    createIkigai,
    updateIkigai,
    refetch: fetchIkigai,
  }
}
