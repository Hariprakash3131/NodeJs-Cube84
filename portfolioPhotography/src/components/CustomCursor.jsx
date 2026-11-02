import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor({ cursorType = 'DEFAULT' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Smooth spring physics for fluid movement
  const mouseX = useSpring(0, { damping: 28, stiffness: 350 });
  const mouseY = useSpring(0, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Check if the device is touch-only
    if (window.matchMedia('(pointer: coarse)').matches ) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  // Render variations based on cursor state
  const isView = cursorType === 'VIEW';
  const isDrag = cursorType === 'DRAG';
  const isPointer = cursorType === 'POINTER';

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: mouseX,
        y: mouseY,
      }}
    >
      {/* Outer Circle Ring */}
      <motion.div
        animate={{
          width: isView ? 84 : isDrag ? 68 : isPointer ? 44 : 28,
          height: isView ? 84 : isDrag ? 68 : isPointer ? 44 : 28,
          backgroundColor: isView
            ? 'rgba(217, 255, 61, 0.95)'
            : isDrag
            ? 'rgba(20, 20, 22, 0.85)'
            : 'rgba(255, 255, 255, 0.08)',
          borderColor: isView
            ? 'transparent'
            : isDrag
            ? 'rgba(217, 255, 61, 0.4)'
            : isPointer
            ? 'rgba(217, 255, 61, 0.8)'
            : 'rgba(255, 255, 255, 0.3)',
          borderWidth: isView ? '0px' : '1px',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="rounded-full flex items-center justify-center backdrop-blur-xs select-none shadow-lg"
      >
        {isView && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-mono tracking-widest font-bold text-black uppercase"
          >
            VIEW
          </motion.span>
        )}

        {isDrag && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono tracking-widest text-accent uppercase flex items-center gap-1"
          >
            <span>↔</span> DRAG
          </motion.span>
        )}
      </motion.div>

      {/* Center dot for default pointer */}
      {!isView && !isDrag && (
        <motion.div
          animate={{
            scale: isPointer ? 0 : 1,
            backgroundColor: '#D9FF3D',
          }}
          className="absolute w-1.5 h-1.5 rounded-full"
        />
      )}
    </motion.div>
  );
}
