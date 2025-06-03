// src/hooks/useTargetCompanies.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { companyService } from '../services/supabase'

export const useTargetCompanies = () => {
  const { user } = useAuth()
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCompanies = async () => {
    if (!user) {
      setCompanies([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await companyService.getAll(user.id)
      
      if (fetchError) throw fetchError
      
      setCompanies(data || [])
    } catch (err) {
      setError(err)
      console.error('Error fetching companies:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [user?.id])

  const createCompany = async (companyData) => {
    if (!user) return { data: null, error: new Error('No user logged in') }
    
    try {
      const { data, error } = await companyService.create({
        ...companyData,
        user_id: user.id
      })
      
      if (error) throw error
      
      await fetchCompanies() // Refresh list
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const updateCompany = async (companyId, updates) => {
    try {
      const { data, error } = await companyService.update(companyId, updates)
      
      if (error) throw error
      
      await fetchCompanies() // Refresh list
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const deleteCompany = async (companyId) => {
    try {
      const { error } = await companyService.delete(companyId)
      
      if (error) throw error
      
      await fetchCompanies() // Refresh list
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  return {
    companies,
    loading,
    error,
    createCompany,
    updateCompany,
    deleteCompany,
    refetch: fetchCompanies,
  }
}