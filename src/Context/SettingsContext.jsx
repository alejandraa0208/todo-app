// src/Context/SettingsContext.jsx

import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = (props) => {
  const [displayItems, setDisplayItems] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [sortField, setSortField] = useState('difficulty'); // Default sort field
  
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const { displayItems, hideCompleted, sortField } = JSON.parse(savedSettings);
      setDisplayItems(displayItems);
      setHideCompleted(hideCompleted);
      setSortField(sortField);
    }
  }, []);

  const saveSettingsToLocalStorage = () => {
    const settings = {
      displayItems,
      hideCompleted,
      sortField
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  return (
    <SettingsContext.Provider value={{ 
      displayItems, hideCompleted, sortField,
      setDisplayItems, setHideCompleted, setSortField, 
      saveSettingsToLocalStorage 
    }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

