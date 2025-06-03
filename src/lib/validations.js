import { VALIDATION_RULES, ERROR_MESSAGES } from '../config/constants'

export const validationRules = {
  required: (value) => {
    if (value === null || value === undefined || value === '') {
      return ERROR_MESSAGES.REQUIRED
    }
    return true
  },

  email: (value) => {
    if (!value) return true // Let required handle empty values
    if (!VALIDATION_RULES.EMAIL_REGEX.test(value)) {
      return ERROR_MESSAGES.INVALID_EMAIL
    }
    return true
  },

  password: (value) => {
    if (!value) return true // Let required handle empty values
    if (!VALIDATION_RULES.PASSWORD_REGEX.test(value)) {
      return ERROR_MESSAGES.INVALID_PASSWORD
    }
    return true
  },

  confirmPassword: (password) => (value) => {
    if (!value) return true // Let required handle empty values
    if (value !== password) {
      return ERROR_MESSAGES.PASSWORDS_DONT_MATCH
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
    if (!VALIDATION_RULES.URL_REGEX.test(value)) {
      return ERROR_MESSAGES.INVALID_URL
    }
    return true
  },

  phone: (value) => {
    if (!value) return true // Let required handle empty values
    if (!VALIDATION_RULES.PHONE_REGEX.test(value.replace(/\s/g, ''))) {
      return ERROR_MESSAGES.INVALID_PHONE
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
