import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import blossom1 from '../assets/falling-blossoms/blossom-1.png';
import blossom2 from '../assets/falling-blossoms/blossom-2.png';
import blossom3 from '../assets/falling-blossoms/blossom-3.png';
import blossom4 from '../assets/falling-blossoms/blossom-4.png';
import blossom5 from '../assets/falling-blossoms/blossom-5.png';

const blossomImages = [blossom1, blossom2, blossom3, blossom4, blossom5];

interface FallingBlossomsProps {
  layer: 'front' | 'back';
}

export function FallingBlossoms({ layer }: FallingBlossomsProps) {
  const [blossoms, setBlossoms] = useState<Array<{
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    delay: number;
    duration: number;
    scale: number;
    imageIndex: number;
    swayDuration: number;
    swayAmplitude: number;
    rotateXDuration: number;
    rotateYDuration: number;
    rockingAmplitude: number;
    rockingAmplitudeX: number;
    fadeOutStart: number;
  }>>([]);

  useEffect(() => {
    const count = layer === 'front' ? 10 : 17; // Reduced by ~30% (was 15/25)
    const newBlossoms = Array.from({ length: count }).map((_, i) => {
      // Determine start position
      // 30% chance to start off-screen left (-15% to 0%)
      // 70% chance to start in branch area (0% to 40%)
      const isOffScreen = Math.random() < 0.3;
      const startX = isOffScreen
        ? Math.random() * 15 - 15
        : Math.random() * 40;

      // Start between 30.5vh and 50vh from top (relative to branch)
      const startY = 30.5 + Math.random() * 19.5;

      // Calculate end position based on angle (15 to 45 degrees)
      const angleDeg = 15 + Math.random() * 30;

      // Horizontal drift calculation mapped from angle
      // 15 deg -> ~25% drift
      // 45 deg -> ~100% drift
      const driftPercent = 25 + ((angleDeg - 15) / 30) * 75;

      const endX = startX + driftPercent;

      // Vertical drop is approx 80vh (from ~45vh to ~125vh)
      const endY = 120 + Math.random() * 10;

      return {
        id: i,
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        delay: Math.random() * 30,
        duration: 30 + Math.random() * 20, // Gentle, tranquil speed
        scale: 0.5 + Math.random() * 0.5,
        imageIndex: Math.floor(Math.random() * blossomImages.length),
        swayDuration: 4 + Math.random() * 4,
        swayAmplitude: 20 + Math.random() * 30,
        rotateXDuration: 6 + Math.random() * 6, // Similar speed to rotateY
        rotateYDuration: 5 + Math.random() * 5, // Faster oscillation for rocking (5-10s)
        rockingAmplitude: 30 + Math.random() * 30, // Rocking angle (30-60 degrees)
        rockingAmplitudeX: 25 + Math.random() * 25, // Similar amplitude for X axis
        // Randomize fade out start between 60% and 85% of the animation duration
        // This corresponds roughly to the last 25vh of the fall
        fadeOutStart: 0.6 + Math.random() * 0.25,
      };
    });
    setBlossoms(newBlossoms);
  }, [layer]);

  return (
    <div className="falling-blossoms-container" style={{ perspective: '1000px' }}>
      {blossoms.map((blossom) => (
        <motion.div
          key={blossom.id}
          className="falling-blossom-wrapper"
          style={{
            width: '30px',
            height: 'auto',
            transformStyle: 'preserve-3d',
          }}
          initial={{ top: `${blossom.startY}vh`, left: `${blossom.startX}%`, opacity: 0 }}
          animate={{
            top: `${blossom.endY}vh`,
            left: `${blossom.endX}%`,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: blossom.duration,
            repeat: Infinity,
            delay: blossom.delay,
            ease: 'linear',
            // Fade in quickly (0-10%), stay visible, fade out starting at randomized time
            times: [0, 0.1, blossom.fadeOutStart, 1],
          }}
        >
          {/* Inner container for swaying and 3D rotation */}
          <motion.div
            style={{ transformStyle: 'preserve-3d' }}
            animate={{
              x: [-blossom.swayAmplitude, blossom.swayAmplitude, -blossom.swayAmplitude],
              rotateX: [-blossom.rockingAmplitudeX, blossom.rockingAmplitudeX, -blossom.rockingAmplitudeX], // Rocking motion X
              rotateY: [-blossom.rockingAmplitude, blossom.rockingAmplitude, -blossom.rockingAmplitude], // Rocking motion Y
              rotateZ: [0, 360], // Slow gentle spin for orientation
            }}
            transition={{
              x: {
                duration: blossom.swayDuration,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotateX: {
                duration: blossom.rotateXDuration,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotateY: {
                duration: blossom.rotateYDuration,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotateZ: {
                duration: blossom.duration * 1.5, // Even slower Z rotation
                repeat: Infinity,
                ease: "linear",
              }
            }}
          >
            <motion.img
              src={blossomImages[blossom.imageIndex]}
              alt="Falling blossom"
              className="falling-blossom-image"
              style={{
                scale: blossom.scale,
                backfaceVisibility: 'visible', // Ensure visible from both sides
                // Removed blur filter for sharper edges
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
