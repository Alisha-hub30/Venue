import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../redux/AuthSlice.js';
import { post } from '../services/ApiEndpints';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    const request = await post('/api/auth/logout');
    if (request.status === 200) {
      dispatch(Logout()); // This should now work
      localStorage.removeItem('token'); // Clear token if using localStorage
      setIsMenuOpen(false);
      navigate('/');
    }
  } catch (error) {
    console.log(error);
  }
};

  // Handle dashboard navigation logic
  const handleDashboardClick = () => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'vendor') {
      navigate('/vendor');
    } else {
      navigate('/home');
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-red-600 flex items-center">
            <span className="mr-1">VENUE</span>
          </Link>

          {/* Hamburger Button for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-red-600 hover:border-red-600"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition duration-200">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-red-600 font-medium transition duration-200">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-red-600 font-medium transition duration-200">Services</Link>
            {/* <Link to="/gallery" className="text-gray-700 hover:text-red-600 font-medium transition duration-200">Gallery</Link> */}
            <Link to="/contact" className="text-gray-700 hover:text-red-600 font-medium transition duration-200">Contact</Link>
            
            {/* Show Register Button only if user is NOT logged in */}
            {!user && (
              <Link
                to="/registerVendor"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow-sm transition duration-200"
              >
                Register Service
              </Link>
            )}
            
            {/* Dashboard Button (only for logged-in users) */}
            {user && (
              <button
                onClick={handleDashboardClick}
                className="text-gray-700 hover:text-red-600 font-medium transition duration-200"
              >
                Dashboard
              </button>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 shadow-sm font-medium transition duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 shadow-sm font-medium transition duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Slides down when menu is open */}
        <div
          className={`${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col space-y-3 py-4 border-t border-gray-200">
            <Link
              onClick={() => setIsMenuOpen(false)}
              to="/"
              className="text-gray-700 hover:text-red-600 font-medium px-2 py-1"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              to="/about"
              className="text-gray-700 hover:text-red-600 font-medium px-2 py-1"
            >
              About
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              to="/services"
              className="text-gray-700 hover:text-red-600 font-medium px-2 py-1"
            >
              Services
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              to="/gallery"
              className="text-gray-700 hover:text-red-600 font-medium px-2 py-1"
            >
              Gallery
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              to="/contact"
              className="text-gray-700 hover:text-red-600 font-medium px-2 py-1"
            >
              Contact
            </Link>
            
            {/* Show Register Button only if user is NOT logged in */}
            {!user && (
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/registerVendor"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow-sm text-center transition duration-200"
              >
                Register Service
              </Link>
            )}
            
            {/* Dashboard Button (only for logged-in users) */}
            {user && (
              <button
                onClick={handleDashboardClick}
                className="text-gray-700 hover:text-red-600 font-medium text-left px-2 py-1"
              >
                Dashboard
              </button>
            )}
            
            {/* Mobile Auth Buttons */}
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 shadow-sm font-medium mt-2 transition duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/login"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 shadow-sm font-medium mt-2 text-center transition duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}