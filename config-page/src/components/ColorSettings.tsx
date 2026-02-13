import React, { useMemo } from 'react';
import ColorPicker from './ColorPicker';
import { ThemeType } from '../types';

interface ColorSettingsProps {
  themeType: ThemeType;
  showColors: boolean;
}

interface ColorConfig {
  key: string;
  label: string;
}

export const ColorSettings: React.FC<ColorSettingsProps> = React.memo(({ themeType, showColors }) => {
  if (!showColors) return null;

  // Memoize color configuration to prevent unnecessary recalculations
  const colorConfig = useMemo<ColorConfig[]>(() => [
    { key: 'SETTING_TIME_COLOR', label: 'Time Color' },
    { key: 'SETTING_SUBTEXT_PRIMARY_COLOR', label: 'Primary Subtext' },
    { key: 'SETTING_SUBTEXT_SECONDARY_COLOR', label: 'Secondary Subtext' },
    { key: 'SETTING_BG_COLOR', label: 'Background' },
    { key: 'SETTING_PIP_COLOR_PRIMARY', label: 'Primary Pips' },
    { key: 'SETTING_PIP_COLOR_SECONDARY', label: 'Secondary Pips' },
    { key: 'SETTING_RING_STROKE_COLOR', label: 'Ring Stroke' },
    { key: 'SETTING_RING_DAY_COLOR', label: 'Day Ring' },
    { key: 'SETTING_RING_NIGHT_COLOR', label: 'Night Ring' },
    { key: 'SETTING_RING_SUNRISE_COLOR', label: 'Sunrise Ring' },
    { key: 'SETTING_RING_SUNSET_COLOR', label: 'Sunset Ring' },
    { key: 'SETTING_SUN_STROKE_COLOR', label: 'Sun Stroke' },
    { key: 'SETTING_SUN_FILL_COLOR', label: 'Sun Fill' },
  ], [themeType]);

  // Memoize the title to prevent unnecessary string operations
  const title = useMemo(() => 
    themeType.charAt(0).toUpperCase() + themeType.slice(1), 
  [themeType]);

  return (
    <div className="color-group">
      <h5>{title} Theme Colors</h5>
      {colorConfig.map((config) => (
        <ColorPicker
          key={`${config.key}-${themeType}`}
          colorKey={config.key}
          themeType={themeType}
          label={config.label}
        />
      ))}
    </div>
  );
});

ColorSettings.displayName = 'ColorSettings';

export default ColorSettings;