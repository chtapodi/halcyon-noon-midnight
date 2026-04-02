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
    { value: '{day_name}, {month_name} {day0}', label: 'Date', preview: 'MON, JAN 01', category: 'Date & Time' },
    { value: '{year}-{month_num}-{day0}', label: 'Numeric Date', preview: '2026-03-22', category: 'Date & Time' },
    { value: 'DAY {day_of_year}', label: 'Day Number', preview: 'DAY 81', category: 'Date & Time' },
    { value: 'WEEK {week_of_year}', label: 'Week Number', preview: 'WEEK 23', category: 'Date & Time' },
    { value: '{year}', label: 'Year', preview: '2026', category: 'Date & Time' },
    // Solar
    { value: 'RISE {sunrise}', label: 'Sunrise Time', preview: 'RISE 6:42 AM', category: 'Solar' },
    { value: 'SET {sunset}', label: 'Sunset Time', preview: 'SET 6:18 PM', category: 'Solar' },
    // Health
    { value: '{steps} STEPS', label: 'Steps', preview: '1,234 STEPS', category: 'Health' },
    { value: '{dist} {dist_unit}', label: 'Distance Walked', preview: '0.8 KM', category: 'Health' },
    // Device
    { value: 'BATTERY {batt}%', label: 'Battery %', preview: 'BATTERY 85%', category: 'Device' },
    // Today's Forecast
    { value: '{thi}° / {tlo}°', label: 'Today\'s High & Low', preview: '22° / 14°', category: 'Weather: Today\s Forecast' },
    { value: 'RAIN {pop}%', label: 'Today\'s Chance of Rain', preview: 'RAIN 30%', category: 'Weather: Today\s Forecast' },
    // Current Conditions
    { value: '{temp}° {cond}', label: 'Current Temp & Condition', preview: '18° CLOUDY', category: 'Weather: Current' },
    { value: '{hum}% HUMIDITY', label: 'Humidity', preview: '65% HUMIDITY', category: 'Weather: Current' },
    { value: '{wind} {wind_unit} {wind_dir}', label: 'Wind', preview: '12 KM/H NW', category: 'Weather: Current' },
    { value: 'UVI {uv}', label: 'UV Index', preview: 'UVI 6', category: 'Weather: Current' },
    { value: '{dew}° DEW', label: 'Dew Point', preview: 'DEWPOINT 12°', category: 'Weather: Current' },
    // Custom
    { value: '__custom__', label: 'Custom…', preview: '', category: 'Custom' },
];

// Options without health-related widgets (for non-health platforms)
export const WIDGET_OPTIONS_NO_HEALTH: WidgetOption[] = WIDGET_OPTIONS.filter(
    (o) => o.value !== '{steps} STEPS' && o.value !== '{dist} {dist_unit}'
);
