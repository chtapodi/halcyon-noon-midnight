import {
  Theme,
  Themes,
  ThemeConfig,
  ThemeState,
  ThemeType,
  ThemeChangeEvent,
  StoreSubscriber,
  StoreState,
} from '../types';

export class ThemeManager {
  private themes: Themes = {};
  private themeState: ThemeState;
  private subscribers: StoreSubscriber[] = [];

  constructor() {
    this.themeState = {
      day: {
        preset: 'default',
        colors: new Map(),
        isCustom: false,
      },
      night: {
        preset: 'default',
        colors: new Map(),
        isCustom: false,
      },
      isNightThemeEnabled: false,
    };
  }

  async loadThemes(): Promise<void> {
    try {
      // Try both possible locations for themes.json
      let response;
      try {
        response = await fetch('/themes.json');
      } catch (e) {
        // Fallback to data/themes/themes.json
        response = await fetch('/src/data/themes/themes.json');
      }
      const data = await response.json();
      this.themes = data.sharedThemes;
      console.log('Loaded themes:', Object.keys(this.themes));
    } catch (error) {
      console.error('Error loading themes:', error);
      throw new Error('Failed to load themes');
    }
  }

  getAvailableThemes(): string[] {
    return Object.keys(this.themes);
  }

  getTheme(presetName: string): Theme | null {
    return this.themes[presetName] || null;
  }

  applyPreset(presetName: string, themeType: ThemeType): void {
    if (presetName === 'custom') {
      this.setCustomTheme(themeType);
      return;
    }

    const theme = this.getTheme(presetName);
    if (!theme) {
      console.warn(`Theme not found: ${presetName}`);
      return;
    }

    const config = this.getThemeConfig(themeType);
    config.preset = presetName;
    config.isCustom = false;
    config.colors.clear();

    // Apply theme colors
    Object.entries(theme).forEach(([key, value]) => {
      config.colors.set(key, value);
    });

    this.notifySubscribers();
    this.notifyThemeChange(presetName, themeType, false);
  }

  setCustomTheme(themeType: ThemeType): void {
    const config = this.getThemeConfig(themeType);
    config.preset = 'custom';
    config.isCustom = true;

    this.notifySubscribers();
    this.notifyThemeChange('custom', themeType, true);
  }

  updateColor(colorKey: string, value: string, themeType: ThemeType): void {
    const config = this.getThemeConfig(themeType);
    config.colors.set(colorKey, value);

    // If we're manually updating a color, switch to custom
    if (!config.isCustom) {
      this.setCustomTheme(themeType);
    }

    this.notifySubscribers();
  }

  getColor(colorKey: string, themeType: ThemeType): string {
    const config = this.getThemeConfig(themeType);
    return config.colors.get(colorKey) || '';
  }

  getThemeColor(themeName: string, colorKey: string, _themeType: ThemeType): string {
    const theme = this.getTheme(themeName);
    if (!theme) {
      console.warn(`Theme not found: ${themeName}`);
      return '';
    }
    return theme[colorKey] || '';
  }

  getThemeConfig(themeType: ThemeType): ThemeConfig {
    return themeType === 'day' ? this.themeState.day : this.themeState.night;
  }

  getCurrentPreset(themeType: ThemeType): string {
    return this.getThemeConfig(themeType).preset;
  }

  isCustomTheme(themeType: ThemeType): boolean {
    return this.getThemeConfig(themeType).isCustom;
  }

  setNightThemeEnabled(enabled: boolean): void {
    this.themeState.isNightThemeEnabled = enabled;
    this.notifySubscribers();
  }

  isNightThemeEnabled(): boolean {
    return this.themeState.isNightThemeEnabled;
  }

  getThemeState(): ThemeState {
    return { ...this.themeState };
  }

  createMiniPreview(theme: Theme, themeType: ThemeType): HTMLElement {
    const templateId = themeType === 'night' ? 'svg-night-preview' : 'svg-preview';
    const template = document.getElementById(templateId)!.cloneNode(true) as HTMLElement;

    // Update fills
    Object.entries(theme).forEach(([key, value]) => {
      const colorKey = this.getColorKeyForTheme(key, themeType);
      const element = template.querySelector(`#${colorKey}`);
      if (element) {
        element.setAttribute('fill', '#' + value);
      }
    });

    return template;
  }

  subscribe(subscriber: StoreSubscriber): void {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: StoreSubscriber): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((subscriber) => {
      try {
        subscriber(this.getStoreState());
      } catch (error) {
        console.error('Error notifying subscriber:', error);
      }
    });
  }

  private notifyThemeChange(presetName: string, themeType: ThemeType, isCustom: boolean): void {
    // This will be used by components that need to react to theme changes
    const event = new CustomEvent('themechange', {
      detail: {
        presetName,
        themeType,
        isCustom,
      } as ThemeChangeEvent,
    });
    document.dispatchEvent(event);
  }

  private getColorKeyForTheme(baseKey: string, themeType: ThemeType): string {
    const prefix = themeType === 'night' ? 'SETTING_NIGHT_' : 'SETTING_';
    return prefix + baseKey.replace('SETTING_', '');
  }

  private getStoreState(): StoreState {
    // This will be expanded when we create the main store
    return {
      settings: {},
      themeState: this.getThemeState(),
      platformConfig: { isBWPlatform: false, platformType: '' },
    };
  }
}
