import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'

const Login = () => {
    const navigate = useNavigate()
    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)
    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const redirectPath = location.state?.redirectTo || '/'

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            axios.defaults.withCredentials = true
            const endpoint = state === 'Sign Up' ? '/api/auth/register' : '/api/auth/login'
            const payload = state === 'Sign Up' ? { name, email, password } : { email, password }

            const { data } = await axios.post(backendUrl + endpoint, payload)

            if (data.success) {
                setIsLoggedin(true)
                await getUserData()
                navigate(redirectPath)
                toast.success(`Welcome ${state === 'Sign Up' ? 'to our platform!' : 'back!'}`)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-4 sm:px-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'>
            {/* Logo */}
            <img 
                onClick={() => navigate('/')} 
                src={assets.logo} 
                alt='Website Logo' 
                className='absolute left-5 sm:left-10 top-5 w-24 sm:w-32 cursor-pointer transition-transform hover:scale-105'
            />
            
            {/* Auth Container */}
            <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-sm bg-opacity-90 border border-gray-100'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold text-gray-800'>
                        {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className='text-gray-500 mt-2'>
                        {state === 'Sign Up' ? 'Join us today!' : 'Login to continue'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandler} className='space-y-5'>
                    {state === 'Sign Up' && (
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <img src={assets.person_icon} alt="Name" className='h-5 w-5 text-gray-400' />
                            </div>
                            <input
                                onChange={e => setName(e.target.value)}
                                value={name}
                                className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all'
                                type="text"
                                placeholder='Full Name'
                                required
                            />
                        </div>
                    )}
                    
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <img src={assets.mail_icon} alt="Email" className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all'
                            type="email"
                            placeholder='Email address'
                            required
                        />
                    </div>

                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <img src={assets.lock_icon} alt="Password" className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all'
                            type="password"
                            placeholder='Password'
                            required
                            minLength="6"
                        />
                    </div>

                    {state === 'Login' && (
                        <div className='flex justify-end'>
                            <button 
                                type="button"
                                onClick={() => navigate('/reset-password')} 
                                className='text-sm text-indigo-600 hover:text-indigo-800 transition-colors'
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'}`}
                    >
                        {isLoading ? (
                            <span className='flex items-center justify-center'>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            state
                        )}
                    </button>
                </form>

                {/* Toggle between Login/Signup */}
                <div className='mt-6 text-center text-sm text-gray-600'>
                    {state === 'Sign Up' ? (
                        <p>
                            Already have an account?{' '}
                            <button 
                                onClick={() => setState('Login')}
                                className='font-medium text-indigo-600 hover:text-indigo-800 transition-colors'
                            >
                                Login here
                            </button>
                        </p>
                    ) : (
                        <p>
                            Don't have an account?{' '}
                            <button 
                                onClick={() => setState('Sign Up')}
                                className='font-medium text-indigo-600 hover:text-indigo-800 transition-colors'
                            >
                                Sign up
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login