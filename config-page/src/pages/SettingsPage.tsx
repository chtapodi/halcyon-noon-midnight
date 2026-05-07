import React from 'react';
import { useConfig, useCapabilities, useWatchInfo } from '../context/PebbleConfigContext';
import { Page, Section, Toggle, ColorPicker, Select, ThemePicker, CustomThemePanel, WidgetSelector } from '../components';
import { useSavedThemes } from '../hooks/useSavedThemes';
import lightThemes from '../data/light-themes.json';
import darkThemes from '../data/dark-themes.json';
import lightThemesBw from '../data/light-themes-bw.json';
import darkThemesBw from '../data/dark-themes-bw.json';
import { prepareThemes } from '../utils/themeUtils';


export const SettingsPage: React.FC = () => {
  const { settings, updateSetting } = useConfig();
  const capabilities = useCapabilities();
  const watchInfo = useWatchInfo();

  const activeThemes = React.useMemo(() =>
    capabilities.BW
      ? prepareThemes(lightThemesBw, darkThemesBw, false)
      : prepareThemes(lightThemes, darkThemes, false),
    [capabilities.BW]
  );

  const activeNightThemes = React.useMemo(() =>
    capabilities.BW
      ? prepareThemes(darkThemesBw, lightThemesBw, true)
      : prepareThemes(darkThemes, lightThemes, true),
    [capabilities.BW]
  );

  const daySavedThemes = useSavedThemes(false);
  const nightSavedThemes = useSavedThemes(true);

  const getDaySavedTheme = () =>
    daySavedThemes.savedThemes.find((t) => t.id === settings.SETTING_THEME);

  const getNightSavedTheme = () =>
    nightSavedThemes.savedThemes.find((t) => t.id === settings.SETTING_NIGHT_THEME);

  return (
    <Page title="Halcyon Settings">
      <Section title="Theme">
        <ThemePicker
          messageKey="SETTING_THEME"
          themes={activeThemes}
          savedThemes={daySavedThemes.savedThemes}
          label='Theme preset'
        />
        <CustomThemePanel
          themeId={settings.SETTING_THEME}
          savedTheme={getDaySavedTheme()}
          onSave={daySavedThemes.saveTheme}
          onDelete={daySavedThemes.deleteTheme}
          onImport={daySavedThemes.importTheme}
          onExport={daySavedThemes.exportTheme}
          onSelectTheme={(id) => updateSetting('SETTING_THEME', id)}
        />
        {settings.SETTING_THEME === 'custom' && (
          <>
            <ColorPicker
              label="Time color"
              messageKey="SETTING_TIME_COLOR"
              bwAllowGrey={false}
            />
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
            <ColorPicker
              label="Background color"
              messageKey="SETTING_BG_COLOR"
            />
            <ColorPicker
              label="Ring day section color"
              messageKey="SETTING_RING_DAY_COLOR"
            />
            <ColorPicker
              label="Ring sunrise section color"
              messageKey="SETTING_RING_SUNRISE_COLOR"
            />
            <ColorPicker
              label="Ring sunset section color"
              messageKey="SETTING_RING_SUNSET_COLOR"
            />
            <ColorPicker
              label="Ring night section color"
              messageKey="SETTING_RING_NIGHT_COLOR"
            />
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
            <ColorPicker
              label="Sun fill color"
              messageKey="SETTING_SUN_FILL_COLOR"
            />
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
              label='Night theme preset'
              themes={activeNightThemes}
              watchPreviewProps={{ isNight: true }}
              savedThemes={nightSavedThemes.savedThemes}
            />
            <CustomThemePanel
              themeId={settings.SETTING_NIGHT_THEME}
              savedTheme={getNightSavedTheme()}
              watchPreviewProps={{ isNight: true }}
              onSave={nightSavedThemes.saveTheme}
              onDelete={nightSavedThemes.deleteTheme}
              onImport={nightSavedThemes.importTheme}
              onExport={nightSavedThemes.exportTheme}
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
                <ColorPicker
                  label="Background color"
                  messageKey="SETTING_NIGHT_BG_COLOR"
                />
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
                <ColorPicker
                  label="Sun fill color"
                  messageKey="SETTING_NIGHT_SUN_FILL_COLOR"
                />
              </>
            )}
          </>
        )}
      </Section>

      <Section title="Widgets">
        <WidgetSelector />
      </Section>

      <Section title="General">
        <Select
          label="Language (Experimental)"
          description="Controls language and formatting for widgets"
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
        <Select
          label="Weather Units"
          messageKey="SETTING_TEMP_UNIT"
          options={[
            { label: 'Metric (Celsius, KM/H)', value: 0 },
            { label: 'Imperial (Fahrenheit, MPH)', value: 1 },
          ]}
        />
        <Toggle
          label="Use larger fonts"
          description="Increase the size of widget text"
          messageKey="SETTING_USE_LARGE_FONTS"
        />
        <Toggle
          label="Show leading zero"
          description="Display time as 09:30 instead of 9:30"
          messageKey="SETTING_SHOW_LEADING_ZERO"
        />
        <Select
          label="Dial markings"
          messageKey="SETTING_PIP_VISIBILITY"
          options={[
            { label: 'All (Every Hour)', value: 0 },
            { label: 'Only major (Every 4 hours)', value: 1 },
            { label: 'None', value: 2 },
          ]}
        />
      </Section>
    </Page >
  );
};
