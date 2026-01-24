import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

interface AdditionalSettingsProps {
  themeType: 'day' | 'night';
}

export const AdditionalSettings: React.FC<AdditionalSettingsProps> = ({ themeType }) => {
  const { themeManager } = useTheme();
  const { settings, updateSetting } = useSettings();

  const handleToggleChange = (settingKey: string, value: boolean) => {
    updateSetting(settingKey, value ? 1 : 0);
  };

  return (
    <div className="form-section">
      <h3>Additional Settings</h3>
      
      <div className="form-group">
        <label className="label-content">
          <span className="label-text">Show Pips</span>
          <p className="description">Display hour markers around the watch face</p>
        </label>
        <label className="switch-label">
          <input
            type="checkbox"
            checked={settings.SETTING_PIP_VISIBILITY === 1}
            onChange={(e) => handleToggleChange('SETTING_PIP_VISIBILITY', e.target.checked)}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="label-content">
          <span className="label-text">Show Leading Zero</span>
          <p className="description">Display leading zero for single-digit hours (e.g., 09:00 instead of 9:00)</p>
        </label>
        <label className="switch-label">
          <input
            type="checkbox"
            checked={settings.SETTING_SHOW_LEADING_ZERO === 1}
            onChange={(e) => handleToggleChange('SETTING_SHOW_LEADING_ZERO', e.target.checked)}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="label-content">
          <span className="label-text">Large Fonts</span>
          <p className="description">Use larger font size for better readability</p>
        </label>
        <label className="switch-label">
          <input
            type="checkbox"
            checked={settings.SETTING_USE_LARGE_FONTS === 1}
            onChange={(e) => handleToggleChange('SETTING_USE_LARGE_FONTS', e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
};

export default AdditionalSettings;