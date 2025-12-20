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
      // Dispatch input event to update color picker visual
      input.dispatchEvent(new Event('input', { bubbles: true }));
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
  document.addEventListener('input', (e) => {
    if (e.target.type === 'color') {
      const isNight = e.target.id.startsWith('SETTING_NIGHT_');
      updateSVGColors(e.target.id, e.target.value, isNight);
    }
  });
}

function initializePreviews() {
  // Update SVG from current input values
  document.querySelectorAll('input[type="color"]').forEach(input => {
    const isNight = input.id.startsWith('SETTING_NIGHT_');
    updateSVGColors(input.id, input.value, isNight);
  });
}

function exportTheme() {
  const themeData = {};
  document.querySelectorAll('input[id^="SETTING_"][type="color"]').forEach(input => {
    if (!input.id.includes('NIGHT_')) {
      themeData[input.id] = input.value;
    }
  });
  const jsonData = JSON.stringify(themeData, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "watchface-theme.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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

  const returnTo = getQueryParam('return_to', 'pebblejs://close#');
  document.location = returnTo + encodeURIComponent(JSON.stringify(settings));
}

function loadExistingSettings() {
  const settings = getQueryParam('settings', '');
  if (settings) {
    try {
      const configData = JSON.parse(decodeURIComponent(settings));
      Object.keys(configData).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
          if (element.type === 'checkbox') {
            element.checked = configData[key] === 1;
          } else if (element.type === 'color') {
            const hexColor = '#' + (configData[key] || 0).toString(16).padStart(6, '0');
            element.value = hexColor;
          } else {
            element.value = configData[key];
          }
        }
      });
    } catch (e) {
      console.error('Error loading existing settings:', e);
    }
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
  const exportButton = document.getElementById('export-theme');
  if (exportButton) {
    exportButton.addEventListener('click', exportTheme);
  }

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
});
