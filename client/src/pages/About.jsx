import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const About = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Navbar />
            {/* Breadcrumb Banner with Red Background */}
                <div className="w-full py-20 px-4 mb-8 mt-10 bg-red-600 text-white text-center shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/LandingPhoto.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <div className="flex justify-center text-lg">
                        <span 
                            className="hover:text-red-200 cursor-pointer transition-colors" 
                            onClick={() => navigate('/')}
                        >
                            Home
                        </span>
                        <span className="mx-2">&gt;</span>
                        <span className="font-medium">About Us</span>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <main className="flex-grow pt-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
                


                {/* Page Title */}
                <h1 className="text-3xl font-bold text-red-700 mb-8 border-b-2 border-red-200 pb-3">About Celebration Station</h1>

                {/* Main Content Section with Red Accents */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                        <div className="w-1 h-8 bg-red-500 mr-3"></div>
                        One-Stop-Shop
                    </h2>
                    
                    <div className="space-y-4 text-gray-700">
                        <p>
                            A celebration is such a special and intimate occasion; a carefully constructed dream brought to life. All individuals, we firmly believe, deserve to have a celebration that they can not only cherish and remember fondly. Celebration Station is a comprehensive event planning website where you find the best event vendors according to your budget. Check prices, get verified reviews, and check work done by the vendors to secure your celebration. Save your time for unnecessary hassles.
                        </p>
                        <p>
                            Celebration Station is a One-Stop-Shop where you get the best photographers, makeup artists, event cards, decor, venues, catering, rental services, and decorations for the best prices. Also, get event ideas and inspiration from our blog and real events.
                        </p>
                        <p>
                            Planning events can be stressful when it comes to pre-event planning, venue selection, decorations, catering, and searching for services at the last minute. We understand that a special occasion for you cannot be an experiment with things that can run into a disaster. Compare the price and quality of all vendors and select the one that suits your budget. Save your time at the click of a button. Celebration Station is not limited to weddings, it can be useful for other events like corporate functions, birthday parties, baby showers, office events, or any celebration related to photography, makeup, venues, and rental.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision Section with Styled Cards */}
                <section className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white border-l-4 border-red-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-bold text-red-700 mb-4">OUR MISSION</h3>
                        <p className="text-gray-700">
                            Every event starts with organized details. Our mission is to help our clients end up the least wasted with up-to-date information under their budget while making everyone feel valued, celebrated and relaxed. Late not let our client compromise on their celebration with limited resources and services. Vendors all over can join us and get the right customers to grow your business.
                        </p>
                    </div>
                    
                    <div className="bg-white border-l-4 border-red-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-bold text-red-700 mb-4">OUR VISION</h3>
                        <p className="text-gray-700">
                            To deepen our relationship with vendors and explore innovative trends. We aim to provide a highly responsive platform to be the preferred service provider in the event management circle. Time will be continual development of both staff and technology to bring the most effective techniques to plan and create memories of a lifetime, with each event exceeding everyone expectations.
                        </p>
                    </div>
                </section>

                {/* Call to Action with Red Background */}
                <section className="mb-12 text-center bg-gradient-to-r from-red-500 to-red-700 p-10 rounded-lg text-white shadow-lg">
                    <h3 className="text-2xl font-bold mb-6">Build Your Event Today!</h3>
                    <p className="max-w-2xl mx-auto mb-8">
                        We collaborate with you to co-create remarkable events that achieve your goals. Explore our services and when you are ready a member of our events team would love the chance to help get you started.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button 
                            onClick={() => navigate('/services')}
                            className="bg-white text-red-700 px-6 py-3 rounded hover:bg-red-100 transition-colors font-medium shadow-md"
                        >
                            OUR SERVICES &gt;&gt;
                        </button>
                        <button 
                            onClick={() => navigate('/contact')}
                            className="bg-white text-red-700 px-6 py-3 rounded hover:bg-red-100 transition-colors font-medium shadow-md"
                        >
                            GET IN TOUCH &gt;&gt;
                        </button>
                    </div>
                </section>

                {/* Why Choose Us with Red Accented Cards */}
                <section className="mb-16">
                    <h3 className="text-2xl font-bold text-red-700 mb-2 text-center">Why Choose Us</h3>
                    <h4 className="text-xl text-gray-600 mb-8 text-center">Celebration Station's Advantages</h4>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            "One-Stop-Shop for your events",
                            "Save your time for unnecessary hassles",
                            "Compare vendors price and quality accordingly",
                            "Get verified reviews and work done by vendors"
                        ].map((item, index) => (
                            <div key={index} className="border border-red-200 bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-1 bg-red-500 mx-auto mb-4 group-hover:w-16 transition-all"></div>
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default About