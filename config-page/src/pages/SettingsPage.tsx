import React from 'react';
import { useConfig } from '../context/PebbleConfigContext';
import { Page, Section, Toggle, ColorPicker, Select, ThemePicker } from '../components';
import themes from '../data/themes.json';
import nightThemes from '../data/themes-night.json';

export const SettingsPage: React.FC = () => {
  const { settings } = useConfig();
  return (
    <Page title="Halcyon Settings">
      <Section title="General">
        <Toggle label="Use Large Fonts" messageKey="SETTING_USE_LARGE_FONTS" />
        <Toggle label="Show Leading Zero" messageKey="SETTING_SHOW_LEADING_ZERO" />
        <Select
          label="Dial Markings"
          messageKey="SETTING_PIP_VISIBILITY"
          options={[
            { label: 'All (Every Hour)', value: 0 },
            { label: 'Only major (Every 4 hours)', value: 1 },
            { label: 'None', value: 2 }
          ]}
        />
        <Toggle label="Use Night Theme" messageKey="SETTING_USE_NIGHT_THEME" />
      </Section>

      <Section title="Theme">
        <ThemePicker label="Theme Preset" messageKey="SETTING_PRESET" themes={themes} />
        {settings.SETTING_PRESET === 'custom' && (
          <>
            <ColorPicker label="Background" messageKey="SETTING_BG_COLOR" />
            <ColorPicker label="Time" messageKey="SETTING_TIME_COLOR" />
            <ColorPicker label="Primary Subtext" messageKey="SETTING_SUBTEXT_PRIMARY_COLOR" />
            <ColorPicker label="Secondary Subtext" messageKey="SETTING_SUBTEXT_SECONDARY_COLOR" />
            <ColorPicker label="Pip Primary" messageKey="SETTING_PIP_COLOR_PRIMARY" />
            <ColorPicker label="Pip Secondary" messageKey="SETTING_PIP_COLOR_SECONDARY" />
            <ColorPicker label="Ring Stroke" messageKey="SETTING_RING_STROKE_COLOR" />
            <ColorPicker label="Ring Day Section" messageKey="SETTING_RING_DAY_COLOR" />
            <ColorPicker label="Ring Night Section" messageKey="SETTING_RING_NIGHT_COLOR" />
            <ColorPicker label="Sunrise Marker" messageKey="SETTING_RING_SUNRISE_COLOR" />
            <ColorPicker label="Sunset Marker" messageKey="SETTING_RING_SUNSET_COLOR" />
            <ColorPicker label="Sun Stroke" messageKey="SETTING_SUN_STROKE_COLOR" />
            <ColorPicker label="Sun Fill" messageKey="SETTING_SUN_FILL_COLOR" />
          </>
        )}
      </Section>

      {settings.SETTING_USE_NIGHT_THEME === 1 && (
        <Section title="Night Theme">
          <ThemePicker
            label="Night Theme Preset"
            messageKey="SETTING_NIGHT_PRESET"
            themes={nightThemes}
          />
          {settings.SETTING_NIGHT_PRESET === 'custom' && (
            <>
              <ColorPicker label="Background" messageKey="SETTING_NIGHT_BG_COLOR" />
              <ColorPicker label="Time" messageKey="SETTING_NIGHT_TIME_COLOR" />
              <ColorPicker label="Primary Subtext" messageKey="SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR" />
              <ColorPicker label="Secondary Subtext" messageKey="SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR" />
              <ColorPicker label="Pip Primary" messageKey="SETTING_NIGHT_PIP_COLOR_PRIMARY" />
              <ColorPicker label="Pip Secondary" messageKey="SETTING_NIGHT_PIP_COLOR_SECONDARY" />
              <ColorPicker label="Ring Stroke" messageKey="SETTING_NIGHT_RING_STROKE_COLOR" />
              <ColorPicker label="Ring Day Section" messageKey="SETTING_NIGHT_RING_DAY_COLOR" />
              <ColorPicker label="Ring Night Section" messageKey="SETTING_NIGHT_RING_NIGHT_COLOR" />
              <ColorPicker label="Sunrise Marker" messageKey="SETTING_NIGHT_RING_SUNRISE_COLOR" />
              <ColorPicker label="Sunset Marker" messageKey="SETTING_NIGHT_RING_SUNSET_COLOR" />
              <ColorPicker label="Sun Stroke" messageKey="SETTING_NIGHT_SUN_STROKE_COLOR" />
              <ColorPicker label="Sun Fill" messageKey="SETTING_NIGHT_SUN_FILL_COLOR" />
            </>
          )}
        </Section>
      )}
    </Page>
  );
};

