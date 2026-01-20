import { pebbleColors, colorSettings } from './color-data';
import { openColorModal, updateSVGColors } from './ui-manager';

export class ColorPicker {
  public input: HTMLInputElement;
  private picker: HTMLElement;
  private swatch: HTMLElement;
  private hexSpan: HTMLElement;
  private nameSpan: HTMLElement;
  private isNight: boolean;

  constructor(inputId: string) {
    this.input = document.getElementById(inputId) as HTMLInputElement;
    this.picker = document.querySelector(`.color-picker[data-for="${inputId}"]`) as HTMLElement;
    this.swatch = this.picker.querySelector('.color-swatch') as HTMLElement;
    this.hexSpan = this.picker.querySelector('.color-hex') as HTMLElement;
    this.nameSpan = this.picker.querySelector('.color-name') as HTMLElement;
    this.isNight = inputId.startsWith('SETTING_NIGHT_');

    // Attach click listener
    this.picker.addEventListener('click', () => openColorModal(inputId));
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
    this.nameSpan.textContent = pebbleColors[upperColor] ? pebbleColors[upperColor].name : '';
  }

  setValue(hex: string): void {
    if (!this.input) return;
    this.input.value = hex.toUpperCase();
    this.updateDisplay();
    updateSVGColors(this.input.id, hex, this.isNight);
  }
}

// Function to create HTML for a color picker
export function createColorPickerHTML(settingId: string, labelText: string, defaultValue: string): string {
  return '<div class="form-group">' +
    '<label for="' + settingId + '">' + labelText + '</label>' +
    '<input type="hidden" id="' + settingId + '" name="' + settingId + '" value="' + defaultValue + '">' +
    '<div class="color-picker" data-for="' + settingId + '">' +
      '<span class="color-name"></span>' +
      '<button type="button" class="color-swatch"></button>' +
      '<span class="color-hex">' + defaultValue.toUpperCase() + '</span>' +
    '</div>' +
  '</div>';
}

// Global map for color picker instances
export const colorPickers: Map<string, ColorPicker> = new Map();

// Function to generate color pickers for day and night
export function generateColorPickers(): void {
  const dayGrid = document.querySelector('#day-custom-colors .color-grid') as HTMLElement;
  const nightGrid = document.querySelector('#night-custom-colors .color-grid') as HTMLElement;

  // Clear existing
  dayGrid.innerHTML = '';
  nightGrid.innerHTML = '';

  // Generate day pickers
  colorSettings.forEach((setting) => {
    const settingId = `SETTING_${setting.baseId}`;
    const html = createColorPickerHTML(settingId, setting.label, setting.default);
    dayGrid.insertAdjacentHTML('beforeend', html);
    colorPickers.set(settingId, new ColorPicker(settingId));
  });

  // Generate night pickers
  colorSettings.forEach((setting) => {
    const settingId = `SETTING_NIGHT_${setting.baseId}`;
    const labelText = `Night ${setting.label}`;
    const html = createColorPickerHTML(settingId, labelText, setting.default);
    nightGrid.insertAdjacentHTML('beforeend', html);
    colorPickers.set(settingId, new ColorPicker(settingId));
  });
}


