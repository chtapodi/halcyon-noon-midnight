import React from 'react';
import { useConfig, useCapabilities, useWatchInfo } from '../context/PebbleConfigContext';
import { Page, Section, Toggle, ColorPicker, Select, ThemePicker, CustomThemePanel } from '../components';
import { useSavedThemes } from '../hooks/useSavedThemes';
import themes from '../data/themes.json';
import nightThemes from '../data/themes-night.json';
import themesBw from '../data/themes-bw.json';
import themesBwNight from '../data/themes-bw-night.json';
import { WIDGET_OPTIONS, WIDGET_OPTIONS_NO_HEALTH } from '../data/widgetTypes';

export const SettingsPage: React.FC = () => {
  const { settings, updateSetting } = useConfig();
  const capabilities = useCapabilities();
  const watchInfo = useWatchInfo();

  const activeThemes = capabilities.BW ? themesBw : themes;
  const activeNightThemes = capabilities.BW ? themesBwNight : nightThemes;

  const daySavedThemes = useSavedThemes(false);
  const nightSavedThemes = useSavedThemes(true);

  const getDaySavedTheme = () =>
    daySavedThemes.savedThemes.find((t) => t.id === settings.SETTING_THEME);

  const getNightSavedTheme = () =>
    nightSavedThemes.savedThemes.find((t) => t.id === settings.SETTING_NIGHT_THEME);

  // Use health-gated widget options based on platform capability
  const widgetOptions = capabilities.HEALTH ? WIDGET_OPTIONS : WIDGET_OPTIONS_NO_HEALTH;

  const WidgetSlot: React.FC<{
    label: string,
    description: string,
    messageKey: 'SETTING_WIDGET_UPPER_SECONDARY' | 'SETTING_WIDGET_UPPER_PRIMARY' | 'SETTING_WIDGET_LOWER_PRIMARY' | 'SETTING_WIDGET_LOWER_SECONDARY'
  }> = ({ label, description, messageKey }) => {
    const value = settings[messageKey];
    const isCustom = !widgetOptions.find(o => o.value === value);

    return (
      <>
        <Select
          label={label}
          description={description}
          messageKey={messageKey}
          options={widgetOptions}
          value={isCustom ? '__custom__' : value}
          onChange={(val) => {
            if (val === '__custom__') {
              updateSetting(messageKey, value || '{temp}°'); // default to something if switching to custom
            } else {
              updateSetting(messageKey, val as string);
            }
          }}
        />
        {isCustom && (
          <div style={{ padding: '0 1rem 1.25rem', marginTop: '-1rem' }}>
            <input
              type="text"
              className="halite-input"
              value={value}
              onChange={(e) => updateSetting(messageKey, e.target.value)}
              placeholder="Format string, e.g. {temp}° {cond}"
              maxLength={47}
            />
          </div>
        )}
      </>
    );
  };

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
        <WidgetSlot
          label="Upper text 2"
          description="Smaller text shown above everything else"
          messageKey="SETTING_WIDGET_UPPER_SECONDARY"
        />
        <WidgetSlot
          label="Upper text 1"
          description="Text shown directly above the time"
          messageKey="SETTING_WIDGET_UPPER_PRIMARY"
        />
        <WidgetSlot
          label="Lower text 1"
          description="Text shown directly below the time"
          messageKey="SETTING_WIDGET_LOWER_PRIMARY"
        />
        <WidgetSlot
          label="Lower text 2"
          description="Smaller text shown below everything else"
          messageKey="SETTING_WIDGET_LOWER_SECONDARY"
        />

        <div style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)' }}>
          <strong>Available tokens:</strong>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: '8px' }}>
            <span><code>{'{temp}'}</code> Temp</span>
            <span><code>{'{steps}'}</code> Steps</span>
            <span><code>{'{thi}'}</code> High</span>
            <span><code>{'{dist}'}</code> Distance</span>
            <span><code>{'{tlo}'}</code> Low</span>
            <span><code>{'{batt}'}</code> Battery</span>
            <span><code>{'{cond}'}</code> Condition</span>
            <span><code>{'{date}'}</code> Date</span>
            <span><code>{'{sunrise}'}</code> Sunrise</span>
            <span><code>{'{sunset}'}</code> Sunset</span>
          </div>
        </div>
      </Section>

      <Section title="General">
        <Select
          label="Temperature Unit"
          messageKey="SETTING_TEMP_UNIT"
          options={[
            { label: 'Celsius (°C)', value: 0 },
            { label: 'Fahrenheit (°F)', value: 1 },
          ]}
        />
        <Toggle
          label="Use larger fonts"
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
