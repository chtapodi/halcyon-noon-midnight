import { setIsBWPlatform } from './color-data';
import { loadThemes, generatePresetSelectors, applyPreset } from './preset-manager';
import { saveSettings, loadExistingSettings, getQueryParam } from './settings-manager';
import { initColorSystem, initializeNightThemeToggle, toggleCustomColors } from './ui-manager';

// Initialize everything when DOM is loaded
async function init() {
  await loadThemes();
  initColorSystem();
  loadExistingSettings();
  generatePresetSelectors();

  // Apply presets after loading settings
  applyPreset((document.getElementById('day-preset') as HTMLSelectElement).value, false);
  applyPreset((document.getElementById('night-preset') as HTMLSelectElement).value, true);

  // Initialize custom colors visibility (after preset selectors are created)
  toggleCustomColors(false);
  toggleCustomColors(true);

  // Other listeners
  const configForm = document.getElementById('config-form') as HTMLFormElement;
  if (configForm) {
    configForm.addEventListener('submit', function (e) {
      e.preventDefault();
      saveSettings();
    });
  }

  // Set platform detection
  const platform = getQueryParam('platform', '') || '';
  setIsBWPlatform(['aplite', 'diorite', 'flint'].includes(platform));

  initializeNightThemeToggle();
}

document.addEventListener('DOMContentLoaded', init);

// Export for bundler
export { init };
