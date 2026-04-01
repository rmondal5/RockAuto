import React, { useState } from 'react';
import { ShoppingCart, Check, Package, Scale } from 'lucide-react';

export default function PartCard({ part, onAddToCart }) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAddToCart(part);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="card hover-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Image Placeholder Area */}
            <div className="mock-image-container">
                <Package />
                {part.discount && (
                    <span 
                        className="badge badge-red" 
                        style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                    >
                        {part.discount}
                    </span>
                )}
            </div>

            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header: Title and Price */}
                <div className="flex-between" style={{ alignItems: 'flex-start', marginBottom: '0.25rem', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.05rem', lineHeight: 1.3, margin: 0 }}>{part.name}</h3>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            ${part.price.toFixed(2)}
                        </span>
                        {part.oldPrice && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                                ${part.oldPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Fitment */}
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {part.fitment || "Universal Fit"}
                </p>

                {/* Specs Grid */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '0.5rem', 
                    fontSize: '0.8rem', 
                    marginBottom: '1.25rem' 
                }}>
                    <div style={{ color: 'var(--text-muted)' }}>Brand:</div>
                    <div style={{ textAlign: 'right', fontWeight: 500, color: 'var(--text-primary)' }}>{part.brand}</div>
                    
                    <div style={{ color: 'var(--text-muted)' }}>Type:</div>
                    <div style={{ textAlign: 'right', fontWeight: 500, color: 'var(--text-primary)' }}>{part.type || 'Standard'}</div>
                    
                    <div style={{ color: 'var(--text-muted)' }}>Warranty:</div>
                    <div style={{ textAlign: 'right', fontWeight: 500, color: 'var(--text-primary)' }}>{part.warranty || '1-Year'}</div>
                </div>

                {/* Actions */}
                <div className="flex-between" style={{ marginTop: 'auto', gap: '0.5rem' }}>
                    <button
                        className={`btn ${added ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={handleAdd}
                        style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem' }}
                    >
                        {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                        {added ? 'Added' : 'Add to Cart'}
                    </button>
                    
                    <button className="btn btn-secondary" style={{ padding: '0.5rem 0.75rem', color: 'var(--text-secondary)' }}>
                        <Scale size={16} />
                        <span className="hide-mobile" style={{ fontSize: '0.85rem' }}>Compare</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
