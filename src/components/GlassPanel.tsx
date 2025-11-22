import { type PointerEvent, type ReactNode, useRef } from 'react';

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const panel = panelRef.current;
        if (!panel) return;

        const rect = panel.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const percentX = (x / rect.width) - 0.5;
        const percentY = (y / rect.height) - 0.5;

        panel.style.setProperty('--tilt-x', `${percentY * -6}deg`);
        panel.style.setProperty('--tilt-y', `${percentX * 6}deg`);
        panel.style.setProperty('--float-x', `${percentX * 10}px`);
        panel.style.setProperty('--float-y', `${percentY * 10}px`);
    };

    const resetTilt = () => {
        const panel = panelRef.current;
        if (!panel) return;

        panel.style.setProperty('--tilt-x', '0deg');
        panel.style.setProperty('--tilt-y', '0deg');
        panel.style.setProperty('--float-x', '0px');
        panel.style.setProperty('--float-y', '0px');
        panel.style.setProperty('--content-z', '0px');
        panel.classList.remove('is-active');
    };

    const handlePointerEnter = () => {
        const panel = panelRef.current;
        if (!panel) return;
        panel.classList.add('is-active');
        panel.style.setProperty('--content-z', '32px');
    };

    return (
        <div
            ref={panelRef}
            className={`glass-panel ${className}`}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={resetTilt}
        >
            <div className="glass-panel-content">
                {children}
            </div>
        </div>
    );
}
