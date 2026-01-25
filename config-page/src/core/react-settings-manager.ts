import { SettingsStore } from './settings-store';
import { ThemeManager } from './theme-manager';
import { ThemeState } from '../types';

export class ReactSettingsManager {
  private settingsStore: SettingsStore;
  private themeManager: ThemeManager;

  constructor(settingsStore: SettingsStore, themeManager: ThemeManager) {
    this.settingsStore = settingsStore;
    this.themeManager = themeManager;
  }

  async saveSettings(): Promise<void> {
    try {
      // Collect all current settings from theme manager
      const themeState = this.themeManager.getThemeState();
      const settings = this.convertThemeStateToSettings(themeState);

      // Save to localStorage
      localStorage.setItem('halcyonSettings', JSON.stringify(settings));
      localStorage.setItem('halcyonThemeState', JSON.stringify(themeState));

      // Return to Pebble app with settings
      const returnTo = this.getQueryParam('return_to', 'pebblejs://close#');
      const settingsString = encodeURIComponent(JSON.stringify(settings));

      // For React environment, we'll simulate the return
      console.log('Settings saved, ready to return to Pebble:', settings);
      console.log('Return URL:', returnTo + settingsString);

      // In a real Pebble config page, this would redirect:
      // document.location.href = returnTo + settingsString;

      // For development, show success
      alert('Settings saved successfully! Ready to return to Pebble app.');
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  }

  private convertThemeStateToSettings(themeState: ThemeState): Record<string, any> {
    const settings: Record<string, any> = {};

    // Add day theme settings
    themeState.day.colors.forEach((value, key) => {
      settings[key] = value;
    });

    // Add night theme settings if enabled
    if (themeState.isNightThemeEnabled) {
      themeState.night.colors.forEach((value, key) => {
        const nightKey = key.replace('SETTING_', 'SETTING_NIGHT_');
        settings[nightKey] = value;
      });
    }

    // Add preset settings
    settings['SETTING_PRESET'] = themeState.day.preset;
    if (themeState.isNightThemeEnabled) {
      settings['SETTING_NIGHT_PRESET'] = themeState.night.preset;
    }

    // Add night theme toggle
    settings['SETTING_USE_NIGHT_THEME'] = themeState.isNightThemeEnabled ? 1 : 0;

    // Add additional settings with defaults
    settings['SETTING_PIP_VISIBILITY'] = settings['SETTING_PIP_VISIBILITY'] || 1;
    settings['SETTING_SHOW_LEADING_ZERO'] = settings['SETTING_SHOW_LEADING_ZERO'] || 0;
    settings['SETTING_USE_LARGE_FONTS'] = settings['SETTING_USE_LARGE_FONTS'] || 0;

    return settings;
  }

  private getQueryParam(variable: string, defaultValue: string): string {
    const query = window.location.search.substring(1);
    const vars = query.split('&');

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === variable) {
        return decodeURIComponent(pair[1]);
      }
    }

    return defaultValue;
  }

  async loadSettings(): Promise<void> {
    try {
      // Load from localStorage if available
      const storedSettings = localStorage.getItem('halcyonSettings');
      const storedThemeState = localStorage.getItem('halcyonThemeState');

      if (storedThemeState) {
        const themeState = JSON.parse(storedThemeState);
        this.applyThemeState(themeState);
      } else if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        this.applySettings(settings);
      }

      console.log('Settings loaded successfully');
    } catch (error) {
      console.error('Failed to load settings:', error);
      throw error;
    }
  }

  private applyThemeState(themeState: ThemeState): void {
    // Apply day theme
    this.themeManager.applyPreset(themeState.day.preset, 'day');
    themeState.day.colors.forEach((value, key) => {
      this.themeManager.updateColor(key, value, 'day');
    });

    // Apply night theme if enabled
    if (themeState.isNightThemeEnabled) {
      this.themeManager.applyPreset(themeState.night.preset, 'night');
      themeState.night.colors.forEach((value, key) => {
        this.themeManager.updateColor(key, value, 'night');
      });
    }

    // Set night theme enabled state
    this.themeManager.setNightThemeEnabled(themeState.isNightThemeEnabled);
  }

  private applySettings(settings: Record<string, any>): void {
    // Apply presets
    if (settings['SETTING_PRESET']) {
      this.themeManager.applyPreset(settings['SETTING_PRESET'], 'day');
    }

    if (settings['SETTING_NIGHT_PRESET']) {
      this.themeManager.applyPreset(settings['SETTING_NIGHT_PRESET'], 'night');
    }

    // Apply night theme toggle
    const useNightTheme = settings['SETTING_USE_NIGHT_THEME'] === 1;
    this.themeManager.setNightThemeEnabled(useNightTheme);

    // Apply individual colors
    Object.entries(settings).forEach(([key, value]) => {
      if (key.includes('COLOR') && typeof value === 'string') {
        const themeType = key.includes('NIGHT') ? 'night' : 'day';
        const colorKey = key.includes('NIGHT') ? key.replace('SETTING_NIGHT_', 'SETTING_') : key;
        this.themeManager.updateColor(colorKey, value, themeType);
      }
    });
  }

  getAllSettings(): Record<string, any> {
    const themeState = this.themeManager.getThemeState();
    return this.convertThemeStateToSettings(themeState);
  }
}
