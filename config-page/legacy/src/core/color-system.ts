import {
  ColorPickerProps,
  ColorChangeEvent,
  PebbleColor,
  PlatformConfig,
  StoreSubscriber,
} from '../types/index';

export class ColorPicker {
  public input: HTMLInputElement;
  private picker: HTMLElement;
  private swatch: HTMLElement;
  private hexSpan: HTMLElement;
  private nameSpan: HTMLElement;
  private isNight: boolean;
  private onColorChange?: (event: ColorChangeEvent) => void;

  constructor(props: ColorPickerProps) {
    this.input = document.getElementById(props.inputId) as HTMLInputElement;
    this.picker = document.querySelector(
      `.color-picker[data-for="${props.inputId}"]`
    ) as HTMLElement;
    this.swatch = this.picker.querySelector('.color-swatch') as HTMLElement;
    this.hexSpan = this.picker.querySelector('.color-hex') as HTMLElement;
    this.nameSpan = this.picker.querySelector('.color-name') as HTMLElement;
    this.isNight = props.isNight;
    this.onColorChange = props.onColorChange;

    // Attach click listener
    this.picker.addEventListener('click', () => {
      ColorSystem.openColorModal(props.inputId);
    });
  }

  updateDisplay(): void {
    if (!this.input) return;
    const color = this.input.value;
    if (!color || color === 'undefined') {
      this.swatch.style.backgroundColor = '#000000';
      this.hexSpan.textContent = '#000000';
      this.nameSpan.textContent = '';
      return;
    }
    const upperColor = color.toUpperCase();
    this.swatch.style.backgroundColor = upperColor;
    this.hexSpan.textContent = upperColor;
    this.nameSpan.textContent = ColorSystem.getColorName(upperColor);
  }

  setValue(hex: string): void {
    if (!this.input) return;
    const upperHex = hex.toUpperCase();
    this.input.value = upperHex;
    this.updateDisplay();
    ColorSystem.updateSVGColors(this.input.id, upperHex, this.isNight);

    if (this.onColorChange) {
      this.onColorChange({
        colorKey: this.input.id,
        value: upperHex,
        isNight: this.isNight,
      });
    }
  }
}

export class ColorSystem {
  private static colorPickers: Map<string, ColorPicker> = new Map();
  private static pebbleColors: { [hex: string]: PebbleColor } = {};
  private static platformConfig: PlatformConfig = {
    isBWPlatform: false,
    platformType: '',
  };
  private static subscribers: StoreSubscriber[] = [];
  private static colorOrder: (string | null)[] = [];

  static initialize(pebbleColors: { [hex: string]: PebbleColor }): void {
    this.pebbleColors = pebbleColors;
    // Will set color order later
    this.setupModalEvents();
  }

  static setPlatformConfig(config: PlatformConfig): void {
    this.platformConfig = config;
  }

  static setColorOrder(order: (string | null)[]): void {
    this.colorOrder = order;
  }

  static createColorPickerHTML(settingId: string, labelText: string, defaultValue: string): string {
    return (
      '<div class="form-group">' +
      '<label for="' +
      settingId +
      '">' +
      labelText +
      '</label>' +
      '<input type="hidden" id="' +
      settingId +
      '" name="' +
      settingId +
      '" value="' +
      defaultValue +
      '">' +
      '<div class="color-picker" data-for="' +
      settingId +
      '">' +
      '<span class="color-name"></span>' +
      '<button type="button" class="color-swatch"></button>' +
      '<span class="color-hex">' +
      defaultValue.toUpperCase() +
      '</span>' +
      '</div>' +
      '</div>'
    );
  }

  static generateColorPickers(
    colorSettings: { baseId: string; label: string; default: string }[]
  ): void {
    const dayGrid = document.querySelector('#day-custom-colors .color-grid') as HTMLElement;
    const nightGrid = document.querySelector('#night-custom-colors .color-grid') as HTMLElement;

    if (!dayGrid || !nightGrid) {
      console.error('Color grids not found');
      return;
    }

    // Clear existing
    dayGrid.innerHTML = '';
    nightGrid.innerHTML = '';

    // Generate day pickers
    colorSettings.forEach((setting) => {
      const settingId = `SETTING_${setting.baseId}`;
      const html = this.createColorPickerHTML(settingId, setting.label, setting.default);
      dayGrid.insertAdjacentHTML('beforeend', html);

      // Check if there's already a value in the DOM for this setting
      const existingInput = document.getElementById(settingId) as HTMLInputElement;
      const initialValue = existingInput ? existingInput.value : setting.default;

      const picker = new ColorPicker({
        inputId: settingId,
        label: setting.label,
        defaultValue: initialValue,
        isNight: false,
        onColorChange: this.handleColorChange,
      });
      this.colorPickers.set(settingId, picker);

      // Update display with current value
      picker.updateDisplay();
    });

    // Generate night pickers
    colorSettings.forEach((setting) => {
      const settingId = `SETTING_NIGHT_${setting.baseId}`;
      const labelText = `Night ${setting.label}`;
      const html = this.createColorPickerHTML(settingId, labelText, setting.default);
      nightGrid.insertAdjacentHTML('beforeend', html);

      // Check if there's already a value in the DOM for this setting
      const existingInput = document.getElementById(settingId) as HTMLInputElement;
      const initialValue = existingInput ? existingInput.value : setting.default;

      const picker = new ColorPicker({
        inputId: settingId,
        label: labelText,
        defaultValue: initialValue,
        isNight: true,
        onColorChange: this.handleColorChange,
      });
      this.colorPickers.set(settingId, picker);

      // Update display with current value
      picker.updateDisplay();
    });
  }

  static getColorPicker(inputId: string): ColorPicker | undefined {
    return this.colorPickers.get(inputId);
  }

  static updateColorDisplay(inputId: string): void {
    const picker = this.colorPickers.get(inputId);
    if (picker) {
      picker.updateDisplay();
    } else {
      // Fallback for old code
      const input = document.getElementById(inputId) as HTMLInputElement;
      if (!input) return;
      const pickerElement = document.querySelector(
        `.color-picker[data-for="${inputId}"]`
      ) as HTMLElement;
      if (!pickerElement) return;
      const swatch = pickerElement.querySelector('.color-swatch') as HTMLElement;
      const hexSpan = pickerElement.querySelector('.color-hex') as HTMLElement;
      const nameSpan = pickerElement.querySelector('.color-name') as HTMLElement;
      const color = input.value;
      swatch.style.backgroundColor = color;
      hexSpan.textContent = color.toUpperCase();
      nameSpan.textContent = this.getColorName(color);
    }
  }

  static openColorModal(inputId: string): void {
    const currentHex = (document.getElementById(inputId) as HTMLInputElement).value.toUpperCase();
    const label = document.querySelector(`label[for="${inputId}"]`) as HTMLElement;
    const modal = document.getElementById('color-modal')!;

    if (label) {
      modal.querySelector('.modal-header h3')!.textContent = label.textContent || 'Choose Color';
    }

    const grid = document.getElementById('color-grid-modal')!;
    grid.innerHTML = ''; // Clear previous

    this.colorOrder.forEach((item) => {
      const swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.className = 'color-swatch-modal';
      if (item) {
        swatch.style.backgroundColor = item;
        swatch.title = this.getColorName(item) + ' (' + item + ')';
        swatch.addEventListener('click', () => this.selectColor(inputId, item));
        if (item.toUpperCase() === currentHex) {
          swatch.classList.add('selected');
        }
      } else {
        swatch.disabled = true;
      }
      grid.appendChild(swatch);
    });

    modal.style.display = 'block';
    modal.dataset.forInput = inputId;
    document.body.classList.add('modal-open');
  }

  static closeColorModal(): void {
    document.getElementById('color-modal')!.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  static selectColor(inputId: string, hex: string): void {
    hex = hex.toUpperCase();
    const picker = this.colorPickers.get(inputId);
    if (picker) {
      picker.setValue(hex);
    } else {
      // Fallback
      const input = document.getElementById(inputId) as HTMLInputElement;
      input.value = hex;
      this.updateColorDisplay(inputId);
      const isNight = inputId.startsWith('SETTING_NIGHT_');
      this.updateSVGColors(inputId, hex, isNight);
    }

    // Set preset to custom when color is manually changed
    this.setPresetToCustom(inputId);
    this.closeColorModal();
  }

  static updateSVGColors(colorKey: string, colorValue: string, isNight: boolean): void {
    if (!colorValue) return;
    const svgId = isNight ? 'svg-night-preview' : 'svg-preview';
    const element = document.querySelector(`#${svgId} #${colorKey}`) as SVGElement;
    if (element) {
      const hexColor = colorValue.startsWith('#') ? colorValue : '#' + colorValue;
      element.setAttribute('fill', hexColor);
    }
  }

  static initializePreviews(): void {
    // Update SVG from current input values and displays
    this.colorPickers.forEach((picker) => {
      if (!picker.input) return;
      const isNight = picker.input.id.startsWith('SETTING_NIGHT_');
      this.updateSVGColors(picker.input.id, picker.input.value, isNight);
      picker.updateDisplay();
    });
  }

  static getColorName(hex: string): string {
    return this.pebbleColors[hex]?.name || '';
  }

  static subscribe(subscriber: StoreSubscriber): void {
    this.subscribers.push(subscriber);
  }

  static unsubscribe(subscriber: StoreSubscriber): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  private static handleColorChange = (event: ColorChangeEvent): void => {
    // Notify subscribers
    this.subscribers.forEach((subscriber) => {
      try {
        subscriber({
          settings: {},
          themeState: {
            day: { preset: '', colors: new Map(), isCustom: false },
            night: { preset: '', colors: new Map(), isCustom: false },
            isNightThemeEnabled: false,
          },
          platformConfig: { isBWPlatform: false, platformType: '' },
          colorSystem: { event },
        });
      } catch (error) {
        console.error('Error notifying color subscriber:', error);
      }
    });
  };

  private static setupModalEvents(): void {
    // Modal close events
    document.querySelector('.modal-close')!.addEventListener('click', () => {
      this.closeColorModal();
    });

    document.getElementById('color-modal')!.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'color-modal') {
        this.closeColorModal();
      }
    });
  }

  private static setPresetToCustom(inputId: string): void {
    const isNight = inputId.startsWith('SETTING_NIGHT_');
    const presetId = isNight ? 'night-preset' : 'day-preset';
    const presetSelect = document.getElementById(presetId) as HTMLSelectElement;
    const customRadio = document.getElementById(
      (isNight ? 'night-radio-' : 'day-radio-') + 'custom'
    ) as HTMLInputElement;

    if (presetSelect) presetSelect.value = 'custom';
    if (customRadio) customRadio.checked = true;

    // Toggle custom colors visibility
    const customId = isNight ? '#night-custom-colors' : '#day-custom-colors';
    const customElement = document.querySelector(customId) as HTMLElement;
    if (customElement) {
      customElement.classList.remove('hidden');
    }

    // Dispatch theme change event
    document.dispatchEvent(
      new CustomEvent('themechange', {
        detail: {
          presetName: 'custom',
          themeType: isNight ? 'night' : 'day',
          isCustom: true,
        },
      })
    );
  }
}
