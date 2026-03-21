#pragma once
#include "widgets.h"
#include <pebble.h>
#include <sys/syslimits.h>

#define CURRENT_SETTINGS_VERSION 1
#define SETTINGS_VERSION_PERSIST_KEY 1
#define SETTINGS_PERSIST_KEY 2

// default settings
#ifdef PBL_COLOR
#define DEFAULT_TIME_COLOR GColorBlack
#define DEFAULT_SUBTEXT_PRIMARY_COLOR GColorBlack
#define DEFAULT_SUBTEXT_SECONDARY_COLOR GColorDarkGray
#define DEFAULT_BG_COLOR GColorWhite
#define DEFAULT_PIP_COLOR_PRIMARY GColorBlack
#define DEFAULT_PIP_COLOR_SECONDARY GColorLightGray
#define DEFAULT_RING_STROKE_COLOR GColorBlack
#define DEFAULT_RING_NIGHT_COLOR GColorCobaltBlue
#define DEFAULT_RING_DAY_COLOR GColorVividCerulean
#define DEFAULT_RING_SUNRISE_COLOR GColorMelon
#define DEFAULT_RING_SUNSET_COLOR GColorChromeYellow
#define DEFAULT_SUN_STROKE_COLOR GColorBlack
#define DEFAULT_SUN_FILL_COLOR GColorYellow

// night theme defaults (same as day for now)
#define DEFAULT_NIGHT_TIME_COLOR GColorBlack
#define DEFAULT_NIGHT_SUBTEXT_PRIMARY_COLOR GColorBlack
#define DEFAULT_NIGHT_SUBTEXT_SECONDARY_COLOR GColorBlack
#define DEFAULT_NIGHT_BG_COLOR GColorWhite
#define DEFAULT_NIGHT_PIP_COLOR_PRIMARY GColorBlack
#define DEFAULT_NIGHT_PIP_COLOR_SECONDARY GColorBlack
#define DEFAULT_NIGHT_RING_STROKE_COLOR GColorBlack
#define DEFAULT_NIGHT_RING_NIGHT_COLOR GColorBlack
#define DEFAULT_NIGHT_RING_DAY_COLOR GColorWhite
#define DEFAULT_NIGHT_RING_SUNRISE_COLOR GColorLightGray
#define DEFAULT_NIGHT_RING_SUNSET_COLOR GColorLightGray
#define DEFAULT_NIGHT_SUN_STROKE_COLOR GColorBlack
#define DEFAULT_NIGHT_SUN_FILL_COLOR GColorWhite
#else
#define DEFAULT_TIME_COLOR GColorBlack
#define DEFAULT_SUBTEXT_PRIMARY_COLOR GColorBlack
#define DEFAULT_SUBTEXT_SECONDARY_COLOR GColorBlack
#define DEFAULT_BG_COLOR GColorWhite
#define DEFAULT_PIP_COLOR_PRIMARY GColorBlack
#define DEFAULT_PIP_COLOR_SECONDARY GColorBlack
#define DEFAULT_RING_STROKE_COLOR GColorBlack
#define DEFAULT_RING_NIGHT_COLOR GColorBlack
#define DEFAULT_RING_DAY_COLOR GColorWhite
#define DEFAULT_RING_SUNRISE_COLOR GColorLightGray
#define DEFAULT_RING_SUNSET_COLOR GColorLightGray
#define DEFAULT_SUN_STROKE_COLOR GColorBlack
#define DEFAULT_SUN_FILL_COLOR GColorWhite

// night theme defaults (same as day for now)
#define DEFAULT_NIGHT_TIME_COLOR GColorBlack
#define DEFAULT_NIGHT_SUBTEXT_PRIMARY_COLOR GColorBlack
#define DEFAULT_NIGHT_SUBTEXT_SECONDARY_COLOR GColorBlack
#define DEFAULT_NIGHT_BG_COLOR GColorWhite
#define DEFAULT_NIGHT_PIP_COLOR_PRIMARY GColorBlack
#define DEFAULT_NIGHT_PIP_COLOR_SECONDARY GColorBlack
#define DEFAULT_NIGHT_RING_STROKE_COLOR GColorBlack
#define DEFAULT_NIGHT_RING_NIGHT_COLOR GColorBlack
#define DEFAULT_NIGHT_RING_DAY_COLOR GColorWhite
#define DEFAULT_NIGHT_RING_SUNRISE_COLOR GColorLightGray
#define DEFAULT_NIGHT_RING_SUNSET_COLOR GColorLightGray
#define DEFAULT_NIGHT_SUN_STROKE_COLOR GColorBlack
#define DEFAULT_NIGHT_SUN_FILL_COLOR GColorWhite
#endif

// default settings, black and white

typedef enum {
  PIP_SHOW_ALL = 0,
  PIP_SHOW_MAJOR = 1,
  PIP_HIDDEN = 2
} PipVisibilityType;

typedef enum {
  TEMP_UNIT_CELSIUS = 0,
  TEMP_UNIT_FAHRENHEIT = 1
} TempUnitType;

// typedef enum {
//   NO_VIBE = 0,
//   VIBE_EVERY_HOUR = 1,
//   VIBE_EVERY_HALF_HOUR = 2
// } VibeIntervalType;

// Color theme struct containing just the color fields
typedef struct {
  GColor timeColor;
  GColor subtextPrimaryColor;
  GColor subtextSecondaryColor;
  GColor bgColor;
  GColor pipColorPrimary;
  GColor pipColorSecondary;
  GColor ringStrokeColor;
  GColor ringNightColor;
  GColor ringDayColor;
  GColor ringSunriseColor;
  GColor ringSunsetColor;
  GColor sunStrokeColor;
  GColor sunFillColor;
} ColorTheme;

typedef struct {
  // text colors
  GColor timeColor;
  GColor subtextPrimaryColor;
  GColor subtextSecondaryColor;

  // decoration colors
  GColor bgColor;
  GColor pipColorPrimary;
  GColor pipColorSecondary;
  GColor ringStrokeColor;
  GColor ringNightColor;
  GColor ringDayColor;
  GColor ringSunriseColor;
  GColor ringSunsetColor;
  GColor sunStrokeColor;
  GColor sunFillColor;

  // night theme colors
  GColor nightTimeColor;
  GColor nightSubtextPrimaryColor;
  GColor nightSubtextSecondaryColor;
  GColor nightBgColor;
  GColor nightPipColorPrimary;
  GColor nightPipColorSecondary;
  GColor nightRingStrokeColor;
  GColor nightRingNightColor;
  GColor nightRingDayColor;
  GColor nightRingSunriseColor;
  GColor nightRingSunsetColor;
  GColor nightSunStrokeColor;
  GColor nightSunFillColor;

  bool useNightTheme;
  bool useLargeFonts;
  bool showLeadingZero;
  PipVisibilityType pipVisibility;
  TempUnitType tempUnit;

  // Widget slots (stored as format strings)
  char widgetUpperSecondary[WIDGET_TEXT_LEN];
  char widgetUpperPrimary[WIDGET_TEXT_LEN];
  char widgetLowerPrimary[WIDGET_TEXT_LEN];
  char widgetLowerSecondary[WIDGET_TEXT_LEN];
} Settings;

typedef struct {
  // text colors
  GColor timeColor;
  GColor subtextPrimaryColor;
  GColor subtextSecondaryColor;

  // decoration colors
  GColor bgColor;
  GColor pipColorPrimary;
  GColor pipColorSecondary;
  GColor ringStrokeColor;
  GColor ringNightColor;
  GColor ringDayColor;
  GColor ringSunriseColor;
  GColor ringSunsetColor;
  GColor sunStrokeColor;
  GColor sunFillColor;

  // night theme colors
  GColor nightTimeColor;
  GColor nightSubtextPrimaryColor;
  GColor nightSubtextSecondaryColor;
  GColor nightBgColor;
  GColor nightPipColorPrimary;
  GColor nightPipColorSecondary;
  GColor nightRingStrokeColor;
  GColor nightRingNightColor;
  GColor nightRingDayColor;
  GColor nightRingSunriseColor;
  GColor nightRingSunsetColor;
  GColor nightSunStrokeColor;
  GColor nightSunFillColor;

  bool useNightTheme;
  bool useLargeFonts;
  bool showLeadingZero;

  PipVisibilityType pipVisibility;
  TempUnitType tempUnit;

  // Widget slots (stored as format strings)
  char widgetUpperSecondary[WIDGET_TEXT_LEN];
  char widgetUpperPrimary[WIDGET_TEXT_LEN];
  char widgetLowerPrimary[WIDGET_TEXT_LEN];
  char widgetLowerSecondary[WIDGET_TEXT_LEN];
} StoredSettings;

extern Settings globalSettings;

ColorTheme getCurrentColorTheme();

void Settings_init();
void Settings_deinit();
void Settings_loadFromStorage();
void Settings_saveToStorage();
void Settings_updateDynamicSettings();
