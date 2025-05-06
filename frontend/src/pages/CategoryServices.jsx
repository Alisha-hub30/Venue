import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';

const CategoryServices = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category, services = [] } = location.state || {};
    
    if (!category) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <NavBar />
                <div className="text-center mt-20">
                    <h1 className="text-2xl font-bold mb-4">Category not found</h1>
                    <button 
                        onClick={() => navigate('/services')}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Return to Services
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <NavBar />
            
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-8 mt-16">
                <span 
                    className="hover:text-black cursor-pointer" 
                    onClick={() => navigate('/')}
                >
                    Home &gt;
                </span>
                <span 
                    className="hover:text-black cursor-pointer" 
                    onClick={() => navigate('/services')}
                >
                    &nbsp;Services &gt;
                </span>
                <span className="text-black font-medium"> {category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-6">{category.charAt(0).toUpperCase() + category.slice(1)} Services</h1>
            
            {services.length === 0 ? (
                <p className="text-center py-10">No services available in this category yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service._id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={service.image || '/default-service.jpg'}
                                alt={service.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-gray-700 mb-3">{service.description}</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600">Duration: <span className="font-medium">{service.duration} mins</span></p>
                                    </div>
                                    <p className="text-lg font-bold text-red-600">₹{service.price}</p>
                                </div>
                                <button 
                                    className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
                                    onClick={() => navigate(`/service/${service._id}`)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryServices;