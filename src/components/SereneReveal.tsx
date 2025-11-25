import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface SereneRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

/**
 * SereneReveal combines InkSplashHeading and ScrollReveal behaviors
 * - If element is in viewport on mount: animates immediately (like InkSplashHeading)
 * - If element is below fold: waits for scroll (like ScrollReveal)
 * Both cases use the same serene transition timing
 */
export function SereneReveal({ children, delay = 0, className = '' }: SereneRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isInViewportOnMount, setIsInViewportOnMount] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if element is in viewport on mount
        const checkInitialVisibility = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                const inViewport = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );

                if (inViewport) {
                    // Element is visible on mount - animate immediately after delay
                    setIsInViewportOnMount(true);
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                } else {
                    // Element is not visible - use IntersectionObserver
                    setIsInViewportOnMount(false);
                }
            }
        };

        // Small delay to ensure layout is stable
        const timer = setTimeout(checkInitialVisibility, 50);

        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        // Only set up observer if element wasn't visible on mount
        if (isInViewportOnMount) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        // Add delay before showing
                        setTimeout(() => {
                            setIsVisible(true);
                        }, delay);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: '0px 0px -50px 0px', // Start animation slightly before element enters viewport
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [delay, isVisible, isInViewportOnMount]);

    return (
        <div ref={elementRef} className={className}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 1.8,
                    ease: [0.23, 1, 0.32, 1], // Serene easing curve
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}