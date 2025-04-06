import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'

const Navbar = () => {
    const navigate = useNavigate()
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent)

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

    return (
        <div className='w-full flex justify-between items-center p-4 sm:p-6 fixed top-0 left-0 right-0 bg-white z-50 shadow-sm'>
            {/* Logo Only */}
            <img 
                src={assets.logo} 
                alt='Logo' 
                className='w-12 h-12 sm:w-16 sm:h-16 cursor-pointer' 
                onClick={() => navigate('/')}
            />
            
            {/* Navigation Links */}
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
            
            {/* Login/User Section */}
            {userData ? (
                <div className='relative group'>
                    <div className='w-10 h-10 flex justify-center items-center rounded-full bg-gray-800 text-white cursor-pointer'>
                        {userData.name[0].toUpperCase()}
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
                    className='flex items-center gap-2 px-6 py-2 rounded-full transition-colors'
                    style={{ backgroundColor: '#8b0000', color: 'white' }} // Using your logo color
                >
                    Login
                </button>
            )}
        </div>
    )
}

export default Navbar