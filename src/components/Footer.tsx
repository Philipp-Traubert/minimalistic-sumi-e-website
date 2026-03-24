import logo from '../assets/logo.png';
import { Impressum } from './Impressum';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-glass">
            <div className="footer-content">
                {/* Logo Section */}
                <div className="footer-logo-section">
                    <img src={logo} alt="Loslassen Logo" className="footer-logo" />
                </div>

                {/* Disclaimer Section */}
                <div className="footer-disclaimer">
                    <p className="footer-text">
                        <strong>Medizinischer Hinweis:</strong> Die angebotenen Leistungen ersetzen keine ärztliche Behandlung oder Therapie.
                        Bei gesundheitlichen Beschwerden konsultieren Sie bitte einen Arzt.
                    </p>
                </div>

                {/* Copyright Section */}
                <div className="footer-copyright flex flex-col items-center gap-3">
                    <p className="footer-text">
                        © {currentYear} loslasszen • Created with love by Philipp Traubert
                    </p>
                    <Impressum />
                </div>
            </div>
        </footer>
    );
}
