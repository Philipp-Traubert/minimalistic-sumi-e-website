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
    has3D: boolean;
    fadeOutStart: number;
  }>>([]);

  useEffect(() => {
    const count = layer === 'front' ? 5 : 8;
    const newBlossoms = Array.from({ length: count }).map((_, i) => {
      // Determine start position
      // 30% chance to start off-screen left (-15% to 0%)
      // 70% chance to start in branch area (0% to 40%)
      const isOffScreen = Math.random() < 0.3;
      const startX = isOffScreen
        ? Math.random() * 15 - 15
        : Math.random() * 40;

      // Start lower so petals emerge from the branch area instead of above it
      const startY = 40.5 + Math.random() * 19.5;

      // Calculate end position based on angle (15 to 45 degrees)
      const angleDeg = 15 + Math.random() * 30;

      // Horizontal drift calculation mapped from angle
      // 15 deg -> ~25% drift
      // 45 deg -> ~100% drift
      const driftPercent = 25 + ((angleDeg - 15) / 30) * 75;

      const endX = startX + driftPercent;

      // Vertical drop is approx 80vh (from ~45vh to ~125vh)
      const endY = 120 + Math.random() * 10;

      const has3D = true;

      return {
        id: i,
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        delay: Math.random() * 24,
        duration: 34 + Math.random() * 14,
        scale: 0.72 + Math.random() * 0.18,
        imageIndex: Math.floor(Math.random() * blossomImages.length),
        swayDuration: 5 + Math.random() * 3,
        swayAmplitude: has3D ? 10 + Math.random() * 14 : 12 + Math.random() * 10,
        rotateXDuration: has3D ? 8 + Math.random() * 4 : 0,
        rotateYDuration: has3D ? 7 + Math.random() * 4 : 0,
        rockingAmplitude: has3D ? 10 + Math.random() * 10 : 0,
        rockingAmplitudeX: has3D ? 8 + Math.random() * 8 : 0,
        has3D,
        fadeOutStart: 0.84 + Math.random() * 0.1,
      };
    });
    setBlossoms(newBlossoms);
  }, [layer]);

  return (
    <div className="falling-blossoms-container" style={{ perspective: '800px', overflow: 'visible' }}>
      {blossoms.map((blossom) => (
        <motion.div
          key={blossom.id}
          className="falling-blossom-wrapper"
          style={{
            width: '30px',
            height: 'auto',
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
          <motion.div
            style={blossom.has3D ? { transformStyle: 'preserve-3d' } : undefined}
            animate={{
              x: [-blossom.swayAmplitude, blossom.swayAmplitude, -blossom.swayAmplitude],
              rotateX: blossom.has3D
                ? [-blossom.rockingAmplitudeX, blossom.rockingAmplitudeX, -blossom.rockingAmplitudeX]
                : 0,
              rotateY: blossom.has3D
                ? [-blossom.rockingAmplitude, blossom.rockingAmplitude, -blossom.rockingAmplitude]
                : 0,
              z: blossom.has3D ? [-10, 10, -10] : 0,
              rotateZ: blossom.has3D ? [0, 120, 240, 360] : [0, 180, 360],
            }}
            transition={{
              x: {
                duration: blossom.swayDuration,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotateX: blossom.has3D
                ? {
                    duration: blossom.rotateXDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0 },
              rotateY: blossom.has3D
                ? {
                    duration: blossom.rotateYDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0 },
              z: blossom.has3D
                ? {
                    duration: blossom.swayDuration * 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0 },
              rotateZ: {
                duration: blossom.has3D ? blossom.duration * 2.2 : blossom.duration * 1.8,
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
                backfaceVisibility: blossom.has3D ? 'visible' : undefined,
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
