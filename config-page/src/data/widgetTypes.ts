// Widget type definitions — shared between the config page Select dropdowns
// and the WatchPreview component.
// Values MUST match the WidgetType enum in src/c/widgets.h

export interface WidgetOption {
    value: string;
    label: string;
    preview: string;  // Representative text shown in WatchPreview
}

export const WIDGET_OPTIONS: WidgetOption[] = [
    { value: '',                  label: 'None',                preview: '' },
    // Date/time
    { value: '{date}',            label: 'Date',                preview: 'MON, JAN 01' },
    // Solar
    { value: '{sunrise}',         label: 'Sunrise Time',        preview: '6:42 AM' },
    { value: '{sunset}',          label: 'Sunset Time',         preview: '6:18 PM' },
    { value: '{sunrise} ↑{sunset} ↓', label: 'Sunrise & Sunset', preview: '6:42 AM ↑6:18 PM ↓' },
    // Health
    { value: '{steps} STEPS',     label: 'Steps',               preview: '1,234 STEPS' },
    { value: '{dist} KM',         label: 'Distance',            preview: '0.8 KM' },
    // Device
    { value: '{batt}%',           label: 'Battery %',           preview: '85%' },
    // Weather
    { value: '{temp}°',           label: 'Temperature',         preview: '18°' },
    { value: '{thi}°/{tlo}°',     label: 'High / Low',          preview: '22°/14°' },
    { value: '{temp}° {cond}',    label: 'Temp & Condition',    preview: '18° CLOUDY' },
    { value: '{cond}',            label: 'Condition',           preview: 'PARTLY CLOUDY' },
    { value: '{hum}% HUM',        label: 'Humidity',            preview: '65% HUM' },
    { value: '{wind} KM/H',       label: 'Wind Speed',          preview: '12 KM/H' },
    { value: 'UV {uv}',           label: 'UV Index',            preview: 'UV 6' },
    { value: '{rain}MM RAIN',     label: 'Precipitation',       preview: '0.5MM RAIN' },
    // Custom
    { value: '__custom__',        label: 'Custom…',             preview: '' },
];

// Options without health-related widgets (for non-health platforms)
export const WIDGET_OPTIONS_NO_HEALTH: WidgetOption[] = WIDGET_OPTIONS.filter(
    (o) => o.value !== '{steps} STEPS' && o.value !== '{dist} KM'
);
