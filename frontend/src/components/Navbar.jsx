import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../redux/AuthSlice';
import { post } from '../services/ApiEndpints';

export default function NavBar() {
    const user = useSelector((state) => state.Auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const request = await post('/api/auth/logout');
            if (request.status === 200) {
                dispatch(Logout());
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold text-red-600">
                        VENUE
                    </Link>
                    
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                        <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
                        <Link to="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
                        <Link to="/gallery" className="text-gray-700 hover:text-gray-900">Gallery</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
                    </nav>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            {user.role === 'admin' && (
                                <Link 
                                    to="/admin"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                                >
                                    Dashboard
                                </Link>
                            )}
                            <button 
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}