import { Settings } from './types';
import { updateColorDisplay } from './ui-manager';

export function saveSettings(): void {
  const form = document.getElementById('config-form') as HTMLFormElement;
  const formData = new FormData(form);
  const settings: Settings = {};
  for (const [key, value] of formData.entries()) {
    const stringValue = value as string;
    if (key.includes('COLOR')) {
      settings[key] = stringValue.replace('#', '');
    } else if (key.includes('SETTING_')) {
      const element =
        (document.getElementById(key) as HTMLInputElement) ||
        (document.querySelector(`[name="${key}"]`) as HTMLInputElement);
      if (element) {
        if (element.type === 'checkbox') {
          settings[key] = element.checked ? 1 : 0;
        } else {
          settings[key] = stringValue;
        }
      }
    }
  }

  // Handle unchecked checkboxes that aren't included in FormData
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const name = (checkbox as HTMLInputElement).name;
    if (!(name in settings)) {
      settings[name] = (checkbox as HTMLInputElement).checked ? 1 : 0;
    }
  });

  // Try to save to localStorage if available (for localhost mode)
  try {
    localStorage.setItem('halcyonSettings', JSON.stringify(settings));
  } catch (e) {
    // localStorage not available (e.g., data URI)
  }

  const returnTo = getQueryParam('return_to', 'pebblejs://close#');
  document.location.href = returnTo + encodeURIComponent(JSON.stringify(settings));
}

export function loadExistingSettings(): void {
  let configData: Settings | null = null;

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

  // const platform = getQueryParam('platform', '');
  // isBWPlatform = ['aplite', 'diorite', 'flint'].includes(platform);

  // Set default theme based on platform if no saved settings
  if (!configData) {
    // if (isBWPlatform) {
    // document.getElementById('day-preset').value = 'bwTheme1';
    // document.getElementById('night-preset').value = 'bwTheme2';
    // }
  }

  if (configData) {
    Object.keys(configData).forEach((key) => {
      let element = document.getElementById(key) as HTMLElement;
      // Special handling for preset selects since their ids don't match the keys
      if (key === 'SETTING_PRESET') {
        element = document.getElementById('day-preset') as HTMLElement;
      } else if (key === 'SETTING_NIGHT_PRESET') {
        element = document.getElementById('night-preset') as HTMLElement;
      }
      if (element) {
        if ((element as HTMLInputElement).type === 'checkbox') {
          (element as HTMLInputElement).checked = configData![key] === 1;
        } else if (
          (element as HTMLInputElement).type === 'hidden' &&
          element.id.includes('COLOR')
        ) {
          const hexColor =
            '#' + ((configData![key] as number) || 0).toString(16).padStart(6, '0').toUpperCase();
          (element as HTMLInputElement).value = hexColor;
          updateColorDisplay(key);
        } else {
          (element as HTMLInputElement).value = configData![key] as string;
        }
      }
    });
  }
}

// Utility functions
export function getQueryParam(variable: string, defaultValue?: string): string | false {
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


