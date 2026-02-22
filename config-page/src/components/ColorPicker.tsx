import React from 'react';
import { useConfig, useCapabilities } from '../context/PebbleConfigContext';
import { Settings } from '../context/types';

export const PEBBLE_COLORS = [
  '000000', '000055', '0000AA', '0000FF',
  '005500', '005555', '0055AA', '0055FF',
  '00AA00', '00AA55', '00AAAA', '00AAFF',
  '00FF00', '00FF55', '00FFAA', '00FFFF',
  '550000', '550055', '5500AA', '5500FF',
  '555500', '555555', '5555AA', '5555FF',
  '55AA00', '55AA55', '55AAAA', '55AAFF',
  '55FF00', '55FF55', '55FFAA', '55FFFF',
  'AA0000', 'AA0055', 'AA00AA', 'AA00FF',
  'AA5500', 'AA5555', 'AA55AA', 'AA55FF',
  'AAAA00', 'AAAA55', 'AAAAAA', 'AAAAFF',
  'AAFF00', 'AAFF55', 'AAFFAA', 'AAFFFF',
  'FF0000', 'FF0055', 'FF00AA', 'FF00FF',
  'FF5500', 'FF5555', 'FF55AA', 'FF55FF',
  'FFAA00', 'FFAA55', 'FFAAAA', 'FFAAFF',
  'FFFF00', 'FFFF55', 'FFFFAA', 'FFFFFF'
];

export type ColorMode = 'color' | 'bw' | 'bw-grey';

export const COLOR_PALETTES: Record<ColorMode, string[]> = {
  'color': PEBBLE_COLORS,
  'bw': ['000000', 'FFFFFF'],
  'bw-grey': ['000000', 'FFFFFF', 'AAAAAA'],
};

interface ColorPickerProps {
  label: string;
  messageKey: keyof Settings;
  mode?: ColorMode;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, messageKey, mode }) => {
  const { settings, updateSetting } = useConfig();
  const capabilities = useCapabilities();
  const [isOpen, setIsOpen] = React.useState(false);
  const rawValue = settings[messageKey];
  const value = (typeof rawValue === 'string' ? rawValue : '000000').toUpperCase().replace('#', '');

  const resolvedMode: ColorMode = mode ?? (capabilities.COLOR ? 'color' : 'bw-grey');
  const palette = COLOR_PALETTES[resolvedMode];

  return (
    <div className="pebble-item pebble-color-picker-v2">
      <div className="pebble-color-label-row">
        <label>{label}</label>
        <button
          className="pebble-color-preview"
          style={{ backgroundColor: `#${value}` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          #{value}
        </button>
      </div>
      {isOpen && (
        <div
          className="pebble-color-grid"
        >
          {palette.map((color) => (
            <div
              key={color}
              className={`pebble-color-swatch ${value === color ? 'active' : ''}`}
              style={{ backgroundColor: `#${color}` }}
              onClick={() => {
                updateSetting(messageKey, color);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
