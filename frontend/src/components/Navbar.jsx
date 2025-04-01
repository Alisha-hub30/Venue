import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">VENUE</div>
                
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? '✕' : '☰'}
                </button>
                
                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    <Link to="/login" className="signin-btn" onClick={() => setIsMenuOpen(false)}>
                        Sign in <span>→</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;