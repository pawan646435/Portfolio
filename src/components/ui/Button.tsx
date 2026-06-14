'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  target,
  rel,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full relative overflow-hidden';

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-7 py-3 text-base gap-2.5',
    lg: 'px-[32px] py-[18px] text-base md:text-lg gap-3 min-h-[58px] leading-none',
  };

  const variantClasses = {
    primary:
      'bg-accent text-white btn-glow hover:shadow-[0_0_40px_rgba(79,140,255,0.3)]',
    secondary:
      'bg-transparent border border-white/15 text-white hover:bg-white/5 hover:border-white/25',
    ghost:
      'bg-transparent text-secondary hover:text-white',
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
