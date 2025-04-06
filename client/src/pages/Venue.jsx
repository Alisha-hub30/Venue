import React, { useEffect, useState } from 'react'
import { FaSearch, FaStar } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Venue = () => {
    const navigate = useNavigate()

    const venues = [
        {
            id: 1,
            name: "Balaji Banquet",
            capacity: "500 people",
            type: "Party Palace",
            space: "Indoor",
            location: "Kathmandu",
            rating: 4,
            price: 1500
        },
        {
            id: 2,
            name: "Moonlight Cafe & Banquet",
            capacity: "500 people",
            type: "Cafe",
            space: "Indoor",
            location: "Lalitpur",
            rating: 5,
            price: 1700
        },
        {
            id: 3,
            name: "Sky Restro & Banquet",
            capacity: "1200 people",
            type: "Restro",
            space: "Indoor, Outdoor",
            location: "Kathmandu",
            rating: 3,
            price: 2000
        }
    ]

    const [searchTerm, setSearchTerm] = useState('')
    const [locationFilter, setLocationFilter] = useState('')
    const [ratingFilter, setRatingFilter] = useState(0)
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [filteredVenues, setFilteredVenues] = useState(venues)

    const applyFilters = () => {
        const filtered = venues.filter(v => {
            const matchesSearch = searchTerm === '' || v.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesLocation = locationFilter === '' || v.location === locationFilter
            const matchesRating = ratingFilter === 0 || v.rating >= ratingFilter
            const matchesMinPrice = minPrice === '' || v.price >= parseInt(minPrice)
            const matchesMaxPrice = maxPrice === '' || v.price <= parseInt(maxPrice)
            return matchesSearch && matchesLocation && matchesRating && matchesMinPrice && matchesMaxPrice
        })
        setFilteredVenues(filtered)
    }

    // Automatically update when location or rating changes
    useEffect(() => {
        applyFilters()
    }, [locationFilter, ratingFilter])

    // Manual search and price filter
    const handleSearch = () => {
        applyFilters()
    }

    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Navbar />

            <main className="flex-grow pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-black">wedtayari.com</h1>
                    <h2 className="text-2xl font-bold text-red-700 mt-2">Venue</h2>
                    <div className="text-sm text-gray-500 mt-4 flex justify-center space-x-2">
                        <span onClick={() => navigate('/')} className="cursor-pointer hover:text-black">Home</span>
                        <span>&gt;</span>
                        <span onClick={() => navigate('/services')} className="cursor-pointer hover:text-black">Services</span>
                        <span>&gt;</span>
                        <span className="text-black font-medium">Venue</span>
                    </div>
                </div>

                {/* Search bar */}
                <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Search Venue"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="md:col-span-3 w-full p-3 border border-gray-300 rounded text-gray-700"
                    />
                    <button
                        onClick={handleSearch}
                        className="w-full px-4 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded flex items-center justify-center"
                    >
                        <FaSearch className="mr-2" /> SEARCH
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters */}
                    <div className="w-full md:w-1/4 bg-white shadow-lg rounded-xl p-6">
                        <div className="bg-red-700 text-white text-lg font-bold px-4 py-2 rounded-t-lg mb-4">
                            Filter
                        </div>

                        <div className="mb-6">
                            <label className="font-semibold block mb-2">Location</label>
                            <select
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">All</option>
                                <option value="Kathmandu">Kathmandu</option>
                                <option value="Lalitpur">Lalitpur</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="font-semibold block mb-2">Rating</label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        onClick={() => setRatingFilter(star)}
                                        className={`cursor-pointer text-xl ${star <= ratingFilter ? 'text-yellow-500' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="font-semibold block mb-2">Price Range</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="w-full md:w-3/4 space-y-6">
                        {filteredVenues.length > 0 ? (
                            filteredVenues.map((venue) => (
                                <div key={venue.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-700">
                                        <p>Seat Capacity: {venue.capacity}</p>
                                        <p>Venue Type: {venue.type}</p>
                                        <p>Space Preference: {venue.space}</p>
                                        <p>Service Location: {venue.location}</p>
                                        <p className="flex items-center">
                                            Rating:
                                            {[...Array(venue.rating)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-500 ml-1" />
                                            ))}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-lg text-red-600">Rs. {venue.price} (per plate)</span>
                                        <button
                                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                                            onClick={() => navigate(`/venue/${venue.id}`)}
                                        >
                                            DETAILS
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No venues found matching your filters.</p>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Venue
