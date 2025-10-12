import { useState, useEffect } from "react";

export const useProperty = (id) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/properties/${id}`);
        
        if (!response.ok) {
          throw new Error('Nie znaleziono nieruchomości');
        }
        
        const responseData = await response.json();
        
        if (responseData.success && responseData.property) {
          setProperty(responseData.property);
        } else {
          throw new Error('Nieprawidłowa struktura danych z serwera');
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, loading, error };
};