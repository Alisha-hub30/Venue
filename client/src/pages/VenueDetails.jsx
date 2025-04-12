import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const VenueDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [guestCount, setGuestCount] = useState('');
    
    // Authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Mock data for venue details - in a real app, you would fetch this from an API
    const venueData = [
        {
        id: 1,
        name: "Balaji Banquet",
        capacity: "500 people",
        type: "Party Palace",
        space: "Indoor",
        location: "Kathmandu",
        rating: 4,
        price: 1500,
        description: "Balaji Banquet is a premier event venue that has been in the hospitality business since 2005. Perfect for weddings, corporate events, and social gatherings.",
        amenities: ["Wifi (Free, Pin: 12345)", "Projector", "UPS", "Centralized AC", "CCTV", "Buffet", "Parking Facilities", "Bar", "Air Conditioning", "Complimentary Water Bottle (2/seat)"],
        rules: [
            "Only authorized documents are allowed to decorate in Maxims premises. Should the guest wish to bring other decoration items, prior permission from Maxims management is required.",
            "Parking of the vehicles in all around is own risk.",
            "Outside food not allowed in the premises."
        ],
        bookingNote: "Note: Maxims requires a venue or banquet booking under India Restaurants Pvt. Ltd, Therefore, billing will be prepared in the name of India Food Restaurants Pvt. Ltd."
        },
        {
        id: 2,
        name: "Moonlight Cafe & Banquet",
        capacity: "500 people",
        type: "Cafe",
        space: "Indoor",
        location: "Lalitpur",
        rating: 5,
        price: 1700,
        description: "Moonlight Cafe & Banquet offers a charming atmosphere for all your special occasions. Our elegant venue has been serving customers with excellence since 2010.",
        amenities: ["Free Wifi", "Projector", "Sound System", "Air Conditioning", "CCTV", "Buffet", "Parking Facilities", "Outdoor Garden"],
        rules: [
            "Outside decorations require prior approval from management.",
            "No outside food and beverages allowed.",
            "Music volume must be reduced after 10 PM."
        ],
        bookingNote: "Note: All bookings require a 30% advance payment to confirm reservation."
        },
        {
        id: 3,
        name: "Sky Restro & Banquet",
        capacity: "1200 people",
        type: "Restro",
        space: "Indoor, Outdoor",
        location: "Kathmandu",
        rating: 3,
        price: 2000,
        description: "Sky Restro & Banquet features breathtaking views and versatile spaces for events of all sizes. Our rooftop venue is perfect for those seeking a unique location.",
        amenities: ["Wifi", "Projector", "Backup Generator", "Air Conditioning", "CCTV", "Buffet", "Valet Parking", "Bar Service", "Rooftop Access"],
        rules: [
            "Decorations must be approved by the venue management.",
            "Outside catering not permitted without additional fees.",
            "Events must conclude by midnight."
        ],
        bookingNote: "Note: Rooftop access may be limited during inclement weather conditions."
        }
    ];

    useEffect(() => {
        // Find the venue that matches the id from URL params
        const selectedVenue = venueData.find(v => v.id === parseInt(id));
        setVenue(selectedVenue);
        
        // Check for pending bookings in session storage
        const pendingBooking = sessionStorage.getItem('pendingBooking');
        if (pendingBooking) {
            const bookingData = JSON.parse(pendingBooking);
            if (bookingData.venueId === parseInt(id)) {
                // Restore booking details
                setStartDate(bookingData.startDate);
                setEndDate(bookingData.endDate);
                setGuestCount(bookingData.guestCount);
                // Clear the pending booking
                sessionStorage.removeItem('pendingBooking');
            }
        }
        
        // Check authentication status from localStorage or your auth system
        // This is where you should check if the user is logged in from your auth system
        const userToken = localStorage.getItem('userToken'); // or whatever key you use
        
        // If there's a token, assume the user is logged in
        if (userToken) {
            setIsLoggedIn(true);
        }
        
        // For testing purposes, you can force login with:
        // setIsLoggedIn(true);
    }, [id]);

    const handleBookNow = () => {
        // Validation for required fields
        if (!startDate || !endDate || !guestCount) {
            alert("Please fill in all required fields");
            return;
        }
        
        // Log the authentication state to debug
        console.log("Authentication status:", isLoggedIn);
        
        // Check if user is logged in
        if (!isLoggedIn) {
            // Save booking details in session storage for later use
            sessionStorage.setItem('pendingBooking', JSON.stringify({
                venueId: venue.id,
                startDate,
                endDate,
                guestCount
            }));
            
            // Redirect to login page with return URL
            navigate('/login', { state: { redirectTo: `/venue/${id}` } });
        } else {
            // User is logged in, process the booking
            alert(`Booking successful! Thank you for choosing ${venue.name}`);
            
            // In a real app, you would submit this data to your backend
            console.log("Booking details submitted:", {
                venueId: venue.id,
                venueName: venue.name,
                startDate,
                endDate,
                guestCount
            });
        }
    };

    if (!venue) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <p>Loading venue details...</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            
            <main className="flex-grow pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mb-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-black">wedtayari.com</h1>
                    <h2 className="text-2xl font-bold text-red-700 mt-2">{venue.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Image gallery - in a real app, you'd have actual images */}
                    <div className="bg-gray-200 h-64 rounded-lg"></div>
                    <div className="bg-gray-200 h-64 rounded-lg"></div>
                    <div className="bg-gray-200 h-64 rounded-lg"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Venue information */}
                    <div className="w-full md:w-2/3">
                        <div className="border rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-bold mb-4">About {venue.name}</h3>
                            <p className="text-gray-700 mb-4">{venue.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
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
                                <p className="font-bold text-red-600">Rs. {venue.price} (per plate)</p>
                            </div>
                            <button className="text-blue-600 mt-4">See more...</button>
                        </div>

                        <div className="border rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-bold mb-4">Amenities</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {venue.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-bold mb-4">Rules</h3>
                            <ol className="list-decimal pl-5 space-y-2">
                                {venue.rules.map((rule, index) => (
                                    <li key={index}>{rule}</li>
                                ))}
                            </ol>
                            <p className="mt-4 text-gray-700 italic">{venue.bookingNote}</p>
                        </div>

                    

                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-4">Halls</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {["Wedding Hall", "Party Hall", "Small Party"].map((hall, index) => (
                                    <div key={index} className="border p-4 text-center">
                                        <div className="bg-gray-200 p-4 mb-2 flex justify-center">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                        <p className="font-medium">{hall}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* <div className="mb-6">
                            <h3 className="text-xl font-bold mb-4">Where you'll be</h3>
                            <div className="bg-gray-200 h-64 rounded-lg"></div>
                        </div> */}
                    </div>

                    {/* Booking form */}
                    <div className="w-full md:w-1/3">
                        <div className="border rounded-lg p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-4">Book Now</h3>
                            
                            <div className="mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="bg-red-600 text-white py-2 rounded">Day</button>
                                    <button className="border py-2 rounded">Evening</button>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block mb-1">Start Date <span className="text-red-500">*</span></label>
                                <input 
                                    type="date" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block mb-1">End Date <span className="text-red-500">*</span></label>
                                <input 
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block mb-1">Number Of Guests <span className="text-red-500">*</span></label>
                                <input 
                                    type="number"
                                    value={guestCount}
                                    onChange={(e) => setGuestCount(e.target.value)}
                                    placeholder="500"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            
                            {!isLoggedIn && (
                                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                                    <p>To proceed, please log in to your account</p>
                                </div>
                            )}
                            
                            <div className="mb-4">
                                <label className="block mb-1">Select event type</label>
                                <select className="w-full p-2 border rounded">
                                    <option>Wedding</option>
                                    <option>Birthday</option>
                                    <option>Corporate Event</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block mb-1">Additional Request</label>
                                <textarea className="w-full p-2 border rounded h-24" placeholder="Any special requirements..."></textarea>
                            </div>
                            
                            <button 
                                onClick={handleBookNow}
                                className="w-full bg-red-600 text-white py-3 rounded font-bold"
                            >
                                Book Now
                            </button>
                            
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default VenueDetails;