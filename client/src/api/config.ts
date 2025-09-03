// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  MODEL_API_SERVER: 'http://localhost:8001',
  APE_API_SERVER: 'http://localhost:8000',
  CHAT_BOTS_API_SERVER: 'https://bot-ape.crodlin.in/',

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

  // Portfolio endpoints
  PORTFOLIO: {
    USER_DETAILS: (email: string) => `/api/userdetails/${email}/`,
    TOOL_NAMES: '/api/toolnames/',
    TOOLS: '/api/tools/',
    TOOL_COMPONENTS: '/api/toolcomponents/',
    EDUCATION: '/api/education/',
    CERTIFICATES: '/api/certificates/',
    PROJECTS: '/api/projects/',
    LINKS: '/api/links/',
  },

  COMMUNITY: {
    LIST: '/api/community/communities/',
    DETAIL: (id: number | string) => `/api/community/communities/${id}/`,
    POSTS: '/api/community/posts/',
    POST_DETAIL: (id: number | string) => `/api/community/posts/${id}/`,
    FILES: '/api/community/files/',
    VOTES: '/api/community/votes/',
    COMMENTS: '/api/community/comments/',
    REPLIES: '/api/community/replies/',
    COMMENT_VOTES: '/api/community/comment-votes/',
    COMMENT_REPLY_VOTES: '/api/community/comment-reply-votes/',
    SAVED_POSTS: '/api/community/saved-posts/', 
    COMMUNITY_USERS: '/api/community/community-users/',
    ROLE_MANAGEMENT: (communityId: number | string) => `/api/community/communities/${communityId}/roles/`,
    USER_ACTIVITY: '/api/community/users/activity/',
  },

  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'x-auth-app': process.env.NEXT_PUBLIC_FRONTEND_SECRET_KEY || 'literacyprojectnamesasapi#2501@called',
  },
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.APE_API_SERVER}${endpoint}`;
};

// Helper function to get headers with auth token
export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = { ...API_CONFIG.HEADERS };
  if (token) {
    headers['Authorization'] = token; // Server expects token without Bearer
  }
  return headers;
};

export const getAuthMultipartHeaders = (token?: string) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = token;
  }
  // ⚠️ Do NOT set "Content-Type" here. Browser automatically sets with proper boundary
  headers['x-auth-app'] = process.env.NEXT_PUBLIC_FRONTEND_SECRET_KEY || 'literacyprojectnamesasapi#2501@called';
  return headers;
};