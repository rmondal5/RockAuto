import React, { useState } from 'react';
import Header from './components/Header';
import VehicleSelector from './components/VehicleSelector';
import CategoryBrowser from './components/CategoryBrowser';
import PartCard from './components/PartCard';
import { Package, User, MapPin, Truck, CheckCircle, Car } from 'lucide-react';
import './index.css';

// Enhanced Mock Data for Evaluation Tasks
const MOCK_PARTS = [
    { id: 'b1', category: 'brakes', keyword: 'pads front', popular: true, discount: '-15%', brand: 'Brembo', number: 'K7289', name: 'Ceramic Brake Pads', fitment: 'For 2024 Toyota Camry', type: 'Ceramic', warranty: '3-Year', price: 129.99, oldPrice: 155.00 },
    { id: 'b2', category: 'brakes', keyword: 'disc front', popular: false, brand: 'Bosch', number: 'BC905', name: 'Premium Disc Brake Set', fitment: 'Universal Fit', type: 'Metallic', warranty: '1-Year', price: 45.42 },
    { id: 'e1', category: 'engine', keyword: 'spark plug', popular: true, brand: 'Denso', number: '3444', name: 'Iridium Spark Plug', fitment: 'Universal Fit', type: 'Iridium', warranty: 'Lifetime', price: 12.50 },
    { id: 'e2', category: 'engine', keyword: 'belt serpentine', discount: '-20%', popular: true, brand: 'Gates', number: 'K060908', name: 'Micro-V Serpentine Belt', fitment: 'Engine Belt', type: 'EPDM', warranty: '3-Year', price: 24.99, oldPrice: 32.00 },
    { id: 's1', category: 'suspension', keyword: 'shock strut', discount: '-10%', brand: 'H&R', number: '50410', name: 'Performance Suspension Kit', fitment: 'For 2023 Honda Accord', type: 'Performance', warranty: '3-Year', price: 999.99, oldPrice: 1120.00 },
    { id: 'l1', category: 'lighting', keyword: 'headlight led', discount: '-30%', brand: 'HID', number: 'LH100', name: 'LED Headlight Kit', fitment: 'For 2022 Ford F-150', type: 'LED', warranty: '2-Year', price: 249.99, oldPrice: 350.00 },
    // Antique Car Part (Task 5)
    { id: 'a1', category: 'engine', keyword: 'carburetor rebuild kit', popular: true, brand: 'Holley', number: '37-119', name: 'Carburetor Rebuild Kit', fitment: 'For 1969 Chevrolet Camaro', type: 'Rebuild Kit', warranty: '90-Day', price: 79.99 }
];

export default function App() {
    const [cart, setCart] = useState([]);
    const [currentView, setCurrentView] = useState('home'); // 'home', 'account', 'orders', 'searchResults'
    const [vehicle, setVehicle] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [savedVehicles, setSavedVehicles] = useState([]);

    const handleAddToCart = (part) => {
        setCart([...cart, part]);
    };

    const handleVehicleSelect = (selectedVehicle) => {
        setVehicle(selectedVehicle);
        setSelectedCategory(null);
        setCurrentView('home');
        // Scroll slightly past hero if possible natively
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentView('searchResults');
    };

    const renderSearchResults = () => {
        const results = MOCK_PARTS.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '60vh' }}>
                <h2 className="section-title">Search Results for "{searchQuery}"</h2>
                {results.length === 0 ? (
                    <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                        <h3>No parts found.</h3>
                        <p>Try searching for "belt" or "brake pads".</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {results.map(part => (
                            <PartCard key={part.id} part={part} onAddToCart={handleAddToCart} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderAccountView = () => {
        const [tempVehicle, setTempVehicle] = useState({ year: '2025', make: 'Toyota', model: 'Camry' });

        const saveGarage = () => {
            setSavedVehicles([...savedVehicles, tempVehicle]);
            alert('Vehicle saved to your garage!');
        };

        return (
            <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem', minHeight: '60vh' }}>
                <h2 className="section-title">My Account</h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Profile Form */}
                    <div className="card" style={{ padding: '2rem', flex: 1, minWidth: '300px' }}>
                        <div className="flex-center" style={{ gap: '1rem', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                            <div style={{ width: 60, height: 60, backgroundColor: 'var(--border-subtle)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={30} color="var(--text-secondary)" />
                            </div>
                            <div>
                                <h3 style={{ margin: 0 }}>John Doe</h3>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Member since 2024</p>
                            </div>
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label className="form-label">Email Address</label>
                            <input type="text" className="input-base" value="john@example.com" readOnly />
                        </div>
                        <button className="btn btn-secondary" style={{ width: '100%' }}>Edit Profile</button>
                    </div>

                    {/* Garage Tool */}
                    <div className="card" style={{ padding: '2rem', flex: 1, minWidth: '300px' }}>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Car color="var(--primary-blue)" /> My Garage
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Save your vehicles for faster part searching.
                        </p>
                        
                        {savedVehicles.length > 0 && (
                            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
                                {savedVehicles.map((v, i) => (
                                    <div key={i} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>✓ {v.year} {v.make} {v.model}</div>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <select className="input-base" value={tempVehicle.year} onChange={e => setTempVehicle({...tempVehicle, year: e.target.value})}>
                                <option>2025</option><option>2024</option><option>1969</option>
                            </select>
                            <select className="input-base" value={tempVehicle.make} onChange={e => setTempVehicle({...tempVehicle, make: e.target.value})}>
                                <option>Toyota</option><option>Honda</option><option>Chevrolet</option>
                            </select>
                        </div>
                        <input type="text" className="input-base" value={tempVehicle.model} onChange={e => setTempVehicle({...tempVehicle, model: e.target.value})} placeholder="Model" style={{ marginBottom: '1rem' }} />
                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={saveGarage}>Save Vehicle</button>
                    </div>
                </div>
            </div>
        );
    };

    const renderOrdersView = () => {
        return (
            <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem', minHeight: '60vh' }}>
                <h2 className="section-title">Order Tracking</h2>
                <div className="card" style={{ padding: '2rem' }}>
                    <div className="flex-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Order #10294-A</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Placed on March 28, 2026</p>
                        </div>
                        <span className="badge badge-yellow">In Transit</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '3rem', padding: '0 2rem' }}>
                        <div style={{ position: 'absolute', top: '20px', left: '2rem', right: '2rem', height: '4px', backgroundColor: 'var(--bg-main)', zIndex: 0 }}>
                            <div style={{ width: '50%', height: '100%', backgroundColor: 'var(--primary-blue)' }}></div>
                        </div>

                        {/* Status Dots */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, gap: '0.5rem' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <CheckCircle size={20} />
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Confirmed</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, gap: '0.5rem' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <Truck size={20} />
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-blue)' }}>Shipped</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, gap: '0.5rem' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--bg-main)', border: '2px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                <MapPin size={20} />
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Delivered</span>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-sm)' }}>
                        <h4 style={{ margin: '0 0 1rem 0' }}>Items in Shipment</h4>
                        <div className="flex-between" style={{ fontSize: '0.95rem' }}>
                            <span style={{ fontWeight: 500 }}>1x Micro-V Serpentine Belt (Gates K060908)</span>
                            <span>$24.99</span>
                        </div>
                        <div className="flex-between" style={{ fontSize: '0.95rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                            <span>Shipping</span>
                            <span>Standard Free</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderHomeContent = () => {
        if (!selectedCategory && vehicle && currentView === 'home') {
            return (
                <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
                    <div className="card" style={{ padding: '1rem 1.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Showing parts for:</span>
                        <h3 style={{ margin: 0, color: 'var(--primary-blue)' }}>
                            {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.engine}
                        </h3>
                    </div>
                    <CategoryBrowser onSelectCategory={setSelectedCategory} />
                </div>
            );
        }

        if (selectedCategory && currentView === 'home') {
            const partsList = MOCK_PARTS.filter(p => p.category === selectedCategory);
            
            return (
                <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', paddingBottom: '4rem' }}>
                    <button
                        className="btn btn-secondary"
                        style={{ marginBottom: '2rem' }}
                        onClick={() => setSelectedCategory(null)}
                    >
                        &larr; Back to Categories
                    </button>

                    <h2 className="section-title" style={{ textTransform: 'capitalize' }}>
                        {selectedCategory} Parts For {vehicle ? `${vehicle.year} ${vehicle.model}` : 'All Vehicles'}
                    </h2>

                    {partsList.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>No parts found for this category.</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {partsList.map(part => (
                                <PartCard key={part.id} part={part} onAddToCart={handleAddToCart} />
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        // Default home state (Products list under category browser mock)
        return (
            <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
                {!vehicle && <CategoryBrowser onSelectCategory={setSelectedCategory} />}
                
                <div style={{ marginTop: '4rem' }}>
                    <h2 className="section-title">Featured Products</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {MOCK_PARTS.filter(p => ['b1', 's1', 'l1', 'a1'].includes(p.id)).map(part => (
                            <PartCard key={part.id} part={part} onAddToCart={handleAddToCart} />
                        ))}
                    </div>
                </div>


            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
            <Header cartCount={cart.length} onSearch={handleSearch} onViewChange={setCurrentView} />

            {/* Hero Section ONLY visible on Home */}
            {currentView === 'home' && (
                <div style={{ width: '100%', position: 'relative' }}>
                    {/* Image Background with Dark Overlay */}
                    <div style={{
                        height: '500px',
                        backgroundColor: '#1e293b',
                        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.9)), url('/hero-bg.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textAlign: 'center',
                        padding: '0 2rem'
                    }}>
                        <div style={{ maxWidth: '800px', marginTop: '-4rem' }}>
                            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1, color: 'white' }}>
                                Premium Auto Parts<br />for Every Vehicle
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>
                                Find OEM and aftermarket parts from trusted brands. Fast shipping, expert support, and quality guaranteed.
                            </p>
                            <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
                                Browse Catalog
                            </button>
                        </div>
                    </div>
                    
                    {/* Overlapping Vehicle Selector */}
                    <div className="container">
                        <VehicleSelector onVehicleSelect={handleVehicleSelect} />
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main style={{ flex: 1 }}>
                {currentView === 'searchResults' && renderSearchResults()}
                {currentView === 'account' && renderAccountView()}
                {currentView === 'orders' && renderOrdersView()}
                {currentView === 'home' && renderHomeContent()}
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', padding: '4rem 0 2rem 0', marginTop: 'auto' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.05rem' }}>Customer Service</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <li><a href="#" style={{ color: '#cbd5e1' }}>Help / FAQs</a></li>
                                <li><a href="#" style={{ color: '#cbd5e1' }}>Track Order</a></li>
                                <li><a href="#" style={{ color: '#cbd5e1' }}>Returns</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.05rem' }}>Company</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <li><a href="#" style={{ color: '#cbd5e1' }}>About Us</a></li>
                                <li><a href="#" style={{ color: '#cbd5e1' }}>Careers</a></li>
                                <li><a href="#" style={{ color: '#cbd5e1' }}>Policies</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.05rem' }}>Popular Nav</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <li><a href="#" style={{ color: '#cbd5e1' }}>Tools & Universal Parts</a></li>
                                <li><a href="#" style={{ color: '#cbd5e1' }}>Free Catalog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>RockAuto</h3>
                            <p style={{ fontSize: '0.85rem' }}>CS 407/507 Project Prototype</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#334155' }}></div>
                                <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#334155' }}></div>
                                <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#334155' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
