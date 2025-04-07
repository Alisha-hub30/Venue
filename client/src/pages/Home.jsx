import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// Updated Service Card Component with horizontal layout
const ServiceCard = ({ img, title, description, bgColor, textColor }) => {
    return (
        <div className={`flex rounded-lg overflow-hidden ${bgColor} ${textColor}`}>
            {/* Text Content */}
            <div className="flex-1 p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="opacity-90">{description}</p>
            </div>
            
            {/* Image Section - Takes up right side */}
            <div className="w-1/2">
                <img 
                    src={img} 
                    alt={title.replace(' »', '')}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}

const Home = () => {
    const navigate = useNavigate();

    // Sample gallery images - replace with your actual images
    const galleryImages = [
        "/LandingPhoto.jpg",
        "/LandingPhoto.jpg",
        "/LandingPhoto.jpg",
        "/LandingPhoto.jpg"
    ];

    return (
        <div className='flex flex-col min-h-screen bg-amber-50'>
            {/* Navbar */}
            <Navbar/>
            
            {/* Main Content Container - adding top margin to account for fixed navbar */}
            <div className="mt-20"> {/* This margin accounts for the fixed navbar height */}
                {/* Hero Section */}
                <section className="py-50 px-4 bg-[url('/LandingPhoto.jpg')] bg-cover bg-center">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2">
                            Plan Your Dream Wedding With Us
                        </h1>
                        <p className="text-gray-600">We ensure every detail is perfect.</p>
                    </div>
                </section>
                
                {/* About Us Section */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
                    <h2 className="text-2xl md:text-3xl font-semibold text-red-900 text-center mb-8">
                        About Us
                    </h2>
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-gray-700 mb-4">
                            A wedding is such a special and intimate occasion. We help construct dream moments to life. As 
                            couples, we firmly believe, deserve to have a wedding that they can not only cherish and remember 
                            fondly.
                        </p>
                        <p className="text-gray-700 mb-6">
                            HariMaun is a Nepal Wedding website where you find the best wedding vendors under your budget. 
                            Check prices, get verified ratings, and chat back-and-forth by the vendors to seal your deal to 
                            completion.
                        </p>
                        <button 
                            onClick={() => navigate('/about')}
                            className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-800 transition-colors"
                        >
                            Learn More About Us
                        </button>
                    </div>
                </section>
                
                {/* Services Section - Updated for better aesthetics */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-amber-50">
                    <h2 className="text-2xl md:text-3xl font-semibold text-red-900 text-center mb-2">
                        Our Services
                    </h2>
                    <p className="text-center text-gray-700 mb-8">One Stop Solutions: 360 Services Expertises</p>
                    
                    {/* Services Grid - Optimized spacing and layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        <ServiceCard 
                            img="/LandingPhoto.jpg"
                            title="Photography & Videography »"
                            description="Photography and Videography"
                            bgColor="bg-amber-800"
                            textColor="text-white"
                        />
                        
                        <ServiceCard 
                            img="/LandingPhoto.jpg"
                            title="Makeup »"
                            description="Bridal Makeup & Family Makeup"
                            bgColor="bg-red-700"
                            textColor="text-white"
                        />
                        
                        <ServiceCard 
                            img="/LandingPhoto.jpg"
                            title="Clothing »"
                            description="Bridal Lehenga, Saree, Groom Suit"
                            bgColor="bg-pink-500"
                            textColor="text-white"
                        />
                        
                        <ServiceCard 
                            img="/LandingPhoto.jpg"
                            title="Venue »"
                            description="Banquet, Party Palace, Hotel, Restaurant"
                            bgColor="bg-blue-800"
                            textColor="text-white"
                        />
                        
                        <ServiceCard 
                            img="/LandingPhoto.jpg"
                            title="Baja (Music) »"
                            description="Feel Music Around You"
                            bgColor="bg-green-600"
                            textColor="text-white"
                        />
                        
                        <ServiceCard 
                            img="/LandingPhoto.jpg"
                            title="Decorations »"
                            description="Stage, Mehendi, Mandap"
                            bgColor="bg-stone-300"
                            textColor="text-black"
                        />
                        
                        <ServiceCard 
                            img="/LandingPhoto.jpg"
                            title="Invitation Cards »"
                            description="Wedding Cards"
                            bgColor="bg-stone-300"
                            textColor="text-black"
                        />
                    </div>
                    
                    <div className="text-center mt-10">
                        <button 
                            onClick={() => navigate('/services')}
                            className="bg-red-900 text-white px-8 py-3 rounded hover:bg-red-800 transition-colors font-medium"
                        >
                            View All Services
                        </button>
                    </div>
                </section>
                
                {/* Gallery Section */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
                    <h2 className="text-2xl md:text-3xl font-semibold text-red-900 text-center mb-8">
                        GALLERY
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {galleryImages.map((image, index) => (
                            <div key={index} className="rounded-lg overflow-hidden shadow-md">
                                <img 
                                    src={image} 
                                    alt={`Wedding Gallery ${index + 1}`} 
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-wedding.jpg";
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-8">
                        <button 
                            onClick={() => navigate('/gallery')}
                            className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-800 transition-colors"
                        >
                            View More
                        </button>
                    </div>
                </section>
            </div>
            
            <Footer/>
        </div>
    )
}

export default Home