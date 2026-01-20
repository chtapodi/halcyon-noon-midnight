// Main entry point for the refactored Pebble Config Page
import { ThemeManager } from './core/theme-manager';
import { ColorSystem } from './core/color-system';
import { SettingsStore, DefaultSettingsValidator } from './core/settings-store';
import { PreviewManager } from './core/preview-renderer';
import { PreviewRenderer } from './core/preview-renderer';
import { PresetSelectorManager } from './components/preset-selector';
import { ColorPickerFactory } from './components/color-picker';
import { colorSettings, pebbleColors } from './color-data';
import { ThemeType } from './types/index';

class ConfigApp {
  private themeManager: ThemeManager;
  private settingsStore: SettingsStore;
  private presetSelectorManager: PresetSelectorManager;
  private previewRenderer: PreviewRenderer;

  constructor() {
    this.themeManager = new ThemeManager();
    this.settingsStore = new SettingsStore(new DefaultSettingsValidator());
    this.presetSelectorManager = new PresetSelectorManager();
    this.previewRenderer = PreviewManager.getInstance();
  }

  async init(): Promise<void> {
    try {
      console.log('🚀 Initializing Pebble Config App...');

      // Initialize core systems
      await this.initializeCore();

      // Initialize UI components
      this.initializeComponents();

      // Load existing settings
      await this.loadSettings();

      // Set up event listeners
      this.setupEventListeners();

      // Initialize platform detection
      this.initializePlatform();

      // Apply initial presets
      this.applyInitialPresets();

      console.log('✅ Pebble Config App initialized successfully!');
    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
    }
  }

  private async initializeCore(): Promise<void> {
    console.log('🔧 Initializing core systems...');

    // Load themes
    await this.themeManager.loadThemes();

    // Initialize color system
    ColorSystem.initialize(pebbleColors);

    // Set up color order for modal
    import('./color-data').then(({ colorOrder }) => {
      ColorSystem.setColorOrder(colorOrder);
    });

    console.log('✅ Core systems initialized');
  }

  private initializeComponents(): void {
    console.log('🎨 Initializing components...');

    // Initialize preset selectors
    const themes = this.themeManager.getAvailableThemes().reduce(
      (acc, themeName) => {
        acc[themeName] = this.themeManager.getTheme(themeName) || {};
        return acc;
      },
      {} as { [key: string]: any }
    );
    this.presetSelectorManager.initialize(themes);

    // Initialize color pickers (this will be done after settings load)
    // ColorSystem.generateColorPickers(colorSettings);

    // Initialize previews
    PreviewManager.refreshAllPreviews();

    console.log('✅ Components initialized');
  }

  private async loadSettings(): Promise<void> {
    console.log('📁 Loading settings...');

    await this.settingsStore.loadSettings();

    // Now generate color pickers after settings are loaded
    ColorSystem.generateColorPickers(colorSettings);

    console.log('✅ Settings loaded');
  }

  private setupEventListeners(): void {
    console.log('👂 Setting up event listeners...');

    // Theme change events
    document.addEventListener('themechange', this.handleThemeChange as EventListener);

    // Color change events
    document.addEventListener('colordisplayupdate', this.handleColorDisplayUpdate as EventListener);

    // Modal events
    document.addEventListener('openmodal', this.handleOpenModal as EventListener);

    // Form submission
    const configForm = document.getElementById('config-form') as HTMLFormElement;
    if (configForm) {
      configForm.addEventListener('submit', this.handleFormSubmit);
    }

    // Night theme toggle
    const nightThemeToggle = document.getElementById('SETTING_USE_NIGHT_THEME') as HTMLInputElement;
    if (nightThemeToggle) {
      nightThemeToggle.addEventListener('change', this.handleNightThemeToggle);
    }

    console.log('✅ Event listeners set up');
  }

  private initializePlatform(): void {
    console.log('📱 Detecting platform...');

    const getQueryParam = (variable: string, defaultValue?: string): string | false => {
      const query = location.search.substring(1);
      const vars = query.split('&');
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] === variable) {
          return decodeURIComponent(pair[1]);
        }
      }
      return defaultValue || false;
    };

    const platform = getQueryParam('platform', '') || '';
    const isBWPlatform = ['aplite', 'diorite', 'flint'].includes(platform);

    // Set platform configuration
    ColorSystem.setPlatformConfig({
      isBWPlatform,
      platformType: platform,
    });

    this.settingsStore.setPlatformConfig({
      isBWPlatform,
      platformType: platform,
    });

    console.log(`✅ Platform detected: ${platform} (BW: ${isBWPlatform})`);
  }

  private applyInitialPresets(): void {
    console.log('🎯 Applying initial presets...');

    // Get current presets from settings
    const dayPreset = (this.settingsStore.getSetting('SETTING_PRESET') as string) || 'default';
    const nightPreset =
      (this.settingsStore.getSetting('SETTING_NIGHT_PRESET') as string) || 'default';

    // Apply day preset
    this.themeManager.applyPreset(dayPreset, 'day');
    this.presetSelectorManager.setDayPreset(dayPreset);

    // Apply night preset
    this.themeManager.applyPreset(nightPreset, 'night');
    this.presetSelectorManager.setNightPreset(nightPreset);

    // Update previews
    this.updatePreviewsFromThemes();

    // Toggle night theme visibility based on settings
    const nightThemeEnabled =
      (this.settingsStore.getSetting('SETTING_USE_NIGHT_THEME') as number) === 1;
    this.toggleNightThemeVisibility(nightThemeEnabled);

    console.log('✅ Initial presets applied');
  }

  private handleThemeChange = (event: CustomEvent): void => {
    const { presetName, themeType, isCustom } = event.detail;

    console.log('🎨 Theme changed:', { presetName, themeType, isCustom });

    // Apply preset
    this.themeManager.applyPreset(presetName, themeType);

    // Update settings
    const settingKey = themeType === 'night' ? 'SETTING_NIGHT_PRESET' : 'SETTING_PRESET';
    this.settingsStore.setSetting(settingKey, presetName);

    // Update color pickers if it's a preset theme
    if (!isCustom && presetName !== 'custom') {
      const theme = this.themeManager.getTheme(presetName);
      if (theme) {
        Object.entries(theme).forEach(([key, value]) => {
          const colorKey = this.getColorKeyForTheme(key, themeType);
          // Update the input field directly
          const input = document.getElementById(colorKey) as HTMLInputElement;
          if (input) {
            input.value = '#' + value.toUpperCase();
          }
        });
      }
    }

    // Update preview
    this.updatePreviewFromTheme(themeType);

    // Toggle custom colors visibility
    this.toggleCustomColorsVisibility(themeType, isCustom);
  };

  private handleColorDisplayUpdate = (event: CustomEvent): void => {
    const { inputId } = event.detail;
    // Trigger update for the specific picker
    const picker = document.querySelector(`.color-picker[data-for="${inputId}"]`) as HTMLElement;
    if (picker) {
      const swatch = picker.querySelector('.color-swatch') as HTMLElement;
      const hexSpan = picker.querySelector('.color-hex') as HTMLElement;
      const nameSpan = picker.querySelector('.color-name') as HTMLElement;
      const input = document.getElementById(inputId) as HTMLInputElement;

      if (input && swatch && hexSpan && nameSpan) {
        const color = input.value.toUpperCase();
        swatch.style.backgroundColor = color;
        hexSpan.textContent = color;
        // Get color name from pebble colors
        nameSpan.textContent = this.getColorName(color);

        // Also update the SVG preview immediately
        const isNight = inputId.startsWith('SETTING_NIGHT_');
        this.previewRenderer.updatePreviewColors(inputId, color, isNight ? 'night' : 'day');
      }
    }
  };

  private handleOpenModal = (event: CustomEvent): void => {
    const { inputId } = event.detail;
    // Open modal manually using the existing modal logic
    const modal = document.getElementById('color-modal')!;
    const currentHex = (document.getElementById(inputId) as HTMLInputElement).value.toUpperCase();
    const label = document.querySelector(`label[for="${inputId}"]`) as HTMLElement;

    if (label) {
      modal.querySelector('.modal-header h3')!.textContent = label.textContent || 'Choose Color';
    }

    const grid = document.getElementById('color-grid-modal')!;
    grid.innerHTML = '';

    // Get all color swatches
    const colorSwatches = document.querySelectorAll('.color-swatch-modal');
    colorSwatches.forEach((swatch) => {
      const color = (swatch as HTMLElement).style.backgroundColor;
      if (color && color.toUpperCase() === currentHex) {
        (swatch as HTMLElement).classList.add('selected');
      }
    });

    modal.style.display = 'block';
    modal.dataset.forInput = inputId;
    document.body.classList.add('modal-open');
  };

  private handleFormSubmit = (event: Event): void => {
    event.preventDefault();
    console.log('💾 Saving settings...');
    this.settingsStore.saveSettings();
  };

  private handleNightThemeToggle = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const enabled = target.checked;

    console.log('🌙 Night theme toggle:', enabled);

    // Update settings
    this.settingsStore.setSetting('SETTING_USE_NIGHT_THEME', enabled ? 1 : 0);

    // Update visibility
    this.toggleNightThemeVisibility(enabled);

    // Update theme manager
    this.themeManager.setNightThemeEnabled(enabled);
  };

  private updatePreviewFromTheme(themeType: ThemeType): void {
    const themeState = this.themeManager.getThemeState();
    const config = themeType === 'night' ? themeState.night : themeState.day;

    if (config.isCustom) {
      // For custom themes, update from current color inputs
      // Read all current color values and update to preview
      const prefix = themeType === 'night' ? 'SETTING_NIGHT_' : 'SETTING_';
      const colorInputs = document.querySelectorAll(`input[id^="${prefix}"]`);

      console.log(`🎨 Updating custom ${themeType} preview from ${colorInputs.length} inputs`);
      console.log(
        `🔍 Found inputs:`,
        Array.from(colorInputs).map((input) => input.id)
      );

      colorInputs.forEach((input) => {
        const inputElement = input as HTMLInputElement;
        if (inputElement.value) {
          const isNight = inputElement.id.startsWith('SETTING_NIGHT_');
          console.log(`🔄 Updating ${inputElement.id} to ${inputElement.value}`);

          // Use the instance method directly
          this.previewRenderer.updatePreviewColors(
            inputElement.id,
            inputElement.value,
            isNight ? 'night' : 'day'
          );
        }
      });

      // Also refresh all color picker displays to ensure consistency
      PreviewManager.refreshAllPreviews();
    } else {
      // For preset themes, update from theme data
      const theme = this.themeManager.getTheme(config.preset);
      if (theme) {
        PreviewManager.updatePreviewFromTheme(theme, themeType);

        // Also update color picker displays
        Object.entries(theme).forEach(([key, value]) => {
          const colorKey = this.getColorKeyForTheme(key, themeType);
          const input = document.getElementById(colorKey) as HTMLInputElement;
          if (input) {
            input.value = '#' + value.toUpperCase();
            // Trigger display update
            this.handleColorDisplayUpdate({ detail: { inputId: colorKey } } as CustomEvent);
          }
        });
      }
    }
  }

  private updatePreviewsFromThemes(): void {
    this.updatePreviewFromTheme('day');
    this.updatePreviewFromTheme('night');
  }

  private toggleNightThemeVisibility(enabled: boolean): void {
    const nightPreviewContainer = document.getElementById('night-preview-container') as HTMLElement;

    if (nightPreviewContainer) {
      nightPreviewContainer.style.display = enabled ? 'block' : 'none';
    }

    if (enabled) {
      this.presetSelectorManager.showNightSelector();
    } else {
      this.presetSelectorManager.hideNightSelector();
    }
  }

  private toggleCustomColorsVisibility(themeType: ThemeType, show: boolean): void {
    const customId = themeType === 'night' ? '#night-custom-colors' : '#day-custom-colors';
    const customElement = document.querySelector(customId) as HTMLElement;

    if (customElement) {
      if (show) {
        customElement.classList.remove('hidden');
      } else {
        customElement.classList.add('hidden');
      }
    }
  }

  private getColorKeyForTheme(baseKey: string, themeType: ThemeType): string {
    const prefix = themeType === 'night' ? 'SETTING_NIGHT_' : 'SETTING_';
    return prefix + baseKey.replace('SETTING_', '');
  }

  private getColorName(hex: string): string {
    return pebbleColors[hex]?.name || '';
  }
}

// Initialize the app when DOM is loaded
let app: ConfigApp;

async function init() {
  app = new ConfigApp();
  await app.init();
}

document.addEventListener('DOMContentLoaded', init);

// Export for bundler
export { ConfigApp, app };
