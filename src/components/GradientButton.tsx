import { useRef, useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import '../styles/main.css'; // Ensure styles are available

const HIGHLIGHT_SETTLE_DURATION_MS = 700;

interface GradientButtonProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    target?: string;
    rel?: string;
    onClick?: () => void;
}

export function GradientButton({ children, className, href, target, rel, onClick }: GradientButtonProps) {
    const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const enterTimeoutRef = useRef<number | null>(null);
    const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [highlightMode, setHighlightMode] = useState<'idle' | 'entering' | 'tracking'>('idle');

    // Initialize gradient position to left edge, vertically centered
    useEffect(() => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            setPosition({ x: 0, y: rect.height / 2 });
        }
    }, []);

    useEffect(() => {
        return () => {
            if (enterTimeoutRef.current !== null) {
                window.clearTimeout(enterTimeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        lastPointerRef.current = { x, y };
        setHighlightMode('entering');
        setPosition({ x, y });

        if (enterTimeoutRef.current !== null) {
            window.clearTimeout(enterTimeoutRef.current);
        }

        enterTimeoutRef.current = window.setTimeout(() => {
            setHighlightMode((current) => {
                if (current !== 'entering') return current;
                if (lastPointerRef.current) {
                    setPosition(lastPointerRef.current);
                }
                return 'tracking';
            });
            enterTimeoutRef.current = null;
        }, HIGHLIGHT_SETTLE_DURATION_MS);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        lastPointerRef.current = { x, y };

        if (highlightMode !== 'tracking') return;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        if (!elementRef.current) return;

        if (enterTimeoutRef.current !== null) {
            window.clearTimeout(enterTimeoutRef.current);
            enterTimeoutRef.current = null;
        }

        setHighlightMode('idle');
        lastPointerRef.current = null;
        const rect = elementRef.current.getBoundingClientRect();
        // Return to left edge, vertically centered
        setPosition({ x: 0, y: rect.height / 2 });
    };

    const highlightTransitionDuration =
        highlightMode === 'tracking' ? '0s' : `${HIGHLIGHT_SETTLE_DURATION_MS}ms`;

    const commonProps = {
        className: `gradient-button ${className || ''}`,
        onMouseEnter: handleMouseEnter,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: {
            '--x': `${position.x}px`,
            '--y': `${position.y}px`,
            '--highlight-transition-duration': highlightTransitionDuration,
        } as CSSProperties,
    };

    const content = (
        <>
            <span className="gradient-button-content">{children}</span>
            <div className="gradient-button-highlight" aria-hidden="true" />
        </>
    );

    // Render as link if href is provided
    if (href) {
        return (
            <a
                ref={elementRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                target={target}
                rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
                {...commonProps}
            >
                {content}
            </a>
        );
    }

    // Render as button otherwise
    return (
        <button
            ref={elementRef as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            {...commonProps}
        >
            {content}
        </button>
    );
}
