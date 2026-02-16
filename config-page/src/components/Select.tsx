import React from 'react';
import { useConfig } from '../context/PebbleConfigContext';

export const Select: React.FC<{ label: string; messageKey: string; options: { label: string; value: string | number }[] }> = ({ label, messageKey, options }) => {
  const { settings, updateSetting } = useConfig();
  const value = settings[messageKey];

  return (
    <div className="pebble-item pebble-select">
      <label>{label}</label>
      <select 
        value={value} 
        onChange={(e) => {
          const val = e.target.value;
          const num = parseInt(val, 10);
          updateSetting(messageKey, isNaN(num) ? val : num);
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};
