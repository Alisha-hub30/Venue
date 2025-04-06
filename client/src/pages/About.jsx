import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const About = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Navbar />
            
            {/* Main Content */}
            <main className="flex-grow pt-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-8">
                    <span 
                        className="hover:text-black cursor-pointer" 
                        onClick={() => navigate('/')}
                    >
                        Home &gt;
                    </span>
                    
                    <span className="text-black font-medium">About us</span>
                </div>

                {/* Page Title */}
                <h1 className="text-3xl font-bold text-black mb-8">About Venue</h1>

                {/* Main Content Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-black mb-6">One-Stop-Shop</h2>
                    
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

                {/* Mission & Vision Section */}
                <section className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 className="text-xl font-bold text-black mb-4">OUR MISSION</h3>
                        <p className="text-gray-700">
                            Every event starts with organized details. Our mission is to help our clients end up the least wasted with up-to-date information under their budget while making everyone feel valued, celebrated and relaxed. Late not let our client compromise on their celebration with limited resources and services. Vendors all over can join us and get the right customers to grow your business.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold text-black mb-4">OUR VISION</h3>
                        <p className="text-gray-700">
                            To deepen our relationship with vendors and explore innovative trends. We aim to provide a highly responsive platform to be the preferred service provider in the event management circle. Time will be continual development of both staff and technology to bring the most effective techniques to plan and create memories of a lifetime, with each event exceeding everyone expectations.
                        </p>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="mb-12 text-center">
                    <h3 className="text-2xl font-bold text-black mb-6">Build Your Event Today!</h3>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                        We collaborate with you to co-create remarkable events that achieve your goals. Explore our services and when you are ready a member of our events team would love the chance to help get you started.
                    </p>
                    <div className="flex justify-center gap-4 mb-8">
                        <button 
                            onClick={() => navigate('/services')}
                            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors font-medium"
                        >
                            OUR SERVICES &gt;&gt;
                        </button>
                        <button 
                            onClick={() => navigate('/contact')}
                            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors font-medium"
                        >
                            GET IN TOUCH &gt;&gt;
                        </button>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="mb-16">
                    <h3 className="text-2xl font-bold text-black mb-2 text-center">Why choose us</h3>
                    <h4 className="text-xl text-gray-600 mb-8 text-center">Celebration Stations advantages</h4>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            "One-Stop-Shop for your events",
                            "Save your time for unnecessary hassles",
                            "Compare vendors price and quality accordingly",
                            "Get verified reviews and work done by vendors"
                        ].map((item, index) => (
                            <div key={index} className="border border-gray-200 p-6 rounded-lg text-center">
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