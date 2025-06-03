// src/utils/helpers.js
export const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  
  export const formatDateTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  
  export const getRelativeTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now - date
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }
  
  export const calculateProgress = (completed, total) => {
    if (total === 0) return 0
    return Math.round((completed / total) * 100)
  }
  
  export const getStatusColor = (status) => {
    const statusColors = {
      // Project status
      todo: 'gray',
      in_progress: 'blue',
      review: 'yellow',
      completed: 'green',
      
      // Application status
      interested: 'gray',
      applied: 'blue',
      interviewing: 'yellow',
      rejected: 'red',
      offered: 'green',
      
      // Job application status
      phone_screen: 'blue',
      technical_interview: 'yellow',
      final_interview: 'orange',
      accepted: 'green',
      
      // General status
      not_started: 'gray',
      in_progress: 'blue',
      completed: 'green',
    }
    
    return statusColors[status] || 'gray'
  }
  
  export const getPriorityColor = (priority) => {
    const priorityColors = {
      low: 'green',
      medium: 'yellow',
      high: 'red',
    }
    
    return priorityColors[priority] || 'gray'
  }
  
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
  export const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
  }
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }
  
  export const generateInitials = (firstName, lastName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : ''
    const last = lastName ? lastName.charAt(0).toUpperCase() : ''
    return first + last
  }
  
  export const parseSkills = (skillsData) => {
    if (!skillsData) return []
    if (Array.isArray(skillsData)) return skillsData
    if (typeof skillsData === 'string') {
      try {
        return JSON.parse(skillsData)
      } catch {
        return skillsData.split(',').map(skill => ({ name: skill.trim(), level: 'intermediate' }))
      }
    }
    return []
  }
  
  export const formatSkillsForDB = (skills) => {
    if (Array.isArray(skills)) return skills
    return []
  }
  
  export const calculateSkillLevel = (score, maxScore) => {
    if (!score || !maxScore) return 'beginner'
    const percentage = (score / maxScore) * 100
    
    if (percentage >= 90) return 'expert'
    if (percentage >= 75) return 'advanced'
    if (percentage >= 60) return 'intermediate'
    return 'beginner'
  }
  
  export const getPhaseInfo = (phaseNumber) => {
    const phases = Object.values(PHASES)
    return phases.find(phase => phase.number === phaseNumber) || phases[0]
  }
  
  export const sortByDate = (array, dateField = 'created_at', ascending = false) => {
    return [...array].sort((a, b) => {
      const dateA = new Date(a[dateField])
      const dateB = new Date(b[dateField])
      return ascending ? dateA - dateB : dateB - dateA
    })
  }
  
  export const filterByDateRange = (array, dateField, startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    return array.filter(item => {
      const itemDate = new Date(item[dateField])
      return itemDate >= start && itemDate <= end
    })
  }
  
  export const groupByDate = (array, dateField = 'created_at') => {
    return array.reduce((groups, item) => {
      const date = new Date(item[dateField]).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(item)
      return groups
    }, {})
  }
  
  export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }
  
  export const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number)
  }
  
  export const generateRandomId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
  
  
  