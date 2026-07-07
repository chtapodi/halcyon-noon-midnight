import React from 'react';
import { useConfig, useCapabilities } from '../context/PebbleConfigContext';
import {
  Page,
  Section,
  Toggle,
  ColorPicker,
  Select,
  ThemePicker,
  CustomThemePanel,
  WidgetSelector,
  DonationLink,
  AltTimezoneSection,
} from '../components';
import { useSavedThemes } from '../hooks/useSavedThemes';
import lightThemes from '../data/light-themes.json';
import neutralThemes from '../data/neutral-themes.json';
import darkThemes from '../data/dark-themes.json';
import lightThemesBw from '../data/light-themes-bw.json';
import neutralThemesBw from '../data/neutral-themes-bw.json';
import darkThemesBw from '../data/dark-themes-bw.json';
import { prepareThemes } from '../utils/themeUtils';
import {
  ALT_TIMEZONE_WIDGET_IDS,
  ALT_TIMEZONE2_WIDGET_IDS,
  WEATHER_WIDGET_IDS,
  containsWidgets,
} from '../data/widgetTypes';

export const SettingsPage: React.FC = () => {
  const { settings, updateSetting } = useConfig();
  const capabilities = useCapabilities();
  const widgetValues = [
    settings.SETTING_WIDGET_UPPER_SECONDARY,
    settings.SETTING_WIDGET_UPPER_PRIMARY,
    settings.SETTING_WIDGET_LOWER_PRIMARY,
    settings.SETTING_WIDGET_LOWER_SECONDARY,
  ];
  const altWidgetSelected = containsWidgets(widgetValues, ALT_TIMEZONE_WIDGET_IDS);
  const alt2WidgetSelected = containsWidgets(widgetValues, ALT_TIMEZONE2_WIDGET_IDS);
  const weatherWidgetSelected = containsWidgets(widgetValues, WEATHER_WIDGET_IDS);

  const activeThemes = React.useMemo(
    () =>
      capabilities.BW
        ? prepareThemes(lightThemesBw, neutralThemesBw, darkThemesBw, false)
        : prepareThemes(lightThemes, neutralThemes, darkThemes, false),
    [capabilities.BW],
  );

  const activeNightThemes = React.useMemo(
    () =>
      capabilities.BW
        ? prepareThemes(darkThemesBw, neutralThemesBw, lightThemesBw, true)
        : prepareThemes(darkThemes, neutralThemes, lightThemes, true),
    [capabilities.BW],
  );

  const savedThemes = useSavedThemes();

  const getDaySavedTheme = () =>
    savedThemes.savedThemes.find((t) => t.id === settings.SETTING_THEME);

  const getNightSavedTheme = () =>
    savedThemes.savedThemes.find((t) => t.id === settings.SETTING_NIGHT_THEME);

  return (
    <Page title="Halcyon Settings">
      <Section title="Theme">
        <ThemePicker
          messageKey="SETTING_THEME"
          themes={activeThemes}
          savedThemes={savedThemes.savedThemes}
          label="Theme preset"
        />
        <CustomThemePanel
          themeId={settings.SETTING_THEME}
          savedTheme={getDaySavedTheme()}
          onSave={(s) => savedThemes.saveTheme(s, false)}
          onDelete={savedThemes.deleteTheme}
          onImport={savedThemes.importTheme}
          onExport={savedThemes.exportTheme}
          onSelectTheme={(id) => updateSetting('SETTING_THEME', id)}
        />
        {settings.SETTING_THEME === 'custom' && (
          <>
            <ColorPicker label="Time color" messageKey="SETTING_TIME_COLOR" bwAllowGrey={false} />
            <ColorPicker
              label="Widget text color (primary)"
              messageKey="SETTING_SUBTEXT_PRIMARY_COLOR"
              bwAllowGrey={false}
            />
            <ColorPicker
              label="Widget text color (secondary)"
              messageKey="SETTING_SUBTEXT_SECONDARY_COLOR"
              bwAllowGrey={false}
            />
            <ColorPicker label="Background color" messageKey="SETTING_BG_COLOR" />
            <ColorPicker label="Ring day section color" messageKey="SETTING_RING_DAY_COLOR" />
            <ColorPicker
              label="Ring sunrise section color"
              messageKey="SETTING_RING_SUNRISE_COLOR"
            />
            <ColorPicker label="Ring sunset section color" messageKey="SETTING_RING_SUNSET_COLOR" />
            <ColorPicker label="Ring night section color" messageKey="SETTING_RING_NIGHT_COLOR" />
            <ColorPicker
              label="Dial marker color (primary)"
              messageKey="SETTING_PIP_COLOR_PRIMARY"
              bwAllowGrey={false}
            />
            <ColorPicker
              label="Dial marker color (secondary)"
              messageKey="SETTING_PIP_COLOR_SECONDARY"
              bwAllowGrey={false}
            />
            <ColorPicker
              label="Ring outline color"
              messageKey="SETTING_RING_STROKE_COLOR"
              bwAllowGrey={false}
            />
            <ColorPicker
              label="Sun outline color"
              messageKey="SETTING_SUN_STROKE_COLOR"
              bwAllowGrey={false}
            />
            <ColorPicker label="Sun fill color" messageKey="SETTING_SUN_FILL_COLOR" />
          </>
        )}
        {settings.SETTING_SHOW_NOON_MIDNIGHT_MARKERS === 1 && (
          <>
            <ColorPicker label="Noon marker color" messageKey="SETTING_NOON_MARKER_COLOR" />
            <ColorPicker label="Midnight marker color" messageKey="SETTING_MIDNIGHT_MARKER_COLOR" />
          </>
        )}
        {settings.SETTING_SHOW_TIDE_PLOT === 1 && (
          <>
            <ColorPicker label="Tide plot color" messageKey="SETTING_TIDE_PLOT_COLOR" />
            {settings.SETTING_TIDE_PLOT_BORDER === 1 && (
              <ColorPicker label="Border color" messageKey="SETTING_TIDE_PLOT_BORDER_COLOR" />
            )}
          </>
        )}
      </Section>

      <Section title="Night Theme">
        <Toggle
          label="Enable night theme"
          description="If enabled, the selected color scheme will be shown after sunset."
          messageKey="SETTING_USE_NIGHT_THEME"
        />
        {settings.SETTING_USE_NIGHT_THEME === 1 && (
          <>
            <ThemePicker
              messageKey="SETTING_NIGHT_THEME"
              label="Night theme preset"
              themes={activeNightThemes}
              watchPreviewProps={{ isNight: true }}
              savedThemes={savedThemes.savedThemes}
            />
            <CustomThemePanel
              themeId={settings.SETTING_NIGHT_THEME}
              savedTheme={getNightSavedTheme()}
              watchPreviewProps={{ isNight: true }}
              onSave={(s) => savedThemes.saveTheme(s, true)}
              onDelete={savedThemes.deleteTheme}
              onImport={savedThemes.importTheme}
              onExport={savedThemes.exportTheme}
              onSelectTheme={(id) => updateSetting('SETTING_NIGHT_THEME', id)}
            />
            {settings.SETTING_NIGHT_THEME === 'custom' && (
              <>
                <ColorPicker
                  label="Time color"
                  messageKey="SETTING_NIGHT_TIME_COLOR"
                  bwAllowGrey={false}
                />
                <ColorPicker
                  label="Widget text color (primary)"
                  messageKey="SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR"
                  bwAllowGrey={false}
                />
                <ColorPicker
                  label="Widget text color (secondary)"
                  messageKey="SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR"
                  bwAllowGrey={false}
                />
                <ColorPicker label="Background color" messageKey="SETTING_NIGHT_BG_COLOR" />
                <ColorPicker
                  label="Ring day section color"
                  messageKey="SETTING_NIGHT_RING_DAY_COLOR"
                />
                <ColorPicker
                  label="Ring sunrise section color"
                  messageKey="SETTING_NIGHT_RING_SUNRISE_COLOR"
                />
                <ColorPicker
                  label="Ring sunset section color"
                  messageKey="SETTING_NIGHT_RING_SUNSET_COLOR"
                />
                <ColorPicker
                  label="Ring night section color"
                  messageKey="SETTING_NIGHT_RING_NIGHT_COLOR"
                />
                <ColorPicker
                  label="Dial marker color (primary)"
                  messageKey="SETTING_NIGHT_PIP_COLOR_PRIMARY"
                  bwAllowGrey={false}
                />
                <ColorPicker
                  label="Dial marker color (secondary)"
                  messageKey="SETTING_NIGHT_PIP_COLOR_SECONDARY"
                  bwAllowGrey={false}
                />
                <ColorPicker
                  label="Ring outline color"
                  messageKey="SETTING_NIGHT_RING_STROKE_COLOR"
                  bwAllowGrey={false}
                />
                <ColorPicker
                  label="Sun outline color"
                  messageKey="SETTING_NIGHT_SUN_STROKE_COLOR"
                  bwAllowGrey={false}
                />
                <ColorPicker label="Sun fill color" messageKey="SETTING_NIGHT_SUN_FILL_COLOR" />
              </>
            )}
            {settings.SETTING_SHOW_NOON_MIDNIGHT_MARKERS === 1 && (
              <>
                <ColorPicker label="Noon marker color" messageKey="SETTING_NIGHT_NOON_MARKER_COLOR" />
                <ColorPicker label="Midnight marker color" messageKey="SETTING_NIGHT_MIDNIGHT_MARKER_COLOR" />
              </>
            )}
            {settings.SETTING_SHOW_TIDE_PLOT === 1 && (
              <>
                <ColorPicker label="Tide plot color" messageKey="SETTING_NIGHT_TIDE_PLOT_COLOR" />
                {settings.SETTING_TIDE_PLOT_BORDER === 1 && (
                  <ColorPicker label="Border color" messageKey="SETTING_NIGHT_TIDE_PLOT_BORDER_COLOR" />
                )}
              </>
            )}
          </>
        )}
      </Section>

      <Section title="Widgets">
        <WidgetSelector />
      </Section>

      {altWidgetSelected && (
        <AltTimezoneSection
          title="Alternate Time Zone 1"
          cityKey="SETTING_ALT_CITY"
          labelKey="SETTING_ALT_LABEL"
        />
      )}

      {alt2WidgetSelected && (
        <AltTimezoneSection
          title="Alternate Time Zone 2"
          cityKey="SETTING_ALT_CITY2"
          labelKey="SETTING_ALT_LABEL2"
        />
      )}

      {weatherWidgetSelected && (
        <Section title="Weather">
          <Select
            label="Weather Units"
            messageKey="SETTING_TEMP_UNIT"
            options={[
              { label: 'Metric (Celsius, KM/H)', value: 0 },
              { label: 'Imperial (Fahrenheit, MPH)', value: 1 },
            ]}
          />
        </Section>
      )}

      <Section title="Widget Appearance">
        <Toggle
          label="Uniform font size"
          description="Use the same font size for all widgets"
          messageKey="SETTING_USE_PRIMARY_WIDGET_FONT"
        />
        <Toggle
          label="Larger font sizes"
          description="Increases the size of widget text"
          messageKey="SETTING_USE_LARGE_FONTS"
        />
      </Section>

      <Section title="General">
        <Select
          label="Language (Experimental)"
          description="Controls the language displayed on the watchface"
          messageKey="SETTING_LANGUAGE"
          options={[
            { label: 'English (US)', value: 0 },
            { label: 'English (UK)', value: 37 },
            { label: 'Bahasa Indonesia', value: 30 },
            { label: 'Català', value: 15 },
            { label: 'Čeština', value: 7 },
            { label: 'Cymraeg', value: 32 },
            { label: 'Dansk', value: 21 },
            { label: 'Deutsch', value: 2 },
            { label: 'Eesti', value: 18 },
            { label: 'Español', value: 3 },
            { label: 'Euskara', value: 19 },
            { label: 'Français', value: 1 },
            { label: 'Gaeilge', value: 26 },
            { label: 'Galego', value: 33 },
            { label: 'Hrvatski', value: 25 },
            { label: 'Italiano', value: 4 },
            { label: 'Latviešu', value: 27 },
            { label: 'Lietuvių', value: 22 },
            { label: 'Magyar', value: 24 },
            { label: 'Nederlands', value: 5 },
            { label: 'Norsk', value: 16 },
            { label: 'Polski', value: 11 },
            { label: 'Português', value: 8 },
            { label: 'Română', value: 14 },
            { label: 'Srpski', value: 28 },
            { label: 'Slovenčina', value: 12 },
            { label: 'Slovenščina', value: 23 },
            { label: 'Suomi', value: 20 },
            { label: 'Svenska', value: 10 },
            { label: 'Tiếng Việt', value: 13 },
            { label: 'Türkçe', value: 6 },
            { label: 'Ελληνικά', value: 9, category: 'Requires language pack' },
            { label: 'Русский', value: 17, category: 'Requires language pack' },
            { label: 'Українська', value: 31, category: 'Requires language pack' },
            { label: 'עברית', value: 36, category: 'Requires language pack' },
            { label: '中文', value: 29, category: 'Requires language pack' },
            { label: '日本語', value: 34, category: 'Requires language pack' },
            { label: '한국어', value: 35, category: 'Requires language pack' },
          ]}
        />
        <Toggle
          label="Show leading zero"
          description="Display time as 09:30 instead of 9:30"
          messageKey="SETTING_SHOW_LEADING_ZERO"
        />
        <Select
          label="Dial Markings"
          messageKey="SETTING_PIP_VISIBILITY"
          options={[
            { label: 'All (Every Hour)', value: 0 },
            { label: 'Only major (Every 3 hours)', value: 1 },
            { label: 'None', value: 2 },
          ]}
        />
      </Section>
      <Section title="Ring Markers">
        <Toggle
          label="Noon / Midnight markers"
          description="Draw lines on the ring at noon and midnight positions"
          messageKey="SETTING_SHOW_NOON_MIDNIGHT_MARKERS"
        />
        {settings.SETTING_SHOW_NOON_MIDNIGHT_MARKERS === 1 && (
          <Select
            label="Line width"
            messageKey="SETTING_NOON_MIDNIGHT_LINE_WIDTH"
            options={[
              { label: '1px', value: 1 },
              { label: '2px', value: 2 },
              { label: '3px', value: 3 },
              { label: '4px', value: 4 },
              { label: '5px', value: 5 },
              { label: '6px', value: 6 },
              { label: '7px', value: 7 },
              { label: '8px', value: 8 },
              { label: '10px', value: 10 },
              { label: '12px', value: 12 },
            ]}
          />
        )}
      </Section>
      <Section title="Tide Plot">
        <Toggle
          label="Show tide plot"
          description="Draw tide height as a plot on the ring (requires NOAA data)"
          messageKey="SETTING_SHOW_TIDE_PLOT"
        />
        {settings.SETTING_SHOW_TIDE_PLOT === 1 && (
          <>
            <Toggle
              label="Plot inside ring"
              description="Draw tide plot toward center instead of outside"
              messageKey="SETTING_TIDE_PLOT_INSIDE"
            />
            <Select
              label="Amplitude"
              messageKey="SETTING_TIDE_AMPLITUDE"
              options={[
                { label: '4px', value: 4 },
                { label: '8px', value: 8 },
                { label: '12px', value: 12 },
                { label: '16px', value: 16 },
                { label: '20px', value: 20 },
                { label: '24px', value: 24 },
              ]}
            />
            <Select
              label="Bar width"
              messageKey="SETTING_TIDE_BAR_WIDTH"
              options={[
                { label: '0px', value: 0 },
                { label: '2px', value: 2 },
                { label: '4px', value: 4 },
                { label: '6px', value: 6 },
                { label: '8px', value: 8 },
                { label: '10px', value: 10 },
                { label: '14px', value: 14 },
                { label: '20px', value: 20 },
              ]}
            />
            <Select
              label="Gap width"
              messageKey="SETTING_TIDE_BAR_GAP"
              options={[
                { label: '0px', value: 0 },
                { label: '1px', value: 1 },
                { label: '2px', value: 2 },
                { label: '3px', value: 3 },
                { label: '4px', value: 4 },
                { label: '5px', value: 5 },
                { label: '6px', value: 6 },
              ]}
            />
            <Toggle
              label="Plot border"
              description="Draw an outline along the outer edge of the tide plot"
              messageKey="SETTING_TIDE_PLOT_BORDER"
            />
            {settings.SETTING_TIDE_PLOT_BORDER === 1 && (
              <>
                <Select
                  label="Border width"
                  messageKey="SETTING_TIDE_BORDER_WIDTH"
                  options={[
                    { label: '1px', value: 1 },
                    { label: '2px', value: 2 },
                    { label: '3px', value: 3 },
                    { label: '4px', value: 4 },
                    { label: '5px', value: 5 },
                  ]}
                />
                <ColorPicker label="Border color" messageKey="SETTING_TIDE_PLOT_BORDER_COLOR" />
              </>
            )}
          </>
        )}
      </Section>
      <DonationLink />
    </Page>
  );
};
