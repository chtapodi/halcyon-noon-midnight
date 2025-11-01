#include "messaging.h"
#include "settings.h"
#include "solarUtils.h"
#include <pebble.h>

void (*message_processed_callback)(void);

void messaging_init(void (*processed_callback)(void)) {
  // Custom callback
  message_processed_callback = processed_callback;

  // Register callbacks
  app_message_register_inbox_received(inbox_received_callback);
  app_message_register_inbox_dropped(inbox_dropped_callback);
  app_message_register_outbox_failed(outbox_failed_callback);
  app_message_register_outbox_sent(outbox_sent_callback);

  app_message_open(512, 8);

  app_message_register_inbox_received(inbox_received_callback);
}

void inbox_received_callback(DictionaryIterator *iterator, void *context) {
  // Does this message contain new location data?
  Tuple *lat_tuple = dict_find(iterator, MESSAGE_KEY_LOCATION_LAT);
  Tuple *lng_tuple = dict_find(iterator, MESSAGE_KEY_LOCATION_LNG);
  Tuple *tzOffset_tuple = dict_find(iterator, MESSAGE_KEY_LOCATION_GMT_OFFSET);

  if (lat_tuple != NULL && lng_tuple != NULL && tzOffset_tuple != NULL) {
    LocationInfo loc;

    // set the coordinates
    float lat = (int)lat_tuple->value->int32;
    lat /= 1000000;

    float lng = (int)lng_tuple->value->int32;
    lng /= 1000000;

    float tzOffset = (int)tzOffset_tuple->value->int32;
    tzOffset /= 60;

    loc.lat = lat;
    loc.lng = lng;
    loc.tzOffset = tzOffset;
    loc.lastUpdatedTime = time(NULL);

    solarUtils_updateLocation(loc);
  }

  // Or perhaps it contains new configuration data?
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

  Tuple *useLargeFonts_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_USE_LARGE_FONTS);
  Tuple *useNightTheme_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_USE_NIGHT_THEME);
  Tuple *pipVisibility_tuple =
      dict_find(iterator, MESSAGE_KEY_SETTING_PIP_VISIBILITY);

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

  if (useNightTheme_tuple != NULL) {
    globalSettings.useNightTheme = (bool)useNightTheme_tuple->value->int8;
  }

  if (pipVisibility_tuple != NULL) {
    APP_LOG(APP_LOG_LEVEL_INFO, "Received pipVisibility: %d",
            (int)pipVisibility_tuple->value->int8);
    globalSettings.pipVisibility = (PipVisibilityType)(pipVisibility_tuple->value->int8 - 48);
  }

  Settings_saveToStorage();

  message_processed_callback();
}

void inbox_dropped_callback(AppMessageResult reason, void *context) {
  // APP_LOG(APP_LOG_LEVEL_ERROR, "Message dropped!");
}

void outbox_failed_callback(DictionaryIterator *iterator,
                            AppMessageResult reason, void *context) {
  // APP_LOG(APP_LOG_LEVEL_ERROR, "Outbox send failed!");
}

void outbox_sent_callback(DictionaryIterator *iterator, void *context) {
  // APP_LOG(APP_LOG_LEVEL_INFO, "Outbox send success!");
}