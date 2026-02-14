import React, { createContext, useReducer, useCallback, useEffect, useRef, ReactNode } from 'react';
import { ThemeType } from '../types';
import { pebbleColors, colorOrder } from '../color-data';
import { ConfigState, configReducer, initialState } from './config.reducer';

// Context interface
export interface ConfigContextType {
  state: ConfigState;

  // Theme operations
  updateColor: (themeType: ThemeType, colorKey: string, colorValue: string) => void;
  setPreset: (themeType: ThemeType, preset: string) => void;
  setNightThemeEnabled: (enabled: boolean) => void;
  resetToDefaults: () => void;

  // Settings operations
  updateSetting: (key: string, value: string | number) => void;
  getSetting: (key: string) => string | number | undefined;
  getAllSettings: () => Record<string, any>;

  // UI operations
  openColorPicker: (colorKey: string, themeType: ThemeType) => void;
  closeColorPicker: () => void;
  togglePreview: (themeType: ThemeType, visible?: boolean) => void;

  // Persistence operations
  saveToStorage: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;

  // Color utilities
  getColorName: (hexColor: string) => string;
  getAvailableColors: () => (string | null)[];

  // Legacy compatibility
  subscribe: (subscriber: () => void) => void;
  unsubscribe: (subscriber: () => void) => void;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Provider props
interface ConfigProviderProps {
  children: ReactNode;
  enableAutoSave?: boolean;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  enableAutoSave = true
}) => {
  const [state, dispatch] = useReducer(configReducer, initialState);
  const isInitializingRef = useRef(true);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Stable action creators
  const actions = {
    updateColor: useCallback((themeType: ThemeType, colorKey: string, colorValue: string) => {
      dispatch({ type: 'UPDATE_COLOR', themeType, colorKey, colorValue });
    }, []),

    setPreset: useCallback((themeType: ThemeType, preset: string) => {
      dispatch({ type: 'SET_PRESET', themeType, preset });
    }, []),

    setNightThemeEnabled: useCallback((enabled: boolean) => {
      dispatch({ type: 'SET_NIGHT_THEME', enabled });
    }, []),

    resetToDefaults: useCallback(() => {
      dispatch({ type: 'RESET_TO_DEFAULTS' });
    }, []),

    updateSetting: useCallback((key: string, value: string | number) => {
      dispatch({ type: 'UPDATE_SETTING', key, value });
    }, []),

    openColorPicker: useCallback((colorKey: string, themeType: ThemeType) => {
      const pickerId = `${themeType}-${colorKey}`;
      dispatch({ type: 'SET_COLOR_PICKER', pickerId });
    }, []),

    closeColorPicker: useCallback(() => {
      dispatch({ type: 'SET_COLOR_PICKER', pickerId: null });
    }, []),

    togglePreview: useCallback((themeType: ThemeType, visible?: boolean) => {
      dispatch({ type: 'TOGGLE_PREVIEW', themeType, visible });
    }, []),
  };

  // Settings getters
  const getSetting = useCallback((key: string) => {
    return state.settings[key];
  }, [state.settings]);

  const getAllSettings = useCallback(() => {
    return state.settings;
  }, [state.settings]);

  // Color utilities
  const getColorName = useCallback((hexColor: string): string => {
    const formatted = hexColor.toUpperCase().replace('#', '');
    const colorWithHash = `#${formatted}`;
    return pebbleColors[colorWithHash]?.name || pebbleColors[formatted]?.name || 'Custom Color';
  }, []);

  const getAvailableColors = useCallback(() => {
    return colorOrder;
  }, []);

  // Persistence operations
  const saveToStorage = useCallback(async (): Promise<void> => {
    try {
      const toSave = {
        settings: state.settings,
        theme: state.theme,
      };
      localStorage.setItem('halcyonConfig', JSON.stringify(toSave));
    } catch (error) {
      console.error('Failed to save to storage:', error);
      throw error;
    }
  }, [state.settings, state.theme]);

  const loadFromStorage = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      dispatch({ type: 'SET_ERROR', error: null });

      const stored = localStorage.getItem('halcyonConfig');
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'LOAD_STATE', state: parsed });
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
      dispatch({ type: 'SET_ERROR', error: error instanceof Error ? error : new Error('Load failed') });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
      isInitializingRef.current = false;
    }
  }, []);

  const exportSettings = useCallback((): string => {
    return JSON.stringify({
      settings: state.settings,
      theme: state.theme,
      exportDate: new Date().toISOString(),
    }, null, 2);
  }, [state.settings, state.theme]);

  const importSettings = useCallback((settingsJson: string): boolean => {
    try {
      const data = JSON.parse(settingsJson);
      if (data.settings || data.theme) {
        dispatch({ type: 'LOAD_STATE', state: data });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }, []);

  // Load themes on mount
  useEffect(() => {
    const loadThemes = async () => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        const response = await fetch('/themes.json');

        if (!response.ok) throw new Error(`Failed to load themes: ${response.status}`);

        const data = await response.json();
        dispatch({ type: 'LOAD_THEMES', data });
      } catch (error) {
        console.error('Error loading themes:', error);
        dispatch({ type: 'SET_ERROR', error: error instanceof Error ? error : new Error('Theme load failed') });
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    };

    loadThemes();
  }, []);

  // Load storage data on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Auto-save with debounce
  useEffect(() => {
    if (enableAutoSave && !isInitializingRef.current) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      saveTimeoutRef.current = setTimeout(() => {
        saveToStorage().catch(console.error);
      }, 1500);
    }

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [state, enableAutoSave, saveToStorage]);

  // Hide night preview when night theme is disabled
  useEffect(() => {
    if (!state.theme.isNightThemeEnabled) {
      dispatch({ type: 'TOGGLE_PREVIEW', themeType: 'night', visible: false });
    }
  }, [state.theme.isNightThemeEnabled]);

  // Legacy compatibility (no-op)
  const subscribe = useCallback(() => {
    console.warn('subscribe() is deprecated. React handles reactivity automatically.');
  }, []);

  const unsubscribe = useCallback(() => {
    console.warn('unsubscribe() is deprecated. React handles reactivity automatically.');
  }, []);

  const contextValue: ConfigContextType = {
    state,
    ...actions,
    getSetting,
    getAllSettings,
    saveToStorage,
    loadFromStorage,
    exportSettings,
    importSettings,
    getColorName,
    getAvailableColors,
    subscribe,
    unsubscribe,
  };

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};
