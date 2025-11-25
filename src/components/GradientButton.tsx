import { useRef, useState, useEffect } from 'react';
import '../styles/main.css'; // Ensure styles are available

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
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Initialize gradient position to left edge, vertically centered
    useEffect(() => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            setPosition({ x: 0, y: rect.height / 2 });
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        // Return to left edge, vertically centered
        setPosition({ x: 0, y: rect.height / 2 });
    };

    const commonProps = {
        className: `gradient-button ${className || ''}`,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: {
            '--x': `${position.x}px`,
            '--y': `${position.y}px`,
        } as React.CSSProperties,
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
