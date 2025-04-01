import { Link } from 'react-router-dom';
import './Home.css'; // We'll create this CSS file next

const HomePage = () => {
    return (
        <>
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Plant Your Dream Wedding With Us</h1>
                    <p className="hero-subtitle">We ensure every detail is perfect.</p>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <h2 className="section-title">About Us</h2>
                    <div className="about-content">
                        <p>
                            A wedding is such a special and intimate celebration; a sweetly constructed dream 
                            brought to life. All couples, we firmly believe, deserve to have a wedding that 
                            they can not only cherish and remember fondly.
                        </p>
                        <p>
                            Wedtayari is a Nepali Wedding website where you find the best wedding vendors 
                            under your budget. Check prices, get verified reviews, and check work done by 
                            the vendors to save your time for unnecessary hassles.
                        </p>
                        {/* <div className="about-btn-container">
                            <a href="/about" className="about-btn">Learn More About Us</a>
                        </div> */}
                    </div>
                    <div className="about-btn-container">
                        <Link to="/about" className="about-btn">Learn More About Us</Link>
                    </div>
                </div>
            </section>

            {/* Our Services Section */}
            <section className="services-section">
    <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-header">
            <h3 className="services-title">One Stop Solutions: 360 Services Expertises</h3>
        </div>
        <div className="services-grid-new">
            {/* Photography Card */}
            <div className="service-card-new photography">
                <div className="service-content">
                    <h4>Photography ...</h4>
                    <p>Photography and Videography</p>
                </div>
                <div className="service-image">
                    <img src="/LandingPhoto.jpg" alt="Photography services" />
                </div>
            </div>
            
            {/* Makeup Card */}
            <div className="service-card-new makeup">
                <div className="service-content">
                    <h4>Makeup &raquo;</h4>
                    <p>Bridal Makeup & Family Makeup</p>
                </div>
                <div className="service-image">
                    <img src="/LandingPhoto.jpg" alt="Makeup services" />
                </div>
            </div>
            
            {/* Clothing Card */}
            <div className="service-card-new clothing">
                <div className="service-content">
                    <h4>Clothing &raquo;</h4>
                    <p>Bridal Lehenga, Saree, Groom Suit</p>
                </div>
                <div className="service-image">
                    <img src="/LandingPhoto.jpg" alt="Clothing services" />
                </div>
            </div>
            
            {/* Venue Card */}
            <div className="service-card-new venue">
                <div className="service-content">
                    <h4>Venue &raquo;</h4>
                    <p>Banquet, Party Palace, Hotel, Restaurant</p>
                </div>
                <div className="service-image">
                    <img src="/LandingPhoto.jpg" alt="Venue services" />
                </div>
            </div>

            {/* Baja (Music) Card */}
            <div className="service-card-new music">
                <div className="service-content">
                    <h4>Baja (Music) &raquo;</h4>
                    <p>Feel Music Around You</p>
                </div>
                <div className="service-image">
                    <img src="/LandingPhoto.jpg" alt="Music services" />
                </div>
            </div>
            
            {/* Decorations Card */}
            <div className="service-card-new decorations">
                <div className="service-content">
                    <h4>Decorations &raquo;</h4>
                    <p>Stage, Mehendi, Mandap</p>
                </div>
                <div className="service-image">
                    <img src="/LandingPhoto.jpg" alt="Decoration services" />
                </div>
            </div>
            
            {/* Invitation Card */}
            <div className="service-card-new invitation">
                <div className="service-content">
                    <h4>Invitation Car...</h4>
                    <p>Wedding Cards</p>
                </div>
                <div className="service-image">
                    <img src="/LandingPhoto.jpg" alt="Invitation services" />
                </div>
            </div>
        </div>
    </div>
    <div className="services-btn-container">
            <a href="/services" className="services-btn">View All Services</a>
        </div>
</section>

            {/* Gallery Section */}
            <section className="gallery-section">
                <div className="container">
                    <h2 className="section-title">GALLERY</h2>
                    <div className="gallery-divider"></div>
                    
                    <div className="gallery-grid">
                        <div className="gallery-item">
                            <img src="\public\LandingPhoto.jpg" alt="Birthday Gallery" />
                            <div className="gallery-overlay">
                                <h3>BIRTHDAY GALLERY</h3>
                            </div>
                        </div>
                        
                        <div className="gallery-item">
                            <img src="\public\LandingPhoto.jpg" alt="Wedding Gallery" />
                            <div className="gallery-overlay">
                                <h3>WEDDING GALLERY</h3>
                            </div>
                        </div>
                        
                        <div className="gallery-item">
                            <img src="\public\LandingPhoto.jpg" alt="Special Occasion Gallery" />
                            <div className="gallery-overlay">
                                <h3>SPECIAL OCCASION GALLERY</h3>
                            </div>
                        </div>
                        
                        <div className="gallery-item">
                            <img src="\public\LandingPhoto.jpg" alt="Corporate Gallery" />
                            <div className="gallery-overlay">
                                <h3>CORPORATE GALLERY</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="gallery-btn-container">
                        <a href="/gallery" className="gallery-btn">View More</a>
                    </div>
                </div>
            </section>

            
        </div>

        </>

    );
};

export default HomePage;