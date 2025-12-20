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
    const input = document.getElementById(inputKey);
    console.log('Input found:', !!input);
    if (input) {
      input.value = '#' + theme[key];
      console.log('Set input value to:', input.value);
      updateColorDisplay(inputKey);
      updateSVGColors(inputKey, theme[key], isNight);
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
  const input = document.getElementById(inputId);
  if (!input) return;
  const picker = document.querySelector(`.color-picker[data-for="${inputId}"]`);
  if (!picker) return;
  const swatch = picker.querySelector('.color-swatch');
  const hexSpan = picker.querySelector('.color-hex');
  const color = input.value;
  swatch.style.backgroundColor = color;
  hexSpan.textContent = color;
}

function openColorModal(inputId) {
  const modal = document.getElementById('color-modal');
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
    } else {
      swatch.disabled = true;
    }
    grid.appendChild(swatch);
  });
  modal.style.display = 'block';
  modal.dataset.forInput = inputId;
}

function closeColorModal() {
  document.getElementById('color-modal').style.display = 'none';
}

function selectColor(inputId, hex) {
  const input = document.getElementById(inputId);
  input.value = hex;
  updateColorDisplay(inputId);
  const isNight = inputId.startsWith('SETTING_NIGHT_');
  updateSVGColors(inputId, hex, isNight);
  // Set preset to custom when color is manually changed
  const presetId = isNight ? 'night-preset' : 'day-preset';
  document.getElementById(presetId).value = 'custom';
  closeColorModal();
}

function initializeColorPickers() {
  document.querySelectorAll('.color-picker').forEach(picker => {
    const inputId = picker.dataset.for;
    updateColorDisplay(inputId); // Initial display
    picker.addEventListener('click', () => openColorModal(inputId));
  });

  // Modal close events
  document.querySelector('.modal-close').addEventListener('click', closeColorModal);
  document.getElementById('color-modal').addEventListener('click', (e) => {
    if (e.target.id === 'color-modal') closeColorModal();
  });
}

function initializePreviews() {
  // Update SVG from current input values
  document.querySelectorAll('input[type="hidden"][id*="COLOR"]').forEach(input => {
    const isNight = input.id.startsWith('SETTING_NIGHT_');
    updateSVGColors(input.id, input.value, isNight);
    updateColorDisplay(input.id);
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
          const hexColor = '#' + (configData[key] || 0).toString(16).padStart(6, '0');
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async function () {
  await loadThemes();
  loadExistingSettings();

  // Preset listeners
  const dayPresetSelector = document.getElementById('day-preset');
  if (dayPresetSelector) {
    dayPresetSelector.addEventListener('change', () => applyPreset(dayPresetSelector.value, false));
  }

  const nightPresetSelector = document.getElementById('night-preset');
  if (nightPresetSelector) {
    nightPresetSelector.addEventListener('change', () => applyPreset(nightPresetSelector.value, true));
  }

   // Other listeners
   const configForm = document.getElementById('config-form');
  if (configForm) {
    configForm.addEventListener('submit', function (e) {
      e.preventDefault();
      saveSettings();
    });
  }

  attachColorListeners();
  initializePreviews();
  initializeNightThemeToggle();
  initializeColorPickers();
});
