#include "messaging.h"
#include "settings.h"
#include "solarUtils.h"
#include <pebble.h>

void (*message_processed_callback)(void);
void (*request_failed_callback)(void);

void messaging_init(void (*processed_callback)(void),
                    void (*failed_callback)(void)) {
  message_processed_callback = processed_callback;
  request_failed_callback = failed_callback;

  // Register callbacks
  app_message_register_inbox_received(inbox_received_callback);
  app_message_register_inbox_dropped(inbox_dropped_callback);
  app_message_register_outbox_failed(outbox_failed_callback);
  app_message_register_outbox_sent(outbox_sent_callback);

  app_message_open(768, 64);
}

void inbox_received_callback(DictionaryIterator *iterator, void *context) {
  // Process configuration data
  Tuple *timeColor_tuple = dict_find(iterator, MESSAGE_KEY_SETTING_TIME_COLOR);
  Tuple *subTextPrimaryColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_SUBTEXT_PRIMARY_COLOR);
  Tuple *subTextSecondaryColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_SUBTEXT_SECONDARY_COLOR);
  Tuple *bgColor_tuple = dict_find(iterator, MESSAGE_KEY_SETTING_BG_COLOR);
  Tuple *pipColorPrimary_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_PIP_COLOR_PRIMARY);
  Tuple *pipColorSecondary_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_PIP_COLOR_SECONDARY);
  Tuple *ringStrokeColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_RING_STROKE_COLOR);
  Tuple *ringNightColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_RING_NIGHT_COLOR);
  Tuple *ringDayColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_RING_DAY_COLOR);
  Tuple *ringSunriseColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_RING_SUNRISE_COLOR);
  Tuple *ringSunsetColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_RING_SUNSET_COLOR);
  Tuple *sunStrokeColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_SUN_STROKE_COLOR);
  Tuple *sunFillColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_SUN_FILL_COLOR);

  // night theme colors
  Tuple *nightTimeColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_TIME_COLOR);
  Tuple *nightSubTextPrimaryColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR);
  Tuple *nightSubTextSecondaryColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR);
  Tuple *nightBgColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_BG_COLOR);
  Tuple *nightPipColorPrimary_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_PIP_COLOR_PRIMARY);
  Tuple *nightPipColorSecondary_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_PIP_COLOR_SECONDARY);
  Tuple *nightRingStrokeColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_RING_STROKE_COLOR);
  Tuple *nightRingNightColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_RING_NIGHT_COLOR);
  Tuple *nightRingDayColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_RING_DAY_COLOR);
  Tuple *nightRingSunriseColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_RING_SUNRISE_COLOR);
  Tuple *nightRingSunsetColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_RING_SUNSET_COLOR);
  Tuple *nightSunStrokeColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_SUN_STROKE_COLOR);
  Tuple *nightSunFillColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_SUN_FILL_COLOR);

  Tuple *useNightTheme_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_USE_NIGHT_THEME);

  Tuple *useLargeFonts_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_USE_LARGE_FONTS);

  Tuple *usePrimaryFontForAllWidgets_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_USE_PRIMARY_WIDGET_FONT);

  Tuple *showNoonMidnightMarkers_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_SHOW_NOON_MIDNIGHT_MARKERS);
  Tuple *noonMarkerColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NOON_MARKER_COLOR);
  Tuple *midnightMarkerColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_MIDNIGHT_MARKER_COLOR);
  Tuple *nightNoonMarkerColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_NOON_MARKER_COLOR);
  Tuple *nightMidnightMarkerColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_MIDNIGHT_MARKER_COLOR);
  Tuple *noonMidnightLineWidth_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NOON_MIDNIGHT_LINE_WIDTH);

  // Tide data tuples
  Tuple *tidePointCount_tuple =
      dict_find(iterator, MESSAGE_KEY_TIDE_POINT_COUNT);
  Tuple *tideMinutes_tuple =
      dict_find(iterator, MESSAGE_KEY_TIDE_MINUTES);
  Tuple *tideHeights_tuple =
      dict_find(iterator, MESSAGE_KEY_TIDE_HEIGHTS);

  // Tide settings
  Tuple *showTidePlot_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_SHOW_TIDE_PLOT);
  Tuple *tidePlotInside_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_TIDE_PLOT_INSIDE);
  Tuple *tidePlotColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_TIDE_PLOT_COLOR);
  Tuple *nightTidePlotColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_TIDE_PLOT_COLOR);
  Tuple *tideAmplitude_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_TIDE_AMPLITUDE);
  Tuple *noaaStationId_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NOAA_STATION_ID);

#ifdef PBL_COLOR
  Tuple *tidePlotBorder_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_TIDE_PLOT_BORDER);
  Tuple *tidePlotBorderColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_TIDE_PLOT_BORDER_COLOR);
  Tuple *nightTidePlotBorderColor_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_NIGHT_TIDE_PLOT_BORDER_COLOR);
  Tuple *tideBarWidth_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_TIDE_BAR_WIDTH);
  Tuple *tideBarGap_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_TIDE_BAR_GAP);
  Tuple *tideBorderWidth_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_TIDE_BORDER_WIDTH);
#endif

  Tuple *showLeadingZero_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_SHOW_LEADING_ZERO);

  Tuple *pipVisibility_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_PIP_VISIBILITY);

  Tuple *widgetUpperSecondary_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_WIDGET_UPPER_SECONDARY);
  Tuple *widgetUpperPrimary_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_WIDGET_UPPER_PRIMARY);
  Tuple *widgetLowerPrimary_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_WIDGET_LOWER_PRIMARY);
  Tuple *widgetLowerSecondary_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_WIDGET_LOWER_SECONDARY);

  Tuple *weatherSunriseMinute_tuple =
      dict_find(iterator, MESSAGE_KEY_WEATHER_SUNRISE_MINUTE);
  Tuple *weatherSunsetMinute_tuple =
      dict_find(iterator, MESSAGE_KEY_WEATHER_SUNSET_MINUTE);
  Tuple *tempUnit_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_TEMP_UNIT);
  Tuple *language_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_LANGUAGE);
  Tuple *altCityLabel_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_ALT_CITY_LABEL);
  Tuple *altCityUtcOffset_tuple =
      dict_find(iterator, MESSAGE_KEY_ALT_CITY_UTC_OFFSET);
  Tuple *altCity2Label_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_ALT_CITY2_LABEL);
  Tuple *altCity2UtcOffset_tuple =
      dict_find(iterator, MESSAGE_KEY_ALT_CITY2_UTC_OFFSET);
  Tuple *localUtcOffset_tuple =
      dict_find(iterator, MESSAGE_KEY_LOCAL_UTC_OFFSET);

  if (timeColor_tuple != NULL) {
    globalSettings.timeColor = GColorFromHEX(timeColor_tuple->value->int32);
  }

  if (subTextPrimaryColor_tuple != NULL) {
    globalSettings.subtextPrimaryColor =
        GColorFromHEX(subTextPrimaryColor_tuple->value->int32);
  }

  if (subTextSecondaryColor_tuple != NULL) {
    globalSettings.subtextSecondaryColor =
        GColorFromHEX(subTextSecondaryColor_tuple->value->int32);
  }

  if (bgColor_tuple != NULL) {
    globalSettings.bgColor = GColorFromHEX(bgColor_tuple->value->int32);
  }

  if (pipColorPrimary_tuple != NULL) {
    globalSettings.pipColorPrimary =
        GColorFromHEX(pipColorPrimary_tuple->value->int32);
  }

  if (pipColorSecondary_tuple != NULL) {
    globalSettings.pipColorSecondary =
        GColorFromHEX(pipColorSecondary_tuple->value->int32);
  }

  if (ringStrokeColor_tuple != NULL) {
    globalSettings.ringStrokeColor =
        GColorFromHEX(ringStrokeColor_tuple->value->int32);
  }

  if (ringNightColor_tuple != NULL) {
    globalSettings.ringNightColor =
        GColorFromHEX(ringNightColor_tuple->value->int32);
  }

  if (ringDayColor_tuple != NULL) {
    globalSettings.ringDayColor =
        GColorFromHEX(ringDayColor_tuple->value->int32);
  }

  if (ringSunriseColor_tuple != NULL) {
    globalSettings.ringSunriseColor =
        GColorFromHEX(ringSunriseColor_tuple->value->int32);
  }

  if (ringSunsetColor_tuple != NULL) {
    globalSettings.ringSunsetColor =
        GColorFromHEX(ringSunsetColor_tuple->value->int32);
  }

  if (sunStrokeColor_tuple != NULL) {
    globalSettings.sunStrokeColor =
        GColorFromHEX(sunStrokeColor_tuple->value->int32);
  }

  if (sunFillColor_tuple != NULL) {
    globalSettings.sunFillColor =
        GColorFromHEX(sunFillColor_tuple->value->int32);
  }

  // night theme colors
  if (nightTimeColor_tuple != NULL) {
    globalSettings.nightTimeColor =
        GColorFromHEX(nightTimeColor_tuple->value->int32);
  }

  if (nightSubTextPrimaryColor_tuple != NULL) {
    globalSettings.nightSubtextPrimaryColor =
        GColorFromHEX(nightSubTextPrimaryColor_tuple->value->int32);
  }

  if (nightSubTextSecondaryColor_tuple != NULL) {
    globalSettings.nightSubtextSecondaryColor =
        GColorFromHEX(nightSubTextSecondaryColor_tuple->value->int32);
  }

  if (nightBgColor_tuple != NULL) {
    globalSettings.nightBgColor =
        GColorFromHEX(nightBgColor_tuple->value->int32);
  }

  if (nightPipColorPrimary_tuple != NULL) {
    globalSettings.nightPipColorPrimary =
        GColorFromHEX(nightPipColorPrimary_tuple->value->int32);
  }

  if (nightPipColorSecondary_tuple != NULL) {
    globalSettings.nightPipColorSecondary =
        GColorFromHEX(nightPipColorSecondary_tuple->value->int32);
  }

  if (nightRingStrokeColor_tuple != NULL) {
    globalSettings.nightRingStrokeColor =
        GColorFromHEX(nightRingStrokeColor_tuple->value->int32);
  }

  if (nightRingNightColor_tuple != NULL) {
    globalSettings.nightRingNightColor =
        GColorFromHEX(nightRingNightColor_tuple->value->int32);
  }

  if (nightRingDayColor_tuple != NULL) {
    globalSettings.nightRingDayColor =
        GColorFromHEX(nightRingDayColor_tuple->value->int32);
  }

  if (nightRingSunriseColor_tuple != NULL) {
    globalSettings.nightRingSunriseColor =
        GColorFromHEX(nightRingSunriseColor_tuple->value->int32);
  }

  if (nightRingSunsetColor_tuple != NULL) {
    globalSettings.nightRingSunsetColor =
        GColorFromHEX(nightRingSunsetColor_tuple->value->int32);
  }

  if (nightSunStrokeColor_tuple != NULL) {
    globalSettings.nightSunStrokeColor =
        GColorFromHEX(nightSunStrokeColor_tuple->value->int32);
  }

  if (nightSunFillColor_tuple != NULL) {
    globalSettings.nightSunFillColor =
        GColorFromHEX(nightSunFillColor_tuple->value->int32);
  }

  if (useLargeFonts_tuple != NULL) {
    globalSettings.useLargeFonts = (bool)useLargeFonts_tuple->value->int8;
  }

  if (usePrimaryFontForAllWidgets_tuple != NULL) {
    globalSettings.usePrimaryFontForAllWidgets =
        (bool)usePrimaryFontForAllWidgets_tuple->value->int8;
  }

  if (showNoonMidnightMarkers_tuple != NULL) {
    globalSettings.showNoonMidnightMarkers =
        (bool)showNoonMidnightMarkers_tuple->value->int8;
  }
  if (noonMarkerColor_tuple != NULL) {
    globalSettings.noonMarkerColor =
        GColorFromHEX(noonMarkerColor_tuple->value->int32);
  }
  if (midnightMarkerColor_tuple != NULL) {
    globalSettings.midnightMarkerColor =
        GColorFromHEX(midnightMarkerColor_tuple->value->int32);
  }
  if (nightNoonMarkerColor_tuple != NULL) {
    globalSettings.nightNoonMarkerColor =
        GColorFromHEX(nightNoonMarkerColor_tuple->value->int32);
  }
  if (nightMidnightMarkerColor_tuple != NULL) {
    globalSettings.nightMidnightMarkerColor =
        GColorFromHEX(nightMidnightMarkerColor_tuple->value->int32);
  }
  if (noonMidnightLineWidth_tuple != NULL) {
    globalSettings.noonMidnightLineWidth =
        (uint8_t)noonMidnightLineWidth_tuple->value->int8;
  }

  // Parse tide data from comma-separated strings
  if (tidePointCount_tuple != NULL && tideMinutes_tuple != NULL &&
      tideHeights_tuple != NULL) {
    int count = (int)tidePointCount_tuple->value->int32;
    if (count > MAX_TIDE_POINTS) count = MAX_TIDE_POINTS;

    const char *minStr = tideMinutes_tuple->value->cstring;
    const char *hgtStr = tideHeights_tuple->value->cstring;

    int idx = 0;
    int hgtCount = 0;
    int16_t heights[MAX_TIDE_POINTS];

    // Parse heights first
    const char *p = hgtStr;
    while (*p && hgtCount < MAX_TIDE_POINTS) {
      heights[hgtCount++] = (int16_t)atoi(p);
      while (*p && *p != ',') p++;
      if (*p == ',') p++;
    }

    // Parse minutes and pair with heights
    p = minStr;
    while (*p && idx < count && idx < hgtCount) {
      tideData[idx].minute = (int16_t)atoi(p);
      tideData[idx].height_cm = heights[idx];
      idx++;
      while (*p && *p != ',') p++;
      if (*p == ',') p++;
    }

    tidePointCount = (uint8_t)idx;

    // Compute min/max heights for amplitude mapping
    if (idx > 0) {
      tideDataMinHeight = tideData[0].height_cm;
      tideDataMaxHeight = tideData[0].height_cm;
      for (int i = 1; i < idx; i++) {
        if (tideData[i].height_cm < tideDataMinHeight)
          tideDataMinHeight = tideData[i].height_cm;
        if (tideData[i].height_cm > tideDataMaxHeight)
          tideDataMaxHeight = tideData[i].height_cm;
      }
    }
  }

  // Tide settings
  if (showTidePlot_tuple != NULL) {
    globalSettings.showTidePlot = (bool)showTidePlot_tuple->value->int8;
  }
  if (tidePlotInside_tuple != NULL) {
    globalSettings.tidePlotInside = (bool)tidePlotInside_tuple->value->int8;
  }
  if (tidePlotColor_tuple != NULL) {
    globalSettings.tidePlotColor =
        GColorFromHEX(tidePlotColor_tuple->value->int32);
  }
  if (nightTidePlotColor_tuple != NULL) {
    globalSettings.nightTidePlotColor =
        GColorFromHEX(nightTidePlotColor_tuple->value->int32);
  }
  if (tideAmplitude_tuple != NULL) {
    globalSettings.tideAmplitude =
        (uint8_t)tideAmplitude_tuple->value->int8;
  }
  if (noaaStationId_tuple != NULL) {
    strncpy(globalSettings.noaaStationId,
            noaaStationId_tuple->value->cstring, NOAA_STATION_ID_LEN);
    globalSettings.noaaStationId[NOAA_STATION_ID_LEN - 1] = '\0';
  }
#ifdef PBL_COLOR
  if (tidePlotBorder_tuple != NULL) {
    globalSettings.tidePlotBorder = (bool)tidePlotBorder_tuple->value->int8;
  }
  if (tidePlotBorderColor_tuple != NULL) {
    globalSettings.tidePlotBorderColor =
        GColorFromHEX(tidePlotBorderColor_tuple->value->int32);
  }
  if (nightTidePlotBorderColor_tuple != NULL) {
    globalSettings.nightTidePlotBorderColor =
        GColorFromHEX(nightTidePlotBorderColor_tuple->value->int32);
  }
  if (tideBarWidth_tuple != NULL) {
    globalSettings.tideBarWidth = (uint8_t)tideBarWidth_tuple->value->int8;
  }
  if (tideBarGap_tuple != NULL) {
    globalSettings.tideBarGap = (uint8_t)tideBarGap_tuple->value->int8;
  }
  if (tideBorderWidth_tuple != NULL) {
    globalSettings.tideBorderWidth = (uint8_t)tideBorderWidth_tuple->value->int8;
  }
#endif

  if (useNightTheme_tuple != NULL) {
    globalSettings.useNightTheme = (bool)useNightTheme_tuple->value->int8;
  }

  if (pipVisibility_tuple != NULL) {
    APP_LOG(APP_LOG_LEVEL_INFO, "Received pipVisibility: %d",
            (int)pipVisibility_tuple->value->int8);
    globalSettings.pipVisibility =
        (PipVisibilityType)pipVisibility_tuple->value->int8;
  }

  if (showLeadingZero_tuple != NULL) {
    globalSettings.showLeadingZero = (bool)showLeadingZero_tuple->value->int8;
  }

  if (widgetUpperSecondary_tuple != NULL) {
    strncpy(globalSettings.widgetUpperSecondary,
            widgetUpperSecondary_tuple->value->cstring, WIDGET_TEXT_LEN);
    globalSettings.widgetUpperSecondary[WIDGET_TEXT_LEN - 1] = '\0';
  }
  if (widgetUpperPrimary_tuple != NULL) {
    strncpy(globalSettings.widgetUpperPrimary,
            widgetUpperPrimary_tuple->value->cstring, WIDGET_TEXT_LEN);
    globalSettings.widgetUpperPrimary[WIDGET_TEXT_LEN - 1] = '\0';
  }
  if (widgetLowerPrimary_tuple != NULL) {
    strncpy(globalSettings.widgetLowerPrimary,
            widgetLowerPrimary_tuple->value->cstring, WIDGET_TEXT_LEN);
    globalSettings.widgetLowerPrimary[WIDGET_TEXT_LEN - 1] = '\0';
  }
  if (widgetLowerSecondary_tuple != NULL) {
    strncpy(globalSettings.widgetLowerSecondary,
            widgetLowerSecondary_tuple->value->cstring, WIDGET_TEXT_LEN);
    globalSettings.widgetLowerSecondary[WIDGET_TEXT_LEN - 1] = '\0';
  }

  if (weatherSunriseMinute_tuple != NULL) {
    solarUtils_setSolarMinutes((int)weatherSunriseMinute_tuple->value->int32,
                               currentSolarInfo.sunsetMinute);
  }

  if (weatherSunsetMinute_tuple != NULL) {
    solarUtils_setSolarMinutes(currentSolarInfo.sunriseMinute,
                               (int)weatherSunsetMinute_tuple->value->int32);
  }

  if (tempUnit_tuple != NULL) {
    globalSettings.tempUnit = (TempUnitType)tempUnit_tuple->value->int8;
  }

  if (language_tuple != NULL) {
    globalSettings.language = (uint8_t)language_tuple->value->int8;
  }

  if (altCityLabel_tuple != NULL) {
    strncpy(globalSettings.altCityLabel, altCityLabel_tuple->value->cstring,
            ALT_CITY_LABEL_LEN);
    globalSettings.altCityLabel[ALT_CITY_LABEL_LEN - 1] = '\0';
  }

  if (altCityUtcOffset_tuple != NULL) {
    globalSettings.altCityUtcOffset =
        (int16_t)altCityUtcOffset_tuple->value->int32;
  }

  if (altCity2Label_tuple != NULL) {
    strncpy(globalSettings.altCity2Label, altCity2Label_tuple->value->cstring,
            ALT_CITY_LABEL_LEN);
    globalSettings.altCity2Label[ALT_CITY_LABEL_LEN - 1] = '\0';
  }

  if (altCity2UtcOffset_tuple != NULL) {
    globalSettings.altCity2UtcOffset =
        (int16_t)altCity2UtcOffset_tuple->value->int32;
  }

  if (localUtcOffset_tuple != NULL) {
    globalSettings.localUtcOffset =
        (int16_t)localUtcOffset_tuple->value->int32;
  }

  Settings_saveToStorage();

  message_processed_callback();
}

void inbox_dropped_callback(AppMessageResult reason, void *context) {
  // APP_LOG(APP_LOG_LEVEL_ERROR, "Message dropped!");
}

void outbox_failed_callback(DictionaryIterator *iterator,
                            AppMessageResult reason, void *context) {
  APP_LOG(APP_LOG_LEVEL_ERROR, "Outbox send failed: %d", (int)reason);
  // The watch only ever sends REQUEST_UPDATE via the outbox, so any failure
  // here means the heartbeat didn't reach the phone — ask main to retry soon.
  if (request_failed_callback) request_failed_callback();
}

void outbox_sent_callback(DictionaryIterator *iterator, void *context) {
  // APP_LOG(APP_LOG_LEVEL_INFO, "Outbox send success!");
}

void messaging_request_update() {
  DictionaryIterator *iter;
  AppMessageResult result = app_message_outbox_begin(&iter);

  if (result != APP_MSG_OK) {
    APP_LOG(APP_LOG_LEVEL_ERROR, "Failed to begin outbox: %d", (int)result);
    if (request_failed_callback) request_failed_callback();
    return;
  }

  dict_write_int8(iter, MESSAGE_KEY_REQUEST_UPDATE, 1);
  dict_write_int8(iter, MESSAGE_KEY_WATCH_IS_24H,
                  clock_is_24h_style() ? 1 : 0);

  result = app_message_outbox_send();
  if (result != APP_MSG_OK) {
    APP_LOG(APP_LOG_LEVEL_ERROR, "Failed to send outbox: %d", (int)result);
    if (request_failed_callback) request_failed_callback();
  }
}
