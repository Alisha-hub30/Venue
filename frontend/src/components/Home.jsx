"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    
    const services = [
        {
            title: "Venue",
            subtitle: "Banquet, Party Palace, Hotel",
            image: "/Image/image1.png",
            bgColor: "bg-olive",
        },
        {
            title: "Makeup",
            subtitle: "Bridal Makeup, Family Makeup",
            image: "/Image/image2.png",
            bgColor: "bg-maroon",
        },
        {
            title: "Decor",
            subtitle: "Stage, Mandap",
            image: "/Image/image3.png",
            bgColor: "bg-navy",
        },
        {
            title: "Entertainment",
            subtitle: "DJ, Music, Microphone",
            image: "/Image/image1.png",
            bgColor: "bg-blue",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="home-page">
            {/* Header Section */}
            <div className="header-section">
                {/* Left Section: Heading */}
                <div className="heading-left">
                    <h1>
                        All-in-One Expertise:{" "}
                        <br />
                        <span className="accent-text">Your Forever Service Partner</span>
                    </h1>
                </div>

                {/* Right Section: Description */}
                <div className="description-right">
                    <p>
                        A celebration is a beautiful journey, a joyous moment where dreams
                        come alive. Whether it is a wedding, birthday, corporate event, or
                        any special occasion, we believe everyone deserves a venue that
                        reflects their unique vision and creates lasting memories.
                    </p>
                </div>
            </div>

            {/* Services Section */}
            <div
                ref={sectionRef}
                className={`services-section ${isVisible ? "visible" : "hidden"}`}
            >
                {services.map((service, index) => (
                    <div key={index} className={`service-card ${service.bgColor}`}>
                        {/* Left Text Section */}
                        <div className="text-section">
                            <h2>{service.title}</h2>
                            <p>{service.subtitle}</p>
                        </div>

                        {/* Right Image Section */}
                        <div className="image-section">
                            <img
                                src={service.image}
                                alt={service.title}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* About Section */}
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
                        <Link href="/about" className="cta-button">
                            About Us
                        </Link>
                    </div>
                    <div className="about-image">
                        <img 
                            src="/Image/logo.png" 
                            alt="Celebration Station Logo" 
                            className="logo-img" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}