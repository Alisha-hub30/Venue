import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
        <div className="navbar-container">
            <div className="logo">VENUE</div>
            <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/venues">Venues</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login" className="signin-btn">
                Sign in <span>→</span>
            </Link>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;