import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface InkSplashHeadingProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function InkSplashHeading({ children, delay = 0, className = '' }: InkSplashHeadingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`ink-splash-heading-wrapper ${className}`}>
      {/* Text with fade-in animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.8,
          delay: delay + 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
