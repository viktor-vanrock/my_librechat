import React, { createContext, useState, useContext, useEffect } from 'react';

interface CurrentKeyContextType {
  hasCurrentKey: boolean;
  setCurrentKey: () => void;
}

const CurrentKeyContext = createContext<CurrentKeyContextType>({
  hasCurrentKey: false,
  setCurrentKey: () => {},
});

export const CurrentKeyProvider = ({ children }) => {
  const [hasCurrentKey, setHasCurrentKey] = useState(false);

  const setCurrentKey = () => {
    setHasCurrentKey((val) => !val);
  };

  return (  
    <CurrentKeyContext.Provider value={{ hasCurrentKey, setCurrentKey }}>
      {children}
    </CurrentKeyContext.Provider>
  );
};

export const useCurrentKey = () => {
  const context = useContext(CurrentKeyContext);
  if (!context) {
    throw new Error('useCurrentKey must be used within a CurrentKeyProvider');
  }
  return context;
};