
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
        <div className="navbar-logo">
            <a href="/" className="logo">MyWebsite</a>
        </div>
        <ul className="navbar-list">
            <li className="navbar-item"><a href="/" className="navbar-link">Home</a></li>
            <li className="navbar-item"><a href="/about" className="navbar-link">About</a></li>
            <li className="navbar-item"><a href="/services" className="navbar-link">Services</a></li>
            <li className="navbar-item"><a href="/contact" className="navbar-link">Contact</a></li>
            <li className="navbar-item"><a href="/login" className="navbar-link">Login</a></li>
        </ul>
        </nav>
    );
};

export default Navbar;
