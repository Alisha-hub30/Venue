import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceId } = location.state || {};
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
    location: '',
    notRobot: false,
    selectedServices: []
  });
  const [availableLocations, setAvailableLocations] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const isSelected = prev.selectedServices.some(s => s._id === service._id);
      if (isSelected) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter(s => s._id !== service._id)
        };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, service]
        };
      }
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.notRobot) {
      toast.error('Please verify you are not a robot');
      return;
    }
    if (formData.selectedServices.length === 0) {
      toast.error('Please select at least one service');
      return;
    }

    setSubmitting(true);
    try {
      const bookingData = {
        ...formData,
        serviceId,
        vendorId: serviceDetails.vendorId,
        totalPrice: formData.selectedServices.reduce((sum, service) => sum + service.basePrice, 0)
      };

      await axios.post('http://localhost:4000/api/bookings', bookingData);
      toast.success('Booking request submitted successfully!');
      navigate('/bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/services/${serviceId}?status=accepted`);
        setServiceDetails(res.data);
        
        if (res.data.availableLocations) {
          setAvailableLocations(res.data.availableLocations);
          setFormData(prev => ({ ...prev, location: res.data.availableLocations[0] }));
        }
        
        setFormData(prev => ({
          ...prev,
          selectedServices: [{
            _id: res.data._id,
            title: res.data.title,
            basePrice: res.data.basePrice
          }]
        }));
      } catch (error) {
        console.error('Failed to fetch service details:', error);
        toast.error('Failed to load service details.');
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchServiceDetails();
    } else {
      setLoading(false);
      toast.error('Service ID not found');
    }
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!serviceDetails && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-6xl text-gray-300 mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
            <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {serviceDetails?.title || 'Service Details'}
            </h1>
            <nav className="flex items-center justify-center space-x-2 text-sm md:text-base opacity-90">
              <button 
                onClick={() => navigate('/')}
                className="hover:underline transition-all duration-200 hover:opacity-100"
              >
                Home
              </button>
              <span>{'>'}</span>
              <button 
                onClick={() => navigate(-1)}
                className="hover:underline transition-all duration-200 hover:opacity-100"
              >
                Services
              </button>
              <span>{'>'}</span>
              <span className="font-medium">Service Details</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Image */}
        {serviceDetails?.image && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={serviceDetails.image}
                alt={serviceDetails.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          
          {/* Service Description */}
          <div className="xl:col-span-2 space-y-8">
            {/* Service Title and Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {serviceDetails?.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    {serviceDetails?.shortDescription}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-right">
                  <div className="text-3xl md:text-4xl font-bold text-red-600">
                    ₹{serviceDetails?.basePrice?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {serviceDetails?.priceUnit}
                  </div>
                </div>
              </div>
              
              {serviceDetails?.fullDescription && (
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-4">
                    About This Service
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {serviceDetails.fullDescription}
                  </p>
                </div>
              )}
              {/*EXTRA SERVICES */}
              {serviceDetails?.servicesOffered?.length > 0 && (
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-4">
                    Services & Packages
                  </h3>
                  <div className="space-y-4">
                    {/* Main Service */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{serviceDetails.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{serviceDetails.shortDescription}</p>
                        </div>
                        <span className="font-bold text-red-600">
                          ₹{serviceDetails.basePrice?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Extra Services */}
                    {serviceDetails.servicesOffered.map((service, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          </div>
                          <span className="font-bold text-red-600">
                            ₹{service.price?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Service Details Grid - MOVED HERE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Service Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-6">
                  Service Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Category', value: serviceDetails?.category },
                    { label: 'Location', value: serviceDetails?.location },
                    { label: 'Vendor Name', value: serviceDetails?.vendorName },
                    { label: 'Team Size', value: serviceDetails?.teamSize },
                    { label: 'Years in Business', value: `${serviceDetails?.yearsInBusiness} years`, highlight: true },
                    { label: 'Events Completed', value: serviceDetails?.eventsCompleted, highlight: true }
                  ].map((item, index) => (
                    item.value && (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-700">{item.label}:</span>
                        <span className={`font-semibold ${item.highlight ? 'text-red-600' : 'text-gray-900'}`}>
                          {item.value}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Pricing Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-6">
                  Pricing Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Price Type', value: serviceDetails?.priceType, transform: 'capitalize' },
                    { label: 'Base Price', value: `₹${serviceDetails?.basePrice?.toLocaleString()}`, highlight: true },
                    { label: 'Price Unit', value: serviceDetails?.priceUnit },
                    ...(serviceDetails?.priceType === 'range' && serviceDetails?.maxPrice ? 
                      [{ label: 'Max Price', value: `₹${serviceDetails.maxPrice?.toLocaleString()}`, highlight: true }] : []
                    ),
                    ...(serviceDetails?.discount ? 
                      [{ label: 'Discount', value: `${serviceDetails.discount}% OFF`, success: true }] : []
                    )
                  ].map((item, index) => (
                    item.value && (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-700">{item.label}:</span>
                        <span className={`font-semibold ${
                          item.highlight ? 'text-red-600 text-xl' : 
                          item.success ? 'text-green-600' : 'text-gray-900'
                        } ${item.transform ? item.transform : ''}`}>
                          {item.value}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* What's Included - MOVED AFTER Service/Pricing Info */}
            {serviceDetails?.comesWith?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-6">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceDetails.comesWith.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-100">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-gray-800 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vendor Information */}
            {serviceDetails?.vendorName && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-6">
                  About the Vendor
                </h3>
                <div className="flex items-start space-x-4 md:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg">
                      {serviceDetails.vendorName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {serviceDetails.vendorName}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-600 mb-3">
                      <span className="flex items-center">
                        <span className="font-medium text-red-600">{serviceDetails.yearsInBusiness}</span>
                        &nbsp;years in business
                      </span>
                      <span className="flex items-center">
                        <span className="font-medium text-red-600">{serviceDetails.eventsCompleted}</span>
                        &nbsp;events completed
                      </span>
                    </div>
                    {serviceDetails.vendorDescription && (
                      <p className="text-gray-700 leading-relaxed">
                        {serviceDetails.vendorDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Booking Form */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
                  Book Now
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* Services Selection */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-bold text-gray-700 mb-4">
                    Select Services *
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-3">
                    {/* Main Service */}
                    <div className="p-4 border border-gray-200 rounded-xl hover:border-red-300 transition-colors">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id={`service-main`}
                          checked={formData.selectedServices.some(s => s.isMainService)}
                          onChange={() => handleServiceToggle({
                            _id: serviceDetails._id,
                            title: serviceDetails.title,
                            basePrice: serviceDetails.basePrice,
                            isMainService: true
                          })}
                          className="mt-1 h-5 w-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <label htmlFor={`service-main`} className="ml-3 block text-gray-700 flex-1">
                          <span className="font-medium text-base">{serviceDetails.title}</span>
                          <p className="text-sm text-gray-600 mt-1">{serviceDetails.shortDescription}</p>
                          <span className="block text-red-600 font-bold text-lg mt-1">
                            ₹{serviceDetails.basePrice?.toLocaleString()}/-
                          </span>
                        </label>
                      </div>
                    </div>
                    

                    {/* Extra Services */}
                    {serviceDetails?.servicesOffered?.map((service, index) => (
                      <div key={`extra-${index}`} className="p-4 border border-gray-200 rounded-xl hover:border-red-300 transition-colors">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id={`extra-service-${index}`}
                            checked={formData.selectedServices.some(s => s.extraServiceId === `extra-${index}`)}
                            onChange={() => handleServiceToggle({
                              extraServiceId: `extra-${index}`,
                              title: service.name,
                              basePrice: service.price,
                              description: service.description
                            })}
                            className="mt-1 h-5 w-5 text-red-600 rounded focus:ring-red-500"
                          />
                          <label htmlFor={`extra-service-${index}`} className="ml-3 block text-gray-700 flex-1">
                            <span className="font-medium text-base">{service.name}</span>
                            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                            <span className="block text-red-600 font-bold text-lg mt-1">
                              ₹{service.price?.toLocaleString()}/-
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                </div>

                {/* Location Selection */}
                {availableLocations.length > 0 && (
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-bold text-gray-700 mb-4">
                      Service Location
                    </h4>
                    <div className="space-y-3">
                      {availableLocations.map((loc, index) => (
                        <div key={index} className="flex items-center p-3 border border-gray-200 rounded-xl hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            id={`location-${index}`}
                            name="location"
                            value={loc}
                            checked={formData.location === loc}
                            onChange={() => setFormData(prev => ({ ...prev, location: loc }))}
                            className="h-5 w-5 text-red-600 focus:ring-red-500"
                          />
                          <label htmlFor={`location-${index}`} className="ml-3 text-gray-700 font-medium">
                            {loc}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Notes */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    rows="4"
                    placeholder="Special requests or details about your event..."
                  ></textarea>
                </div>

                {/* Robot Verification */}
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="robot-checkbox"
                    name="notRobot"
                    checked={formData.notRobot}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-red-600 rounded focus:ring-red-500"
                    required
                  />
                  <div className="text-sm">
                    <label htmlFor="robot-checkbox" className="font-medium text-gray-700 cursor-pointer">
                      I'm not a robot *
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      By checking this, you agree to our privacy policy.
                    </p>
                  </div>
                </div>

                {/* Price Summary */}
                {formData.selectedServices.length > 0 && (
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-4 text-lg">
                      Price Summary
                    </h4>
                    <div className="space-y-3">
                      {formData.selectedServices.map((service, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-600">{service.title}</span>
                          <span className="font-semibold">₹{service.basePrice?.toLocaleString()}/-</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between items-center">
                      <span className="font-bold text-lg text-gray-800">Total:</span>
                      <span className="font-bold text-2xl text-red-600">
                        ₹{formData.selectedServices.reduce((sum, service) => sum + service.basePrice, 0)?.toLocaleString()}/-
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        BOOKING...
                      </>
                    ) : (
                      'BOOK NOW'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 bg-gray-100 text-gray-800 px-6 py-4 rounded-xl hover:bg-gray-200 transition-colors font-semibold border border-gray-300"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ServiceDetails;