import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="w-full bg-red-900 text-white pt-8 pb-4">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-around mb-8">
                    {/* Quick Links Section */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2">
                                <span className="text-yellow-400 mr-2">•</span>
                                <button 
                                    onClick={() => navigate('/about')}
                                    className="text-yellow-400 hover:underline"
                                >
                                    About Us
                                </button>
                            </li>
                            <li className="mb-2">
                                <span className="text-yellow-400 mr-2">•</span>
                                <button 
                                    onClick={() => navigate('/gallery')}
                                    className="text-yellow-400 hover:underline"
                                >
                                    Gallery
                                </button>
                            </li>
                            <li className="mb-2">
                                <span className="text-yellow-400 mr-2">•</span>
                                <button 
                                    onClick={() => navigate('/venues')}
                                    className="text-yellow-400 hover:underline"
                                >
                                    Venues
                                </button>
                            </li>
                            <li className="mb-2">
                                <span className="text-yellow-400 mr-2">•</span>
                                <button 
                                    onClick={() => navigate('/contact')}
                                    className="text-yellow-400 hover:underline"
                                >
                                    Contact Us
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                        <div className="mb-3">
                            <p>Call us for services:</p>
                            <p className="text-yellow-400">+977 9841642233</p>
                        </div>
                        <div className="mb-3">
                            <p>Email Us:</p>
                            <a 
                                href="mailto:info@yourwebsite.com" 
                                className="text-yellow-400 hover:underline"
                            >
                                info@yourwebsite.com
                            </a>
                        </div>
                        <div>
                            <p>Location:</p>
                            <p>Kathmandu, Nepal</p>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="border-t border-gray-600 my-4"></div>

                {/* Bottom Footer Section */}
                <div className="text-center mt-6">
                    <p className="text-yellow-400 text-xl mb-4">yourwebsite.com</p>
                    
                    <button 
                        onClick={() => navigate('/contact')}
                        className="border border-white rounded-full px-6 py-2 hover:bg-white hover:text-red-900 transition-colors mb-6"
                    >
                        CONTACT US
                    </button>
                    
                    <div className="text-center">
                        <p className="text-yellow-400">We are HERE</p>
                        <p>for your every needs</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;