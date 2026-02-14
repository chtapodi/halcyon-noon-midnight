import React from 'react';
import { useConfig } from '../context/PebbleConfigContext';

export const Toggle: React.FC<{ label: string; messageKey: string }> = ({ label, messageKey }) => {
  const { settings, updateSetting } = useConfig();
  const value = !!settings[messageKey];

  return (
    <div className="pebble-item pebble-toggle">
      <label>{label}</label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => updateSetting(messageKey, e.target.checked ? 1 : 0)}
      />
    </div>
  );
};
