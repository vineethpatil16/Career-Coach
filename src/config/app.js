// src/config/app.js
export const APP_CONFIG = {
    name: 'Career Coach AI Portal',
    version: '0.1.0',
    description: 'AI-powered career coaching platform',
    
    phases: {
      DISCOVER: { number: 1, name: 'Discover', color: 'primary' },
      EXPLORE: { number: 2, name: 'Explore', color: 'secondary' },
      REFLECT: { number: 3, name: 'Reflect', color: 'accent' },
      ACT: { number: 4, name: 'Act', color: 'success' },
    },
    
    features: {
      IKIGAI_LOCKED_UNTIL_PHASE_1: true,
      AUTO_PHASE_PROGRESSION: true,
      SOCIAL_MEDIA_INTEGRATION: true,
      AI_RECOMMENDATIONS: true,
    },
    
    routes: {
      HOME: '/',
      DASHBOARD: '/dashboard',
      IKIGAI: '/ikigai',
      PROFILE: '/profile',
      PROJECTS: '/projects',
      COMPANIES: '/companies',
      EXPLORE: '/explore',
      REFLECT: '/reflect',
      ACT: '/act',
      SETTINGS: '/settings',
    }
  }
  