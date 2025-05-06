import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/Navbar';

export default function VendorDashboard() {
  const user = useSelector((state) => state.Auth.user);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    image: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);

  // Predefined categories that match exactly with what the Services.jsx expects
  const serviceCategories = [
    { value: 'photography', label: 'Photography & Videography' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'venue', label: 'Venue' },
    { value: 'music', label: 'Baja (Music)' },
    { value: 'decorations', label: 'Decorations' },
    { value: 'cards', label: 'Invitation Cards' }
  ];

  // Fetch services of the vendor
  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/vendor/services', { withCredentials: true });
      if (res.data && Array.isArray(res.data.services)) {
        setServices(res.data.services);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error('Failed to fetch vendor services:', error);
      setServices([]);
      setMessage('Please login as a vendor to view your dashboard.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  // Add new service
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/vendor/services', newService, { withCredentials: true });
      setMessage(res.data.message || 'Service added successfully');
      fetchServices(); // Refresh the list
      setNewService({
        title: '',
        description: '',
        price: '',
        duration: '',
        category: '',
        image: ''
      });
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
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category,
      image: service.image
    });
  };

  // Update service
  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:4000/api/vendor/services/${editServiceId}`, newService, { withCredentials: true });
      setMessage(res.data.message || 'Service updated successfully');
      setIsEditing(false);
      setEditServiceId(null);
      fetchServices(); // Refresh the list
      setNewService({
        title: '',
        description: '',
        price: '',
        duration: '',
        category: '',
        image: ''
      });
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
      description: '',
      price: '',
      duration: '',
      category: '',
      image: ''
    });
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

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {/* Add New Service Form */}
      <form onSubmit={isEditing ? handleUpdateService : handleAddService} className="bg-white p-4 rounded shadow mb-8 space-y-4">
        <h2 className="text-xl font-semibold">{isEditing ? 'Edit Service' : 'Add New Service'}</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newService.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newService.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newService.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={newService.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        
        {/* Dropdown select for category instead of free text input */}
        <select
          name="category"
          value={newService.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select a Category</option>
          {serviceCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={newService.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
              <p>{service.description}</p>
              <p className="text-sm text-gray-600">
                Category: {serviceCategories.find(cat => cat.value === service.category)?.label || service.category}
              </p>
              <p className="text-sm">Price: ₹{service.price}</p>
              <p className="text-sm">Duration: {service.duration} mins</p>
              <img
                src={service.image || '/default-service.jpg'}
                alt="Service"
                className="w-full h-40 object-cover mt-2 rounded"
              />

              <div className="mt-2 flex gap-2">
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