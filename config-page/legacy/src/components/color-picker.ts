import { ColorPickerProps, ColorChangeEvent, PebbleColor } from '../types/index';

export class ColorPickerComponent {
  private input: HTMLInputElement;
  private picker: HTMLElement;
  private swatch: HTMLElement;
  private hexSpan: HTMLElement;
  private nameSpan: HTMLElement;
  private isNight: boolean;
  private onColorChange?: (event: ColorChangeEvent) => void;
  private pebbleColors: { [hex: string]: PebbleColor } = {};

  constructor(props: ColorPickerProps, pebbleColors: { [hex: string]: PebbleColor }) {
    this.input = document.getElementById(props.inputId) as HTMLInputElement;
    this.picker = document.querySelector(
      `.color-picker[data-for="${props.inputId}"]`
    ) as HTMLElement;
    this.swatch = this.picker.querySelector('.color-swatch') as HTMLElement;
    this.hexSpan = this.picker.querySelector('.color-hex') as HTMLElement;
    this.nameSpan = this.picker.querySelector('.color-name') as HTMLElement;
    this.isNight = props.isNight;
    this.onColorChange = props.onColorChange;
    this.pebbleColors = pebbleColors;

    this.attachEvents();
    this.updateDisplay();
  }

  setValue(hex: string): void {
    if (!this.input) return;

    this.input.value = hex.toUpperCase();
    this.updateDisplay();
    this.notifyColorChange(hex);
  }

  getValue(): string {
    return this.input?.value || '';
  }

  updateDisplay(): void {
    if (!this.input) return;

    const color = this.input.value;
    if (!color || color === 'undefined') {
      this.setDisplayColors('#000000', '');
      return;
    }

    const upperColor = color.toUpperCase();
    this.setDisplayColors(upperColor, this.getColorName(upperColor));
  }

  showPicker(): void {
    // This will delegate to the ColorSystem modal
    const event = new CustomEvent('openmodal', {
      detail: { inputId: this.input.id },
    });
    document.dispatchEvent(event);
  }

  setDisabled(disabled: boolean): void {
    if (this.picker) {
      this.picker.style.pointerEvents = disabled ? 'none' : 'auto';
      this.picker.style.opacity = disabled ? '0.5' : '1';
    }
  }

  destroy(): void {
    // Clean up event listeners
    this.picker.removeEventListener('click', this.handleClick);
  }

  private attachEvents(): void {
    this.picker.addEventListener('click', this.handleClick);
  }

  private handleClick = (): void => {
    this.showPicker();
  };

  private setDisplayColors(color: string, name: string): void {
    this.swatch.style.backgroundColor = color;
    this.hexSpan.textContent = color;
    this.nameSpan.textContent = name;
  }

  private getColorName(hex: string): string {
    return this.pebbleColors[hex]?.name || '';
  }

  private notifyColorChange(value: string): void {
    if (this.onColorChange) {
      this.onColorChange({
        colorKey: this.input.id,
        value,
        isNight: this.isNight,
      });
    }
  }
}

export class ColorPickerFactory {
  private static pebbleColors: { [hex: string]: PebbleColor } = {};
  private static pickers: Map<string, ColorPickerComponent> = new Map();

  static initialize(pebbleColors: { [hex: string]: PebbleColor }): void {
    this.pebbleColors = pebbleColors;
  }

  static create(props: ColorPickerProps): ColorPickerComponent {
    const picker = new ColorPickerComponent(props, this.pebbleColors);
    this.pickers.set(props.inputId, picker);
    return picker;
  }

  static getPicker(inputId: string): ColorPickerComponent | undefined {
    return this.pickers.get(inputId);
  }

  static getAllPickers(): ColorPickerComponent[] {
    return Array.from(this.pickers.values());
  }

  static destroyPicker(inputId: string): void {
    const picker = this.pickers.get(inputId);
    if (picker) {
      picker.destroy();
      this.pickers.delete(inputId);
    }
  }

  static destroyAllPickers(): void {
    this.pickers.forEach((picker) => picker.destroy());
    this.pickers.clear();
  }

  static generateColorPickersHTML(
    settings: Array<{ baseId: string; label: string; default: string }>,
    isNight: boolean = false
  ): string {
    return settings
      .map((setting) => {
        const prefix = isNight ? 'SETTING_NIGHT_' : 'SETTING_';
        const settingId = prefix + setting.baseId;
        const labelText = isNight ? `Night ${setting.label}` : setting.label;

        return `<div class="form-group">
        <label for="${settingId}">${labelText}</label>
        <input type="hidden" id="${settingId}" name="${settingId}" value="${setting.default}">
        <div class="color-picker" data-for="${settingId}">
          <span class="color-name"></span>
          <button type="button" class="color-swatch"></button>
          <span class="color-hex">${setting.default.toUpperCase()}</span>
        </div>
      </div>`;
      })
      .join('');
  }

  static populateColorGrids(
    settings: Array<{ baseId: string; label: string; default: string }>
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
    settings.forEach((setting) => {
      const settingId = `SETTING_${setting.baseId}`;
      dayGrid.insertAdjacentHTML(
        'beforeend',
        this.createSinglePickerHTML(settingId, setting.label, setting.default)
      );

      this.create({
        inputId: settingId,
        label: setting.label,
        defaultValue: setting.default,
        isNight: false,
      });
    });

    // Generate night pickers
    settings.forEach((setting) => {
      const settingId = `SETTING_NIGHT_${setting.baseId}`;
      const labelText = `Night ${setting.label}`;
      nightGrid.insertAdjacentHTML(
        'beforeend',
        this.createSinglePickerHTML(settingId, labelText, setting.default)
      );

      this.create({
        inputId: settingId,
        label: labelText,
        defaultValue: setting.default,
        isNight: true,
      });
    });
  }

  private static createSinglePickerHTML(
    settingId: string,
    labelText: string,
    defaultValue: string
  ): string {
    return `<div class="form-group">
      <label for="${settingId}">${labelText}</label>
      <input type="hidden" id="${settingId}" name="${settingId}" value="${defaultValue}">
      <div class="color-picker" data-for="${settingId}">
        <span class="color-name"></span>
        <button type="button" class="color-swatch"></button>
        <span class="color-hex">${defaultValue.toUpperCase()}</span>
      </div>
    </div>`;
  }
}
