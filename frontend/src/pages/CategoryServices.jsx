import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';

const CategoryServices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || {};
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    rating: '',
    minPrice: '',
    maxPrice: ''
  });

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
          const approvedServices = res.data.services.filter(
            service => service.category.toLowerCase() === category.toLowerCase()
          );
          setServices(approvedServices);
          setFilteredServices(approvedServices);
        } else {
          setServices([]);
          setFilteredServices([]);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchServices();
    }
  }, [category]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let results = [...services];
    
    if (filters.location) {
      results = results.filter(service => 
        service.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.rating) {
      results = results.filter(service => 
        service.rating >= Number(filters.rating)
      );
    }
    
    if (filters.minPrice) {
      results = results.filter(service => 
        service.basePrice >= Number(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      results = results.filter(service => 
        service.basePrice <= Number(filters.maxPrice)
      );
    }
    
    setFilteredServices(results);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      rating: '',
      minPrice: '',
      maxPrice: ''
    });
    setFilteredServices(services);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Category Not Found</h2>
            <p className="text-gray-600 mb-4">Please select a valid category to view services.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Header Section */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-3">
              {category.charAt(0).toUpperCase() + category.slice(1)} Services
            </h1>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <button 
                onClick={() => navigate('/')}
                className="hover:underline transition-all duration-200"
              >
                Home
              </button>
              <span>{'>'}</span>
              <span>{category.charAt(0).toUpperCase() + category.slice(1)} Services</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Filter Services</h2>
            <div className="text-sm text-gray-500">
              {filteredServices.length} of {services.length} services shown
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Location Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  placeholder="Enter city or area"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Minimum Rating</label>
              <div className="relative">
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Any Rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Price Range (₹)</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">₹</span>
                  </div>
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">₹</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 opacity-0">Actions</label>
              <div className="flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Services Found</h3>
            <p className="text-gray-600 text-lg mb-6">
              No services match your current filters. Try adjusting your search criteria.
            </p>
            <button 
              onClick={resetFilters}
              className="px-6 py-3 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div 
                key={service._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image || '/api/placeholder/400/300'}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {service.rating && (
                    <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="ml-1 text-sm font-medium text-gray-800">{service.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {service.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {service.location}
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {service.shortDescription}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-red-600">₹{service.basePrice}</span>
                        {service.priceUnit && (
                          <span className="text-sm text-gray-500 ml-1">
                            {service.priceUnit.replace('per', '/')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                      onClick={() => navigate('/servicedetails', { state: { serviceId: service._id } })}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryServices;