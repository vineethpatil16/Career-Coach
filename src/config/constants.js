// src/config/constants.js
export const PROJECT_STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    REVIEW: 'review',
    COMPLETED: 'completed',
  }
  
  export const PROJECT_PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
  }
  
  export const APPLICATION_STATUS = {
    INTERESTED: 'interested',
    APPLIED: 'applied',
    INTERVIEWING: 'interviewing',
    REJECTED: 'rejected',
    OFFERED: 'offered',
  }
  
  export const JOB_STATUS = {
    APPLIED: 'applied',
    PHONE_SCREEN: 'phone_screen',
    TECHNICAL_INTERVIEW: 'technical_interview',
    FINAL_INTERVIEW: 'final_interview',
    REJECTED: 'rejected',
    OFFERED: 'offered',
    ACCEPTED: 'accepted',
  }
  
  export const SKILL_LEVELS = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  }
  
  export const SOCIAL_PLATFORMS = {
    LINKEDIN: 'linkedin',
    TWITTER: 'twitter',
  }
  
  export const POST_TYPES = {
    GENERAL: 'general',
    ACHIEVEMENT: 'achievement',
    LEARNING: 'learning',
    PROJECT: 'project',
    THOUGHT_LEADERSHIP: 'thought_leadership',
  }
  
  export const MESSAGE_TEMPLATE_TYPES = {
    RECRUITER: 'recruiter',
    INVESTOR: 'investor',
    FOUNDER: 'founder',
    NETWORKING: 'networking',
  }
  
  export const CASE_STUDY_CATEGORIES = {
    COMPANY_RESEARCH: 'company_research',
    ROLE_RESEARCH: 'role_research',
    AI_RESEARCH: 'ai_research',
    CUSTOM: 'custom',
  }
  
  export const COMPLETION_STATUS = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
  }
  
  export const MOOD_OPTIONS = {
    EXCITED: 'excited',
    MOTIVATED: 'motivated',
    NEUTRAL: 'neutral',
    FRUSTRATED: 'frustrated',
    OVERWHELMED: 'overwhelmed',
  }
  
  export const UI_CONSTANTS = {
    SIDEBAR_WIDTH: 280,
    HEADER_HEIGHT: 64,
    MOBILE_BREAKPOINT: 768,
    DESKTOP_BREAKPOINT: 1024,
  }
  
  export const API_ENDPOINTS = {
    AUTH: {
      SIGN_UP: '/auth/signup',
      SIGN_IN: '/auth/signin',
      SIGN_OUT: '/auth/signout',
      REFRESH: '/auth/refresh',
    },
    USER: {
      PROFILE: '/user/profile',
      SETTINGS: '/user/settings',
    },
  }
  
  export const VALIDATION_RULES = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
    URL_REGEX: /^https?:\/\/.+/,
  }
  
  export const ERROR_MESSAGES = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    INVALID_URL: 'Please enter a valid URL',
    INVALID_PHONE: 'Please enter a valid phone number',
    NETWORK_ERROR: 'Network error. Please try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Server error. Please try again later.',
  }