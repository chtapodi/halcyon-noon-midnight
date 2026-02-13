import { useContext } from 'react';
import { ConfigContext, ConfigContextType } from './ConfigProvider';
import { ThemeType } from '../types';

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

// Specialized hooks for convenience
export const useTheme = () => {
  const { state, ...config } = useConfig();

  return {
    isLoading: state.ui.isLoading,
    error: state.ui.error,
    state: state, // Exporting state for components that need it (e.g. PresetSelector)
    getCurrentPreset: (themeType: ThemeType) => state.theme[themeType].preset,
    getColor: (colorKey: string, themeType: ThemeType) => state.theme[themeType].colors[colorKey] || '',
    updateColor: (colorKey: string, colorValue: string, themeType: ThemeType) =>
      config.updateColor(themeType, colorKey, colorValue),
    getThemeState: () => state.theme,
    isNightThemeEnabled: () => state.theme.isNightThemeEnabled,
    setNightThemeEnabled: config.setNightThemeEnabled,
    isThemeCustom: (themeType: ThemeType) => state.theme[themeType].isCustom,
    getThemeColors: (themeType: ThemeType) => state.theme[themeType].colors,
    resetToDefaults: config.resetToDefaults,
    applyPreset: (presetName: string, themeType: ThemeType) => config.setPreset(themeType, presetName),
    colorSystem: { getColorName: config.getColorName, availableColors: config.getAvailableColors() },
    preview: {
      togglePreview: config.togglePreview,
      isPreviewVisible: (themeType: ThemeType) => state.ui.previewVisibility[themeType],
      getPreviewColors: (themeType: ThemeType) => state.theme[themeType].colors,
    },
    subscribe: config.subscribe,
    unsubscribe: config.unsubscribe,
  };
};

export const useSettings = () => {
  const { state, ...config } = useConfig();

  return {
    isLoading: state.ui.isLoading,
    error: state.ui.error,
    settings: state.settings,
    getSetting: config.getSetting,
    updateSetting: config.updateSetting,
    getAllSettings: config.getAllSettings,
    saveSettings: config.saveToStorage,
    loadSettings: config.loadFromStorage,
    saveToStorage: config.saveToStorage,
    exportSettings: config.exportSettings,
    importSettings: config.importSettings,
    prepareReturnURL: (settings?: Record<string, string | number>) => {
      const settingsToUse = settings || state.settings;
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get('return_to') || 'pebblejs://close#';
      return returnTo + encodeURIComponent(JSON.stringify(settingsToUse));
    },
    toggleCheckbox: (key: string) => {
      const currentValue = config.getSetting(key);
      config.updateSetting(key, currentValue === 1 ? 0 : 1);
    },
    incrementValue: (key: string, max?: number) => {
      const currentValue = Number(config.getSetting(key) || 0);
      const newValue = max !== undefined ? (currentValue + 1) % (max + 1) : currentValue + 1;
      config.updateSetting(key, newValue);
    },
    resetToDefaults: () => {
      const defaults = {
        SETTING_PIP_VISIBILITY: 1,
        SETTING_SHOW_LEADING_ZERO: 0,
        SETTING_USE_LARGE_FONTS: 0,
        SETTING_USE_NIGHT_THEME: 0,
      };
      Object.entries(defaults).forEach(([key, value]) => config.updateSetting(key, value));
    },
    settingsManager: {
      saveSettings: config.saveToStorage,
      loadSettings: config.loadFromStorage,
      getAllSettings: config.getAllSettings,
      getSetting: config.getSetting,
      updateSetting: config.updateSetting,
    },
  };
};
