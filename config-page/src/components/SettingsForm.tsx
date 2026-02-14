import React, { useState, useEffect, useCallback } from 'react';
import ThemeSettings from './ThemeSettings';
import AdditionalSettings from './AdditionalSettings';
import ToggleSwitch from './ToggleSwitch';
import { useTheme, useSettings } from '../context/hooks';

const SettingsForm: React.FC = () => {
  const { isLoading: themeLoading, isNightThemeEnabled, setNightThemeEnabled } = useTheme();
  const { saveToStorage, isLoading: settingsLoading } = useSettings();

  const useNightTheme = isNightThemeEnabled;

  // Handle night theme toggle
  const handleNightThemeToggle = useCallback((enabled: boolean) => {
    setNightThemeEnabled(enabled);
  }, [setNightThemeEnabled]);

  // Memoized submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save settings through the unified store
      await saveToStorage();
      console.log("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
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
          <ToggleSwitch
            checked={useNightTheme}
            onChange={handleNightThemeToggle}
            label={`Enable Night Theme`}
            id={`night-theme-toggle`}
            description={`Enable a separate theme for night hours`}
          />
          {useNightTheme && (
            <ThemeSettings
              themeType="night"
              title="Night Theme"
            />
          )}
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