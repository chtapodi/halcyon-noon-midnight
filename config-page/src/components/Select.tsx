import React from 'react';
import { useConfig } from '../context/PebbleConfigContext';
import { Settings } from '../context/types';
import { FormItem } from './FormItem';

export const Select: React.FC<{
  label: string;
  description?: string;
  messageKey: keyof Settings;
  options: { label: string; value: string | number }[];
}> = ({ label, description, messageKey, options }) => {
  const { settings, updateSetting } = useConfig();
  const value = settings[messageKey];
  const selectId = React.useId();

  return (
    <FormItem label={label} description={description} className="halite-select" htmlFor={selectId}>
      <select
        id={selectId}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          const num = parseInt(val, 10);
          updateSetting(messageKey, isNaN(num) ? val : num);
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
