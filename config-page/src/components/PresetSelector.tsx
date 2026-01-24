import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface PresetSelectorProps {
  themeType: 'day' | 'night';
  onPresetChange?: (preset: string) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ themeType, onPresetChange }) => {
  const { themeManager, isLoading } = useTheme();
  const [preset, setPreset] = useState<string>('default');
  const [themes, setThemes] = useState<string[]>([]);

  useEffect(() => {
    if (isLoading || !themeManager) return;

    // Load available themes
    const availableThemes = themeManager.getAvailableThemes();
    setThemes(availableThemes);

    // Load current preset
    const currentPreset = themeManager.getCurrentPreset(themeType);
    setPreset(currentPreset);
  }, [themeManager, isLoading, themeType]);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPreset = e.target.value;
    setPreset(newPreset);

    if (themeManager) {
      themeManager.applyPreset(newPreset, themeType);
      onPresetChange?.(newPreset);
      
      // Force re-render of color pickers by updating their state
      // This will be handled by the ThemeManager's state updates
    }
  };

  if (isLoading) {
    return <div className="preset-selector-loading">Loading themes...</div>;
  }

  return (
    <div className="preset-selector">
      <label htmlFor={`${themeType}-preset-select`} className="preset-label">
        {themeType.charAt(0).toUpperCase() + themeType.slice(1)} Theme:
      </label>
      <select
        id={`${themeType}-preset-select`}
        value={preset}
        onChange={handlePresetChange}
        className="preset-select"
        disabled={isLoading}
      >
        <option value="custom">Custom</option>
        {themes.map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PresetSelector;