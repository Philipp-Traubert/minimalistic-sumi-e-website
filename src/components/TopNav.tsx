import logo from '../assets/logo.png';

export function TopNav() {
    return (
        <nav className="top-nav">
            <div className="top-nav-logo-container">
                <img src={logo} alt="Loslassen Logo" className="top-nav-logo" />
            </div>
            {/* Placeholder for future nav items */}
            <div className="top-nav-items">

            </div>
        </nav>
    );
}
