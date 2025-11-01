// src/components/MojProfil/tabs/PropertiesTab.js
import React, { useEffect, useState } from 'react';
import UserProperties from '../../components/UserProperties/UserProperties';

const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

export default function PropertiesTab({ 
  currentUser, 
  userProperties, 
  setUserProperties, 
  setSuccessMessage, 
  setError 
}) {
  const [propertiesLoading, setPropertiesLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchUserProperties();
    }
  }, [currentUser]);

// W PropertiesTab.js zamiast /user/moje użyj:
const fetchUserProperties = async () => {
  try {
    setPropertiesLoading(true);
    const response = await fetch(`${API_BASE_URL}/properties?my=true`, {
      credentials: 'include'
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        setUserProperties(result.properties);
      }
    } else {
      console.error('Błąd pobierania nieruchomości');
    }
  } catch (err) {
    console.error('Błąd pobierania nieruchomości:', err);
  } finally {
    setPropertiesLoading(false);
  }
};

  const handlePropertyStatusChange = async (propertyId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'aktywne' ? 'nieaktywne' : 'aktywne';
      
      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setSuccessMessage(`Status nieruchomości zmieniony na ${newStatus}`);
        fetchUserProperties();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Błąd zmiany statusu');
      }
    } catch (err) {
      setError('Błąd zmiany statusu nieruchomości');
    }
  };

  const handlePropertyDelete = async (propertyId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę nieruchomość?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setSuccessMessage('Nieruchomość została usunięta');
        fetchUserProperties();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Błąd usuwania nieruchomości');
      }
    } catch (err) {
      setError('Błąd usuwania nieruchomości');
    }
  };

  return (
    <div className="mp-tab-content">
      <UserProperties
        userProperties={userProperties}
        loading={propertiesLoading}
        onStatusChange={handlePropertyStatusChange}
        onDelete={handlePropertyDelete}
        onRefresh={fetchUserProperties}
      />
    </div>
  );
}