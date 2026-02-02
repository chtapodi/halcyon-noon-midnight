import React from 'react';
import { useSettings } from '../context/ConfigContext';
import ToggleSwitch from './ToggleSwitch';
import { ThemeType } from '../types';

export const AdditionalSettings: React.FC<AdditionalSettingsProps> = ({ themeType }) => {
  const { settings, updateSetting, toggleCheckbox } = useSettings();
  
  // Get setting values directly
  const pipVisibility = String(settings.SETTING_PIP_VISIBILITY || '1');
  const leadingZero = settings.SETTING_SHOW_LEADING_ZERO === 1;
  const largeFonts = settings.SETTING_USE_LARGE_FONTS === 1;

  const handlePipVisibilityChange = (value: string) => {
    updateSetting('SETTING_PIP_VISIBILITY', parseInt(value));
  };

  return (
    <div className="form-section">
      <h3>Additional Settings</h3>

      <div className="form-group">
        <label className="text-label">
          Pip Visibility
        </label>
        <select
          className="pip-visibility-select"
          value={pipVisibility}
          onChange={(e) => handlePipVisibilityChange(e.target.value)}
        >
          <option value="0">Show All Pips</option>
          <option value="1">Show Major Pips Only</option>
          <option value="2">Hide All Pips</option>
        </select>
      </div>
      <p className="description">Choose how hour markers are displayed around watch face</p>

      <ToggleSwitch
        checked={leadingZero}
        onChange={() => toggleCheckbox('SETTING_SHOW_LEADING_ZERO')}
        label="Show Leading Zero"
        id="leading-zero-toggle"
        description='Display leading zero for single-digit hours (e.g., 09:00 instead of 9:00)'
      />

      <ToggleSwitch
        checked={largeFonts}
        onChange={() => toggleCheckbox('SETTING_USE_LARGE_FONTS')}
        label="Large Fonts"
        id="large-fonts-toggle"
        description='Use larger font size for better readability'
      />
    </div>
  );
};

export default AdditionalSettings;
