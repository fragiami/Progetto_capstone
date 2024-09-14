import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from './assets/logo_png.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Stato per gestire l'apertura del menu

    const handleLinkClick = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Inverte lo stato del menu
    };

    const closeMenu = () => {
        setIsMenuOpen(false); // Chiude il menu
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <img src={Logo} alt="Little Lemon Logo" className="logo-image" />
                </div>
                {/* Menu di navigazione per schermi grandi */}
                <nav className="nav-desktop">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleLinkClick}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleLinkClick}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleLinkClick}>Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleLinkClick}>Reservation</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleLinkClick}>Order Online</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleLinkClick}>Login</Link>
                        </li>
                    </ul>
                </nav>
                {/* Icona del burger menu */}
                <div className="burger-menu" onClick={toggleMenu}>
                    <span className="burger-bar"></span>
                    <span className="burger-bar"></span>
                    <span className="burger-bar"></span>
                </div>
            </div>
            {/* Overlay del menu per schermi piccoli */}
            <div className={`overlay-menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className="overlay-menu-list">
                    <li className="overlay-menu-item">
                        <Link to="/" className="overlay-menu-link" onClick={closeMenu}>Home</Link>
                    </li>
                    <li className="overlay-menu-item">
                        <Link to="/" className="overlay-menu-link" onClick={closeMenu}>About</Link>
                    </li>
                    <li className="overlay-menu-item">
                        <Link to="/" className="overlay-menu-link" onClick={closeMenu}>Menu</Link>
                    </li>
                    <li className="overlay-menu-item">
                        <Link to="/" className="overlay-menu-link" onClick={closeMenu}>Reservation</Link>
                    </li>
                    <li className="overlay-menu-item">
                        <Link to="/" className="overlay-menu-link" onClick={closeMenu}>Order Online</Link>
                    </li>
                    <li className="overlay-menu-item">
                        <Link to="/" className="overlay-menu-link" onClick={closeMenu}>Login</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
