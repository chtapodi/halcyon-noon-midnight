export interface WatchInfo {
  platform: string;
  model: string;
  language: string;
  firmware: {
    major: number;
    minor: number;
  };
}

export interface Capabilities {
  APLITE: boolean;
  BASALT: boolean;
  CHALK: boolean;
  DIORITE: boolean;
  EMERY: boolean;
  FLINT: boolean;
  BW: boolean;
  COLOR: boolean;
  ROUND: boolean;
  RECT: boolean;
  DISPLAY_144x168: boolean;
  DISPLAY_180x180_ROUND: boolean;
  DISPLAY_200x228: boolean;
  MICROPHONE: boolean;
  SMARTSTRAP: boolean;
  SMARTSTRAP_POWER: boolean;
  HEALTH: boolean;
}

export interface Settings {
  SETTING_PRESET: string;
  SETTING_NIGHT_PRESET: string;
  SETTING_TIME_COLOR: string;
  SETTING_SUBTEXT_PRIMARY_COLOR: string;
  SETTING_SUBTEXT_SECONDARY_COLOR: string;
  SETTING_BG_COLOR: string;
  SETTING_PIP_COLOR_PRIMARY: string;
  SETTING_PIP_COLOR_SECONDARY: string;
  SETTING_RING_STROKE_COLOR: string;
  SETTING_RING_NIGHT_COLOR: string;
  SETTING_RING_DAY_COLOR: string;
  SETTING_RING_SUNRISE_COLOR: string;
  SETTING_RING_SUNSET_COLOR: string;
  SETTING_SUN_STROKE_COLOR: string;
  SETTING_SUN_FILL_COLOR: string;
  SETTING_NIGHT_TIME_COLOR: string;
  SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR: string;
  SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR: string;
  SETTING_NIGHT_BG_COLOR: string;
  SETTING_NIGHT_PIP_COLOR_PRIMARY: string;
  SETTING_NIGHT_PIP_COLOR_SECONDARY: string;
  SETTING_NIGHT_RING_STROKE_COLOR: string;
  SETTING_NIGHT_RING_NIGHT_COLOR: string;
  SETTING_NIGHT_RING_DAY_COLOR: string;
  SETTING_NIGHT_RING_SUNRISE_COLOR: string;
  SETTING_NIGHT_RING_SUNSET_COLOR: string;
  SETTING_NIGHT_SUN_STROKE_COLOR: string;
  SETTING_NIGHT_SUN_FILL_COLOR: string;
  SETTING_USE_LARGE_FONTS: number;
  SETTING_USE_NIGHT_THEME: number;
  SETTING_PIP_VISIBILITY: number;
  SETTING_SHOW_LEADING_ZERO: number;
}
