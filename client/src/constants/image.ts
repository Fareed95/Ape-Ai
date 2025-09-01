// Image constants for the application
export const IMAGES = {
  // Logo and branding
  LOGO: '/images/logo.png',
  ICON_512_ROUNDED: '/images/icon512_rounded.png',
  ICON_512_MASKABLE: '/images/icon512_maskable.png',
  
  // Team members
  NITIN: '/images/Nitin.jpg',
  FAREED: '/images/Fareed.jpg',
  
  // Videos
  SENIOR_HR: '/images/seniorhr.mp4',
  
  // Manifest
  MANIFEST: '/images/manifest.json',
  
  // Default images
  DEFAULT_AVATAR: '/images/default-avatar.png',
  DEFAULT_PROFILE: '/images/default-avatar.png',
  
  // Placeholder images
  PLACEHOLDER_USER: '/images/default-avatar.png',
  PLACEHOLDER_COMPANY: '/images/default-avatar.png',
} as const;

// Type for image keys
export type ImageKey = keyof typeof IMAGES;
