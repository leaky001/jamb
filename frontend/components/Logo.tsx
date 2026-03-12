'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  color?: string;
  animated?: boolean;
}

const Logo = ({ size = 32, color = '#1F3A8A', animated = true }: LogoProps) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.div 
      className="logo-wrapper"
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20 4L34 10V22C34 30 28 36 20 38C12 36 6 30 6 22V10L20 4Z"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
        
        <motion.rect
          x="18"
          y="12"
          width="4"
          height="18"
          rx="1"
          fill={color}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        <motion.rect
          x="12"
          y="18"
          width="3"
          height="10"
          rx="0.5"
          fill={color}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ transformOrigin: 'bottom' }}
        />
        <motion.rect
          x="25"
          y="18"
          width="3"
          height="10"
          rx="0.5"
          fill={color}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        <motion.path
          d="M15 12L20 8L25 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </svg>
    </motion.div>
  );
};


export default Logo;
