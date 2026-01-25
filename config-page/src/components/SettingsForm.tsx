import React, { useState, useEffect, useCallback } from 'react';
import ThemeSettings from './ThemeSettings';
import AdditionalSettings from './AdditionalSettings';
import useThemeManagement from '../hooks/useThemeManagement';
import { useSettings } from '../context/SettingsContext';

const SettingsForm: React.FC = () => {
  const { getCurrentPreset, getThemeState, isLoading: themeLoading } = useThemeManagement();
  const { saveSettings, isLoading: settingsLoading } = useSettings();
  const [useNightTheme, setUseNightTheme] = useState(false);

  // Load initial night theme setting
  useEffect(() => {
    if (!themeLoading) {
      const nightPreset = getCurrentPreset('night');
      setUseNightTheme(!!nightPreset && nightPreset !== 'default');
    }
  }, [getCurrentPreset, themeLoading]);

  // Memoized submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save settings through the settings store
      await saveSettings();
      
      // Also save theme settings to localStorage for persistence
      const themeState = getThemeState();
      localStorage.setItem('halcyonThemeState', JSON.stringify(themeState));
      
      console.log('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [saveSettings, getThemeState]);

  if (themeLoading || settingsLoading) {
    return <div className="settings-loading">Loading settings...</div>;
  }

  return (
    <section className="settings-form">
      <h2>Settings</h2>
      <form id="config-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Theme Presets</h3>

          {/* Day Theme Section */}
          <ThemeSettings
            themeType="day"
            title="Day Theme"
          />

          {/* Night Theme Section */}
          <ThemeSettings
            themeType="night"
            title="Night Theme"
            showToggle={true}
            onToggleChange={setUseNightTheme}
            isEnabled={useNightTheme}
          />
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