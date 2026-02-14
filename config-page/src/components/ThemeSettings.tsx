import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/hooks';
import { PresetSelector } from './PresetSelector';
import ColorSettings from './ColorSettings';
import { ThemeType } from '../types';

interface ThemeSettingsProps {
  themeType: ThemeType;
  title: string;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = React.memo(({
  themeType,
  title,
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
      <h4>{title}</h4>
      <PresetSelector
        themeType={themeType}
        onPresetChange={handlePresetChange}
      />
      <ColorSettings themeType={themeType} showColors={showColors} />
    </div>
  );
});

ThemeSettings.displayName = 'ThemeSettings';

export default ThemeSettings;