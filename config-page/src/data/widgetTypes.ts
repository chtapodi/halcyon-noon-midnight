// Widget type definitions — shared between the config page Select dropdowns
// and the WatchPreview component. Previews are computed at render time so they
// reflect the user's selected language.

import { renderPreview } from './i18nPreview';

export interface WidgetOption {
  value: string;
  label: string;
  preview: string;
  category?: string;
}

interface WidgetOptionTemplate {
  value: string;
  label: string;
  category?: string;
}

const WIDGET_TEMPLATES: WidgetOptionTemplate[] = [
  { value: '', label: 'None' },
  // Date/time
  { value: '{local_date}', label: 'Date', category: 'Date & Time' },
  { value: '{year}-{month_num}-{day0}', label: 'Numeric Date', category: 'Date & Time' },
  { value: '{t:DAY} {day_of_year}', label: 'Day Number', category: 'Date & Time' },
  { value: '{t:WEEK} {week_of_year}', label: 'Week Number', category: 'Date & Time' },
  { value: '{year}', label: 'Year', category: 'Date & Time' },
  // Solar
  { value: '{next_solar}', label: 'Next Sunrise/Sunset', category: 'Solar' },
  // Health
  { value: '{steps} {t:STEPS}', label: 'Steps', category: 'Health' },
  { value: '{dist} {dist_unit}', label: 'Distance Walked', category: 'Health' },
  // Device
  { value: '{t:BATTERY} {batt}%', label: 'Battery %', category: 'Device' },
  // Weather
  { value: '{temp}° ({tlo}°/{thi}°)', label: 'Temperature (Current & Forecast)', category: 'Weather' },
  { value: '{cond}', label: 'Current Condition', category: 'Weather' },
  { value: '{hum}% {t:HUMIDITY}', label: 'Humidity', category: 'Weather' },
  { value: '{wind} {wind_unit} {wind_dir}', label: 'Wind', category: 'Weather' },
  { value: '{t:UV} {uv}', label: 'UV Index', category: 'Weather' },
  { value: '{dew}° {t:DPT}', label: 'Dew Point', category: 'Weather' },
  { value: '{t:RAIN} {pop}%', label: 'Today\'s Chance of Rain', category: 'Weather' },
  // Custom
  { value: '__custom__', label: 'Custom…', category: 'Custom' },
];

const HEALTH_LABELS = new Set(['Steps', 'Distance Walked']);

export const getWidgetOptions = (lang: number, hasHealth: boolean, isImperial: boolean = false): WidgetOption[] => {
  return WIDGET_TEMPLATES
    .filter((t) => hasHealth || !HEALTH_LABELS.has(t.label))
    .map((t) => {
      const preview = t.value && t.value !== '__custom__' ? renderPreview(t.value, lang, isImperial) : '';
      return { value: t.value, label: t.label, preview, category: t.category };
    });
};

// Look up the rendered preview for a stored format string. Used by WatchPreview
// when the saved value matches a preset (or even if it doesn't — we just
// substitute tokens against the current language).
export const getPreviewForValue = (value: string | undefined, lang: number, isImperial: boolean = false): string => {
  if (!value) return '';
  if (value === '__custom__') return '';
  return renderPreview(value, lang, isImperial);
};
