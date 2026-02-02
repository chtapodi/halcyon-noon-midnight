import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef, ReactNode } from 'react';
import { ThemeType } from '../types';
import { pebbleColors, colorOrder } from '../color-data';

// Simplified state interface
export interface ConfigState {
  theme: {
    day: { preset: string; colors: Record<string, string>; isCustom: boolean };
    night: { preset: string; colors: Record<string, string>; isCustom: boolean };
    isNightThemeEnabled: boolean;
  };
  settings: Record<string, string | number>;
  ui: {
    activeColorPicker: string | null;
    previewVisibility: { day: boolean; night: boolean };
    isLoading: boolean;
    error: Error | null;
  };
  themesData: any; // Loaded themes from JSON
}

// Action types
type ConfigAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: Error | null }
  | { type: 'SET_COLOR_PICKER'; pickerId: string | null }
  | { type: 'TOGGLE_PREVIEW'; themeType: ThemeType; visible?: boolean }
  | { type: 'UPDATE_SETTING'; key: string; value: string | number }
  | { type: 'UPDATE_COLOR'; themeType: ThemeType; colorKey: string; colorValue: string }
  | { type: 'SET_PRESET'; themeType: ThemeType; preset: string; colors?: Record<string, string> }
  | { type: 'SET_NIGHT_THEME'; enabled: boolean }
  | { type: 'RESET_TO_DEFAULTS' }
  | { type: 'LOAD_THEMES'; data: any }
  | { type: 'LOAD_STATE'; state: Partial<ConfigState> };

// Default colors
const DEFAULT_COLORS = {
  RING_COLOR: '#00AAFF',
  RING_NIGHT_COLOR: '#0055AA',
  SUN_FILL_COLOR: '#FFFF00',
  SUN_STROKE_COLOR: '#000000',
  RING_SUNRISE_COLOR: '#FFAAAA',
  RING_SUNSET_COLOR: '#FFAA00',
  BG_COLOR: '#FFFFFF',
  PIP_COLOR_SECONDARY: '#AAAAAA',
  PIP_COLOR_PRIMARY: '#000000',
  RING_STROKE_COLOR: '#000000',
};

// Initial state
const initialState: ConfigState = {
  theme: {
    day: { preset: 'default', colors: DEFAULT_COLORS, isCustom: false },
    night: { preset: 'default', colors: DEFAULT_COLORS, isCustom: false },
    isNightThemeEnabled: false,
  },
  settings: {
    SETTING_PIP_VISIBILITY: 1,
    SETTING_SHOW_LEADING_ZERO: 0,
    SETTING_USE_LARGE_FONTS: 0,
    SETTING_USE_NIGHT_THEME: 0,
  },
  ui: {
    activeColorPicker: null,
    previewVisibility: { day: true, night: false },
    isLoading: false,
    error: null,
  },
  themesData: null,
};

// Reducer
function configReducer(state: ConfigState, action: ConfigAction): ConfigState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, ui: { ...state.ui, isLoading: action.loading } };

    case 'SET_ERROR':
      return { ...state, ui: { ...state.ui, error: action.error } };

    case 'SET_COLOR_PICKER':
      return { ...state, ui: { ...state.ui, activeColorPicker: action.pickerId } };

    case 'TOGGLE_PREVIEW':
      const currentVisibility = state.ui.previewVisibility[action.themeType];
      const newVisibility = action.visible !== undefined ? action.visible : !currentVisibility;
      return {
        ...state,
        ui: {
          ...state.ui,
          previewVisibility: { ...state.ui.previewVisibility, [action.themeType]: newVisibility },
        },
      };

    case 'UPDATE_SETTING':
      return { ...state, settings: { ...state.settings, [action.key]: action.value } };

    case 'UPDATE_COLOR':
      return {
        ...state,
        theme: {
          ...state.theme,
          [action.themeType]: {
            ...state.theme[action.themeType],
            colors: { ...state.theme[action.themeType].colors, [action.colorKey]: action.colorValue },
            isCustom: true,
          },
        },
      };

    case 'SET_PRESET': {
      const presetColors = action.colors || {};
      return {
        ...state,
        theme: {
          ...state.theme,
          [action.themeType]: {
            ...state.theme[action.themeType],
            preset: action.preset,
            colors: action.preset === 'custom' 
              ? state.theme[action.themeType].colors 
              : {
                  ...state.theme[action.themeType].colors,
                  ...Object.fromEntries(
                    Object.entries(presetColors).map(([key, value]) => [
                      key,
                      value.startsWith('#') ? value : `#${value}`
                    ])
                  )
                },
            isCustom: action.preset === 'custom',
          },
        },
      };
    }

    case 'SET_NIGHT_THEME':
      return {
        ...state,
        theme: { ...state.theme, isNightThemeEnabled: action.enabled },
        settings: { ...state.settings, SETTING_USE_NIGHT_THEME: action.enabled ? 1 : 0 },
      };

    case 'RESET_TO_DEFAULTS':
      return {
        ...state,
        theme: {
          ...state.theme,
          day: { preset: 'default', colors: DEFAULT_COLORS, isCustom: false },
          night: { preset: 'default', colors: DEFAULT_COLORS, isCustom: false },
        },
      };

    case 'LOAD_THEMES':
      return { 
        ...state, 
        themesData: {
          ...state.themesData,
          ...action.data
        } 
      };

    case 'LOAD_STATE':
      return { ...state, ...action.state };

    default:
      return state;
  }
}

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

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

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
      // Get theme colors if not custom preset
      const presetColors = preset !== 'custom' && state.themesData?.sharedThemes?.[preset] 
        ? state.themesData.sharedThemes[preset] 
        : {};
      
      dispatch({ type: 'SET_PRESET', themeType, preset, colors: presetColors });
    }, [state.themesData]),

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
        
        console.log('Loading themes...');
        let response;
        try {
          console.log('Trying /themes.json');
          response = await fetch('/themes.json');
        } catch {
          console.log('Falling back to /src/data/themes/themes.json');
          response = await fetch('/src/data/themes/themes.json');
        }
        
        console.log('Response status:', response.status);
        if (!response.ok) throw new Error(`Failed to load themes: ${response.status}`);
        
        const data = await response.json();
        console.log('Loaded themes data:', data);
        console.log('Shared themes keys:', Object.keys(data.sharedThemes || {}));
        dispatch({ type: 'LOAD_THEMES', data });
        
        // Apply default theme colors if available
        if (data.sharedThemes?.default) {
          console.log('Applying default theme colors');
          Object.entries(data.sharedThemes.default).forEach(([key, value]) => {
            actions.updateColor('day', key, value as string);
          });
        }
      } catch (error) {
        console.error('Error loading themes:', error);
        dispatch({ type: 'SET_ERROR', error: error instanceof Error ? error : new Error('Theme load failed') });
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    };

    loadThemes();
  }, [actions.updateColor]);

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

// Hook
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
    prepareReturnURL: (settings?: Record<string, any>) => {
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