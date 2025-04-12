import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function VendorDashboard() {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Vendor Dashboard</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}</h2>
        <p className="mb-4">Email: {user?.email}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium">Services</h3>
            <p>Manage your services</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium">Bookings</h3>
            <p>View your bookings</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium">Profile</h3>
            <p>Update your profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}