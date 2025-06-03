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
    const phases = {
      1: { number: 1, name: 'Discover', color: 'primary' },
      2: { number: 2, name: 'Explore', color: 'secondary' },
      3: { number: 3, name: 'Reflect', color: 'accent' },
      4: { number: 4, name: 'Act', color: 'success' },
    }
    
    return phases[phaseNumber] || phases[1]
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
  
  export const generateRandomId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
  
  export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }
  
  export const isEmpty = (value) => {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim() === ''
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    return false
  }
  
  export const capitalize = (str) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
  
  export const camelToSnake = (str) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }
  
  export const snakeToCamel = (str) => {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
  }