import {
  pebbleColors,
  colorOrder,
  bwFillColorOrder,
  bwStrokeColorOrder,
  bwStrokeFields,
  isBWPlatform,
} from './color-data';
import { colorPickers, generateColorPickers } from './color-picker';

export function updateColorDisplay(inputId: string): void {
  if (colorPickers.has(inputId)) {
    colorPickers.get(inputId)!.updateDisplay();
  } else {
    // Fallback for old code
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (!input) return;
    const picker = document.querySelector(`.color-picker[data-for="${inputId}"]`) as HTMLElement;
    if (!picker) return;
    const swatch = picker.querySelector('.color-swatch') as HTMLElement;
    const hexSpan = picker.querySelector('.color-hex') as HTMLElement;
    const nameSpan = picker.querySelector('.color-name') as HTMLElement;
    const color = input.value;
    swatch.style.backgroundColor = color;
    hexSpan.textContent = color.toUpperCase();
    nameSpan.textContent = pebbleColors[color] ? pebbleColors[color].name : '';
  }
}

export function openColorModal(inputId: string): void {
  const currentHex = (document.getElementById(inputId) as HTMLInputElement).value.toUpperCase();
  const label = document.querySelector(`label[for="${inputId}"]`) as HTMLElement;
  const modal = document.getElementById('color-modal')!;
  if (label) {
    modal.querySelector('.modal-header h3')!.textContent = label.textContent;
  }
  const grid = document.getElementById('color-grid-modal')!;
  grid.innerHTML = ''; // Clear previous

  // Determine color order based on platform and field type
  let orderToUse: (string | null)[] = colorOrder;
  if (isBWPlatform) {
    // Extract baseId from inputId
    const baseId = inputId.replace('SETTING_', '').replace('SETTING_NIGHT_', '');
    if (bwStrokeFields.has(baseId)) {
      orderToUse = bwStrokeColorOrder;
    } else {
      orderToUse = bwFillColorOrder;
    }
  }

  orderToUse.forEach((item) => {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'color-swatch-modal';
    if (item) {
      swatch.style.backgroundColor = item;
      swatch.title = pebbleColors[item].name + ' (' + item + ')';
      swatch.addEventListener('click', () => selectColor(inputId, item));
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

export function closeColorModal(): void {
  document.getElementById('color-modal')!.style.display = 'none';
  document.body.classList.remove('modal-open');
}

export function selectColor(inputId: string, hex: string): void {
  hex = hex.toUpperCase();
  if (colorPickers.has(inputId)) {
    colorPickers.get(inputId)!.setValue(hex);
  } else {
    // Fallback
    const input = document.getElementById(inputId) as HTMLInputElement;
    input.value = hex;
    updateColorDisplay(inputId);
    const isNight = inputId.startsWith('SETTING_NIGHT_');
    updateSVGColors(inputId, hex, isNight);
  }
  // Set preset to custom when color is manually changed
  const isNight = inputId.startsWith('SETTING_NIGHT_');
  const presetId = isNight ? 'night-preset' : 'day-preset';
  (document.getElementById(presetId) as HTMLSelectElement).value = 'custom';
  (
    document.getElementById(
      (isNight ? 'night-radio-' : 'day-radio-') + 'custom'
    ) as HTMLInputElement
  ).checked = true;
  toggleCustomColors(isNight);
  closeColorModal();
}

export function initializeColorPickers(): void {
  // Modal close events
  document.querySelector('.modal-close')!.addEventListener('click', closeColorModal);
  document.getElementById('color-modal')!.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'color-modal') closeColorModal();
  });
}

export function initializePreviews(): void {
  // Update SVG from current input values and displays
  colorPickers.forEach((picker) => {
    if (!picker.input) return;
    const isNight = picker.input.id.startsWith('SETTING_NIGHT_');
    updateSVGColors(picker.input.id, picker.input.value, isNight);
    picker.updateDisplay();
  });
}

export function updateSVGColors(colorKey: string, colorValue: string, isNight: boolean): void {
  if (!colorValue) return;
  const svgId = isNight ? 'svg-night-preview' : 'svg-preview';
  const previewId = colorKey;
  const element = document.querySelector(`#${svgId} #${previewId}`) as SVGElement;
  if (element) {
    const hexColor = colorValue.startsWith('#') ? colorValue : '#' + colorValue;
    element.setAttribute('fill', hexColor);
  }
}

export function initializeNightThemeToggle(): void {
  const useNightThemeToggle = document.getElementById(
    'SETTING_USE_NIGHT_THEME'
  ) as HTMLInputElement;
  const nightPreviewContainer = document.getElementById('night-preview-container') as HTMLElement;
  const nightPresetSelector = document.getElementById('night-preset') as HTMLElement;

  function toggleNightPresetAndPreview() {
    const isNightThemeEnabled = useNightThemeToggle.checked;
    if (nightPresetSelector) {
      const nightPresetSection = nightPresetSelector.closest('.form-group') as HTMLElement;
      if (nightPresetSection) {
        nightPresetSection.style.display = isNightThemeEnabled ? 'block' : 'none';
      }
    }
    if (nightPreviewContainer) {
      nightPreviewContainer.style.display = isNightThemeEnabled ? 'block' : 'none';
    }
  }

  if (useNightThemeToggle) {
    useNightThemeToggle.addEventListener('change', toggleNightPresetAndPreview);
    toggleNightPresetAndPreview();
  }
}

export function toggleCustomColors(isNight: boolean): void {
  console.log('🚀 toggleCustomColors function called with isNight:', isNight);
  try {
    console.log('🎯 toggleCustomColors START for', isNight ? 'night' : 'day');
    const presetId = isNight ? 'night-preset' : 'day-preset';
    const customId = isNight ? '#night-custom-colors' : '#day-custom-colors';
    const preset = document.getElementById(presetId) as HTMLSelectElement;
    const custom = document.querySelector(customId) as HTMLElement;
    console.log('preset element:', preset);
    console.log('preset value:', preset?.value);
    console.log('custom element:', custom);
    if (preset && custom) {
      console.log('Before:', custom.className, 'has hidden:', custom.classList.contains('hidden'));
      if (preset.value === 'custom') {
        custom.classList.remove('hidden');
        console.log('✅ Removed hidden class (showing custom colors)');
      } else {
        custom.classList.add('hidden');
        console.log('❌ Added hidden class (hiding custom colors)');
      }
      console.log('After:', custom.className, 'has hidden:', custom.classList.contains('hidden'));
      console.log('Computed display:', getComputedStyle(custom).display);
    } else {
      console.error('❌ Elements not found:', { preset: !!preset, custom: !!custom });
    }
    console.log('🎯 toggleCustomColors END');
  } catch (error) {
    console.error('💥 Error in toggleCustomColors:', error);
  }
}

export function initColorSystem(): void {
  generateColorPickers();
  initializeColorPickers();
  initializePreviews();
}
