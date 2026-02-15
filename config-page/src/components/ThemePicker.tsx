import React from 'react';
import { useConfig } from '../context/PebbleConfigContext';

export const ThemePicker: React.FC<{
  label: string;
  themes: Record<string, Record<string, string>>;
}> = ({ label, themes }) => {
  const { updateSetting } = useConfig();

  const handleThemeChange = (themeName: string) => {
    const theme = themes[themeName];
    if (theme) {
      Object.entries(theme).forEach(([key, value]) => {
        updateSetting(key, value);
      });
    }
  };

  return (
    <div className="pebble-item pebble-theme-picker">
      <label>{label}</label>
      <select onChange={(e) => handleThemeChange(e.target.value)}>
        <option value="">Select a theme...</option>
        {Object.keys(themes).map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
};
