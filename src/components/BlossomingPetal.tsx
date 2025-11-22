import { motion } from 'motion/react';
import singlePetal from '../assets/single-petal-transparent.png';

interface BlossomingPetalProps {
    delay?: number;
    className?: string;
}

export function BlossomingPetal({ delay = 0, className = '' }: BlossomingPetalProps) {
    return (
        <motion.div
            className={`absolute z-20 pointer-events-none ${className}`}
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
                duration: 1.5,
                delay: delay,
                ease: [0.34, 1.56, 0.64, 1], // Spring-like ease for blossoming effect
            }}
        >
            <img
                src={singlePetal}
                alt="Blossoming petal"
                className="w-16 h-auto drop-shadow-sm"
            />
        </motion.div>
    );
}
