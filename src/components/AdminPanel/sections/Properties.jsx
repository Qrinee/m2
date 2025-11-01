// src/components/AdminPanel/sections/Properties.js
import React, { useState, useEffect } from 'react';
import './Properties.css';
import PropertiesHeader from '../../PropertiesHeader/PropertiesHeader';
import PropertiesStats from '../../PropertiesStats/PropertiesStats';
import PropertiesFilters from '../../PropertiesFilters/PropertiesFilters';
import PropertiesGrid from '../../PropertiesGrid/PropertiesGrid';
import AddPropertyModal from '../../AddPropertyModal/AddPropertyModal';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND + '/api/properties/admin/all?limit=100', {
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          let filteredProperties = result.properties;
          
          if (filter === 'active') {
            filteredProperties = result.properties.filter(prop => prop.status === 'aktywne');
          } else if (filter === 'inactive') {
            filteredProperties = result.properties.filter(prop => prop.status !== 'aktywne');
          }
          
          setProperties(filteredProperties);
        }
      }
    } catch (error) {
      console.error('Błąd pobierania ofert:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePropertyStatus = async (propertyId, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/properties/admin/${propertyId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: status })
      });

      if (response.ok) {
        fetchProperties();
      } else {
        console.error('Błąd aktualizacji oferty');
      }
    } catch (error) {
      console.error('Błąd aktualizacji oferty:', error);
    }
  };

  const deleteProperty = async (propertyId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę ofertę?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/properties/${propertyId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        fetchProperties();
      } else {
        console.error('Błąd usuwania oferty');
      }
    } catch (error) {
      console.error('Błąd usuwania oferty:', error);
    }
  };

  if (loading) {
    return <div className="adm-prop-loading">Ładowanie ofert...</div>;
  }

  return (
    <div className="adm-prop-container">
      <PropertiesHeader onAddProperty={() => setShowAddForm(true)} />
      
      <PropertiesStats properties={properties} />
      
      <PropertiesFilters 
        filter={filter}
        onFilterChange={setFilter}
        properties={properties}
      />

      <PropertiesGrid
        properties={properties}
        onUpdateStatus={updatePropertyStatus}
        onDeleteProperty={deleteProperty}
      />

      {showAddForm && (
        <AddPropertyModal
          onClose={() => setShowAddForm(false)}
          onPropertyAdded={fetchProperties}
        />
      )}
    </div>
  );
};

export default Properties;