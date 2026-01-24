import React, { useState } from 'react';
import PresetSelector from './PresetSelector';
import ColorPicker from './ColorPicker';
import AdditionalSettings from './AdditionalSettings';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

const SettingsForm: React.FC = () => {
  const { themeManager, isLoading: themeLoading } = useTheme();
  const { saveSettings, isLoading: settingsLoading } = useSettings();
  const [useNightTheme, setUseNightTheme] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save settings through the settings store
      await saveSettings();
      
      // Also save theme settings to localStorage for persistence
      if (themeManager) {
        const themeState = themeManager.getThemeState();
        localStorage.setItem('halcyonThemeState', JSON.stringify(themeState));
      }
      
      console.log('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  if (themeLoading || settingsLoading) {
    return <div className="settings-loading">Loading settings...</div>;
  }

  return (
    <section className="settings-form">
      <h2>Settings</h2>
      <form id="config-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Theme Presets</h3>
          <div className="preset-selectors">
            <PresetSelector themeType="day" />
            {useNightTheme && <PresetSelector themeType="night" />}
          </div>

          <div className="night-theme-toggle">
            <label>
              <input
                type="checkbox"
                checked={useNightTheme}
                onChange={(e) => setUseNightTheme(e.target.checked)}
              />
              Enable Night Theme
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Color Settings</h3>
          <div className="color-settings">
            {/* Day theme colors */}
            <div className="color-group">
              <h4>Day Theme Colors</h4>
              <ColorPicker 
                colorKey="SETTING_TIME_COLOR"
                themeType="day"
                label="Time Color"
              />
              <ColorPicker 
                colorKey="SETTING_SUBTEXT_PRIMARY_COLOR"
                themeType="day"
                label="Primary Subtext"
              />
              <ColorPicker 
                colorKey="SETTING_SUBTEXT_SECONDARY_COLOR"
                themeType="day"
                label="Secondary Subtext"
              />
              <ColorPicker 
                colorKey="SETTING_BG_COLOR"
                themeType="day"
                label="Background"
              />
              <ColorPicker 
                colorKey="SETTING_PIP_COLOR_PRIMARY"
                themeType="day"
                label="Primary Pips"
              />
              <ColorPicker 
                colorKey="SETTING_PIP_COLOR_SECONDARY"
                themeType="day"
                label="Secondary Pips"
              />
              <ColorPicker 
                colorKey="SETTING_RING_STROKE_COLOR"
                themeType="day"
                label="Ring Stroke"
              />
              <ColorPicker 
                colorKey="SETTING_RING_DAY_COLOR"
                themeType="day"
                label="Day Ring"
              />
              <ColorPicker 
                colorKey="SETTING_RING_SUNRISE_COLOR"
                themeType="day"
                label="Sunrise Ring"
              />
              <ColorPicker 
                colorKey="SETTING_RING_SUNSET_COLOR"
                themeType="day"
                label="Sunset Ring"
              />
              <ColorPicker 
                colorKey="SETTING_SUN_STROKE_COLOR"
                themeType="day"
                label="Sun Stroke"
              />
              <ColorPicker 
                colorKey="SETTING_SUN_FILL_COLOR"
                themeType="day"
                label="Sun Fill"
              />
            </div>

            {/* Night theme colors (conditional) */}
            {useNightTheme && (
              <div className="color-group">
                <h4>Night Theme Colors</h4>
                <ColorPicker 
                  colorKey="SETTING_TIME_COLOR"
                  themeType="night"
                  label="Time Color"
                />
                <ColorPicker 
                  colorKey="SETTING_SUBTEXT_PRIMARY_COLOR"
                  themeType="night"
                  label="Primary Subtext"
                />
                <ColorPicker 
                  colorKey="SETTING_SUBTEXT_SECONDARY_COLOR"
                  themeType="night"
                  label="Secondary Subtext"
                />
                <ColorPicker 
                  colorKey="SETTING_BG_COLOR"
                  themeType="night"
                  label="Background"
                />
                <ColorPicker 
                  colorKey="SETTING_PIP_COLOR_PRIMARY"
                  themeType="night"
                  label="Primary Pips"
                />
                <ColorPicker 
                  colorKey="SETTING_PIP_COLOR_SECONDARY"
                  themeType="night"
                  label="Secondary Pips"
                />
                <ColorPicker 
                  colorKey="SETTING_RING_STROKE_COLOR"
                  themeType="night"
                  label="Ring Stroke"
                />
                <ColorPicker 
                  colorKey="SETTING_RING_NIGHT_COLOR"
                  themeType="night"
                  label="Night Ring"
                />
                <ColorPicker 
                  colorKey="SETTING_RING_SUNRISE_COLOR"
                  themeType="night"
                  label="Sunrise Ring"
                />
                <ColorPicker 
                  colorKey="SETTING_RING_SUNSET_COLOR"
                  themeType="night"
                  label="Sunset Ring"
                />
                <ColorPicker 
                  colorKey="SETTING_SUN_STROKE_COLOR"
                  themeType="night"
                  label="Sun Stroke"
                />
                <ColorPicker 
                  colorKey="SETTING_SUN_FILL_COLOR"
                  themeType="night"
                  label="Sun Fill"
                />
              </div>
            )}
          </div>
        </div>

      <AdditionalSettings themeType="day" />

        <button type="submit" className="save-button">
          Save Settings
        </button>
      </form>
    </section>
  );
};

export default SettingsForm;