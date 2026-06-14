'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  onClick,
  padding = 'md',
}: GlassCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
    none: '',
  };

  return (
    <div
      onClick={onClick}
      className={`
        glass-card
        ${paddingClasses[padding]}
        ${hover ? 'glass-hover cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
