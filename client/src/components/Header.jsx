import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    // Sample image URL for demo - replace with your actual images
    const venueImage = "/api/placeholder/400/320";
    
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="py-16 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2">
                    Plant Your Dream Wedding With Us
                </h1>
                <p className="text-gray-600 mb-8">
                    We ensure every detail is perfect.
                </p>
            </section>

            {/* About Us Section */}
            <section className="py-12 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-red-900 text-center mb-6">
                    About Us
                </h2>
                <div className="text-center max-w-3xl mx-auto">
                    <p className="mb-4 text-gray-700">
                        A wedding is such a special and intimate occasion. We work with couples to create bespoke dream moments to life. As couples, we firmly believe, deserve to have a wedding that they can not only cherish and remember fondly.
                    </p>
                    <p className="mb-6 text-gray-700">
                        Wediaver is a Nepal Wedding website where you find the best wedding vendors under your budget. Check photos, get vendor reviews, and chat back-and-forth by the vendors to save your time for wedding planning. 
                    </p>
                    <button 
                        onClick={() => navigate('/about')}
                        className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800"
                    >
                        Learn More About Us
                    </button>
                </div>
            </section>

            {/* Our Services Section */}
            <section className="py-12 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-red-900 text-center mb-3">
                    Our Services
                </h2>
                <p className="text-center mb-8 text-gray-700">
                    One Stop Solutions: 360 Services Expertises
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Photography Service */}
                    <div className="relative overflow-hidden rounded">
                        <img 
                            src={venueImage} 
                            alt="Photography" 
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-pink-500 text-white p-4 w-1/2 h-full">
                            <h3 className="font-semibold mb-1">Photography +</h3>
                            <p className="text-sm">Photography and Videography</p>
                        </div>
                    </div>

                    {/* Makeup Service */}
                    <div className="relative overflow-hidden rounded">
                        <img 
                            src={venueImage} 
                            alt="Makeup" 
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-red-600 text-white p-4 w-1/2 h-full">
                            <h3 className="font-semibold mb-1">Makeup +</h3>
                            <p className="text-sm">Bridal tier & Party Makeup</p>
                        </div>
                    </div>

                    {/* Clothing Service */}
                    <div className="relative overflow-hidden rounded">
                        <img 
                            src={venueImage} 
                            alt="Clothing" 
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-pink-400 text-white p-4 w-1/2 h-full">
                            <h3 className="font-semibold mb-1">Clothing +</h3>
                            <p className="text-sm">Retail collections, Dress, Gown & all</p>
                        </div>
                    </div>

                    {/* Venue Service */}
                    <div className="relative overflow-hidden rounded">
                        <img 
                            src={venueImage} 
                            alt="Venue" 
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-blue-800 text-white p-4 w-1/2 h-full">
                            <h3 className="font-semibold mb-1">Venue +</h3>
                            <p className="text-sm">Banquet, Party Palaces, Hotels Resorts</p>
                        </div>
                    </div>

                    {/* Baja Service */}
                    <div className="relative overflow-hidden rounded">
                        <img 
                            src={venueImage} 
                            alt="Baja" 
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-green-600 text-white p-4 w-1/2 h-full">
                            <h3 className="font-semibold mb-1">Baja (Music) +</h3>
                            <p className="text-sm">Folk Music, Sound System</p>
                        </div>
                    </div>

                    {/* Decorations Service */}
                    <div className="relative overflow-hidden rounded">
                        <img 
                            src={venueImage} 
                            alt="Decorations" 
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-yellow-800 text-white p-4 w-1/2 h-full">
                            <h3 className="font-semibold mb-1">Decorations +</h3>
                            <p className="text-sm">Venue, Hall, Stage Setup</p>
                        </div>
                    </div>

                    {/* Invitation Card Service */}
                    <div className="relative overflow-hidden rounded mx-auto col-span-1 md:col-span-2 lg:col-span-1 lg:col-start-2">
                        <img 
                            src={venueImage} 
                            alt="Invitation Card" 
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-yellow-700 text-white p-4 w-1/2 h-full">
                            <h3 className="font-semibold mb-1">Invitation Card</h3>
                            <p className="text-sm">Wedding Cards</p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <button 
                        onClick={() => navigate('/services')}
                        className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800"
                    >
                        View All Services
                    </button>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-12 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-red-900 text-center mb-8">
                    GALLERY
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <img src={venueImage} alt="Gallery 1" className="w-full h-40 object-cover rounded" />
                    <img src={venueImage} alt="Gallery 2" className="w-full h-40 object-cover rounded" />
                    <img src={venueImage} alt="Gallery 3" className="w-full h-40 object-cover rounded" />
                    <img src={venueImage} alt="Gallery 4" className="w-full h-40 object-cover rounded" />
                </div>

                <div className="text-center">
                    <button 
                        onClick={() => navigate('/gallery')}
                        className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800"
                    >
                        View More
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Header;