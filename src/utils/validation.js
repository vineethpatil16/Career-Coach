// src/utils/validation.js
export const validationRules = {
    required: (value) => {
      if (value === null || value === undefined || value === '') {
        return 'This field is required'
      }
      return true
    },
  
    email: (value) => {
      if (!value) return true // Let required handle empty values
      if (!validateEmail(value)) {
        return 'Please enter a valid email address'
      }
      return true
    },
  
    password: (value) => {
      if (!value) return true // Let required handle empty values
      if (!validatePassword(value)) {
        return 'Password must be at least 8 characters with uppercase, lowercase, and number'
      }
      return true
    },
  
    confirmPassword: (password) => (value) => {
      if (!value) return true // Let required handle empty values
      if (value !== password) {
        return 'Passwords do not match'
      }
      return true
    },
  
    minLength: (min) => (value) => {
      if (!value) return true // Let required handle empty values
      if (value.length < min) {
        return `Must be at least ${min} characters long`
      }
      return true
    },
  
    maxLength: (max) => (value) => {
      if (!value) return true // Let required handle empty values
      if (value.length > max) {
        return `Must be no more than ${max} characters long`
      }
      return true
    },
  
    url: (value) => {
      if (!value) return true // Let required handle empty values
      try {
        new URL(value)
        return true
      } catch {
        return 'Please enter a valid URL'
      }
    },
  
    phone: (value) => {
      if (!value) return true // Let required handle empty values
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        return 'Please enter a valid phone number'
      }
      return true
    },
  }
  
  export const validateForm = (data, rules) => {
    const errors = {}
    
    for (const field in rules) {
      const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]]
      
      for (const rule of fieldRules) {
        const result = rule(data[field])
        if (result !== true) {
          errors[field] = result
          break // Stop at first error for this field
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }