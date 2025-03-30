'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import Link from 'next/link';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  icon,
  iconPosition = 'right',
}: AnimatedButtonProps) {
  const variantClasses = {
    primary: 'bg-[#c9ff3c] hover:bg-[#c9ff3c]/90 text-black',
    secondary: 'bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white',
    outline:
      'bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white',
  }[variant];

  const buttonContent = (
    <motion.div
      className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition-all duration-300 ${variantClasses} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {icon && iconPosition === 'right' && icon}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return <button onClick={onClick}>{buttonContent}</button>;
}
