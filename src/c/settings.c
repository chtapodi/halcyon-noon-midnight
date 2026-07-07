#include "settings.h"
#include "solarUtils.h"
#include "utils.h"
#include "widgets.h"
#include <pebble.h>

Settings globalSettings;

// Tide data — runtime only, populated by messaging.c from phone JS
TidePoint tideData[MAX_TIDE_POINTS];
uint8_t tidePointCount = 0;
int16_t tideDataMinHeight = 0;
int16_t tideDataMaxHeight = 0;

// Mock tide data for emulator/testing — overridden when real data arrives
static void tide_init_mock_data(void) {
  // Semi-diurnal tide pattern: two highs, two lows per day
  // Heights in cm, typical SF Bay range (~-50 to +250 cm MLLW)
  tideData[0] = (TidePoint){.minute = 120, .height_cm = 200};   // 02:00 high +200cm
  tideData[1] = (TidePoint){.minute = 390, .height_cm = -30};   // 06:30 low -30cm
  tideData[2] = (TidePoint){.minute = 630, .height_cm = 180};   // 10:30 high +180cm
  tideData[3] = (TidePoint){.minute = 960, .height_cm = 40};    // 16:00 low +40cm
  tideData[4] = (TidePoint){.minute = 1200, .height_cm = 220};  // 20:00 high +220cm
  tideData[5] = (TidePoint){.minute = 1410, .height_cm = -10};  // 23:30 low -10cm
  tidePointCount = 6;
  tideDataMinHeight = -30;
  tideDataMaxHeight = 220;
}

static void populateStoredSettingsExtra(StoredSettingsExtra *storedSettingsExtra) {
  strncpy(storedSettingsExtra->altCityLabel, globalSettings.altCityLabel,
          ALT_CITY_LABEL_LEN);
  storedSettingsExtra->altCityLabel[ALT_CITY_LABEL_LEN - 1] = '\0';
  storedSettingsExtra->altCityUtcOffset = globalSettings.altCityUtcOffset;
  strncpy(storedSettingsExtra->altCity2Label, globalSettings.altCity2Label,
          ALT_CITY_LABEL_LEN);
  storedSettingsExtra->altCity2Label[ALT_CITY_LABEL_LEN - 1] = '\0';
  storedSettingsExtra->altCity2UtcOffset = globalSettings.altCity2UtcOffset;
  storedSettingsExtra->localUtcOffset = globalSettings.localUtcOffset;
  storedSettingsExtra->usePrimaryFontForAllWidgets =
      globalSettings.usePrimaryFontForAllWidgets;
  storedSettingsExtra->showNoonMidnightMarkers =
      globalSettings.showNoonMidnightMarkers;
  storedSettingsExtra->noonMidnightLineWidth =
      globalSettings.noonMidnightLineWidth;
  storedSettingsExtra->noonMarkerColor = globalSettings.noonMarkerColor;
  storedSettingsExtra->midnightMarkerColor = globalSettings.midnightMarkerColor;
  storedSettingsExtra->nightNoonMarkerColor =
      globalSettings.nightNoonMarkerColor;
  storedSettingsExtra->nightMidnightMarkerColor =
      globalSettings.nightMidnightMarkerColor;
  storedSettingsExtra->showTidePlot = globalSettings.showTidePlot;
  storedSettingsExtra->tidePlotInside = globalSettings.tidePlotInside;
  storedSettingsExtra->tideAmplitude = globalSettings.tideAmplitude;
  storedSettingsExtra->tidePlotColor = globalSettings.tidePlotColor;
  storedSettingsExtra->nightTidePlotColor = globalSettings.nightTidePlotColor;
  strncpy(storedSettingsExtra->noaaStationId, globalSettings.noaaStationId,
          NOAA_STATION_ID_LEN);
}

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
  globalSettings.noonMarkerColor = DEFAULT_NOON_MARKER_COLOR;
  globalSettings.midnightMarkerColor = DEFAULT_MIDNIGHT_MARKER_COLOR;

  // night theme colors
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
  globalSettings.nightNoonMarkerColor = DEFAULT_NIGHT_NOON_MARKER_COLOR;
  globalSettings.nightMidnightMarkerColor =
      DEFAULT_NIGHT_MIDNIGHT_MARKER_COLOR;

  // tide plot settings
  globalSettings.showTidePlot = false;
  globalSettings.tidePlotInside = false;  // outside ring by default
  globalSettings.tideAmplitude = 16;
  globalSettings.tidePlotColor = DEFAULT_TIDE_PLOT_COLOR;
  globalSettings.nightTidePlotColor = DEFAULT_NIGHT_TIDE_PLOT_COLOR;
  memset(globalSettings.noaaStationId, 0, NOAA_STATION_ID_LEN);

  // various appearance settings
  globalSettings.showNoonMidnightMarkers = true;
  globalSettings.noonMidnightLineWidth = 5;
  globalSettings.useNightTheme = true;
  globalSettings.useLargeFonts = false;
  globalSettings.showLeadingZero = false;
  globalSettings.pipVisibility = PIP_SHOW_ALL;
  globalSettings.tempUnit = TEMP_UNIT_CELSIUS;
  globalSettings.language = 0;

  // widget slot defaults
  // Weather-dependent slots use placeholders until JS sends real data.
  // This prevents raw tokens like "{temp}°" from flashing on first run.
  strncpy(globalSettings.widgetUpperSecondary, "--° (--° / --°)",
          WIDGET_TEXT_LEN);
  strncpy(globalSettings.widgetUpperPrimary, "--", WIDGET_TEXT_LEN);
  // Lower-primary defaults to the {local_date} super-token; widgets.c expands
  // it at render time using the active language's idiomatic format.
  strncpy(globalSettings.widgetLowerPrimary, "{local_date}", WIDGET_TEXT_LEN);
#if defined(PBL_HEALTH)
  strncpy(globalSettings.widgetLowerSecondary, "{steps} {t:STEPS}",
          WIDGET_TEXT_LEN);
#else
  strncpy(globalSettings.widgetLowerSecondary, "{t:BATTERY} {batt}%",
          WIDGET_TEXT_LEN);
#endif
  strncpy(globalSettings.altCityLabel, "TYO", ALT_CITY_LABEL_LEN);
  globalSettings.altCityLabel[ALT_CITY_LABEL_LEN - 1] = '\0';
  globalSettings.altCityUtcOffset = 540;
  strncpy(globalSettings.altCity2Label, "UTC", ALT_CITY_LABEL_LEN);
  globalSettings.altCity2Label[ALT_CITY_LABEL_LEN - 1] = '\0';
  globalSettings.altCity2UtcOffset = 0;
  globalSettings.localUtcOffset = 0;
  globalSettings.usePrimaryFontForAllWidgets = false;

  if (persist_exists(SETTINGS_PERSIST_KEY)) {
    const int stored_size = persist_get_size(SETTINGS_PERSIST_KEY);
    if (stored_size > 0) {
      // Settings storage is append-only: defaults above cover fields that did
      // not exist in older persisted blobs.
      const int read_size = stored_size < (int)sizeof(StoredSettings)
                                ? stored_size
                                : (int)sizeof(StoredSettings);
      persist_read_data(SETTINGS_PERSIST_KEY, &globalSettings, read_size);
    }
  }

  if (persist_exists(SETTINGS_EXTRA_PERSIST_KEY)) {
    const int stored_size = persist_get_size(SETTINGS_EXTRA_PERSIST_KEY);
    if (stored_size > 0) {
      StoredSettingsExtra storedSettingsExtra;
      memset(&storedSettingsExtra, 0, sizeof(StoredSettingsExtra));
      populateStoredSettingsExtra(&storedSettingsExtra);
      const int read_size = stored_size < (int)sizeof(StoredSettingsExtra)
                                ? stored_size
                                : (int)sizeof(StoredSettingsExtra);
      persist_read_data(SETTINGS_EXTRA_PERSIST_KEY, &storedSettingsExtra,
                        read_size);

      strncpy(globalSettings.altCityLabel, storedSettingsExtra.altCityLabel,
              ALT_CITY_LABEL_LEN);
      globalSettings.altCityLabel[ALT_CITY_LABEL_LEN - 1] = '\0';
      globalSettings.altCityUtcOffset = storedSettingsExtra.altCityUtcOffset;
      strncpy(globalSettings.altCity2Label, storedSettingsExtra.altCity2Label,
              ALT_CITY_LABEL_LEN);
      globalSettings.altCity2Label[ALT_CITY_LABEL_LEN - 1] = '\0';
      globalSettings.altCity2UtcOffset = storedSettingsExtra.altCity2UtcOffset;
      globalSettings.localUtcOffset = storedSettingsExtra.localUtcOffset;
      globalSettings.usePrimaryFontForAllWidgets =
          storedSettingsExtra.usePrimaryFontForAllWidgets;
      globalSettings.showNoonMidnightMarkers =
          storedSettingsExtra.showNoonMidnightMarkers;
      globalSettings.noonMidnightLineWidth =
          storedSettingsExtra.noonMidnightLineWidth;
      globalSettings.noonMarkerColor = storedSettingsExtra.noonMarkerColor;
      globalSettings.midnightMarkerColor =
          storedSettingsExtra.midnightMarkerColor;
      globalSettings.nightNoonMarkerColor =
          storedSettingsExtra.nightNoonMarkerColor;
      globalSettings.nightMidnightMarkerColor =
          storedSettingsExtra.nightMidnightMarkerColor;
      globalSettings.showTidePlot = storedSettingsExtra.showTidePlot;
      globalSettings.tidePlotInside = storedSettingsExtra.tidePlotInside;
      globalSettings.tideAmplitude = storedSettingsExtra.tideAmplitude;
      globalSettings.tidePlotColor = storedSettingsExtra.tidePlotColor;
      globalSettings.nightTidePlotColor = storedSettingsExtra.nightTidePlotColor;
      strncpy(globalSettings.noaaStationId, storedSettingsExtra.noaaStationId,
              NOAA_STATION_ID_LEN);
    }
  }

  Settings_updateDynamicSettings();

  // Seed mock tide data for emulator/demo if no real data from phone
  if (tidePointCount == 0) {
    tide_init_mock_data();
    globalSettings.showTidePlot = true;
  }
}

void Settings_saveToStorage() {
  Settings_updateDynamicSettings();
  StoredSettings storedSettings;
  memcpy(&storedSettings, &globalSettings, sizeof(StoredSettings));
  persist_write_data(SETTINGS_PERSIST_KEY, &storedSettings,
                     sizeof(StoredSettings));

  StoredSettingsExtra storedSettingsExtra;
  memset(&storedSettingsExtra, 0, sizeof(StoredSettingsExtra));
  populateStoredSettingsExtra(&storedSettingsExtra);
  persist_write_data(SETTINGS_EXTRA_PERSIST_KEY, &storedSettingsExtra,
                     sizeof(StoredSettingsExtra));

  persist_write_int(SETTINGS_VERSION_PERSIST_KEY, CURRENT_SETTINGS_VERSION);
}

static int16_t get_local_utc_offset(void) {
  time_t now = time(NULL);
  struct tm local_time = *localtime(&now);
  struct tm utc_time = *gmtime(&now);

  int day_delta = local_time.tm_yday - utc_time.tm_yday;
  if (local_time.tm_year > utc_time.tm_year) {
    day_delta = 1;
  } else if (local_time.tm_year < utc_time.tm_year) {
    day_delta = -1;
  } else if (day_delta > 1) {
    day_delta = -1;
  } else if (day_delta < -1) {
    day_delta = 1;
  }

  return (int16_t)((day_delta * 24 + local_time.tm_hour - utc_time.tm_hour) *
                       60 +
                   local_time.tm_min - utc_time.tm_min);
}

void Settings_updateDynamicSettings() {
  globalSettings.localUtcOffset = get_local_utc_offset();
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
    theme.noonMarkerColor = globalSettings.nightNoonMarkerColor;
    theme.midnightMarkerColor = globalSettings.nightMidnightMarkerColor;
    theme.tidePlotColor = globalSettings.nightTidePlotColor;
    theme.nightTidePlotColor = globalSettings.nightTidePlotColor;
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
    theme.noonMarkerColor = globalSettings.noonMarkerColor;
    theme.midnightMarkerColor = globalSettings.midnightMarkerColor;
    theme.tidePlotColor = globalSettings.tidePlotColor;
    theme.nightTidePlotColor = globalSettings.nightTidePlotColor;
  }

  return theme;
}
