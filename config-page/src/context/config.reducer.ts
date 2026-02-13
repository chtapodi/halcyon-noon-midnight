import { ThemeType, ThemesData } from '../types';

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
  themesData: ThemesData | null; // Use the specific type
}

// Action types
export type ConfigAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: Error | null }
  | { type: 'SET_COLOR_PICKER'; pickerId: string | null }
  | { type: 'TOGGLE_PREVIEW'; themeType: ThemeType; visible?: boolean }
  | { type: 'UPDATE_SETTING'; key: string; value: string | number }
  | { type: 'UPDATE_COLOR'; themeType: ThemeType; colorKey: string; colorValue: string }
  | { type: 'SET_PRESET'; themeType: ThemeType; preset: string; colors?: Record<string, string> }
  | { type: 'SET_NIGHT_THEME'; enabled: boolean }
  | { type: 'RESET_TO_DEFAULTS' }
  | { type: 'LOAD_THEMES'; data: ThemesData }
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
export const initialState: ConfigState = {
  theme: {
    day: { preset: 'default', colors: Object.assign({}, DEFAULT_COLORS), isCustom: false },
    night: { preset: 'default', colors: Object.assign({}, DEFAULT_COLORS), isCustom: false },
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
export function configReducer(state: ConfigState, action: ConfigAction): ConfigState {
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
                    Object.entries(action.colors || {}).map(([key, value]) => [
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
