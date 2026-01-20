import { Theme } from './types';
import { colorPickers } from './color-picker';
import { updateColorDisplay, updateSVGColors, toggleCustomColors } from './ui-manager';

let themes: { [key: string]: Theme } = {};

export async function loadThemes(): Promise<void> {
  try {
    const response = await fetch('themes.json');
    const data = await response.json();
    themes = data.sharedThemes;
  } catch (error) {
    console.error('Error loading themes:', error);
  }
}

export function createMiniPreview(theme: Theme, isNight: boolean): HTMLElement {
  const templateId = isNight ? 'svg-night-preview' : 'svg-preview';
  const template = document.getElementById(templateId)!.cloneNode(true) as HTMLElement;

  // Update fills
  Object.keys(theme).forEach((key) => {
    const baseKey = key.replace('SETTING_', '');
    const colorKey = isNight ? `SETTING_NIGHT_${baseKey}` : `SETTING_${baseKey}`;
    const element = template.querySelector(`#${colorKey}`);
    if (element) {
      element.setAttribute('fill', '#' + theme[key]);
    }
  });

  return template;
}

export function generatePresetSelectors(): void {
  const dayContainer = document.getElementById('day-preset-selector')!;
  const nightContainer = document.getElementById('night-preset-selector')!;
  const daySelect = document.getElementById('day-preset') as HTMLSelectElement;
  const nightSelect = document.getElementById('night-preset') as HTMLSelectElement;

  // Generate for day
  generateForContainer(dayContainer, false, daySelect);

  // Generate for night
  generateForContainer(nightContainer, true, nightSelect);
}

function generateForContainer(
  container: HTMLElement,
  isNight: boolean,
  select: HTMLSelectElement
): void {
  container.innerHTML = '';
  const themeKeys = Object.keys(themes);
  // Note: isBWPlatform filtering to be added
  const allKeys = ['custom', ...themeKeys];
  allKeys.forEach((key) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'preset-option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = isNight ? 'night-preset-radio' : 'day-preset-radio';
    radio.value = key;
    radio.id = (isNight ? 'night-radio-' : 'day-radio-') + key;

    const label = document.createElement('label');
    label.htmlFor = radio.id;

    const span = document.createElement('span');
    span.textContent = key; // themeDisplayNames[key] || key;

    let preview: HTMLElement;
    if (key === 'custom') {
      preview = document.createElement('div');
      preview.textContent = '🎨';
      preview.className = 'preset-custom-preview';
    } else {
      preview = createMiniPreview(themes[key], isNight);
    }

    const previewContainer = document.createElement('div');
    previewContainer.className = 'svg-preview-container';
    previewContainer.appendChild(preview);

    label.appendChild(previewContainer);
    label.appendChild(span);

    optionDiv.appendChild(radio);
    optionDiv.appendChild(label);

    if (key === select.value) {
      radio.checked = true;
    }

    container.appendChild(optionDiv);
  });

  // Add change listener
  container.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    console.log('Change event fired on container:', container.id, 'target:', target, 'target.type:', target.type);
    if (target.type === 'radio') {
      console.log('Radio changed:', target.value, 'isNight:', isNight);
      console.log('Setting select.value to:', target.value);
      select.value = target.value;
      console.log('select.value is now:', select.value);
      try {
        applyPreset(target.value, isNight);
        console.log('applyPreset completed successfully');
      } catch (error) {
        console.error('Error in applyPreset:', error);
      }
      console.log('About to call toggleCustomColors for', isNight);
      try {
        toggleCustomColors(isNight);
        console.log('toggleCustomColors called successfully');
      } catch (error) {
        console.error('Error calling toggleCustomColors:', error);
      }
    } else {
      console.log('Change event fired but target is not radio:', target);
    }
  });
}

export function applyPreset(presetName: string, isNight = false): void {
  console.log('Applying preset', presetName, 'to', isNight ? 'night' : 'day');
  if (presetName === 'custom') return; // Do nothing for custom

  const theme = themes[presetName];
  if (!theme) {
    console.log('Theme not found');
    return;
  }

  Object.keys(theme).forEach((key) => {
    try {
      const inputKey = isNight ? key.replace('SETTING_', 'SETTING_NIGHT_') : key;
      console.log('Processing key:', key, '-> inputKey:', inputKey, 'value:', theme[key]);
      if (colorPickers.has(inputKey)) {
        colorPickers.get(inputKey)!.setValue('#' + theme[key].toUpperCase());
      } else {
        // Fallback
        const input = document.getElementById(inputKey) as HTMLInputElement;
        console.log('Input found:', !!input);
        if (input) {
          input.value = '#' + theme[key].toUpperCase();
          console.log('Set input value to:', input.value);
          updateColorDisplay(inputKey);
          updateSVGColors(inputKey, theme[key], isNight);
        }
      }
    } catch (error) {
      console.error('Error processing key', key, ':', error);
    }
  });
}



function toggleCustomColors(_isNight: boolean): void {
  // Implementation to be added
}
