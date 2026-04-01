import React from 'react';
import { Settings, Disc, Droplets, Lightbulb, Battery, Gauge } from 'lucide-react';

const CATEGORIES = [
  { id: 'engine', label: 'Engine Parts', icon: <Settings size={40} /> },
  { id: 'brakes', label: 'Brakes', icon: <Disc size={40} /> },
  { id: 'suspension', label: 'Suspension', icon: <Droplets size={40} /> },
  { id: 'lighting', label: 'Lighting', icon: <Lightbulb size={40} /> },
  { id: 'batteries', label: 'Batteries', icon: <Battery size={40} /> },
  { id: 'steering', label: 'Steering', icon: <Gauge size={40} /> }
];

export default function CategoryBrowser({ onSelectCategory }) {
  return (
    <div className="animate-fade-in" style={{ marginTop: '2.5rem' }}>
      <h2 className="section-title">Shop by Category</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '2rem',
        marginTop: '1.5rem',
        justifyItems: 'center'
      }}>
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id} 
            className="category-wrapper" 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={() => onSelectCategory(cat.id)}
          >
            <div className="category-circle">
                {cat.icon}
            </div>
            <span className="category-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
