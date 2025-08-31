// Font constants for the application
export const FONTS = {
  // Geist fonts
  GEIST_VF: '/fonts/GeistVF.woff',
  GEIST_MONO_VF: '/fonts/GeistMonoVF.woff',
} as const;

// Font family constants
export const FONT_FAMILIES = {
  GEIST: 'Geist, system-ui, sans-serif',
  GEIST_MONO: 'Geist Mono, monospace',
} as const;

// Type for font keys
export type FontKey = keyof typeof FONTS;
export type FontFamilyKey = keyof typeof FONT_FAMILIES;
