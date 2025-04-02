import { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
    const categories = [
        { id: 'all', name: 'SHOW ALL' },
        { id: 'decorations', name: 'DECORATIONS' },
        { id: 'photography', name: 'PHOTOGRAPHY & VIDEOGRAPHY' },
        { id: 'baja', name: 'BAJA (MUSIC)' },
        { id: 'venue', name: 'VENUE' },
        { id: 'clothing', name: 'CLOTHING' },
        { id: 'makeup', name: 'MAKEUP' },
        { id: 'invitation', name: 'INVITATION CARDS' }
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    // Sample gallery data - replace with your actual data source
    const galleryItems = [
        {
        id: 1,
        title: 'Ishwar weds Mamata',
        image: '/public/LandingPhoto.jpg',
        description: 'Marriage is the garden where love\'s flowers bloom, nurturing our souls with kindness, passion, and understanding. Together, we tend to this garden, sowing seeds of love that grow into a lifetime of cherished memories.',
        date: '15 May, 2023',
        category: 'photography'
        },
        {
        id: 2,
        title: 'Surakshya Pant ❤️ Manav Subedi',
        image: '/public/LandingPhoto.jpg',
        description: 'The secret of a happy marriage is finding the right person. You know they\'re right if you love to be with them all the time.',
        date: '06 April, 2023',
        category: 'venue'
        },
        {
        id: 3,
        title: 'Foto Fusion',
        image: '/public/LandingPhoto.jpg',
        description: 'Together is a beautiful place to be',
        date: '26 March, 2023',
        category: 'decorations'
        },
        {
        id: 4,
        title: 'Anu Jha ❤️ Sumit Mishra',
        image: '/public/LandingPhoto.jpg',
        description: 'Love recognizes no barriers.',
        date: '24 January, 2023',
        category: 'clothing'
        },
        {
        id: 5,
        title: 'Sunil Weds Vandana',
        image: '/public/LandingPhoto.jpg',
        description: 'To be fully seen by somebody, then, and be loved anyhow--this is a human offering that can border on miraculous.',
        date: '09 January, 2023',
        category: 'makeup'
        },
        {
        id: 6,
        title: 'Wed Highlights',
        image: '/public/LandingPhoto.jpg',
        description: 'Once in a while, right in the middle of an ordinary life, love gives us a fairy tale.',
        date: '02 January, 2023',
        category: 'invitation'
        }
    ];

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const filteredItems = activeCategory === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <div className="gallery-container">
            <div className="gallery-hero">
                <div className="hero-content">
                    <h1>Real Wedding Stories</h1>
                    <div className="breadcrumb">
                        <a href="/">Home</a> &gt; <span>Real Wedding Stories</span>
                    </div>
                </div>
            </div>

            <div className="category-filter">
                {categories.map(category => (
                <button 
                    key={category.id}
                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                >
                    {category.name}
                </button>
                ))}
            </div>

            <div className="gallery-grid">
                {filteredItems.map((item) => (
                <div className="gallery-item" key={item.id}>
                    <div className="gallery-image">
                        <img src={item.image} alt={item.title} />
                        <div className="gallery-overlay">
                            <div className="overlay-content">
                                <p className="view-details">View Details</p>
                            </div>
                        </div>
                    </div>
                    <div className="couple-name">{item.title}</div>
                    <div className="gallery-content">
                        <p className="gallery-description">{item.description}</p>
                        <div className="gallery-date">{item.date}</div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;