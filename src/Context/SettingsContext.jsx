// src/Context/SettingsContext.jsx

import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = (props) => {
  const [displayItems, setDisplayItems] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [sortField, setSortField] = useState('difficulty'); // Default sort field
  
  useEffect(() => {
    let settings = localStorage.getItem('settings');
    if (settings) {
      setDisplayItems(settings.displayItems);
      setHideCompleted(settings.hideCompleted);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify({
      displayItems, hideCompleted }));
  }, [hideCompleted, displayItems]);

  return (
    <SettingsContext.Provider value={{ 
      displayItems, hideCompleted, sortField,
      setDisplayItems, setHideCompleted, setSortField, 
    }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

