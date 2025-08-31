// API Configuration
export const API_CONFIG = {
  // BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  BASE_URL:'http://localhost:8000',
  
  // Authentication endpoints
  ENDPOINTS: {
    REGISTER: '/api/authentication/register',
    LOGIN: '/api/authentication/login',
    LOGOUT: '/api/authentication/logout',
    RESEND_OTP: '/api/authentication/resendotp',
    PASSWORD_RESET_REQUEST: '/api/authentication/password-reset-request',
    PASSWORD_RESET: '/api/authentication/password-reset',
    USER_DATA: '/api/authentication/user',
  },
  
  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'x-auth-app': process.env.NEXT_PUBLIC_FRONTEND_SECRET_KEY || 'literacyprojectnamesasapi#2501@called',
  },
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get headers with auth token
export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = { ...API_CONFIG.HEADERS };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};