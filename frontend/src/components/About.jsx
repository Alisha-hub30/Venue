'use client';
// import Image from 'next/image';
import './About.css';

export default function About() {
    return (
        <div className="about-container">
        <div className="about-content">
            <div className="about-text">
            <h2>Why <span className="accent-text">Celebration Station?</span></h2>
            <div className="description-group">
                <p className="description">
                At Celebration Station, we bring your dream events to life. Discover stunning venues, trusted vendors, and seamless planning—
                all within your budget. Make every celebration unforgettable with us!
                </p>
                <p className="description">
                At Celebration Station, we bring your dream events to life. Discover stunning venues, trusted vendors and seamless planning—
                all within your budget. Make every celebration unforgettable with us!
                </p>
            </div>
            <button className="cta-button">
                About Us
            </button>
            </div>
            <div className="about-image">
            {/* <Image 
                src="/Image/logo.png" 
                alt="Celebration Station Logo" 
                width={800} 
                height={800}
                className="logo-img" 
            /> */}
            </div>
        </div>
        </div>
    );
}