import { useState } from 'react';
import { INITIAL_FORM_DATA } from '../components/Add/constans';

export const useFormData = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const updateField = (path, newValue) => {
    setFormData(prev => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const nested = keys.reduce((obj, key) => obj[key], prev);
      nested[lastKey] = newValue;
      return { ...prev };
    });
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  return {
    formData,
    setFormData,
    updateField,
    resetForm
  };
};