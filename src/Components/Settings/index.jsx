import React, { useContext } from 'react';
import { SettingsContext } from '../../Context/SettingsContext';

const Settings = () => {
  const { 
    displayItems, hideCompleted, sortField, 
    setDisplayItems, setHideCompleted, setSortField, 
    saveSettingsToLocalStorage 
  } = useContext(SettingsContext);

  const handleSave = () => {
    saveSettingsToLocalStorage();
  };

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Display Items:
        <input 
          type="number" 
          value={displayItems} 
          onChange={(e) => setDisplayItems(e.target.value)} 
        />
      </label>
      <label>
        Hide Completed:
        <input 
          type="checkbox" 
          checked={hideCompleted} 
          onChange={() => setHideCompleted(!hideCompleted)} 
        />
      </label>
      <label>
        Sort By:
        <select 
          value={sortField} 
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="difficulty">Difficulty</option>
          {/* Add other options if required */}
        </select>
      </label>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default Settings;
