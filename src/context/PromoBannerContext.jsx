
import React, { createContext, useContext, useState, useEffect } from 'react';

const PromoBannerContext = createContext();

export const usePromoBanner = () => {
  const context = useContext(PromoBannerContext);
  if (!context) {
    throw new Error('usePromoBanner must be used within a PromoBannerProvider');
  }
  return context;
};

export const PromoBannerProvider = ({ children }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  
  const hideBanner = () => {
    setIsBannerVisible(false);
  };

  
  const showBanner = () => {
    setIsBannerVisible(true);
  };

  
  const resetBanner = () => {
    setIsBannerVisible(true);
  };

  const value = {
    isBannerVisible,
    hideBanner,
    showBanner,
    resetBanner,
  };

  return (
    <PromoBannerContext.Provider value={value}>
      {children}
    </PromoBannerContext.Provider>
  );
};