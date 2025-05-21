import { useState } from 'react';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';

const ContactUs = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNo: '',
        mobileNo: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            });

            const data = await response.json();
            
            if (response.ok) {
            toast.success('Your message has been sent successfully!');
            setFormData({
                fullName: '',
                email: '',
                contactNo: '',
                mobileNo: '',
                message: ''
            });
            } else {
            toast.error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to send message');
        }
        };

    return (
        <div className="flex flex-col min-h-screen bg-white">
        <NavBar />
        
        {/* Banner Section */}
        <div className="bg-purple-100 bg-opacity-80 text-center py-16 relative overflow-hidden">
            <div className="relative z-10">
            <p className="text-xl text-gray-800">wedtayari.com</p>
            <h1 className="text-4xl font-bold text-red-800 mb-4">Keep in Touch</h1>
            <div className="flex items-center justify-center text-gray-700">
                <span 
                className="hover:underline cursor-pointer" 
                onClick={() => navigate('/')}
                >
                Home
                </span>
                <span className="mx-2">&gt;</span>
                <span>Contact us</span>
            </div>
            </div>
        </div>

        {/* Contact Content Section */}
        <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
            <div className="mb-8">
            <p className="text-gray-600">contact us</p>
            <h2 className="text-3xl font-bold text-gray-900">Keep in touch with WedTayari</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Address */}
            <div className="flex flex-col items-start">
                <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">ADDRESS</h3>
                <p className="text-gray-700">
                Herald College Kathmandu,<br />
                Naxal, Nepal
                </p>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col items-start">
                <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">OPENING HOURS</h3>
                <p className="text-gray-700">
                Sun to Fri : 10 AM - 6 PM<br />
                Saturday: Closed
                </p>
            </div>

            {/* Contact No */}
            <div className="flex flex-col items-start">
                <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">CONTACT NO.</h3>
                <p className="text-gray-700">9841642233</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-start">
                <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">EMAIL US</h3>
                <p className="text-gray-700">venue@gmail.com</p>
            </div>
            </div>

            {/* Contact Form and Map Section */}
            <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-rose-500"
                    required
                    />
                    <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-rose-500"
                    required
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                    type="tel"
                    name="contactNo"
                    placeholder="Contact no."
                    value={formData.contactNo}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-rose-500"
                    />
                    <input
                    type="tel"
                    name="mobileNo"
                    placeholder="Mobile no."
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-rose-500"
                    />
                </div>
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full p-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-rose-500"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="py-3 px-8 bg-rose-600 border border-gray-300 rounded hover:bg-rose-900 transition duration-300 font-medium"
                >
                    SUBMIT
                </button>
                </form>
            </div>

            {/* Map */}
            <div className="h-96 bg-gray-100 rounded overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1581600460097!2d85.32740567510595!3d27.709739325931556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1915fc6c9ff7%3A0xddb98e7e240256b1!2sHerald%20College%20Kathmandu!5e0!3m2!1sen!2snp!4v1715927749476!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Herald College Kathmandu Location"
                    />
            </div>
            </div>
        </main>

        <Footer />
        </div>
    );
};

export default ContactUs;