import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { GradientButton } from './GradientButton';

const COLLAPSE_BREAKPOINT = '(max-width: 980px)';

export function TopNav() {
    const [docked, setDocked] = useState(false);
    const [compactNav, setCompactNav] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setDocked(window.scrollY > 48);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia(COLLAPSE_BREAKPOINT);

        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            const matches = 'matches' in event ? event.matches : mediaQuery.matches;
            setCompactNav(matches);
            if (!matches) {
                setMenuOpen(false);
            }
        };

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className={`top-nav ${docked ? 'top-nav-docked' : ''} ${compactNav ? 'top-nav-compact' : 'top-nav-wide'} ${menuOpen ? 'top-nav-menu-open' : ''}`}>
            <a href="/#top" className="top-nav-logo-container" aria-label="Zur Startseite springen">
                <img src={logo} alt="Loslassen Logo" className="top-nav-logo" />
            </a>

            <div className="top-nav-items">
                <div className="top-nav-inline-links" aria-hidden={compactNav}>
                    <a href="#bewertungen" className="top-nav-link">Bewertungen</a>
                    <a href="#about-me-heading" className="top-nav-link">Über mich</a>
                </div>

                <div className="top-nav-menu-anchor">
                    <button
                        type="button"
                        className={`top-nav-menu-toggle ${menuOpen ? 'is-open' : ''}`}
                        aria-label={menuOpen ? 'Navigation schließen' : 'Navigation öffnen'}
                        aria-expanded={menuOpen}
                        aria-controls="top-nav-mobile-menu"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <div id="top-nav-mobile-menu" className="top-nav-mobile-menu" aria-hidden={!compactNav || !menuOpen}>
                        <a href="#bewertungen" className="top-nav-mobile-link" onClick={closeMenu}>Bewertungen</a>
                        <a href="#about-me-heading" className="top-nav-mobile-link" onClick={closeMenu}>Über mich</a>
                    </div>
                </div>

                <GradientButton
                    href="https://cal.com/loslasszen"
                    target="_blank"
                >
                    Jetzt Buchen
                </GradientButton>
            </div>
        </nav>
    );
}
