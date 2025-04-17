import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContent } from '../context/AppContext'

const Dashboard = () => {
    const { backendUrl, userData } = useContext(AppContent)
    const [users, setUsers] = useState([])
    const [vendors, setVendors] = useState([])
    const [activeTab, setActiveTab] = useState('users')
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (userData?.role !== 'admin') {
            toast.error('Unauthorized access')
            return
        }
        
        const fetchData = async () => {
            try {
                setLoading(true)
                const usersResponse = await axios.get(`${backendUrl}/api/admin/users`)
                const vendorsResponse = await axios.get(`${backendUrl}/api/admin/vendors`)
                
                if (usersResponse.data.success) {
                    setUsers(usersResponse.data.users)
                }
                if (vendorsResponse.data.success) {
                    setVendors(vendorsResponse.data.vendors)
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to fetch data')
            } finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [backendUrl, userData])

    const handleDelete = async (id, type) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            try {
                const endpoint = type === 'user' ? 'users' : 'vendors'
                const { data } = await axios.delete(`${backendUrl}/api/admin/${endpoint}/${id}`)
                
                if (data.success) {
                    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`)
                    if (type === 'user') {
                        setUsers(users.filter(user => user._id !== id))
                    } else {
                        setVendors(vendors.filter(vendor => vendor._id !== id))
                    }
                }
            } catch (error) {
                toast.error(error.response?.data?.message || `Failed to delete ${type}`)
            }
        }
    }

    const filteredData = activeTab === 'users' 
        ? users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            user.role !== 'admin' // Exclude admins from user list
          )
        : vendors.filter(vendor => 
            vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
          )

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
                
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`py-2 px-4 font-medium ${activeTab === 'users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Users ({users.filter(u => u.role !== 'admin').length})
                    </button>
                    <button
                        className={`py-2 px-4 font-medium ${activeTab === 'vendors' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('vendors')}
                    >
                        Vendors ({vendors.length})
                    </button>
                </div>
                
                {/* Search and Stats */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 md:mb-0">
                            {activeTab === 'users' ? 'User Management' : 'Vendor Management'}
                        </h2>
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg
                                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <span className="text-sm font-medium text-gray-500">
                            Total {activeTab}: <span className="text-indigo-600">{filteredData.length}</span>
                        </span>
                    </div>
                    
                    {/* Data Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <tr key={item._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                                                        {item.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isAccountVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {item.isAccountVerified ? 'Verified' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                                {item.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleDelete(item._id, activeTab.slice(0, -1))}
                                                    className="text-red-600 hover:text-red-900"
                                                    disabled={item.role === 'admin'}
                                                    title={item.role === 'admin' ? "Cannot delete admin users" : ""}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No {activeTab} found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard