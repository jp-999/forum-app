// Theme configuration for styled-components
export const theme = {
  colors: {
    primary: '#6e00ff',
    primaryLight: '#9a42ff',
    secondary: '#00e5ff',
    accent: '#ff00e5',
    background: '#080924',
    backgroundLight: '#101235',
    backgroundLighter: '#191c45',
    text: '#e6e6ff',
    textSecondary: '#adb5bd',
    success: '#00ff9d',
    warning: '#ffcf00',
    danger: '#ff3d71',
  },
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '4rem',
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  shadows: {
    normal: '0 8px 32px 0 rgba(0, 0, 0, 0.18)',
    neon: '0 0 10px rgba(110, 0, 255, 0.5), 0 0 20px rgba(110, 0, 255, 0.3)',
    card: '0 8px 32px rgba(0, 0, 0, 0.37)',
  },
  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  transitions: {
    default: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
  zIndices: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    tooltip: 1400,
  }
}; 