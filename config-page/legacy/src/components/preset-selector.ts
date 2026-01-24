import { PresetSelectorProps, ThemeChangeEvent, Theme } from '../types/index';

export class PresetSelector {
  private container: HTMLElement;
  private select: HTMLSelectElement;
  private isNight: boolean;
  private onPresetChange?: (event: ThemeChangeEvent) => void;
  private themes: { [key: string]: Theme } = {};

  constructor(props: PresetSelectorProps) {
    this.container = document.getElementById(
      props.isNight ? 'night-preset-selector' : 'day-preset-selector'
    )!;
    this.select = document.getElementById(
      props.isNight ? 'night-preset' : 'day-preset'
    ) as HTMLSelectElement;
    this.isNight = props.isNight;
    this.onPresetChange = props.onPresetChange;
  }

  setThemes(themes: { [key: string]: Theme }): void {
    this.themes = themes;
    this.generate();
  }

  setSelectedPreset(presetName: string): void {
    const radio = document.getElementById(
      (this.isNight ? 'night-radio-' : 'day-radio-') + presetName
    ) as HTMLInputElement;

    if (radio) {
      radio.checked = true;
      this.select.value = presetName;
    }
  }

  getSelectedPreset(): string {
    return this.select.value;
  }

  show(): void {
    this.container.style.display = 'flex';
  }

  hide(): void {
    this.container.style.display = 'none';
  }

  generate(): void {
    this.container.innerHTML = '';
    const themeKeys = Object.keys(this.themes);
    const allKeys = ['custom', ...themeKeys];

    allKeys.forEach((key) => {
      const optionDiv = this.createPresetOption(key);
      this.container.appendChild(optionDiv);
    });

    this.attachEventListeners();
  }

  private createPresetOption(key: string): HTMLElement {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'preset-option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = this.isNight ? 'night-preset-radio' : 'day-preset-radio';
    radio.value = key;
    radio.id = (this.isNight ? 'night-radio-' : 'day-radio-') + key;

    const label = document.createElement('label');
    label.htmlFor = radio.id;

    const span = document.createElement('span');
    span.textContent = this.getDisplayName(key);

    const preview = this.createPreview(key);
    const previewContainer = document.createElement('div');
    previewContainer.className = 'svg-preview-container';
    previewContainer.appendChild(preview);

    label.appendChild(previewContainer);
    label.appendChild(span);

    optionDiv.appendChild(radio);
    optionDiv.appendChild(label);

    // Set initial selection
    if (key === this.select.value) {
      radio.checked = true;
    }

    return optionDiv;
  }

  private createPreview(key: string): HTMLElement {
    if (key === 'custom') {
      const preview = document.createElement('div');
      preview.textContent = '🎨';
      preview.className = 'preset-custom-preview';
      return preview;
    }

    const theme = this.themes[key];
    if (!theme) {
      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'Error';
      return errorDiv;
    }

    return this.createMiniPreview(theme);
  }

  private createMiniPreview(theme: Theme): HTMLElement {
    const templateId = this.isNight ? 'svg-night-preview' : 'svg-preview';
    const template = document.getElementById(templateId)!.cloneNode(true) as HTMLElement;

    // Update fills
    Object.entries(theme).forEach(([key, value]) => {
      const colorKey = this.getColorKeyForTheme(key);
      const element = template.querySelector(`#${colorKey}`);
      if (element) {
        element.setAttribute('fill', '#' + value);
      }
    });

    return template;
  }

  private attachEventListeners(): void {
    this.container.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.type === 'radio') {
        this.handlePresetChange(target.value);
      }
    });
  }

  private handlePresetChange(presetName: string): void {
    console.log('Preset changed:', presetName, 'isNight:', this.isNight);

    // Update select value
    this.select.value = presetName;

    // Notify callback
    if (this.onPresetChange) {
      this.onPresetChange({
        presetName,
        themeType: this.isNight ? 'night' : 'day',
        isCustom: presetName === 'custom',
      });
    }

    // Toggle custom colors visibility
    this.toggleCustomColors(presetName === 'custom');
  }

  private toggleCustomColors(show: boolean): void {
    const customId = this.isNight ? '#night-custom-colors' : '#day-custom-colors';
    const customElement = document.querySelector(customId) as HTMLElement;

    if (customElement) {
      if (show) {
        customElement.classList.remove('hidden');
      } else {
        customElement.classList.add('hidden');
      }
    }
  }

  private getDisplayName(key: string): string {
    // This could be enhanced with theme display names
    const displayNames: { [key: string]: string } = {
      default: 'Solar (Default)',
      orangeDreams: 'Orange Dreams',
      terminalGreen: 'Terminal Green',
      lightOceanTheme: 'Light Ocean',
      roseTheme: 'Rose Theme',
      fireworkTheme: 'Firework',
      oceanTheme: 'Ocean Theme',
      mauveTheme: 'Mauve Alert',
      sandTheme: 'Sand',
      greyTheme: 'Grey',
      userTeal1: 'User Teal 1',
      bwTheme1: 'Black & White',
      bwTheme2: 'Black & White 2',
      custom: 'Custom',
    };

    return displayNames[key] || key;
  }

  private getColorKeyForTheme(baseKey: string): string {
    const prefix = this.isNight ? 'SETTING_NIGHT_' : 'SETTING_';
    return prefix + baseKey.replace('SETTING_', '');
  }
}

export class PresetSelectorManager {
  private daySelector: PresetSelector;
  private nightSelector: PresetSelector;

  constructor() {
    this.daySelector = new PresetSelector({
      isNight: false,
      selectedPreset: 'default',
      onPresetChange: this.handleThemeChange,
    });

    this.nightSelector = new PresetSelector({
      isNight: true,
      selectedPreset: 'default',
      onPresetChange: this.handleThemeChange,
    });
  }

  initialize(themes: { [key: string]: Theme }): void {
    this.daySelector.setThemes(themes);
    this.nightSelector.setThemes(themes);

    this.daySelector.generate();
    this.nightSelector.generate();
  }

  setDayPreset(presetName: string): void {
    this.daySelector.setSelectedPreset(presetName);
  }

  setNightPreset(presetName: string): void {
    this.nightSelector.setSelectedPreset(presetName);
  }

  getDayPreset(): string {
    return this.daySelector.getSelectedPreset();
  }

  getNightPreset(): string {
    return this.nightSelector.getSelectedPreset();
  }

  showNightSelector(): void {
    this.nightSelector.show();
  }

  hideNightSelector(): void {
    this.nightSelector.hide();
  }

  private handleThemeChange = (event: ThemeChangeEvent): void => {
    // Dispatch global theme change event
    document.dispatchEvent(
      new CustomEvent('themechange', {
        detail: event,
      })
    );
  };
}
