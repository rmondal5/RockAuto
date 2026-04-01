import React, { useState } from 'react';
import { Search } from 'lucide-react';

const MOCK_DATA = {
    years: ['2025', '2024', '2023', '1969'],
    makes: {
        '2025': ['Toyota', 'Honda', 'Ford', 'BMW'],
        '2024': ['Toyota', 'Honda', 'Ford', 'Chevrolet'],
        '2023': ['Toyota', 'Honda', 'Ford', 'Chevrolet'],
        '1969': ['Chevrolet', 'Ford', 'Pontiac'],
    },
    models: {
        'Toyota': ['Camry', 'Corolla', 'RAV4'],
        'Honda': ['Civic', 'Accord'],
        'Ford': ['F-150', 'Mustang'],
        'Chevrolet': ['Camaro', 'Silverado'],
        'BMW': ['3 Series', 'X5'],
        'Pontiac': ['GTO']
    },
    engines: {
        'Camry': ['2.5L 4-Cyl', '3.5L V6'],
        'Accord': ['1.5L Turbo', '2.0L Turbo'],
        'F-150': ['3.5L EcoBoost', '5.0L V8'],
        'Camaro': ['5.7L V8 (350)', '6.5L V8 (396)'],
        '3 Series': ['2.0L Turbo', '3.0L Inline 6'],
        'Mustang': ['289 V8', '302 V8', '5.0L V8']
    }
};

export default function VehicleSelector({ onVehicleSelect }) {
    const [selection, setSelection] = useState({
        year: '',
        make: '',
        model: '',
        engine: ''
    });

    const handleSelect = (field, value) => {
        const newSelection = { ...selection, [field]: value };
        
        // Reset dependent fields
        if (field === 'year') {
            newSelection.make = '';
            newSelection.model = '';
            newSelection.engine = '';
        } else if (field === 'make') {
            newSelection.model = '';
            newSelection.engine = '';
        } else if (field === 'model') {
            newSelection.engine = '';
        }
        
        setSelection(newSelection);
    };

    const handleSearch = () => {
        if (selection.year && selection.make && selection.model && selection.engine) {
            onVehicleSelect(selection);
        } else {
            alert('Please complete all vehicle specifications to find exact-fit parts.');
        }
    };

    // Get options dynamically based on current selections
    const availableMakes = selection.year ? (MOCK_DATA.makes[selection.year] || []) : [];
    const availableModels = selection.make ? (MOCK_DATA.models[selection.make] || []) : [];
    const availableEngines = selection.model ? (MOCK_DATA.engines[selection.model] || ['Standard Engine']) : [];

    return (
        <div className="overlap-card" style={{ padding: '1.5rem 2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                Find Parts for Your Vehicle
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                alignItems: 'end'
            }}>
                
                {/* Year */}
                <div className="form-group">
                    <label className="form-label">Year</label>
                    <select 
                        className="input-base" 
                        value={selection.year}
                        onChange={(e) => handleSelect('year', e.target.value)}
                    >
                        <option value="">Select Year</option>
                        {MOCK_DATA.years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>

                {/* Make */}
                <div className="form-group">
                    <label className="form-label">Make</label>
                    <select 
                        className="input-base" 
                        value={selection.make}
                        onChange={(e) => handleSelect('make', e.target.value)}
                        disabled={!selection.year}
                    >
                        <option value="">Select Make</option>
                        {availableMakes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>

                {/* Model */}
                <div className="form-group">
                    <label className="form-label">Model</label>
                    <select 
                        className="input-base" 
                        value={selection.model}
                        onChange={(e) => handleSelect('model', e.target.value)}
                        disabled={!selection.make}
                    >
                        <option value="">Select Model</option>
                        {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>

                {/* Engine */}
                <div className="form-group">
                    <label className="form-label">Engine / Trim</label>
                    <select 
                        className="input-base" 
                        value={selection.engine}
                        onChange={(e) => handleSelect('engine', e.target.value)}
                        disabled={!selection.model}
                    >
                        <option value="">Select Engine</option>
                        {availableEngines.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>

                {/* Search Button */}
                <button 
                    className="btn btn-primary" 
                    style={{ height: '42px' }}
                    onClick={handleSearch}
                >
                    <Search size={18} />
                    Search Parts
                </button>
            </div>
        </div>
    );
}
