// Core type definitions for the Pebble Config Page

export interface ColorSetting {
  baseId: string;
  label: string;
  default: string;
}

export interface PebbleColor {
  name: string;
  identifier: string;
}

export interface Theme {
  [key: string]: string;
}

export interface Themes {
  [key: string]: Theme;
}

export interface ThemeConfig {
  preset: string;
  colors: Map<string, string>;
  isCustom: boolean;
}

export interface ThemeState {
  day: ThemeConfig;
  night: ThemeConfig;
  isNightThemeEnabled: boolean;
}

export interface Settings {
  [key: string]: string | number;
}

export interface ColorPickerState {
  value: string;
  isVisible: boolean;
}

export interface ThemeConfig {
  preset: string;
  colors: Map<string, string>;
  isCustom: boolean;
}

export interface ThemeState {
  day: ThemeConfig;
  night: ThemeConfig;
  isNightThemeEnabled: boolean;
}

export interface PreviewConfig {
  svgId: string;
  containerId: string;
  isVisible: boolean;
}

export interface PlatformConfig {
  isBWPlatform: boolean;
  platformType: string;
}

export interface FormDataEntryValue {
  [key: string]: string | File;
}

// Event types
export interface ColorChangeEvent {
  colorKey: string;
  value: string;
  isNight: boolean;
}

export interface ThemeChangeEvent {
  presetName: string;
  themeType: ThemeType;
  isCustom: boolean;
}

export interface SettingsChangeEvent {
  key: string;
  newValue: string | number;
  oldValue?: string | number | undefined;
}

// Component props
export interface ColorPickerProps {
  inputId: string;
  label: string;
  defaultValue: string;
  isNight: boolean;
  onColorChange?: (event: ColorChangeEvent) => void;
}

export interface PresetSelectorProps {
  isNight: boolean;
  selectedPreset: string;
  onPresetChange?: (event: ThemeChangeEvent) => void;
}

// Validation types
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface SettingsValidator {
  validate(settings: Settings): ValidationResult;
}

// Store types
export interface StoreState {
  settings: Settings;
  themeState: ThemeState;
  platformConfig: PlatformConfig;
  colorSystem?: {
    event: ColorChangeEvent;
  };
}

export interface StoreSubscriber {
  (state: StoreState): void;
}

// Utility types
export type ColorHex = string;
export type ThemeName = string;
export type SettingKey = string;
export type SVGElementId = string;

// Constants
export const THEME_TYPES = {
  DAY: 'day',
  NIGHT: 'night',
} as const;

export const PRESET_TYPES = {
  DEFAULT: 'default',
  CUSTOM: 'custom',
} as const;

export const PLATFORM_TYPES = {
  APLITE: 'aplite',
  DIORITE: 'diorite',
  FLINT: 'flint',
  CHALK: 'chalk',
  BASALT: 'basalt',
} as const;

export type ThemeType = (typeof THEME_TYPES)[keyof typeof THEME_TYPES];
export type PresetType = (typeof PRESET_TYPES)[keyof typeof PRESET_TYPES];
export type PlatformType = (typeof PLATFORM_TYPES)[keyof typeof PLATFORM_TYPES];
