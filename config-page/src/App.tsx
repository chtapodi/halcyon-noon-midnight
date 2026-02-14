import React from 'react';
import { PebbleConfigProvider } from './context/PebbleConfigContext';
import { Page, Section, Toggle, ColorPicker, Select, ThemePicker } from './components';
import themes from '../themes.json';

const App: React.FC = () => {
  return (
    <PebbleConfigProvider>
      <Page title="Halcyon Settings">
        <Section title="Presets">
          <ThemePicker label="Apply Theme" themes={themes} />
        </Section>

        <Section title="General">
          <Toggle label="Use Large Fonts" messageKey="SETTING_USE_LARGE_FONTS" />
          <Toggle label="Show Leading Zero" messageKey="SETTING_SHOW_LEADING_ZERO" />
          <Select
            label="Pip Visibility"
            messageKey="SETTING_PIP_VISIBILITY"
            options={[
              { label: 'Always Show', value: 0 },
              { label: 'Hide when quiet', value: 1 },
              { label: 'Always Hide', value: 2 }
            ]}
          />
          <Toggle label="Use Night Theme" messageKey="SETTING_USE_NIGHT_THEME" />
        </Section>

        <Section title="Day Mode Colors">
          <ColorPicker label="Background" messageKey="SETTING_BG_COLOR" />
          <ColorPicker label="Time" messageKey="SETTING_TIME_COLOR" />
          <ColorPicker label="Primary Subtext" messageKey="SETTING_SUBTEXT_PRIMARY_COLOR" />
          <ColorPicker label="Secondary Subtext" messageKey="SETTING_SUBTEXT_SECONDARY_COLOR" />
          <ColorPicker label="Pip Primary" messageKey="SETTING_PIP_COLOR_PRIMARY" />
          <ColorPicker label="Pip Secondary" messageKey="SETTING_PIP_COLOR_SECONDARY" />
        </Section>

        <Section title="Night Mode Colors">
          <ColorPicker label="Background" messageKey="SETTING_NIGHT_BG_COLOR" />
          <ColorPicker label="Time" messageKey="SETTING_NIGHT_TIME_COLOR" />
          <ColorPicker label="Primary Subtext" messageKey="SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR" />
          <ColorPicker label="Secondary Subtext" messageKey="SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR" />
          <ColorPicker label="Pip Primary" messageKey="SETTING_NIGHT_PIP_COLOR_PRIMARY" />
          <ColorPicker label="Pip Secondary" messageKey="SETTING_NIGHT_PIP_COLOR_SECONDARY" />
        </Section>

        <Section title="Outer Ring">
          <ColorPicker label="Stroke" messageKey="SETTING_RING_STROKE_COLOR" />
          <ColorPicker label="Day Section" messageKey="SETTING_RING_DAY_COLOR" />
          <ColorPicker label="Night Section" messageKey="SETTING_RING_NIGHT_COLOR" />
          <ColorPicker label="Sunrise Marker" messageKey="SETTING_RING_SUNRISE_COLOR" />
          <ColorPicker label="Sunset Marker" messageKey="SETTING_RING_SUNSET_COLOR" />
        </Section>

        <Section title="Sun Icon">
          <ColorPicker label="Stroke" messageKey="SETTING_SUN_STROKE_COLOR" />
          <ColorPicker label="Fill" messageKey="SETTING_SUN_FILL_COLOR" />
        </Section>
      </Page>
    </PebbleConfigProvider>
  );
};

export default App;
