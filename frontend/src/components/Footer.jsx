import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
        <div className="footer-content">
            {/* Quick Links Section */}
            <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/venues">Venues</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            </div>

            {/* Contact Information Section */}
            <div className="footer-section">
            <h3>Contact Information</h3>
            <div className="contact-info">
                <p>Call us for services:</p>
                <p><a href="tel:+9779841642233">+977 9841642233</a></p>
            </div>
            <div className="contact-info">
                <p>Email Us:</p>
                <p><a href="mailto:info@yourwebsite.com">info@yourwebsite.com</a></p>
            </div>
            <div className="contact-info">
                <p>Location:</p>
                <p>Kathmandu, Nepal</p>
            </div>
            </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
            <h2>yourwebsite.com</h2>
            <Link to="/contact" className="contact-button">CONTACT US</Link>
            <p>We are HERE<br />for your every needs</p>
        </div>
        </footer>
    );
};

export default Footer;