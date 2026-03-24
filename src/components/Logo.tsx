import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Hexagon / Shield shape */}
      <path 
        d="M50 5L90 25V75L50 95L10 75V25L50 5Z" 
        fill="currentColor" 
        fillOpacity="0.1"
        stroke="currentColor" 
        strokeWidth="4"
        strokeLinejoin="round"
      />
      
      {/* Stylized 'H' or 'Node' structure */}
      <path 
        d="M35 30V70M65 30V70M35 50H65" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round"
      />
      
      {/* Tech accents / Nodes */}
      <circle cx="35" cy="30" r="4" fill="currentColor" />
      <circle cx="35" cy="70" r="4" fill="currentColor" />
      <circle cx="65" cy="30" r="4" fill="currentColor" />
      <circle cx="65" cy="70" r="4" fill="currentColor" />
      
      {/* Center accent */}
      <rect x="45" y="45" width="10" height="10" rx="2" fill="currentColor" />
    </svg>
  );
};
