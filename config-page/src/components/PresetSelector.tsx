import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import ThemePreview from './ThemePreview';
import { ThemeType } from '../types';

interface PresetSelectorProps {
  themeType: ThemeType;
  onPresetChange?: (preset: string) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ themeType, onPresetChange }) => {
  const { isLoading, state, setPreset } = useConfig();
  const currentPreset = state.theme[themeType]?.preset || 'custom';
  
  // Get theme names directly from state
  const themeNames = state.themesData?.sharedThemes 
    ? Object.keys(state.themesData.sharedThemes).sort((a, b) => {
        if (a === 'default') return -1;
        if (b === 'default') return 1;
        return a.localeCompare(b);
      })
    : [];

  const handlePresetSelect = (presetName: string) => {
    setPreset(themeType, presetName);
    if (onPresetChange) onPresetChange(presetName);
  };

  return (
    <div className="preset-selectors">
      <div className="preset-selector-label">
        {themeType.charAt(0).toUpperCase() + themeType.slice(1)} Theme:
      </div>
      <div className="preset-selector">
        {/* Custom option */}
        <div className="preset-option">
          <input
            type="radio"
            id={`${themeType}-custom`}
            name={`${themeType}-theme`}
            checked={currentPreset === 'custom'}
            onChange={() => handlePresetSelect('custom')}
            className="preset-radio"
          />
          <label htmlFor={`${themeType}-custom`} className="preset-label">
            <div className="preset-custom-preview">🎨</div>
            <span className="preset-name">Custom</span>
          </label>
        </div>

        {/* Theme previews */}
        {themeNames.map((themeName) => (
          <ThemePreview
            key={themeName}
            themeName={themeName}
            themeType={themeType}
            isSelected={currentPreset === themeName}
            onClick={() => handlePresetSelect(themeName)}
          />
        ))}
      </div>
    </div>
  );
};