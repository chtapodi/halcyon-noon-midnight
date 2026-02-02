import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ConfigContext';
import { PresetSelector } from './PresetSelector';
import ColorSettings from './ColorSettings';
import ToggleSwitch from './ToggleSwitch';
import { ThemeType } from '../types';

interface ThemeSettingsProps {
  themeType: ThemeType;
  title: string;
  showToggle?: boolean;
  onToggleChange?: (checked: boolean) => void;
  isEnabled?: boolean;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = React.memo(({
  themeType,
  title,
  showToggle = false,
  onToggleChange,
  isEnabled = true,
}) => {
  const { getCurrentPreset, applyPreset, isLoading } = useTheme();
  const currentPreset = getCurrentPreset(themeType);
  const [showColors, setShowColors] = useState(false);

  // Load current preset and show colors if custom
  useEffect(() => {
    if (isLoading) return;

    setShowColors(currentPreset === 'custom');
  }, [currentPreset, isLoading]);

  // Memoized preset change handler
  const handlePresetChange = useCallback((newPreset: string) => {
    applyPreset(newPreset, themeType);
    setShowColors(newPreset === 'custom');
  }, [applyPreset, themeType]);

  if (isLoading) {
    return <div className="theme-settings-loading">Loading {title.toLowerCase()} theme...</div>;
  }

  return (
    <div className="theme-section">
      {showToggle && onToggleChange && (
        <ToggleSwitch
          checked={isEnabled}
          onChange={onToggleChange}
          label={`Enable ${title}`}
          id={`${themeType}-theme-toggle`}
          description={`Enable a separate theme for ${title.toLowerCase()} hours`}
        />
      )}

      {(isEnabled || !showToggle) && (
        <>
          <h4>{title}</h4>
          <PresetSelector
            themeType={themeType}
            onPresetChange={handlePresetChange}
          />
          <ColorSettings themeType={themeType} showColors={showColors} />
        </>
      )}
    </div>
  );
});

ThemeSettings.displayName = 'ThemeSettings';

export default ThemeSettings;