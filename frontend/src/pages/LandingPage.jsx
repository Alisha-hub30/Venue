import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';

// Enhanced Service Card Component - Rectangular style
const ServiceCard = ({ title, description, bgColor, imageUrl, category }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Navigate to category-services page with selected category
    navigate('/category-services', { 
      state: { 
        category: category || title.toLowerCase().replace(' »', '') 
      } 
    });
  };
  
  return (
    <div 
      className="rounded-md overflow-hidden shadow-lg relative group cursor-pointer h-40"
      onClick={handleClick}
    >
      <div className="absolute inset-0" style={{ backgroundColor: bgColor }}></div>
      <div className="absolute top-0 right-0 h-full w-2/5">
        <img src={imageUrl || "/api/placeholder/240/160"} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="relative z-10 h-full p-6 flex flex-col justify-center w-3/5">
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        <p className="text-white/90 italic">{description}</p>
      </div>
    </div>
  );
};

export default function LandingPage() {
    const user = useSelector((state) => state.Auth?.user) || null;
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-white">
            <NavBar/>
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-50 to-pink-50">
            <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Welcome to your dream venue
                </h1>
            </div>
            </div>
        </div>

        {/* About Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <p className="text-lg text-gray-600 mb-6">
                A wedding is such a special and intimate occasion. We help construct dream moments to life. 
                As couples, we firmly believe, deserve to have a wedding that they can not only cherish 
                and remember fondly.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                Harithson is a Nepal Wedding website where you find the best wedding vendors under your budget. 
                Check prices, get verified ratings, and chat back-and-forth by the vendors to seal your deal 
                to completion.
                </p>
                <button 
                  onClick={() => navigate('/about')}
                  className="px-6 py-3 bg-rose-600 text-white font-medium rounded hover:bg-rose-700 transition duration-300"
                >
                  Learn More About Us
                </button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
                {/* Using placeholder image instead of external URL */}
                <img 
                src="/public/LandingPhoto.jpg" 
                alt="Wedding venue" 
                className="w-full h-auto object-cover"
                />
            </div>
            </div>
        </div>

        {/* Services Section with Visual Cards */}
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Services</h1>
              <p className="text-lg text-rose-600 font-medium">
                One Stop Solutions: 360 Services Expertises
              </p>
            </div>

            {/* Services Grid - Using reusable rectangular service cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <ServiceCard 
                title="Photography & Videography" 
                description="Photography and Videography" 
                bgColor="#8B5A2B"
                imageUrl="\videograpgy.jpeg" 
                category="photography"
              />
              
              <ServiceCard 
                title="Makeup »" 
                description="Bridal Makeup & Family Makeup" 
                bgColor="#C53030"
                imageUrl="\makeup.jpeg" 
                category="makeup"
              />
              
              <ServiceCard 
                title="Clothing »" 
                description="Bridal Lehenga, Saree, Groom Suit" 
                bgColor="#E53E3E"
                imageUrl="\clothes.jpeg" 
                category="clothing"
              />
              
              <ServiceCard 
                title="Venue »" 
                description="Banquet, Party Palace, Hotel, Restaurant" 
                bgColor="#2B4162"
                imageUrl="\venue.jpeg" 
                category="venue"
              />
              
              <ServiceCard 
                title="Baja (Music) »" 
                description="Feel Music Around You" 
                bgColor="#4B7F52"
                imageUrl="\baja.jpeg" 
                category="music"
              />
              
              <ServiceCard 
                title="Decorations »" 
                description="Stage, Mehendi, Mandap" 
                bgColor="#D1CBC1"
                imageUrl="\decoration.jpeg" 
                category="decorations"
              />
              
              <ServiceCard 
                title="Invitation Cards »" 
                description="Wedding Cards" 
                bgColor="#8B6B23"
                imageUrl="\Card.jpeg" 
                category="cards"
              />

              <ServiceCard 
                title="Event Planner »" 
                description="Professional Event Coordinators" 
                bgColor="#8B6B23"
                imageUrl="\planer.jpeg" 
                category="planners"
              />
            </div>

            {/* View All Button */}
            <div className="text-center">
              <button 
                onClick={() => navigate('/services')}
                className="px-8 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors duration-300"
              >
                View All Services
              </button>
            </div>
          </div>
        </div>

        <Footer/>
        </div>
    );
}