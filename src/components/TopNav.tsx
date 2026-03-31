import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { GradientButton } from './GradientButton';

const COLLAPSE_BREAKPOINT = '(max-width: 980px)';
const DOCK_ON_SCROLL_Y = 64;
const UNDOCK_ON_SCROLL_Y = 20;

export function TopNav() {
    const [docked, setDocked] = useState(false);
    const [compactNav, setCompactNav] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const scrollFrame = useRef<number | null>(null);
    const dockedRef = useRef(false);
    const isHomePage = window.location.pathname.replace(/\/+$/, '') === '' || window.location.pathname.replace(/\/+$/, '') === '/';

    useEffect(() => {
        const updateDockedState = () => {
            const scrollY = window.scrollY;
            const nextDocked = dockedRef.current
                ? scrollY > UNDOCK_ON_SCROLL_Y
                : scrollY > DOCK_ON_SCROLL_Y;

            if (nextDocked !== dockedRef.current) {
                dockedRef.current = nextDocked;
                setDocked(nextDocked);
            }
        };

        const onScroll = () => {
            if (scrollFrame.current !== null) return;
            scrollFrame.current = window.requestAnimationFrame(() => {
                scrollFrame.current = null;
                updateDockedState();
            });
        };

        updateDockedState();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (scrollFrame.current !== null) {
                window.cancelAnimationFrame(scrollFrame.current);
            }
        };
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
                <div className="top-nav-inline-links" aria-hidden={compactNav || !isHomePage}>
                    {isHomePage ? (
                        <>
                            <a href="#bewertungen" className="top-nav-link">Bewertungen</a>
                            <a href="#about-me-heading" className="top-nav-link">Über mich</a>
                        </>
                    ) : (
                        <a href="/" className="top-nav-link">Zur Hauptseite</a>
                    )}
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
                        {isHomePage ? (
                            <>
                                <a href="#bewertungen" className="top-nav-mobile-link" onClick={closeMenu}>Bewertungen</a>
                                <a href="#about-me-heading" className="top-nav-mobile-link" onClick={closeMenu}>Über mich</a>
                            </>
                        ) : (
                            <a href="/" className="top-nav-mobile-link" onClick={closeMenu}>Zur Hauptseite</a>
                        )}
                    </div>
                </div>

                <GradientButton
                    href="https://cal.com/loslasszen"
                    target="_blank"
                >
                    Direkt Buchen
                </GradientButton>
            </div>
        </nav>
    );
}
