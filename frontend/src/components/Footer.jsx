import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-red-900 text-white">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Links Section */}
            <div>
                <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                <ul className="space-y-2">
                <li>
                    <Link to="/about" className="flex items-center hover:text-yellow-300 transition duration-200">
                    <span className="text-yellow-300 mr-2">•</span>
                    About Us
                    </Link>
                </li>
                <li>
                    <Link to="/gallery" className="flex items-center hover:text-yellow-300 transition duration-200">
                    <span className="text-yellow-300 mr-2">•</span>
                    Gallery
                    </Link>
                </li>
                <li>
                    <Link to="/venues" className="flex items-center hover:text-yellow-300 transition duration-200">
                    <span className="text-yellow-300 mr-2">•</span>
                    Venues
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="flex items-center hover:text-yellow-300 transition duration-200">
                    <span className="text-yellow-300 mr-2">•</span>
                    Contact Us
                    </Link>
                </li>
                </ul>
            </div>

            {/* Contact Information Section */}
            <div>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-3">
                <p>Call us for services:</p>
                <p className="text-yellow-300">+977 9841642233</p>
                
                <p>Email Us:</p>
                <p className="text-yellow-300">info@yourwebsite.com</p>
                
                <p>Location:</p>
                <p>Kathmandu, Nepal</p>
                </div>
            </div>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-red-950 py-6">
            <div className="container mx-auto px-4 flex flex-col items-center">
            <p className="text-yellow-300 text-xl font-bold mb-4">yourwebsite.com</p>
            
            <Link 
                to="/contact" 
                className="border border-white text-white hover:bg-white hover:text-red-900 px-6 py-2 rounded-full mb-4 transition duration-300"
            >
                CONTACT US
            </Link>
            
            <p className="text-center">
                We are <span className="text-yellow-300">HERE</span><br />
                for your every needs
            </p>
            </div>
        </div>
        </footer>
    );
}