// Widget type definitions — shared between the config page Select dropdowns
// and the WatchPreview component.
// Values MUST match the WidgetType enum in src/c/widgets.h

export interface WidgetOption {
    value: string;
    label: string;
    preview: string;
    category?: string;
}

export const WIDGET_OPTIONS: WidgetOption[] = [
    { value: '', label: 'None', preview: '' },
    // Date/time
    { value: '{date:%a, %b %e}', label: 'Date', preview: 'MON, JAN 01', category: 'Date & Time' },
    { value: '{date:%Y-%m-%d}', label: 'Numeric Date', preview: '2026-03-22', category: 'Date & Time' },
    { value: 'WEEK {date:%V}', label: 'Week Number', preview: 'WEEK 23', category: 'Date & Time' },
    { value: '{date:%Y}', label: 'Year', preview: '2026', category: 'Date & Time' },
    { value: 'DAY {date:%-j}', label: 'Day Number', preview: 'DAY 81', category: 'Date & Time' },
    // Solar
    { value: '{sunrise}', label: 'Sunrise Time', preview: '6:42 AM', category: 'Solar' },
    { value: '{sunset}', label: 'Sunset Time', preview: '6:18 PM', category: 'Solar' },
    // Health
    { value: '{steps} STEPS', label: 'Steps', preview: '1,234 STEPS', category: 'Health' },
    { value: '{dist} KM', label: 'Distance Walked', preview: '0.8 KM', category: 'Health' },
    // Device
    { value: '{batt}%', label: 'Battery %', preview: '85%', category: 'Device' },
    // Today's Forecast
    { value: '{temp}° {cond}', label: 'Current Conditions', preview: '18° CLOUDY', category: 'Weather' },
    { value: '{thi}°/{tlo}°', label: 'Today\'s High & Low', preview: '22°/14°', category: 'Weather' },
    { value: 'RAIN {pop}%', label: 'Today\'s Chance of Rain', preview: 'RAIN 30%', category: 'Weather' },
    // Current Conditions
    { value: '{hum}% HUM', label: 'Humidity', preview: '65% HUM', category: 'Advanced Weather' },
    { value: '{wind} KM/H', label: 'Wind Speed', preview: '12 KM/H', category: 'Advanced Weather' },
    { value: 'UV {uv}', label: 'UV Index', preview: 'UV 6', category: 'Advanced Weather' },
    { value: '{dew}° DEW', label: 'Dew Point', preview: '12° DEW', category: 'Advanced Weather' },
    { value: '{cond_day}', label: 'Today\'s Forecast Condition', preview: 'PARTLY CLOUDY', category: 'Advanced Weather' },
    // Custom
    { value: '__custom__', label: 'Custom…', preview: '', category: 'Custom' },
];

// Options without health-related widgets (for non-health platforms)
export const WIDGET_OPTIONS_NO_HEALTH: WidgetOption[] = WIDGET_OPTIONS.filter(
    (o) => o.value !== '{steps} STEPS' && o.value !== '{dist} KM'
);
