import {
  Settings,
  SettingsChangeEvent,
  StoreSubscriber,
  StoreState,
  ValidationResult,
  SettingsValidator,
  PlatformConfig,
} from '../types/index';

export class SettingsStore {
  private settings: Settings = {};
  private subscribers: StoreSubscriber[] = [];
  private validator: SettingsValidator;
  private platformConfig: PlatformConfig = {
    isBWPlatform: false,
    platformType: '',
  };

  constructor(validator: SettingsValidator) {
    this.validator = validator;
  }

  async loadSettings(): Promise<void> {
    let configData: Settings | null = null;

    // First try URL params
    const settings = this.getQueryParam('settings', '');
    if (settings) {
      try {
        configData = JSON.parse(decodeURIComponent(settings));
      } catch (e) {
        console.error('Error loading settings from URL:', e);
      }
    }

    // Fallback to localStorage if no URL settings
    if (!configData) {
      try {
        const stored = localStorage.getItem('halcyonSettings');
        if (stored) {
          configData = JSON.parse(stored);
        }
      } catch (e) {
        console.warn('localStorage not available');
      }
    }

    if (configData) {
      const validation = this.validator.validate(configData);
      if (validation.isValid) {
        this.settings = configData;
      } else {
        console.warn('Invalid settings loaded:', validation.errors);
        this.settings = this.getDefaultSettings();
      }
    } else {
      this.settings = this.getDefaultSettings();
    }

    this.applySettingsToDOM();
    this.notifySubscribers();
  }

  saveSettings(): void {
    const form = document.getElementById('config-form') as HTMLFormElement;
    if (!form) {
      console.error('Config form not found');
      return;
    }

    const formData = new FormData(form);
    const newSettings: Settings = {};

    // Process form data
    for (const [key, value] of formData.entries()) {
      const stringValue = value as string;
      if (key.includes('COLOR')) {
        newSettings[key] = stringValue.replace('#', '');
      } else if (key.includes('SETTING_')) {
        const element = this.getElementByKey(key);
        if (element) {
          if (element.type === 'checkbox') {
            newSettings[key] = element.checked ? 1 : 0;
          } else {
            newSettings[key] = stringValue;
          }
        }
      }
    }

    // Handle unchecked checkboxes
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      const name = (checkbox as HTMLInputElement).name;
      if (!(name in newSettings)) {
        newSettings[name] = (checkbox as HTMLInputElement).checked ? 1 : 0;
      }
    });

    // Validate new settings
    const validation = this.validator.validate(newSettings);
    if (!validation.isValid) {
      console.error('Invalid settings:', validation.errors);
      return;
    }

    this.settings = newSettings;

    // Save to localStorage if available
    try {
      localStorage.setItem('halcyonSettings', JSON.stringify(this.settings));
    } catch (e) {
      console.warn('localStorage not available');
    }

    // Return to Pebble app
    const returnTo = this.getQueryParam('return_to', 'pebblejs://close#');
    document.location.href = returnTo + encodeURIComponent(JSON.stringify(this.settings));

    this.notifySubscribers();
  }

  getSetting(key: string): string | number | undefined {
    return this.settings[key];
  }

  setSetting(key: string, value: string | number): void {
    const oldValue = this.settings[key];
    this.settings[key] = value;

    // Update DOM element
    this.updateDOMElement(key, value);

    // Notify subscribers
    this.notifySubscribers();
    this.notifySettingChange(key, value, oldValue);
  }

  getAllSettings(): Settings {
    return { ...this.settings };
  }

  resetToDefaults(): void {
    this.settings = this.getDefaultSettings();
    this.applySettingsToDOM();
    this.notifySubscribers();
  }

  setPlatformConfig(config: PlatformConfig): void {
    this.platformConfig = config;
    this.notifySubscribers();
  }

  getPlatformConfig(): PlatformConfig {
    return { ...this.platformConfig };
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

  private getDefaultSettings(): Settings {
    return {
      SETTING_PRESET: 'default',
      SETTING_NIGHT_PRESET: 'default',
      SETTING_USE_NIGHT_THEME: 0,
      SETTING_PIP_VISIBILITY: 0,
      SETTING_SHOW_LEADING_ZERO: 0,
      SETTING_USE_LARGE_FONTS: 0,
      // Add other default settings as needed
    };
  }

  private applySettingsToDOM(): void {
    Object.entries(this.settings).forEach(([key, value]) => {
      this.updateDOMElement(key, value);
    });
  }

  private updateDOMElement(key: string, value: string | number): void {
    let element = document.getElementById(key) as HTMLElement;

    // Special handling for preset selects
    if (key === 'SETTING_PRESET') {
      element = document.getElementById('day-preset') as HTMLElement;
    } else if (key === 'SETTING_NIGHT_PRESET') {
      element = document.getElementById('night-preset') as HTMLElement;
    }

    if (element) {
      const inputElement = element as HTMLInputElement;
      if (inputElement.type === 'checkbox') {
        inputElement.checked = value === 1;
      } else if (inputElement.type === 'hidden' && key.includes('COLOR')) {
        const hexColor = this.formatColorValue(value);
        inputElement.value = hexColor;
        // Trigger color display update
        this.updateColorDisplay(key);
      } else {
        inputElement.value = value as string;
      }
    }
  }

  private updateColorDisplay(inputId: string): void {
    // This will be handled by the ColorSystem
    const event = new CustomEvent('colordisplayupdate', {
      detail: { inputId },
    });
    document.dispatchEvent(event);
  }

  private getElementByKey(key: string): HTMLInputElement | null {
    return (
      (document.getElementById(key) as HTMLInputElement) ||
      (document.querySelector(`[name="${key}"]`) as HTMLInputElement)
    );
  }

  private formatColorValue(value: string | number): string {
    if (typeof value === 'number') {
      return '#' + value.toString(16).padStart(6, '0').toUpperCase();
    }
    return value.toString().startsWith('#') ? value.toString() : '#' + value.toString();
  }

  private notifySubscribers(): void {
    const state: StoreState = {
      settings: this.getAllSettings(),
      themeState: {
        day: { preset: '', colors: new Map(), isCustom: false },
        night: { preset: '', colors: new Map(), isCustom: false },
        isNightThemeEnabled: false,
      }, // Will be populated by ThemeManager
      platformConfig: this.getPlatformConfig(),
    };

    this.subscribers.forEach((subscriber) => {
      try {
        subscriber(state);
      } catch (error) {
        console.error('Error notifying settings subscriber:', error);
      }
    });
  }

  private notifySettingChange(
    key: string,
    newValue: string | number,
    oldValue: string | number | undefined
  ): void {
    const event = new CustomEvent('settingschange', {
      detail: {
        key,
        newValue,
        oldValue,
      } as SettingsChangeEvent,
    });
    document.dispatchEvent(event);
  }

  private getQueryParam(variable: string, defaultValue?: string): string | false {
    const query = location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return defaultValue || false;
  }
}

export class DefaultSettingsValidator implements SettingsValidator {
  validate(settings: Settings): ValidationResult {
    const errors: string[] = [];

    // Validate preset settings
    if (settings.SETTING_PRESET && typeof settings.SETTING_PRESET !== 'string') {
      errors.push('SETTING_PRESET must be a string');
    }

    if (settings.SETTING_NIGHT_PRESET && typeof settings.SETTING_NIGHT_PRESET !== 'string') {
      errors.push('SETTING_NIGHT_PRESET must be a string');
    }

    // Validate checkbox settings
    const checkboxSettings = [
      'SETTING_USE_NIGHT_THEME',
      'SETTING_SHOW_LEADING_ZERO',
      'SETTING_USE_LARGE_FONTS',
    ];

    checkboxSettings.forEach((key) => {
      if (key in settings && ![0, 1].includes(settings[key] as number)) {
        errors.push(`${key} must be 0 or 1`);
      }
    });

    // Validate select settings
    if (
      settings.SETTING_PIP_VISIBILITY &&
      ![0, 1, 2].includes(settings.SETTING_PIP_VISIBILITY as number)
    ) {
      errors.push('SETTING_PIP_VISIBILITY must be 0, 1, or 2');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
