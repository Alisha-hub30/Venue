import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'

const Navbar = () => {
    const navigate = useNavigate()
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`)
            
            if (data.success) {
                navigate('/email-verify')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Verification error:', error)
            toast.error(error.response?.data?.message || 'Failed to send verification OTP')
        }
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post(`${backendUrl}/api/auth/logout`)
            
            if (data.success) {
                setIsLoggedin(false)
                setUserData(null)
                navigate('/')
                toast.success('Logged out successfully')
            }
        } catch (error) {
            console.error('Logout error:', error)
            toast.error(error.response?.data?.message || 'Logout failed')
        }
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const handleNavigation = (path) => {
        navigate(path)
        setMobileMenuOpen(false) // Close mobile menu after navigation
    }

    return (
        <>
            <div className='w-full flex justify-between items-center px-4 md:px-8 fixed top-0 left-0 right-0 bg-white z-50 shadow-sm'>
                {/* Logo */}
                <div className="flex items-center">
                    <img 
                        src={assets.logo} 
                        alt='Logo' 
                        className='h-16 md:h-24 cursor-pointer' 
                        onClick={() => navigate('/')}
                    />
                </div>
                
                {/* Desktop Navigation Links - Hidden on Mobile */}
                <div className='hidden md:flex items-center gap-8'>
                    <button 
                        onClick={() => navigate('/')} 
                        className='text-gray-700 hover:text-gray-900 transition-colors font-medium'
                    >
                        Home
                    </button>
                    <button 
                        onClick={() => navigate('/about')} 
                        className='text-gray-700 hover:text-gray-900 transition-colors font-medium'
                    >
                        About
                    </button>
                    <button 
                        onClick={() => navigate('/services')} 
                        className='text-gray-700 hover:text-gray-900 transition-colors font-medium'
                    >
                        Services
                    </button>
                    <button 
                        onClick={() => navigate('/gallery')} 
                        className='text-gray-700 hover:text-gray-900 transition-colors font-medium'
                    >
                        Gallery
                    </button>
                    <button 
                        onClick={() => navigate('/contact')} 
                        className='text-gray-700 hover:text-gray-900 transition-colors font-medium'
                    >
                        Contact
                    </button>
                </div>
                
                {/* Right Section - Login/User Profile + Hamburger Menu */}
                <div className="flex items-center gap-4">
                    {/* Login/User Section */}
                    {userData ? (
                        <div className='relative group'>
                            <div className='w-10 h-10 flex justify-center items-center rounded-full bg-gray-800 text-white cursor-pointer'>
                                {userData.name && userData.name[0].toUpperCase()}
                            </div>
                            <div className='absolute hidden group-hover:block right-0 z-10 bg-white rounded-md shadow-lg pt-2 w-48'>
                                <ul className='py-1'>
                                    {!userData.isAccountVerified && (
                                        <li 
                                            onClick={sendVerificationOtp} 
                                            className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                                        >
                                            Verify email
                                        </li>
                                    )}
                                    <li
                                        onClick={logout}
                                        className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className='px-4 py-2 rounded transition-colors hidden md:block'
                            style={{ backgroundColor: '#8b0000', color: 'white' }}
                        >
                            Login
                        </button>
                    )}
                    
                    {/* Hamburger Menu Button - Only Visible on Mobile */}
                    <button 
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu - Slides in from top when hamburger is clicked */}
            <div className={`fixed top-16 left-0 right-0 bg-white z-40 shadow-md transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex flex-col py-4">
                    <button 
                        onClick={() => handleNavigation('/')} 
                        className='py-3 px-6 text-left text-gray-700 hover:bg-gray-100 transition-colors font-medium'
                    >
                        Home
                    </button>
                    <button 
                        onClick={() => handleNavigation('/about')} 
                        className='py-3 px-6 text-left text-gray-700 hover:bg-gray-100 transition-colors font-medium'
                    >
                        About
                    </button>
                    <button 
                        onClick={() => handleNavigation('/services')} 
                        className='py-3 px-6 text-left text-gray-700 hover:bg-gray-100 transition-colors font-medium'
                    >
                        Services
                    </button>
                    <button 
                        onClick={() => handleNavigation('/gallery')} 
                        className='py-3 px-6 text-left text-gray-700 hover:bg-gray-100 transition-colors font-medium'
                    >
                        Gallery
                    </button>
                    <button 
                        onClick={() => handleNavigation('/contact')} 
                        className='py-3 px-6 text-left text-gray-700 hover:bg-gray-100 transition-colors font-medium'
                    >
                        Contact
                    </button>
                    
                    {/* Mobile Login Button - Only shown in mobile menu and when not logged in */}
                    {!userData && (
                        <button
                            onClick={() => handleNavigation('/login')}
                            className='mx-6 mt-4 py-2 rounded transition-colors text-center'
                            style={{ backgroundColor: '#8b0000', color: 'white' }}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar