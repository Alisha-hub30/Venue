import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';

const Services = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/services?status=approved', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                if (res.data && Array.isArray(res.data.services)) {
                    setServices(res.data.services);
                    console.log('Fetched services:', res.data.services);
                    console.log(`Count of approved services: ${res.data.services.length}`);
                } else {
                    setServices([]);
                }
                setLoading(false);
            } catch (error) {
                setError('Failed to load services. Please try again later.');
                console.error("Error fetching services:", error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const getServiceCountByCategory = (category) => {
        const normalizedCategory = category.toLowerCase();
        return services.filter(service => {
            const serviceCategory = service.category.toLowerCase();

            // Handle potential variations in category names
            if (normalizedCategory === 'photography' && 
                (serviceCategory === 'photography' || serviceCategory === 'photo' || serviceCategory === 'videography')) {
                return true;
            }
            if (normalizedCategory === 'venue' && 
                (serviceCategory === 'venue' || serviceCategory === 'banquet' || serviceCategory === 'party palace')) {
                return true;
            }
            if (normalizedCategory === 'makeup' && 
                (serviceCategory === 'makeup' || serviceCategory === 'bridal makeup')) {
                return true;
            }
            if (normalizedCategory === 'clothing' && 
                (serviceCategory === 'clothing' || serviceCategory === 'bridal lehenga' || serviceCategory === 'groom suit')) {
                return true;
            }
            if (normalizedCategory === 'music' && 
                (serviceCategory === 'music' || serviceCategory === 'baja')) {
                return true;
            }
            if (normalizedCategory === 'decorations' && 
                (serviceCategory === 'decorations' || serviceCategory === 'stage' || serviceCategory === 'mandap')) {
                return true;
            }
            if (normalizedCategory === 'cards' && 
                (serviceCategory === 'cards' || serviceCategory === 'invitation cards')) {
                return true;
            }
            if (normalizedCategory === 'planners' && 
                (serviceCategory === 'planners' || serviceCategory === 'event planners')) {
                return true;
            }

            return serviceCategory === normalizedCategory;
        }).length;
    };

    // Function to navigate to category detail page with filtered services
    const navigateToCategory = (category) => {
        navigate('/category-services', { state: { category, services: services.filter(s => s.category.toLowerCase() === category.toLowerCase()) } });
    };
    
    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <NavBar/>
            
            {/* New Banner Section (similar to About page) */}
            <div className="bg-red-600 text-white w-full">
                <div className="py-16 text-center">
                    <h1 className="text-4xl font-bold mb-4">Services</h1>
                    <div className="text-lg">
                        <span 
                            className="hover:underline cursor-pointer" 
                            onClick={() => navigate('/')}
                        >
                            Home
                        </span>
                        <span className="mx-2">&gt;</span>
                        <span>Services</span>
                    </div>
                </div>
            </div>

            <main className="flex-grow px-4 md:px-8 lg:px-16 max-w-6xl mx-auto py-12">
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

                    {/* Loading and Error States */}
                    {loading && <p className="text-center">Loading services...</p>}
                    {error && <p className="text-center text-red-600">{error}</p>}

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <ServiceCard 
                            img="videograpgy.jpeg"
                            title="Photography & Videography »"
                            description={`Photography and Videography (${getServiceCountByCategory('photography')})`}
                            bgColor="bg-amber-800"
                            textColor="text-white"
                            onClick={() => navigateToCategory('photography')}
                        />
                        
                        <ServiceCard 
                            img="/makeup.jpeg"
                            title="Makeup »"
                            description={`Bridal Makeup & Family Makeup (${getServiceCountByCategory('makeup')})`}
                            bgColor="bg-red-700"
                            textColor="text-white"
                            onClick={() => navigateToCategory('makeup')}
                        />
                        
                        <ServiceCard 
                            img="/clothes.jpeg"
                            title="Clothing »"
                            description={`Bridal Lehenga, Saree, Groom Suit (${getServiceCountByCategory('clothing')})`}
                            bgColor="bg-pink-500"
                            textColor="text-white"
                            onClick={() => navigateToCategory('clothing')}
                        />
                        
                        <ServiceCard 
                            img="/venue.jpeg"
                            title="Venue »"
                            description={`Banquet, Party Palace, Hotel, Restaurant (${getServiceCountByCategory('venue')})`}
                            bgColor="bg-blue-800"
                            textColor="text-white"
                            onClick={() => navigateToCategory('venue')}
                        />
                        
                        <ServiceCard 
                            img="/baja.jpeg"
                            title="Baja (Music) »"
                            description={`Feel Music Around You (${getServiceCountByCategory('music')})`}
                            bgColor="bg-green-600"
                            textColor="text-white"
                            onClick={() => navigateToCategory('music')}
                        />
                        
                        <ServiceCard 
                            img="/decoration.jpeg"
                            title="Decorations »"
                            description={`Stage, Mehendi, Mandap (${getServiceCountByCategory('decorations')})`}
                            bgColor="bg-stone-300"
                            textColor="text-black"
                            onClick={() => navigateToCategory('decorations')}
                        />
                        
                        <ServiceCard 
                            img="/Card.jpeg"
                            title="Invitation Cards »"
                            description={`Wedding Cards (${getServiceCountByCategory('cards')})`}
                            bgColor="bg-stone-300"
                            textColor="text-black"
                            onClick={() => navigateToCategory('cards')}
                        />

                        <ServiceCard 
                            img="/planer.jpeg"
                            title="Event Planners »"
                            description={`Professional Event Coordinators (${getServiceCountByCategory('planners')})`}
                            bgColor="bg-purple-600"
                            textColor="text-white"
                            onClick={() => navigateToCategory('planners')}
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
                            className="bg-rose-600 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors font-medium"
                        >
                            CONTACT US &gt;&gt;
                        </button>
                        <button 
                            onClick={() => navigate('/about')}
                            className="bg-rose-600 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors font-medium"
                        >
                            LEARN ABOUT US &gt;&gt;
                        </button>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

// Service Card Component with click functionality
const ServiceCard = ({ img, title, description, bgColor, textColor, onClick }) => {
    return (
        <div 
            className={`flex rounded-lg overflow-hidden ${bgColor} ${textColor} h-48`}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            {/* Text Content */}
            <div className="flex-1 p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="opacity-90">{description}</p>
            </div>
            
            {/* Image Section - Takes up right side */}
            <div className="w-1/2 h-48">
                <img 
                    src={img} 
                    alt={title.replace(' »', '')}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Services;