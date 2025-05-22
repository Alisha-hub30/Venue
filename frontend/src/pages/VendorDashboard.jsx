import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/Navbar';

export default function VendorDashboard() {
  const user = useSelector((state) => state.Auth.user);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    category: '',
    location: '',
    vendorName: '',
    image: '',
    shortDescription: '',
    priceType: 'fixed',
    basePrice: '',
    priceUnit: '',
    maxPrice: '',
    discount: '',
    email: '',
    phone: '',
    fullDescription: '',
    yearsInBusiness: '',
    eventsCompleted: '',
    teamSize: '',
    servicesOffered: [],
    comesWith: [], 
  });
  const [comesWithInput, setComesWithInput] = useState(""); 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  
  const serviceCategories = [
    { value: 'photography', label: 'Photography & Videography' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'venue', label: 'Venue' },
    { value: 'music', label: 'Baja (Music)' },
    { value: 'decorations', label: 'Decorations' },
    { value: 'cards', label: 'Invitation Cards' },
    { value: 'eventplanner', label: 'Event Planner' }
  ];

  // Fetch services of the vendor
  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/vendor/services', { withCredentials: true });
      if (res.data && Array.isArray(res.data.services)) {
        setServices(res.data.services.filter(service => service.status === 'pending' || service.status === 'approved' || service.status === "rejected"));
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error('Failed to fetch vendor services:', error);
      setServices([]);
      setMessage('Failed to fetch services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Validate image URL
  const validateImageUrl = (url) => {
    if (!url || url.trim() === '') return false;
    
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle image URL input change
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setNewService({ ...newService, image: url });
    
    // Set preview image if URL is valid
    if (validateImageUrl(url)) {
      setPreviewImage(url);
    } else {
      setPreviewImage('');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle social media inputs
    if (name.startsWith('social_')) {
      const platform = name.split('_')[1];
      setNewService({
        ...newService,
        socialMedia: {
          ...newService.socialMedia,
          [platform]: value
        }
      });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...newService.servicesOffered];
    updatedServices[index][field] = value;
    setNewService({ ...newService, servicesOffered: updatedServices });
  };

  const handleAddService = () => {
    setNewService({
      ...newService,
      servicesOffered: [...newService.servicesOffered, { name: '', description: '', price: '' }]
    });
  };

  const handleAddComesWithItem = () => {
    if (comesWithInput.trim() && newService.comesWith.length < 10) {
      setNewService({
        ...newService,
        comesWith: [...newService.comesWith, comesWithInput.trim()],
      });
      setComesWithInput(""); // Clear the input field
    } else if (newService.comesWith.length >= 10) {
      setMessage("You can only add up to 10 items.");
    }
  };

  const handleRemoveComesWithItem = (index) => {
    const updatedComesWith = [...newService.comesWith];
    updatedComesWith.splice(index, 1);
    setNewService({ ...newService, comesWith: updatedComesWith });
  };

  // Add new service
  const handleAddServiceSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const serviceData = { ...newService };

      // Ensure required fields are not empty
      if (!serviceData.title || !serviceData.category || !serviceData.location || !serviceData.vendorName || !serviceData.priceType || !serviceData.basePrice || !serviceData.shortDescription || !serviceData.fullDescription) {
        setMessage("Please fill in all required fields.");
        return;
      }

      // Ensure numeric fields are valid
      if (isNaN(serviceData.basePrice) || (serviceData.priceType === 'range' && isNaN(serviceData.maxPrice))) {
        setMessage("Please provide valid numeric values for price fields.");
        return;
      }

      // Validate image URL if provided
      if (serviceData.image.trim() && !validateImageUrl(serviceData.image)) {
        setMessage("Please provide a valid image URL or leave it empty.");
        return;
      }

      const res = await axios.post('http://localhost:4000/api/vendor/services', serviceData, { withCredentials: true });
      setMessage(res.data.message || 'Service added successfully');
      fetchServices(); // Refresh the list
      
      // Reset form
      setNewService({
        title: '',
        category: '',
        location: '',
        vendorName: '',
        image: '',
        shortDescription: '',
        priceType: 'fixed',
        basePrice: '',
        priceUnit: '',
        maxPrice: '',
        discount: '',
        email: '',
        phone: '',
        fullDescription: '',
        yearsInBusiness: '',
        eventsCompleted: '',
        teamSize: '',
        servicesOffered: [],
        comesWith: [],
      });
      setPreviewImage('');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  // Edit service
  const handleEditClick = (service) => {
    setIsEditing(true);
    setEditServiceId(service._id);
    

    setNewService({
      title: service.title || '',
      category: service.category || '',
      location: service.location || '',
      vendorName: service.vendorName || '',
      image: service.image || '',
      shortDescription: service.shortDescription || '',
      priceType: service.priceType || 'fixed',
      basePrice: service.basePrice || '',
      priceUnit: service.priceUnit || '',
      maxPrice: service.maxPrice || '',
      discount: service.discount || '',
      email: service.email || '',
      phone: service.phone || '',
      fullDescription: service.fullDescription || '',
      yearsInBusiness: service.yearsInBusiness || '',
      eventsCompleted: service.eventsCompleted || '',
      teamSize: service.teamSize || '',
      servicesOffered: service.servicesOffered || [],
      comesWith: service.comesWith || [],
    });
    
    setPreviewImage(service.image || '');
  };

  // Update service
  const handleUpdateService = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      if (newService.image.trim() && !validateImageUrl(newService.image)) {
        setMessage("Please provide a valid image URL or leave it empty.");
        return;
      }
      
      const res = await axios.put(`http://localhost:4000/api/vendor/services/${editServiceId}`, newService, { withCredentials: true });
      setMessage(res.data.message || 'Service updated successfully');
      setIsEditing(false);
      setEditServiceId(null);
      fetchServices(); // Refresh the list
      
      // Reset form
      setNewService({
        title: '',
        category: '',
        location: '',
        vendorName: '',
        image: '',
        shortDescription: '',
        priceType: 'fixed',
        basePrice: '',
        priceUnit: '',
        maxPrice: '',
        discount: '',
        email: '',
        phone: '',
        fullDescription: '',
        yearsInBusiness: '',
        eventsCompleted: '',
        teamSize: '',
        servicesOffered: [],
        comesWith: [],
      });
      setPreviewImage('');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditServiceId(null);
    setNewService({
      title: '',
      category: '',
      location: '',
      vendorName: '',
      image: '',
      shortDescription: '',
      priceType: 'fixed',
      basePrice: '',
      priceUnit: '',
      maxPrice: '',
      discount: '',
      email: '',
      phone: '',
      fullDescription: '',
      yearsInBusiness: '',
      eventsCompleted: '',
      teamSize: '',
      servicesOffered: [],
      comesWith: [],
    });
    setPreviewImage('');
  };

  // Delete service
  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const res = await axios.delete(`http://localhost:4000/api/vendor/services/${serviceId}`, { withCredentials: true });
        setMessage(res.data.message || 'Service deleted successfully');
        fetchServices(); // Refresh the list
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || 'Something went wrong');
      }
    }
  };

  useEffect(() => {
    if (user && user.role === 'vendor') {
      fetchServices();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p className="text-center mt-10">Loading your services...</p>;
  }

  if (!user || user.role !== 'vendor') {
    return (
      <div className="text-center mt-10 text-red-600">
        Unauthorized. Please login as a vendor to view this dashboard.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NavBar/>
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>

      {message && <p className={`${message.includes('successfully') ? 'text-green-600' : 'text-red-600'} mb-4`}>{message}</p>}

      {/* Add New Service Form */}
      <form onSubmit={isEditing ? handleUpdateService : handleAddServiceSubmit} className="bg-white p-4 rounded shadow mb-8 space-y-4">
        <h2 className="text-xl font-semibold">{isEditing ? 'Edit Service' : 'Add New Service'}</h2>

        {/* Basic Details */}
        <input type="text" name="title" placeholder="Service Name" value={newService.title} onChange={handleChange} className="w-full border p-2 rounded" required />
        <select name="category" value={newService.category} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Select a Category</option>
          {serviceCategories.map((category) => (
            <option key={category.value} value={category.value}>{category.label}</option>
          ))}
        </select>
        <input type="text" name="location" placeholder="Location/City" value={newService.location} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="vendorName" placeholder="Vendor Name/Business Name" value={newService.vendorName} onChange={handleChange} className="w-full border p-2 rounded" required />
        
        {/* Image URL with preview */}
        <div>
          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={newService.image}
            onChange={handleImageUrlChange}
            className="w-full border p-2 rounded"
          />
          {previewImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
              <div className="w-full h-48 relative border rounded overflow-hidden">
                <img 
                  src={previewImage} 
                  alt="Service Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'public\LandingPhoto.jpg'
                    setMessage("Image couldn't be loaded. Please check the URL.");
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        <textarea name="shortDescription" placeholder="Short Description (150 chars max)" maxLength="150" value={newService.shortDescription} onChange={handleChange} className="w-full border p-2 rounded" required />

        {/* Pricing Information */}
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input type="radio" name="priceType" value="fixed" checked={newService.priceType === 'fixed'} onChange={handleChange} className="mr-1" /> Fixed Price
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="priceType" value="starting" checked={newService.priceType === 'starting'} onChange={handleChange} className="mr-1" /> Starting From
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="priceType" value="range" checked={newService.priceType === 'range'} onChange={handleChange} className="mr-1" /> Price Range
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" name="basePrice" placeholder="Base Price" value={newService.basePrice} onChange={handleChange} className="w-full border p-2 rounded" required />
          <select name="priceUnit" value={newService.priceUnit} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Price Unit</option>
            <option value="perDay">Per Day</option>
            <option value="perEvent">Per Event</option>
            <option value="perHour">Per Hour</option>
            <option value="perPerson">Per Person</option>
          </select>
        </div>
        
        {newService.priceType === 'range' && (
          <input type="number" name="maxPrice" placeholder="Maximum Price" value={newService.maxPrice} onChange={handleChange} className="w-full border p-2 rounded" required />
        )}
        <input type="number" name="discount" placeholder="Discount (optional)" value={newService.discount} onChange={handleChange} className="w-full border p-2 rounded" />

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <input type="email" name="email" placeholder="Email Address" value={newService.email} onChange={handleChange} className="w-full border p-2 rounded mt-2" required />
            <input type="tel" name="phone" placeholder="Phone Number" value={newService.phone} onChange={handleChange} className="w-full border p-2 rounded mt-2" required />
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold">What it Comes With</h3>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={comesWithInput}
                onChange={(e) => setComesWithInput(e.target.value)}
                placeholder="Enter an item"
                className="w-full border p-2 rounded"
              />
              <button
                type="button"
                onClick={handleAddComesWithItem}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                +
              </button>
            </div>
            {newService.comesWith.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {newService.comesWith.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveComesWithItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No items added yet.</p>
            )}
            <p className="text-sm text-gray-500 mt-2">You can add up to 10 items.</p>
          </div>
        </div>

        {/* Detailed Description */}
        <textarea 
          name="fullDescription" 
          placeholder="Full Description" 
          value={newService.fullDescription} 
          onChange={handleChange} 
          className="w-full border p-2 rounded h-32" 
          required 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="number" name="yearsInBusiness" placeholder="Years in Business" value={newService.yearsInBusiness} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="number" name="eventsCompleted" placeholder="Number of Events Completed" value={newService.eventsCompleted} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="number" name="teamSize" placeholder="Team Size (optional)" value={newService.teamSize} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {isEditing ? 'Update Service' : 'Add Service'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Services List */}
      <h2 className="text-xl font-semibold mb-2">Your Services</h2>
      {services.length === 0 ? (
        <p className="text-center py-4">You haven't added any services yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div key={service._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{service.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Category:</strong> {serviceCategories.find(cat => cat.value === service.category)?.label || service.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {service.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Vendor Name:</strong> {service.vendorName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Price:</strong> ₹{service.basePrice} {service.priceType === 'range' && `- ₹${service.maxPrice}`}
                    {service.priceUnit && ` (${service.priceUnit.replace('per', 'per ')}) `}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Discount:</strong> {service.discount ? `${service.discount}%` : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        service.status === "approved"
                          ? "text-green-600"
                          : service.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {service.status === "approved"
                        ? "Approved"
                        : service.status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                    </span>
                  </p>
                </div>
                <div className="relative h-32 w-full overflow-hidden rounded">
                  <img
                    src={validateImageUrl(service.image) ? service.image : '/default-service.jpg'}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-service.jpg';
                    }}
                  />
                </div>
              </div>
              <p className="text-sm mt-2">{service.shortDescription}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEditClick(service)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}