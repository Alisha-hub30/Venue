import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'

const Dashboard = () => {
    const { isLoggedin, getUserData, userData } = useContext(AppContent)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedin) {
        navigate('/login', { state: { redirectTo: '/dashboard' } })
        } else {
        getUserData()
        }
    }, [isLoggedin, navigate, getUserData])

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
        <h1 className='text-3xl font-bold mb-4'>Welcome to Your Dashboard</h1>
        {userData && (
            <div className='bg-white p-6 rounded-lg shadow-md text-left w-full max-w-md'>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {/* Add more user details as needed */}
            </div>
        )}
        </div>
    )
}

export default Dashboard
