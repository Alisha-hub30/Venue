
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import './Navbar.css';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const handleButtonToggle = () => {
        setShowMenu(!showMenu);
    }
    return (
        <header>
            <div className="container">
                <div className="grid navbar-grid">
                    <div className="logo">
                        <h1>VENUE</h1>
                    </div>
                    <nav className={showMenu ? "menu-mobile" : "menu-web"}>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Register your venue</a>
                            </li>
                            <li>
                                <a href="#">Login</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="ham-menu">
                        <button onClick={handleButtonToggle}>
                            <RxHamburgerMenu />
                        </button>
                    </div>
                </div>
            </div>
        </header>
        // <nav className="navbar">
        // <div className="navbar-logo">
        //     <a href="/" className="logo">MyWebsite</a>
        // </div>
        // <ul className="navbar-list">
        //     <li className="navbar-item"><a href="/" className="navbar-link">Home</a></li>
        //     <li className="navbar-item"><a href="/about" className="navbar-link">About</a></li>
        //     <li className="navbar-item"><a href="/services" className="navbar-link">Services</a></li>
        //     <li className="navbar-item"><a href="/contact" className="navbar-link">Contact</a></li>
        //     <li className="navbar-item"><a href="/login" className="navbar-link">Login</a></li>
        // </ul>
        // </nav>
    );
};

export default Navbar;
