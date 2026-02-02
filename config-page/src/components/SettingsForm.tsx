import React, { useState, useEffect, useCallback } from 'react';
import ThemeSettings from './ThemeSettings';
import AdditionalSettings from './AdditionalSettings';
import { useTheme, useSettings } from '../context/ConfigContext';

const SettingsForm: React.FC = () => {
  const { getCurrentPreset, getThemeState, isLoading: themeLoading, isNightThemeEnabled, setNightThemeEnabled } = useTheme();
  const { saveToStorage, isLoading: settingsLoading } = useSettings();
  const [useNightTheme, setUseNightTheme] = useState(false);

  // Load initial night theme setting
  useEffect(() => {
    if (!themeLoading) {
      const nightEnabled = isNightThemeEnabled();
      setUseNightTheme(nightEnabled);
    }
  }, [themeLoading, isNightThemeEnabled]);

  // Handle night theme toggle
  const handleNightThemeToggle = useCallback((enabled: boolean) => {
    setUseNightTheme(enabled);
    setNightThemeEnabled(enabled);
  }, [setNightThemeEnabled]);

  // Memoized submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save settings through the unified store
      await saveToStorage();
      console.log('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [saveToStorage]);

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
            onToggleChange={handleNightThemeToggle}
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