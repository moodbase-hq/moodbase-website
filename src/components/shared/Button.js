// src/components/shared/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'medium',
  className = '',
  onClick,
  fullWidth = false,
  ...props
}) => {
  const theme = useTheme();

  // Base classes that all buttons share
  let baseClasses = `
    inline-block rounded-full transition-colors duration-300
    ${fullWidth ? 'w-full' : ''}
  `;

  // Variant specific classes
  const variantClasses = {
    primary: `bg-primary text-white hover:bg-primary-hover`,
    secondary: `bg-secondary text-white hover:bg-opacity-90`,
    tertiary: `bg-tertiary text-gray-800 hover:bg-opacity-90`,
    outline: `bg-transparent border border-primary text-primary hover:bg-primary hover:text-white`,
    ghost: `bg-white/20 backdrop-blur-sm text-white hover:bg-white/30`,
  };

  // Size specific classes
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  // Combine all classes
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant] || variantClasses.primary} 
    ${sizeClasses[size] || sizeClasses.medium}
    ${className}
  `;

  // Render different elements based on props
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  } else if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={buttonClasses} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }
};

export default Button;