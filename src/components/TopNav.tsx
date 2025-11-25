import logo from '../assets/logo.png';
import { GradientButton } from './GradientButton';

export function TopNav() {
    return (
        <nav className="top-nav">
            <div className="top-nav-logo-container">
                <img src={logo} alt="Loslassen Logo" className="top-nav-logo" />
            </div>
            <div className="top-nav-items" aria-hidden="true">
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
