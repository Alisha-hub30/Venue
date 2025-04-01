'use client';
import './About.css';

export default function About() {
    return (
        <div className="about-container">
            {/* Hero Section */}
            <div className="about-hero">
                <h1>About Venue</h1>
                <div className="breadcrumb">
                    <a href="/">Home</a> &gt; <span>About us</span>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="main-content">
                <h2 className="section-title">One-Stop-Shop</h2>
                
                <div className="about-description">
                    <p>
                        A celebration is such a special and intimate occasion; a carefully constructed dream brought to life. All individuals, we firmly believe, deserve to have a celebration that they can not only cherish and remember fondly. Celebration Station is a comprehensive event planning website where you find the best event vendors according to your budget. Check prices, get verified reviews, and check work done by the vendors to secure your celebration. Save your time for unnecessary hassles.
                    </p>
                    <p>
                        Celebration Station is a One-Stop-Shop where you get the best photographers, makeup artists, event cards, decor, venues, catering, rental services, and decorations for the best prices. Also, get event ideas and inspiration from our blog and real events.
                    </p>
                    <p>
                        Planning events can be stressful when it comes to pre-event planning, venue selection, decorations, catering, and searching for services at the last minute. We understand that a special occasion for you cannot be an experiment with things that can turn into a disaster. Compare the price and quality of all vendors and select the one that suits your budget. Save your time at the click of a button. Celebration Station is not limited to weddings, it can be useful for other events like corporate functions, birthday parties, baby showers, office events, or any celebration related to photography, makeup, venues, and rental.
                    </p>
                </div>
                
                {/* Mission and Vision */}
                <div className="mission-vision-container">
                    <div className="mission-box">
                        <h3>OUR MISSION</h3>
                        <p>
                            Every event starts with organized details. Our mission is to help our clients to find the best vendor with up-to-date information under their budget while making everyone feel valued, celebrated and relaxed. Lets not let our client compromise on their celebration with limited resources and services. Vendors all over can join us and get the right customers to grow your business.
                        </p>
                    </div>
                    
                    <div className="vision-box">
                        <h3>OUR VISION</h3>
                        <p>
                            To deepen our relationship with vendors and explore innovative trends. We aim to provide a highly responsive platform to be the preferred service provider in the event management circle. There will be continual development of both staff and technology to bring the most effective techniques to plan and create memories of a lifetime, with each event exceeding everyones expectations.
                        </p>
                    </div>
                </div>
                
                {/* Call to Action */}
                <div className="cta-section">
                    <h2>Build Your Event Today!</h2>
                    <p>
                        We collaborate with you to co-create remarkable events that achieve your goals. 
                        Explore our services and when you are ready a member of our events team would love the chance to help get you started.
                    </p>
                    <div className="cta-buttons">
                        <a href="/services" className="cta-button">OUR SERVICES »</a>
                        <a href="/contact" className="cta-button">GET IN TOUCH »</a>
                    </div>
                </div>
                
                {/* Advantages */}
                <div className="advantages-section">
                    <div className="advantages-header">
                        <p className="small-heading">Why choose us</p>
                        <h2>Celebration Stations advantages</h2>
                    </div>
                    
                    <div className="advantages-grid">
                        <div className="advantage-card">
                            <div className="advantage-icon">🏪</div>
                            <h4>One-Stop-Shop for your events</h4>
                        </div>
                        
                        <div className="advantage-card">
                            <div className="advantage-icon">⏱️</div>
                            <h4>Save your time for unnecessary hassles</h4>
                        </div>
                        
                        <div className="advantage-card">
                            <div className="advantage-icon">📋</div>
                            <h4>Compare vendors price and quality accordingly</h4>
                        </div>
                        
                        <div className="advantage-card">
                            <div className="advantage-icon">✅</div>
                            <h4>Get verified reviews and work done by vendors</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}