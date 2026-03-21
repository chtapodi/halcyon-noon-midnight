import React from 'react';
import { useConfig } from '../context/PebbleConfigContext';
import { Settings } from '../context/types';
import { FormItem } from './FormItem';

export const Select: React.FC<{
  label: string;
  description?: string;
  messageKey: keyof Settings;
  options: { label: string; value: string | number }[];
  value?: string | number;
  onChange?: (val: string | number) => void;
}> = ({ label, description, messageKey, options, value: overrideValue, onChange: overrideOnChange }) => {
  const { settings, updateSetting } = useConfig();
  const value = overrideValue !== undefined ? overrideValue : settings[messageKey];
  const selectId = React.useId();

  return (
    <FormItem label={label} description={description} className="halite-select" htmlFor={selectId}>
      <select
        id={selectId}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          const num = parseInt(val, 10);
          const finalVal = isNaN(num) || val.includes('{') ? val : num;
          if (overrideOnChange) {
            overrideOnChange(finalVal);
          } else {
            updateSetting(messageKey, finalVal);
          }
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormItem>
  );
};
