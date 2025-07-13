// Design tokens extracted from Moodbase style guide - EXACT SPECIFICATIONS
export const designTokens = {
  colors: {
    // Exact hex values from styleguide
    foregroundPrimary: '#383838',      // Foreground Primary
    foregroundOnEmphasis: '#F5ECE5',   // Foreground On Emphasis  
    backgroundPrimary: '#F5ECE5',      // Background Primary
    backgroundEmphasis: '#A13E4B',     // Background Emphasis
    borderPrimary: '#3C3732',          // Border Primary
    white: '#FFFFFF',
    gray100: '#f0f0f0',
    gray200: '#e0e0e0'
  },
  typography: {
    fontFamily: {
      primary: '"Inclusive Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      inclusive: '"Inclusive Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    // Exact font sizes from styleguide
    sizes: {
      100: '12px',  // Font Size 100
      200: '14px',  // Font Size 200  
      300: '16px',  // Font Size 300
      400: '18px',  // Font Size 400
      500: '20px',  // Font Size 500
      600: '24px',  // Font Size 600
      700: '32px',  // Font Size 700
      800: '48px'   // Font Size 800
    },
    // Exact font weights from styleguide
    weights: {
      primary: 400,  // Font Weight Primary: 400
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 800  // For headings
    },
    // Exact line heights from styleguide
    lineHeights: {
      compact: 1.10,  // Line Height Compact: 110%
      normal: 1.40    // Line Height Normal: 140%
    }
  },
  // EXACT Text Styles from styleguide
  textStyles: {
    // Heading XL: font-family-primary, font-size-800 (48px), line-height-compact (110%)
    headingXL: {
      fontFamily: '"Inclusive Sans", sans-serif',
      fontSize: '48px',
      fontWeight: 800,
      lineHeight: 1.10
    },
    // Heading LG: font-family-primary, font-size-700 (32px), line-height-compact (110%)
    headingLG: {
      fontFamily: '"Inclusive Sans", sans-serif',
      fontSize: '32px', 
      fontWeight: 700,
      lineHeight: 1.10
    },
    // Heading MD: font-family-primary, font-size-600 (24px), line-height-compact (110%)
    headingMD: {
      fontFamily: '"Inclusive Sans", sans-serif',
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.10
    },
    // Body LG: font-family-primary, font-size-500 (20px), line-height-normal (140%)
    bodyLG: {
      fontFamily: '"Inclusive Sans", sans-serif',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: 1.40
    },
    // Body MD: font-family-primary, font-size-300 (16px), line-height-normal (140%)
    bodyMD: {
      fontFamily: '"Inclusive Sans", sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.40
    },
    // Annotation SM: font-family-primary, font-size-100 (12px), line-height-compact (110%), uppercase
    annotationSM: {
      fontFamily: '"Inclusive Sans", sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.10,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }
  },
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px'
  },
  shadows: {
    sm: '0 2px 8px rgba(0,0,0,0.1)',
    md: '0 4px 16px rgba(0,0,0,0.15)',
    lg: '0 8px 32px rgba(0,0,0,0.2)'
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  }
}

export default designTokens