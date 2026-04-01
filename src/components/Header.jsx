import React, { useState } from 'react';
import { Search, ShoppingCart, User, Package, Wrench } from 'lucide-react';

export default function Header({ cartCount, onSearch, onViewChange }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <header style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: 'var(--shadow-card)'
        }}>
            <div className="container flex-between" style={{ padding: '1rem 1.5rem' }}>
                
                {/* Logo Area */}
                <div 
                    className="logo-container flex-center" 
                    style={{ gap: '0.5rem', cursor: 'pointer' }}
                    onClick={() => onViewChange('home')}
                >
                    <Wrench size={28} color="var(--primary-blue)" />
                    <h1 style={{
                        fontSize: '1.5rem',
                        color: 'var(--primary-blue)',
                        margin: 0,
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        fontWeight: 800
                    }}>
                        RockAuto
                    </h1>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="flex-center" style={{ gap: '2rem', display: 'flex' }}>
                    <button 
                        onClick={() => onViewChange('home')} 
                        style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}
                    >
                        Shop Parts
                    </button>
                    <button 
                        onClick={() => onViewChange('account')} 
                        style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}
                    >
                        Account Profile
                    </button>
                    <button 
                        onClick={() => onViewChange('orders')} 
                        style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}
                    >
                        Order Tracking
                    </button>
                </nav>

                {/* Right Side Actions: Search & Cart */}
                <div className="flex-center" style={{ gap: '1.5rem' }}>
                    
                    {/* Search Form */}
                    <form onSubmit={handleSearchSubmit} className="flex-center" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search parts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-base"
                            style={{ 
                                paddingRight: '2.5rem', 
                                width: '200px',
                                borderRadius: 'var(--radius-full)'
                            }}
                        />
                        <button type="submit" style={{ position: 'absolute', right: '0.75rem', color: 'var(--text-muted)' }}>
                            <Search size={18} />
                        </button>
                    </form>

                    {/* Cart Icon */}
                    <button className="flex-center" style={{ position: 'relative', color: 'var(--text-primary)' }}>
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-8px',
                                backgroundColor: 'var(--primary-blue)',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                border: '2px solid white'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
