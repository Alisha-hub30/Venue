import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
    const navigate = useNavigate();

    // Sample wedding service data - you can move this to a separate file later
    const services = [
        {
            id: 1,
            title: 'Photography',
            description: 'Photography and Videography',
            bgColor: 'bg-amber-950',
            textColor: 'text-white'
        },
        {
            id: 2,
            title: 'Makeup',
            description: 'Bridal makeup & styling',
            bgColor: 'bg-red-800',
            textColor: 'text-white'
        },
        {
            id: 3,
            title: 'Clothing',
            description: 'Bridal outfits, Groom look',
            bgColor: 'bg-pink-500',
            textColor: 'text-white'
        },
        {
            id: 4,
            title: 'Venue',
            description: 'Banquet, Party Lawns, Open Spaces',
            bgColor: 'bg-blue-800',
            textColor: 'text-white'
        },
        {
            id: 5,
            title: 'Bags (Music)',
            description: 'Band, Music, Sound etc.',
            bgColor: 'bg-green-700',
            textColor: 'text-white'
        },
        {
            id: 6,
            title: 'Decorations',
            description: 'Decor, Lights, etc.',
            bgColor: 'bg-amber-800',
            textColor: 'text-white'
        },
        {
            id: 7,
            title: 'Invitation Card',
            description: 'Wedding Cards',
            bgColor: 'bg-olive-700',
            textColor: 'text-white'
        }
    ];

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
                            Plant Your Dream Wedding With Us
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
                
                {/* Services Section */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-amber-50">
                    <h2 className="text-2xl md:text-3xl font-semibold text-red-900 text-center mb-2">
                        Our Services
                    </h2>
                    <p className="text-center text-gray-700 mb-8">One Stop Solutions: 360 Services Expertises</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                        {services.map((service) => (
                            <div 
                                key={service.id} 
                                className={`${service.bgColor} ${service.textColor} p-4 rounded-lg relative overflow-hidden`}
                                style={{
                                    backgroundImage: 'url("/LandingPhoto.jpg")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className={`absolute inset-0 ${service.bgColor} opacity-80`}></div>
                                <div className="relative z-10 h-32 flex flex-col justify-between">
                                    <h3 className="text-xl font-semibold">{service.title}</h3>
                                    <p className="text-sm">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-8">
                        <button 
                            onClick={() => navigate('/services')}
                            className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-800 transition-colors"
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
                            <div key={index} className="rounded-lg overflow-hidden">
                                <img 
                                    src={image} 
                                    alt={`Wedding Gallery ${index + 1}`} 
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/api/placeholder/400/320";
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