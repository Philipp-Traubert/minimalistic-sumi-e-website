import logo from '../assets/logo.png';

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
                <div className="footer-copyright">
                    <p className="footer-text">
                        © {currentYear} loslasszen • Created with love by Philipp Traubert
                    </p>
                </div>
            </div>
        </footer>
    );
}
