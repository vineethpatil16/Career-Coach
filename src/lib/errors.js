// src/lib/errors.js
export class AppError extends Error {
    constructor(message, code = 'UNKNOWN_ERROR', statusCode = 500) {
      super(message)
      this.name = 'AppError'
      this.code = code
      this.statusCode = statusCode
    }
  }
  
  export class ValidationError extends AppError {
    constructor(message, field = null) {
      super(message, 'VALIDATION_ERROR', 400)
      this.name = 'ValidationError'
      this.field = field
    }
  }
  
  export class AuthError extends AppError {
    constructor(message) {
      super(message, 'AUTH_ERROR', 401)
      this.name = 'AuthError'
    }
  }
  
  export class NetworkError extends AppError {
    constructor(message) {
      super(message, 'NETWORK_ERROR', 0)
      this.name = 'NetworkError'
    }
  }
  
  export const handleError = (error) => {
    console.error('Application Error:', error)
    
    if (error instanceof ValidationError) {
      return {
        type: 'validation',
        message: error.message,
        field: error.field,
      }
    }
    
    if (error instanceof AuthError) {
      return {
        type: 'auth',
        message: error.message,
      }
    }
    
    if (error instanceof NetworkError) {
      return {
        type: 'network',
        message: 'Network error. Please check your connection and try again.',
      }
    }
    
    // Default error handling
    return {
      type: 'general',
      message: error.message || 'An unexpected error occurred',
    }
  }