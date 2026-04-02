#include "settings.h"
#include "solarUtils.h"
#include "utils.h"
#include "widgets.h"
#include <pebble.h>

Settings globalSettings;

void Settings_init() { Settings_loadFromStorage(); }

void Settings_deinit() { Settings_saveToStorage(); }

void Settings_loadFromStorage() {
  // set all the defaults!
  // text colors
  globalSettings.timeColor = DEFAULT_TIME_COLOR;
  globalSettings.subtextPrimaryColor = DEFAULT_SUBTEXT_PRIMARY_COLOR;
  globalSettings.subtextSecondaryColor = DEFAULT_SUBTEXT_SECONDARY_COLOR;

  // decoration colors
  globalSettings.bgColor = DEFAULT_BG_COLOR;
  globalSettings.pipColorPrimary = DEFAULT_PIP_COLOR_PRIMARY;
  globalSettings.pipColorSecondary = DEFAULT_PIP_COLOR_SECONDARY;
  globalSettings.ringStrokeColor = DEFAULT_RING_STROKE_COLOR;
  globalSettings.ringNightColor = DEFAULT_RING_NIGHT_COLOR;
  globalSettings.ringDayColor = DEFAULT_RING_DAY_COLOR;
  globalSettings.ringSunriseColor = DEFAULT_RING_SUNRISE_COLOR;
  globalSettings.ringSunsetColor = DEFAULT_RING_SUNSET_COLOR;
  globalSettings.sunStrokeColor = DEFAULT_SUN_STROKE_COLOR;
  globalSettings.sunFillColor = DEFAULT_SUN_FILL_COLOR;

  // night theme colors (same as day by default)
  globalSettings.nightTimeColor = DEFAULT_NIGHT_TIME_COLOR;
  globalSettings.nightSubtextPrimaryColor = DEFAULT_NIGHT_SUBTEXT_PRIMARY_COLOR;
  globalSettings.nightSubtextSecondaryColor =
      DEFAULT_NIGHT_SUBTEXT_SECONDARY_COLOR;
  globalSettings.nightBgColor = DEFAULT_NIGHT_BG_COLOR;
  globalSettings.nightPipColorPrimary = DEFAULT_NIGHT_PIP_COLOR_PRIMARY;
  globalSettings.nightPipColorSecondary = DEFAULT_NIGHT_PIP_COLOR_SECONDARY;
  globalSettings.nightRingStrokeColor = DEFAULT_NIGHT_RING_STROKE_COLOR;
  globalSettings.nightRingNightColor = DEFAULT_NIGHT_RING_NIGHT_COLOR;
  globalSettings.nightRingDayColor = DEFAULT_NIGHT_RING_DAY_COLOR;
  globalSettings.nightRingSunriseColor = DEFAULT_NIGHT_RING_SUNRISE_COLOR;
  globalSettings.nightRingSunsetColor = DEFAULT_NIGHT_RING_SUNSET_COLOR;
  globalSettings.nightSunStrokeColor = DEFAULT_NIGHT_SUN_STROKE_COLOR;
  globalSettings.nightSunFillColor = DEFAULT_NIGHT_SUN_FILL_COLOR;

  // various appearance settings
  globalSettings.useNightTheme = false;
  globalSettings.useLargeFonts = false;
  globalSettings.showLeadingZero = false;
  globalSettings.pipVisibility = PIP_SHOW_ALL;
  globalSettings.tempUnit = TEMP_UNIT_CELSIUS;

  // widget slot defaults
  // Weather-dependent slots use placeholders until JS sends real data.
  // This prevents raw tokens like "{temp}°" from flashing on first run.
  strncpy(globalSettings.widgetUpperSecondary, "--° / --°",
          WIDGET_TEXT_LEN);
  strncpy(globalSettings.widgetUpperPrimary, "--° --", WIDGET_TEXT_LEN);
  strncpy(globalSettings.widgetLowerPrimary, "{date:%a, %b %e}",
          WIDGET_TEXT_LEN);
  strncpy(globalSettings.widgetLowerSecondary, "{steps} STEPS",
          WIDGET_TEXT_LEN);

  if (persist_exists(SETTINGS_PERSIST_KEY)) {
    StoredSettings storedSettings;
    persist_read_data(SETTINGS_PERSIST_KEY, &storedSettings,
                      sizeof(StoredSettings));
    memcpy(&globalSettings, &storedSettings, sizeof(StoredSettings));
  }

  Settings_updateDynamicSettings();
}

void Settings_saveToStorage() {
  Settings_updateDynamicSettings();
  StoredSettings storedSettings;
  memcpy(&storedSettings, &globalSettings, sizeof(StoredSettings));
  persist_write_data(SETTINGS_PERSIST_KEY, &storedSettings,
                     sizeof(StoredSettings));
  persist_write_int(SETTINGS_VERSION_PERSIST_KEY, CURRENT_SETTINGS_VERSION);
}

void Settings_updateDynamicSettings() {
  // there are none right now but we'll get back to that.
  //   globalSettings.disableWeather = true;
  //   globalSettings.updateScreenEverySecond = false;
  //   globalSettings.enableAutoBatteryWidget = true;
  //   globalSettings.enableBeats = false;
  //   globalSettings.enableAltTimeZone = false;

  //   for(int i = 0; i < 3; i++) {
  //     // if there are any weather widgets, enable weather checking
  //     // if(globalSettings.widgets[i] == WEATHER_CURRENT ||
  //     //    globalSettings.widgets[i] == WEATHER_FORECAST_TODAY) {
  //     if(globalSettings.widgets[i] == WEATHER_CURRENT) {
  //       globalSettings.disableWeather = false;
  //     }

  //     // if any widget is "seconds", we'll need to update the sidebar every
  //     second if(globalSettings.widgets[i] == SECONDS) {
  //       globalSettings.updateScreenEverySecond = true;
  //     }

  //     // if any widget is "battery", disable the automatic battery indication
  //     if(globalSettings.widgets[i] == BATTERY_METER) {
  //       globalSettings.enableAutoBatteryWidget = false;
  //     }

  //     // if any widget is "beats", enable the beats calculation
  //     if(globalSettings.widgets[i] == BEATS) {
  //       globalSettings.enableBeats = true;
  //     }

  //     // if any widget is "alt_time_zone", enable the alternative time
  //     calculation if(globalSettings.widgets[i] == ALT_TIME_ZONE) {
  //       globalSettings.enableAltTimeZone = true;
  //     }
  //   }
  // }
}

ColorTheme getCurrentColorTheme() {
  ColorTheme theme;

  // Get current time in minutes since midnight
  struct tm *timeInfo = getCurrentTime();
  int currentMinutes = timeInfo->tm_hour * 60 + timeInfo->tm_min;

  bool useNight = globalSettings.useNightTheme && isNightTime(currentMinutes);

  APP_LOG(APP_LOG_LEVEL_DEBUG,
          "getCurrentColorTheme: useNightTheme=%d, useNight=%d",
          globalSettings.useNightTheme, useNight);

  if (useNight) {
    theme.timeColor = globalSettings.nightTimeColor;
    theme.subtextPrimaryColor = globalSettings.nightSubtextPrimaryColor;
    theme.subtextSecondaryColor = globalSettings.nightSubtextSecondaryColor;
    theme.bgColor = globalSettings.nightBgColor;
    theme.pipColorPrimary = globalSettings.nightPipColorPrimary;
    theme.pipColorSecondary = globalSettings.nightPipColorSecondary;
    theme.ringStrokeColor = globalSettings.nightRingStrokeColor;
    theme.ringNightColor = globalSettings.nightRingNightColor;
    theme.ringDayColor = globalSettings.nightRingDayColor;
    theme.ringSunriseColor = globalSettings.nightRingSunriseColor;
    theme.ringSunsetColor = globalSettings.nightRingSunsetColor;
    theme.sunStrokeColor = globalSettings.nightSunStrokeColor;
    theme.sunFillColor = globalSettings.nightSunFillColor;
  } else {
    theme.timeColor = globalSettings.timeColor;
    theme.subtextPrimaryColor = globalSettings.subtextPrimaryColor;
    theme.subtextSecondaryColor = globalSettings.subtextSecondaryColor;
    theme.bgColor = globalSettings.bgColor;
    theme.pipColorPrimary = globalSettings.pipColorPrimary;
    theme.pipColorSecondary = globalSettings.pipColorSecondary;
    theme.ringStrokeColor = globalSettings.ringStrokeColor;
    theme.ringNightColor = globalSettings.ringNightColor;
    theme.ringDayColor = globalSettings.ringDayColor;
    theme.ringSunriseColor = globalSettings.ringSunriseColor;
    theme.ringSunsetColor = globalSettings.ringSunsetColor;
    theme.sunStrokeColor = globalSettings.sunStrokeColor;
    theme.sunFillColor = globalSettings.sunFillColor;
  }

  return theme;
}
