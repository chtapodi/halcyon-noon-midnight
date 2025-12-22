// Color settings configuration
const colorSettings = [
  { baseId: 'TIME_COLOR', label: 'Time Color', default: '#000000' },
  { baseId: 'SUBTEXT_PRIMARY_COLOR', label: 'Date Color', default: '#000000' },
  { baseId: 'SUBTEXT_SECONDARY_COLOR', label: 'Widget Text Color', default: '#555555' },
  { baseId: 'BG_COLOR', label: 'Background Color', default: '#FFFFFF' },
  { baseId: 'PIP_COLOR_PRIMARY', label: 'Pip Color (Primary)', default: '#000000' },
  { baseId: 'PIP_COLOR_SECONDARY', label: 'Pip Color (Secondary)', default: '#AAAAAA' },
  { baseId: 'RING_STROKE_COLOR', label: 'Ring Outline Color', default: '#000000' },
  { baseId: 'RING_NIGHT_COLOR', label: 'Ring Color: Night', default: '#0055AA' },
  { baseId: 'RING_DAY_COLOR', label: 'Ring Color: Day', default: '#00AAFF' },
  { baseId: 'RING_SUNRISE_COLOR', label: 'Ring Color: Sunrise', default: '#FFAAAA' },
  { baseId: 'RING_SUNSET_COLOR', label: 'Ring Color: Sunset', default: '#FFAA00' },
  { baseId: 'SUN_STROKE_COLOR', label: 'Sun Outline Color', default: '#000000' },
  { baseId: 'SUN_FILL_COLOR', label: 'Sun Color', default: '#FFFF00' }
];

// Pebble Color Palette (64 colors)
const pebbleColors = {
  "#AAFFAA": { name: "Mint Green", identifier: "MintGreen" },
  "#FFAAAA": { name: "Melon", identifier: "Melon" },
  "#FF55FF": { name: "Shocking Pink (Crayola)", identifier: "ShockingPink" },
  "#FF0055": { name: "Folly", identifier: "Folly" },
  "#FF5555": { name: "Sunset Orange", identifier: "SunsetOrange" },
  "#555500": { name: "Army Green", identifier: "ArmyGreen" },
  "#0000AA": { name: "Duke Blue", identifier: "DukeBlue" },
  "#00AAAA": { name: "Tiffany Blue", identifier: "TiffanyBlue" },
  "#55FF55": { name: "Screamin' Green", identifier: "ScreaminGreen" },
  "#FFFFAA": { name: "Pastel Yellow", identifier: "PastelYellow" },
  "#FFAAFF": { name: "Rich Brilliant Lavender", identifier: "RichBrilliantLavender" },
  "#55FF00": { name: "Bright Green", identifier: "BrightGreen" },
  "#FF55AA": { name: "Brilliant Rose", identifier: "BrilliantRose" },
  "#55AAAA": { name: "Cadet Blue", identifier: "CadetBlue" },
  "#AA5555": { name: "Rose Vale", identifier: "RoseVale" },
  "#FF00AA": { name: "Fashion Magenta", identifier: "FashionMagenta" },
  "#00AA55": { name: "Jaeger Green", identifier: "JaegerGreen" },
  "#AAAAFF": { name: "Baby Blue Eyes", identifier: "BabyBlueEyes" },
  "#AA55AA": { name: "Purpureus", identifier: "Purpureus" },
  "#FFAA00": { name: "Chrome Yellow", identifier: "ChromeYellow" },
  "#005500": { name: "Dark Green (X11)", identifier: "DarkGreen" },
  "#FF0000": { name: "Red", identifier: "Red" },
  "#5555AA": { name: "Liberty", identifier: "Liberty" },
  "#AAAAAA": { name: "Light Gray", identifier: "LightGray" },
  "#AA00FF": { name: "Vivid Violet", identifier: "VividViolet" },
  "#FFAA55": { name: "Rajah", identifier: "Rajah" },
  "#5500AA": { name: "Indigo (Web)", identifier: "Indigo" },
  "#55AA55": { name: "May Green", identifier: "MayGreen" },
  "#FFFF55": { name: "Icterine", identifier: "Icterine" },
  "#550000": { name: "Bulgarian Rose", identifier: "BulgarianRose" },
  "#FF5500": { name: "Orange", identifier: "Orange" },
  "#00FF00": { name: "Green", identifier: "Green" },
  "#AA5500": { name: "Windsor Tan", identifier: "WindsorTan" },
  "#AA55FF": { name: "Lavender Indigo", identifier: "LavenderIndigo" },
  "#555555": { name: "Dark Gray", identifier: "DarkGray" },
  "#55FFFF": { name: "Electric Blue", identifier: "ElectricBlue" },
  "#0055FF": { name: "Blue Moon", identifier: "BlueMoon" },
  "#00FFFF": { name: "Cyan", identifier: "Cyan" },
  "#000000": { name: "Black", identifier: "Black" },
  "#55FFAA": { name: "Medium Aquamarine", identifier: "MediumAquamarine" },
  "#AA0000": { name: "Dark Candy Apple Red", identifier: "DarkCandyAppleRed" },
  "#AAAA00": { name: "Limerick", identifier: "Limerick" },
  "#0055AA": { name: "Cobalt Blue", identifier: "CobaltBlue" },
  "#AAFFFF": { name: "Celeste", identifier: "Celeste" },
  "#5500FF": { name: "Electric Ultramarine", identifier: "ElectricUltramarine" },
  "#55AAFF": { name: "Picton Blue", identifier: "PictonBlue" },
  "#AAFF55": { name: "Inchworm", identifier: "Inchworm" },
  "#0000FF": { name: "Blue", identifier: "Blue" },
  "#00AAFF": { name: "Vivid Cerulean", identifier: "VividCerulean" },
  "#AA00AA": { name: "Purple", identifier: "Purple" },
  "#55AA00": { name: "Kelly Green", identifier: "KellyGreen" },
  "#00FF55": { name: "Malachite", identifier: "Malachite" },
  "#005555": { name: "Midnight Green (Eagle Green)", identifier: "MidnightGreen" },
  "#FFFF00": { name: "Yellow", identifier: "Yellow" },
  "#FF00FF": { name: "Magenta", identifier: "Magenta" },
  "#AAFF00": { name: "Spring Bud", identifier: "SpringBud" },
  "#AA0055": { name: "Jazzberry Jam", identifier: "JazzberryJam" },
  "#5555FF": { name: "Very Light Blue", identifier: "VeryLightBlue" },
  "#FFFFFF": { name: "White", identifier: "White" },
  "#00AA00": { name: "Islamic Green", identifier: "IslamicGreen" },
  "#000055": { name: "Oxford Blue", identifier: "OxfordBlue" },
  "#550055": { name: "Imperial Purple", identifier: "ImperialPurple" },
  "#AAAA55": { name: "Brass", identifier: "Brass" },
  "#00FFAA": { name: "Medium Spring Green", identifier: "MediumSpringGreen" }
};

// Custom color order with blanks
const colorOrder = [
  "#000000",
  "#555555",
  "#AAAAAA",
  "#FFFFFF",
  null,
  null,
  null,
  null,
  null,
  "#FF0055",
  null,
  null,
  "#AA5555",
  "#550000",
  "#AA0000",
  "#FF0000",
  "#FF5555",
  "#FFAAAA",
  null,
  null,
  null,
  "#FF5500",
  null,
  null,
  null,
  null,
  "#AA5500",
  "#FFAA00",
  "#FFAA55",
  null,
  "#AAAA55",
  "#555500",
  "#AAAA00",
  "#FFFF00",
  "#FFFF55",
  "#FFFFAA",
  null,
  null,
  "#55AA00",
  "#AAFF00",
  "#AAFF55",
  null,
  null,
  null,
  null,
  "#55FF00",
  null,
  null,
  "#55AA55",
  "#005500",
  "#00AA00",
  "#00FF00",
  "#55FF55",
  "#AAFFAA",
  null,
  null,
  null,
  "#00FF55",
  null,
  null,
  null,
  null,
  "#00AA55",
  "#00FFAA",
  "#55FFAA",
  null,
  "#55AAAA",
  "#005555",
  "#00AAAA",
  "#00FFFF",
  "#55FFFF",
  "#AAFFFF",
  null,
  null,
  "#0055AA",
  "#00AAFF",
  "#55AAFF",
  null,
  null,
  null,
  null,
  "#0055FF",
  null,
  null,
  "#5555AA",
  "#000055",
  "#0000AA",
  "#0000FF",
  "#5555FF",
  "#AAAAFF",
  null,
  null,
  null,
  "#5500FF",
  null,
  null,
  null,
  null,
  "#5500AA",
  "#AA00FF",
  "#AA55FF",
  null,
  "#AA55AA",
  "#550055",
  "#AA00AA",
  "#FF00FF",
  "#FF55FF",
  "#FFAAFF",
  null,
  null,
  "#AA0055",
  "#FF00AA",
  "#FF55AA",
  null
];

// ColorPicker class for managing individual color pickers
class ColorPicker {
  constructor(inputId) {
    this.inputId = inputId;
    this.input = document.getElementById(inputId);
    this.picker = document.querySelector(`.color-picker[data-for="${inputId}"]`);
    this.swatch = this.picker.querySelector('.color-swatch');
    this.hexSpan = this.picker.querySelector('.color-hex');
    this.nameSpan = this.picker.querySelector('.color-name');
    this.isNight = inputId.startsWith('SETTING_NIGHT_');

    // Attach click listener
    this.picker.addEventListener('click', () => openColorModal(inputId));
  }

  updateDisplay() {
    const color = this.input.value;
    this.swatch.style.backgroundColor = color;
    this.hexSpan.textContent = color.toUpperCase();
    this.nameSpan.textContent = pebbleColors[color] ? pebbleColors[color].name : '';
  }

  setValue(hex) {
    this.input.value = hex.toUpperCase();
    this.updateDisplay();
    updateSVGColors(this.inputId, hex, this.isNight);
  }
}

// Function to create HTML for a color picker
function createColorPickerHTML(settingId, labelText, defaultValue) {
  return `
    <div class="form-group">
      <label for="${settingId}">${labelText}</label>
      <input type="hidden" id="${settingId}" name="${settingId}" value="${defaultValue}">
      <div class="color-picker" data-for="${settingId}">
        <span class="color-name"></span>
        <button type="button" class="color-swatch"></button>
        <span class="color-hex">${defaultValue.toUpperCase()}</span>
      </div>
    </div>
  `;
}

// Global map for color picker instances
const colorPickers = new Map();

// Function to generate color pickers for day and night
function generateColorPickers() {
  const dayGrid = document.querySelector('#day-custom-colors .color-grid');
  const nightGrid = document.querySelector('#night-custom-colors .color-grid');

  // Clear existing
  dayGrid.innerHTML = '';
  nightGrid.innerHTML = '';

  // Generate day pickers
  colorSettings.forEach(setting => {
    const settingId = `SETTING_${setting.baseId}`;
    const html = createColorPickerHTML(settingId, setting.label, setting.default);
    dayGrid.insertAdjacentHTML('beforeend', html);
    colorPickers.set(settingId, new ColorPicker(settingId));
  });

  // Generate night pickers
  colorSettings.forEach(setting => {
    const settingId = `SETTING_NIGHT_${setting.baseId}`;
    const labelText = `Night ${setting.label}`;
    const html = createColorPickerHTML(settingId, labelText, setting.default);
    nightGrid.insertAdjacentHTML('beforeend', html);
    colorPickers.set(settingId, new ColorPicker(settingId));
  });
}

// Theme display names
const themeDisplayNames = {
  default: 'Solar',
  orangeDreams: 'Orange Dreams',
  terminalGreen: 'Terminal Green',
  lightOceanTheme: 'Light Ocean',
  roseTheme: 'Rose',
  fireworkTheme: 'Firework',
  oceanTheme: 'Ocean',
  mauveTheme: 'Mauve',
  sandTheme: 'Sand',
  greyTheme: 'Grey',
  userTeal1: 'Teal',
  custom: 'Custom'
};

// Minimal preset selector system

let themes = {};

async function loadThemes() {
  try {
    const response = await fetch('themes.json');
    const data = await response.json();
    themes = data.sharedThemes;
  } catch (error) {
    console.error('Error loading themes:', error);
  }
}

function createMiniPreview(theme, isNight) {
  const templateId = isNight ? 'svg-night-preview' : 'svg-preview';
  const template = document.getElementById(templateId).cloneNode(true);
  template.setAttribute('width', '50');
  template.setAttribute('height', '58');
  template.style.width = '50px';
  template.style.height = '58px';

  // Update fills
  Object.keys(theme).forEach(key => {
    const baseKey = key.replace('SETTING_', '');
    const colorKey = isNight ? `PREVIEW_SETTING_NIGHT_${baseKey}` : `PREVIEW_SETTING_${baseKey}`;
    const element = template.querySelector(`#${colorKey}`);
    if (element) {
      element.setAttribute('fill', '#' + theme[key]);
    }
  });

  return template;
}

function generatePresetSelectors() {
  const dayContainer = document.getElementById('day-preset-selector');
  const nightContainer = document.getElementById('night-preset-selector');
  const daySelect = document.getElementById('day-preset');
  const nightSelect = document.getElementById('night-preset');

  // Generate for day
  generateForContainer(dayContainer, false, daySelect);

  // Generate for night
  generateForContainer(nightContainer, true, nightSelect);
}

function generateForContainer(container, isNight, select) {
  container.innerHTML = '';
  const allKeys = ['custom', ...Object.keys(themes)];
  allKeys.forEach(key => {
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
    span.textContent = themeDisplayNames[key] || key;

    let preview;
    if (key === 'custom') {
      preview = document.createElement('div');
      preview.textContent = '🎨';
      preview.className = 'preset-custom-preview';
    } else {
      preview = createMiniPreview(themes[key], isNight);
    }

    const previewContainer = document.createElement(('div'));
    previewContainer.className = "svg-preview-container";
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
    if (e.target.type === 'radio') {
      select.value = e.target.value;
      applyPreset(e.target.value, isNight);
      toggleCustomColors(isNight);
    }
  });
}

function applyPreset(presetName, isNight = false) {
  console.log('Applying preset', presetName, 'to', isNight ? 'night' : 'day');
  if (presetName === 'custom') return; // Do nothing for custom

  const theme = themes[presetName];
  if (!theme) {
    console.log('Theme not found');
    return;
  }

  Object.keys(theme).forEach(key => {
    const inputKey = isNight ? key.replace('SETTING_', 'SETTING_NIGHT_') : key;
    console.log('Processing key:', key, '-> inputKey:', inputKey, 'value:', theme[key]);
    if (colorPickers.has(inputKey)) {
      colorPickers.get(inputKey).setValue('#' + theme[key].toUpperCase());
    } else {
      // Fallback
      const input = document.getElementById(inputKey);
      console.log('Input found:', !!input);
      if (input) {
        input.value = '#' + theme[key].toUpperCase();
        console.log('Set input value to:', input.value);
        updateColorDisplay(inputKey);
        updateSVGColors(inputKey, theme[key], isNight);
      }
    }
  });
}

function updateSVGColors(colorKey, colorValue, isNight) {
  const svgId = isNight ? 'svg-night-preview' : 'svg-preview';
  const previewId = `PREVIEW_${colorKey}`;
  const element = document.querySelector(`#${svgId} #${previewId}`);
  if (element) {
    const hexColor = colorValue.startsWith('#') ? colorValue : '#' + colorValue;
    element.setAttribute('fill', hexColor);
  }
}

function attachColorListeners() {
  // Color inputs are now hidden, but we handle changes via selectColor
}

// Color Picker Functions

function updateColorDisplay(inputId) {
  if (colorPickers.has(inputId)) {
    colorPickers.get(inputId).updateDisplay();
  } else {
    // Fallback for old code
    const input = document.getElementById(inputId);
    if (!input) return;
    const picker = document.querySelector(`.color-picker[data-for="${inputId}"]`);
    if (!picker) return;
    const swatch = picker.querySelector('.color-swatch');
    const hexSpan = picker.querySelector('.color-hex');
    const nameSpan = picker.querySelector('.color-name');
    const color = input.value;
    swatch.style.backgroundColor = color;
    hexSpan.textContent = color.toUpperCase();
    nameSpan.textContent = pebbleColors[color] ? pebbleColors[color].name : '';
  }
}

function openColorModal(inputId) {
  const currentHex = document.getElementById(inputId).value.toUpperCase();
  const label = document.querySelector(`label[for="${inputId}"]`);
  const modal = document.getElementById('color-modal');
  if (label) {
    modal.querySelector('.modal-header h3').textContent = label.textContent;
  }
  const grid = document.getElementById('color-grid-modal');
  grid.innerHTML = ''; // Clear previous
  colorOrder.forEach(item => {
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

function closeColorModal() {
  document.getElementById('color-modal').style.display = 'none';
  document.body.classList.remove('modal-open');
}

function selectColor(inputId, hex) {
  hex = hex.toUpperCase();
  if (colorPickers.has(inputId)) {
    colorPickers.get(inputId).setValue(hex);
  } else {
    // Fallback
    const input = document.getElementById(inputId);
    input.value = hex;
    updateColorDisplay(inputId);
    const isNight = inputId.startsWith('SETTING_NIGHT_');
    updateSVGColors(inputId, hex, isNight);
  }
  // Set preset to custom when color is manually changed
  const isNight = inputId.startsWith('SETTING_NIGHT_');
  const presetId = isNight ? 'night-preset' : 'day-preset';
  document.getElementById(presetId).value = 'custom';
  document.getElementById((isNight ? 'night-radio-' : 'day-radio-') + 'custom').checked = true;
  toggleCustomColors(isNight);
  closeColorModal();
}

function initializeColorPickers() {
  // Modal close events
  document.querySelector('.modal-close').addEventListener('click', closeColorModal);
  document.getElementById('color-modal').addEventListener('click', (e) => {
    if (e.target.id === 'color-modal') closeColorModal();
  });
}

function initializePreviews() {
  // Update SVG from current input values and displays
  colorPickers.forEach(picker => {
    const isNight = picker.inputId.startsWith('SETTING_NIGHT_');
    updateSVGColors(picker.inputId, picker.input.value, isNight);
    picker.updateDisplay();
  });
}



function saveSettings() {
  const form = document.getElementById('config-form');
  const formData = new FormData(form);
  const settings = {};
  for (let [key, value] of formData.entries()) {
    if (key.includes('COLOR')) {
      settings[key] = value.replace('#', '');
    } else if (key.includes('SETTING_')) {
      const element = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
      if (element) {
        if (element.type === 'checkbox') {
          settings[key] = element.checked ? 1 : 0;
        } else {
          settings[key] = value;
        }
      }
    }
  }

  // Handle unchecked checkboxes that aren't included in FormData
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const name = checkbox.name;
    if (!settings.hasOwnProperty(name)) {
      settings[name] = checkbox.checked ? 1 : 0;
    }
  });

  // Try to save to localStorage if available (for localhost mode)
  try {
    localStorage.setItem('halcyonSettings', JSON.stringify(settings));
  } catch (e) {
    // localStorage not available (e.g., data URI)
  }

  const returnTo = getQueryParam('return_to', 'pebblejs://close#');
  document.location = returnTo + encodeURIComponent(JSON.stringify(settings));
}

function loadExistingSettings() {
  let configData = null;

  // First try URL params
  const settings = getQueryParam('settings', '');
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
      // localStorage not available
    }
  }

  if (configData) {
    Object.keys(configData).forEach(key => {
      let element = document.getElementById(key);
      // Special handling for preset selects since their ids don't match the keys
      if (key === 'SETTING_PRESET') {
        element = document.getElementById('day-preset');
      } else if (key === 'SETTING_NIGHT_PRESET') {
        element = document.getElementById('night-preset');
      }
      if (element) {
        if (element.type === 'checkbox') {
          element.checked = configData[key] === 1;
        } else if (element.type === 'hidden' && element.id.includes('COLOR')) {
          const hexColor = '#' + (configData[key] || 0).toString(16).padStart(6, '0').toUpperCase();
          element.value = hexColor;
          updateColorDisplay(key);
        } else {
          element.value = configData[key];
        }
      }
    });
  }
}

// Utility functions
function getQueryParam(variable, defaultValue) {
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

function initializeNightThemeToggle() {
  const useNightThemeToggle = document.getElementById('SETTING_USE_NIGHT_THEME');
  const nightPreviewContainer = document.getElementById('night-preview-container');
  const nightPresetSelector = document.getElementById('night-preset');

  function toggleNightPresetAndPreview() {
    const isNightThemeEnabled = useNightThemeToggle.checked;
    if (nightPresetSelector) {
      const nightPresetSection = nightPresetSelector.closest('.form-group');
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

function toggleCustomColors(isNight) {
  const presetId = isNight ? 'night-preset' : 'day-preset';
  const customId = isNight ? '#night-custom-colors' : '#day-custom-colors';
  const preset = document.getElementById(presetId);
  const custom = document.querySelector(customId);
  if (preset && custom) {
    custom.style.display = preset.value === 'custom' ? 'block' : 'none';
  }
}

function initColorSystem() {
  generateColorPickers();
  initializeColorPickers();
  initializePreviews();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async function () {
  await loadThemes();
  initColorSystem();
  loadExistingSettings();
  generatePresetSelectors();
  // Apply presets after loading settings
  applyPreset(document.getElementById('day-preset').value, false);
  applyPreset(document.getElementById('night-preset').value, true);

  // Initialize custom colors visibility
  toggleCustomColors(false);
  toggleCustomColors(true);

  // Other listeners
  const configForm = document.getElementById('config-form');
  if (configForm) {
    configForm.addEventListener('submit', function (e) {
      e.preventDefault();
      saveSettings();
    });
  }

  initializeNightThemeToggle();
});
