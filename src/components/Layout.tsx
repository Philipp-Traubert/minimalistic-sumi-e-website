import { ReactNode } from 'react';
import { FallingBlossoms } from './FallingBlossoms';
import paperTexture from 'figma:asset/b67594e9b3c439245fdadadaacf25076d0420eda.png';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="layout-container">
            {/* Paper Texture Background with 15% opacity */}
            <div
                className="paper-texture"
                style={{ backgroundImage: `url(${paperTexture})` }}
            />

            {/* Falling Blossoms - Behind Text Layer */}
            <div className="blossoms-layer" style={{ zIndex: 1 }}>
                <FallingBlossoms layer="back" />
            </div>

            {/* Main Content */}
            <div className="content-layer">
                {children}
            </div>

            {/* Falling Blossoms - In Front of Text Layer */}
            <div className="blossoms-layer" style={{ zIndex: 3 }}>
                <FallingBlossoms layer="front" />
            </div>
        </div>
    );
}
