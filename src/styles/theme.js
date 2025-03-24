// src/styles/theme.js
export const theme = {
  colors: {
    primary: '#A13E4B',        // logo typo
    secondary: '#2F5EA8',      // highlight light
    tertiary: '#99BEFA',       // highlight dark
    background1: '#D9B1B1',    // background colour a
    background2: '#E8CEB0',    // background colour b

    // Additional derived colors for UI consistency
    primaryHover: '#8A3540',   // Darker version of primary for hover states
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      900: '#1A1A1A',
      800: '#333333',
      700: '#4A4A4A',
      600: '#666666',
      500: '#7A7A7A',
      400: '#999999',
      300: '#B3B3B3',
      200: '#E1E1E1',
      100: '#F5F5F5',
    },
    // Additional derived colors for specific components
    'secondary-dark': '#254B86',
    overlay: 'rgba(0, 0, 0, 0.4)',
    transparentWhite: 'rgba(255, 255, 255, 0.2)',
  },
  gradients: {
    backgroundGradient: 'linear-gradient(to bottom, #F5F1EB, #E7DFD4)',
    ctaGradient: 'linear-gradient(to right, #A13E4B, #99BEFA)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: '300ms ease',
  },
};

// For easier Tailwind CSS integration
export const tailwindTheme = {
  primary: theme.colors.primary,
  secondary: theme.colors.secondary,
  tertiary: theme.colors.tertiary,
  background1: theme.colors.background1,
  background2: theme.colors.background2,
  primaryHover: theme.colors.primaryHover,
};

export default theme;