import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Services = () => {
    const navigate = useNavigate()
    
    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Navbar />
            
            <main className="flex-grow pt-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-8">
                    <span 
                        className="hover:text-black cursor-pointer" 
                        onClick={() => navigate('/')}
                    >
                        Home &gt;
                    </span>
                    <span className="text-black font-medium"> Services</span>
                </div>

                {/* Page Title */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-black mb-2">wedtayari.com</h1>
                    <h2 className="text-2xl font-semibold text-gray-600">Services we Provide</h2>
                </div>

                {/* Main Content Section */}
                <section className="mb-12">
                    <div className="space-y-4 text-gray-700 mb-8">
                        <p>
                            Nepali weddings are always stressful when it comes to pre-wedding, Mehendi ceremony, 
                            pre photoshoot, clothing, printing wedding cards, and searching venues at the last minute. 
                            We understand that a wedding is a very special occasion for you and you cannot experiment 
                            with the things that can turn into a disaster. Compare the price and quality of all vendors 
                            and select the one that suits your budget. Save your time at the click of a button. 
                        </p>
                        <p>
                            Wedtayari is not limited to weddings, it can be useful for other events like commercial 
                            photography, portrait photography, baby showers, office events, or any celebration related 
                            to photography, makeup, venues, and rental. It is always free for our clients to browse 
                            information about our vendors. If you are a wedding vendor then you can join our team to 
                            increase your sales. Increase your online exposer and get the right customer to grow your business.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
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
                </section>

                {/* Call to Action */}
                <section className="mb-12 text-center">
                    <h3 className="text-2xl font-bold text-black mb-6">Ready to Plan Your Wedding?</h3>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                        Explore our comprehensive services and start planning your perfect wedding today. 
                        Our team of experts is ready to help you create unforgettable memories.
                    </p>
                    <div className="flex justify-center gap-4 mb-8">
                        <button 
                            onClick={() => navigate('/contact')}
                            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors font-medium"
                        >
                            CONTACT US &gt;&gt;
                        </button>
                        <button 
                            onClick={() => navigate('/about')}
                            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors font-medium"
                        >
                            LEARN ABOUT US &gt;&gt;
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

// Updated Service Card Component with click functionality
const ServiceCard = ({ img, title, description, bgColor, textColor }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/venue');
    };

    return (
        <div 
            className={`flex rounded-lg overflow-hidden ${bgColor} ${textColor}`}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
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

export default Services