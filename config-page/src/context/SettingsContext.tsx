import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SettingsStore } from '../core/settings-store';
import { ThemeManager } from '../core/theme-manager';
import { ReactSettingsManager } from '../core/react-settings-manager';

interface SettingsContextType {
  settingsManager: ReactSettingsManager;
  isLoading: boolean;
  saveSettings: () => Promise<void>;
  loadSettings: () => Promise<void>;
  settings: Record<string, any>;
  updateSetting: (key: string, value: any) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settingsStore] = useState(() => new SettingsStore(new class {
    validate = (settings: any) => ({ isValid: true, errors: [] });
  }()));
  const [themeManager] = useState(() => new ThemeManager());
  const [settingsManager] = useState(() => new ReactSettingsManager(settingsStore, themeManager));
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<Record<string, any>>({
    SETTING_PIP_VISIBILITY: 1,
    SETTING_SHOW_LEADING_ZERO: 0,
    SETTING_USE_LARGE_FONTS: 0,
  });

  useEffect(() => {
    const loadInitialSettings = async () => {
      try {
        await settingsManager.loadSettings();
        const allSettings = settingsManager.getAllSettings();
        setSettings({
          SETTING_PIP_VISIBILITY: allSettings.SETTING_PIP_VISIBILITY || 1,
          SETTING_SHOW_LEADING_ZERO: allSettings.SETTING_SHOW_LEADING_ZERO || 0,
          SETTING_USE_LARGE_FONTS: allSettings.SETTING_USE_LARGE_FONTS || 0,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load settings:', error);
        setIsLoading(false);
      }
    };

    loadInitialSettings();
  }, [settingsManager]);

  const saveSettings = async () => {
    try {
      await settingsManager.saveSettings();
      console.log('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  };

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      await settingsManager.loadSettings();
      const allSettings = settingsManager.getAllSettings();
      setSettings({
        SETTING_PIP_VISIBILITY: allSettings.SETTING_PIP_VISIBILITY || 1,
        SETTING_SHOW_LEADING_ZERO: allSettings.SETTING_SHOW_LEADING_ZERO || 0,
        SETTING_USE_LARGE_FONTS: allSettings.SETTING_USE_LARGE_FONTS || 0,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load settings:', error);
      setIsLoading(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <SettingsContext.Provider value={{ settingsManager, isLoading, saveSettings, loadSettings, settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};