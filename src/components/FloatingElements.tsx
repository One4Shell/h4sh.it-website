import React from 'react';
import { motion } from 'motion/react';

export const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: 0 
          }}
          animate={{ 
            y: [null, '-20%', '20%'],
            opacity: [0, 0.1, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute w-64 h-64 border border-emerald-500/10 rounded-full"
        />
      ))}
    </div>
  );
};
