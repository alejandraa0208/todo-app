import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = (props) => {
  const [displayItems, setDisplayItems] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [sortWord, setSortWord] = useState('difficulty');

  return (
    <SettingsContext.Provider value={{ displayItems, hideCompleted, sortWord }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
