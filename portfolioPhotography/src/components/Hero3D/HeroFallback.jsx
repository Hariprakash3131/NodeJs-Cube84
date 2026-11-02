import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroFallback({ galleryItems, onPhotoClick, setCursorType }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-12 px-4 sm:px-6 overflow-hidden"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {galleryItems.slice(0, 6).map((item, index) => {
          // Staggered parallax translation depending on column
          const yTransform = index % 3 === 0 ? y1 : index % 3 === 1 ? y2 : y3;

          return (
            <motion.div
              key={item.id}
              style={{ y: yTransform }}
              className={`group relative overflow-hidden rounded-sm bg-bg-surface border border-border-subtle cursor-pointer transition-all duration-500 ${
                index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'
              }`}
              onMouseEnter={() => setCursorType && setCursorType('VIEW')}
              onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
              onClick={() => onPhotoClick(index)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={item.url}
                alt={item.alt || item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-accent block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-editorial-heading font-medium text-text-primary tracking-wide">
                    {item.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
