
// ============================================================
// Halcyon PebbleKit JS — index.js
// ============================================================
// Architecture: Two-pass token substitution.
//   Pass 1 (here): substitutes JS-side tokens like {temp}, {sunrise}, {cond}
//   Pass 2 (watch): substitutes C-side tokens like {date}, {steps}, {batt}
//
// Refresh mechanism: The watch sends a REQUEST_UPDATE message every 30 min.
// This replaces the old setInterval approach, which was unreliable in PKJS
// (the JS runtime can be suspended/killed by the phone OS at any time).
// ============================================================

var USE_LOCAL_CONFIG = true;
var configDataUri = 'https://halcyon.freakified.net/';
var configLocalUri = 'http://10.25.219.9:3000/index.html';

var SunCalc = require('./suncalc');
var Weather = require('./weather');

// Cached data (in-memory; also persisted to localStorage)
var cachedWeather = null;
var cachedSolar = null;
var cachedSettings = null;

// 24-hour preference from the watch (updated on each heartbeat)
var cachedIs24h = false;

// Default widget format strings — used when no settings have been configured yet
// so that JS can perform token substitution even on first run.
// These must match the defaults in config-page/src/data/widgetTypes.ts.
var DEFAULT_WIDGETS = {
  'SETTING_WIDGET_UPPER_SECONDARY': '{thi}° / {tlo}°',
  'SETTING_WIDGET_UPPER_PRIMARY': '{temp}° {cond}',
  'SETTING_WIDGET_LOWER_PRIMARY': '{date:%a, %b %e}',
  'SETTING_WIDGET_LOWER_SECONDARY': '{steps} STEPS'
};

// ---- Time helpers ----

function formatMinutes(minutes, use24h) {
  if (minutes < 0) return '--:--';
  var h = Math.floor(minutes / 60) % 24;
  var m = minutes % 60;
  if (use24h) {
    return h + ':' + (m < 10 ? '0' : '') + m;
  }
  var ampm = h >= 12 ? 'PM' : 'AM';
  var h12 = h % 12 || 12;
  return h12 + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
}

// ---- Pass 1: token substitution ----

/**
 * Given a format string like "{temp}° {cond} · {sunrise}", replaces all
 * JS-side tokens with their current values and returns the result.
 * Unknown tokens (e.g. {date}, {steps}) are left untouched for the C side.
 */
function applyJsTokens(formatStr, weather, solar, useFahrenheit, use24h) {
  if (!formatStr) return formatStr;

  var result = formatStr;

  // Solar tokens
  if (solar) {
    result = result.replace('{sunrise}', formatMinutes(solar.sunriseMinute, use24h));
    result = result.replace('{sunset}', formatMinutes(solar.sunsetMinute, use24h));
  } else {
    result = result.replace('{sunrise}', '--:--');
    result = result.replace('{sunset}', '--:--');
  }

  // Weather tokens
  if (weather) {
    var temp = useFahrenheit ? Weather.toF(weather.temp) : Math.round(weather.temp);
    var tempHi = useFahrenheit ? Weather.toF(weather.tempHi) : Math.round(weather.tempHi);
    var tempLo = useFahrenheit ? Weather.toF(weather.tempLo) : Math.round(weather.tempLo);
    var dew = useFahrenheit ? Weather.toF(weather.dew) : Math.round(weather.dew);
    var wind = useFahrenheit ? Weather.toMPH(weather.wind) : Math.round(weather.wind);
    var rain = useFahrenheit ? Weather.toInch(weather.rain) : weather.rain.toFixed(1);

    result = result.replace('{temp}', String(temp));
    result = result.replace('{thi}', String(tempHi));
    result = result.replace('{tlo}', String(tempLo));
    result = result.replace('{cond}', weather.cond || '--');
    result = result.replace('{cond_day}', weather.cond_day || '--');
    result = result.replace('{hum}', String(Math.round(weather.hum)));
    result = result.replace('{wind}', String(wind));
    result = result.replace('{uv}', String(Math.round(weather.uv)));
    result = result.replace('{rain}', String(rain));
    result = result.replace('{pop}', String(Math.round(weather.pop)));
    result = result.replace('{dew}', String(dew));
    result = result.replace('{temp_unit}', useFahrenheit ? '°F' : '°C');
    result = result.replace('{wind_unit}', useFahrenheit ? 'MPH' : 'KM/H');
    result = result.replace('{wind_dir}', Weather.getCardinal(weather.wind_dir));
  } else {
    // No weather data yet — replace with placeholders so the watch shows something
    var dash = '--';
    ['temp', 'thi', 'tlo', 'cond', 'cond_day', 'hum', 'wind', 'uv', 'rain', 'pop', 'dew', 'temp_unit', 'wind_unit', 'wind_dir'].forEach(function (t) {
      result = result.replace('{' + t + '}', dash);
    });
  }

  return result;
}

// ---- Build and send all data to watch ----

function sendDataToWatch() {
  var settings = cachedSettings;
  if (!settings) {
    console.log('No settings cached yet, using defaults');
    settings = {};
  }

  var useFahrenheit = (settings.SETTING_TEMP_UNIT === 1);
  var use24h = cachedIs24h;

  // Prepare Pass 1 output for each widget slot
  var slotKeys = [
    'SETTING_WIDGET_UPPER_SECONDARY',
    'SETTING_WIDGET_UPPER_PRIMARY',
    'SETTING_WIDGET_LOWER_PRIMARY',
    'SETTING_WIDGET_LOWER_SECONDARY'
  ];

  var msg = {};

  slotKeys.forEach(function (key) {
    // Use configured setting, falling back to default format string
    var fmt = settings[key];
    if (fmt === undefined || fmt === null) {
      fmt = DEFAULT_WIDGETS[key];
    }
    if (fmt !== undefined && fmt !== null) {
      // Apply JS tokens; C tokens pass through untouched
      var processed = applyJsTokens(fmt, cachedWeather, cachedSolar, useFahrenheit, use24h);
      msg[key] = processed;
    }
  });

  // Send solar minutes for the ring
  if (cachedSolar) {
    msg['WEATHER_SUNRISE_MINUTE'] = cachedSolar.sunriseMinute;
    msg['WEATHER_SUNSET_MINUTE'] = cachedSolar.sunsetMinute;
  }

  // Send temp unit setting
  msg['SETTING_TEMP_UNIT'] = useFahrenheit ? 1 : 0;

  console.log('Sending to watch: ' + JSON.stringify(msg));

  Pebble.sendAppMessage(msg,
    function () { console.log('Data sent to watch successfully'); },
    function (e) { console.log('Error sending data to watch: ' + JSON.stringify(e)); }
  );
}

// ---- Location + weather fetch ----

function locationError(err) {
  console.log('Location error: ' + err.message);
}

function locationSuccess(pos) {
  var lat = pos.coords.latitude;
  var lng = pos.coords.longitude;

  // Calculate sunrise/sunset on the JS side
  var times = SunCalc.getTimes(new Date(), lat, lng);
  var solar = {
    sunriseMinute: times.sunrise.getHours() * 60 + times.sunrise.getMinutes(),
    sunsetMinute: times.sunset.getHours() * 60 + times.sunset.getMinutes()
  };
  cachedSolar = solar;
  localStorage.setItem('halcyonSolar', JSON.stringify(solar));
  console.log('Solar: sunrise=' + solar.sunriseMinute + ', sunset=' + solar.sunsetMinute);

  // Send to watch immediately (even before weather)
  sendDataToWatch();

  // Fetch weather
  Weather.fetch(lat, lng, function (data) {
    cachedWeather = data;
    sendDataToWatch();
  });

  // NOTE: No setInterval here! The watch sends REQUEST_UPDATE on a timer,
  // which triggers getLocation() → this function again. That approach is
  // reliable because the watch timer always runs, unlike JS setInterval
  // which can be killed when the phone suspends the PKJS runtime.
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    locationSuccess,
    locationError,
    { timeout: 15000, maximumAge: 60000 }
  );
}

// ---- App lifecycle ----

Pebble.addEventListener('ready', function (e) {
  console.log('PebbleKit JS ready');

  // Restore cached weather/solar from previous session
  cachedWeather = Weather.restore();
  var savedSolar = localStorage.getItem('halcyonSolar');
  if (savedSolar) {
    try { cachedSolar = JSON.parse(savedSolar); } catch (e) { }
  }

  // Restore settings
  var savedSettings = localStorage.getItem('halcyonSettings');
  if (savedSettings) {
    try { cachedSettings = JSON.parse(savedSettings); } catch (e) { }
  }

  // If we have cached data, send it immediately so the watch has something
  // (uses defaults if no settings configured yet)
  sendDataToWatch();

  // Then kick off a fresh location + weather fetch
  getLocation();
});

// ---- Watch-initiated heartbeat ----
// The watch sends REQUEST_UPDATE every ~30 minutes to request fresh data.
// It also includes its 24h time format preference.
Pebble.addEventListener('appmessage', function (e) {
  console.log('Received message from watch: ' + JSON.stringify(e.payload));

  if (e.payload['REQUEST_UPDATE']) {
    // Extract 24h preference from the watch
    if (e.payload['WATCH_IS_24H'] !== undefined) {
      cachedIs24h = !!e.payload['WATCH_IS_24H'];
      console.log('Watch 24h mode: ' + cachedIs24h);
    }

    // Trigger a full location + weather refresh
    getLocation();
  }
});

// ---- Configuration ----

Pebble.addEventListener('showConfiguration', function () {
  var url = USE_LOCAL_CONFIG ? configLocalUri : configDataUri;

  var watchInfo = Pebble.getActiveWatchInfo();
  url += (url.indexOf('?') === -1 ? '?' : '&') + 'watchInfo=' + encodeURIComponent(JSON.stringify({
    platform: watchInfo.platform,
    model: watchInfo.model,
    language: watchInfo.language,
    firmware: {
      major: watchInfo.firmware.major,
      minor: watchInfo.firmware.minor
    }
  }));

  var persistedSettings = localStorage.getItem('halcyonSettings');
  if (persistedSettings) {
    try {
      var settings = JSON.parse(persistedSettings);
      url += '&settings=' + encodeURIComponent(JSON.stringify(settings));
    } catch (e) {
      console.log('Error loading persisted settings:', e);
    }
  }

  console.log('Opening Config URL: ' + url);
  Pebble.openURL(url);
});

Pebble.addEventListener('webviewclosed', function (e) {
  console.log('Configuration window closed');

  if (!e.response || e.response === 'CANCELLED' || e.response === 'null' || e.response === '{}') {
    console.log('No configuration data returned');
    return;
  }

  var configData;
  try {
    configData = JSON.parse(decodeURIComponent(e.response));
  } catch (err) {
    console.log('Error parsing configuration response: ' + err);
    try {
      configData = JSON.parse(e.response);
    } catch (err2) {
      console.log('Failed to parse config data even without decoding');
      return;
    }
  }

  if (configData.return_to) {
    delete configData.return_to;
  }

  // Save to localStorage for persistence
  localStorage.setItem('halcyonSettings', JSON.stringify(configData));
  cachedSettings = configData;

  // Convert to proper format and send to watch
  var dict = {};

  var colorKeys = [
    'SETTING_TIME_COLOR', 'SETTING_BG_COLOR',
    'SETTING_SUBTEXT_PRIMARY_COLOR', 'SETTING_SUBTEXT_SECONDARY_COLOR',
    'SETTING_PIP_COLOR_PRIMARY', 'SETTING_PIP_COLOR_SECONDARY',
    'SETTING_RING_STROKE_COLOR', 'SETTING_RING_NIGHT_COLOR', 'SETTING_RING_DAY_COLOR',
    'SETTING_RING_SUNRISE_COLOR', 'SETTING_RING_SUNSET_COLOR',
    'SETTING_SUN_STROKE_COLOR', 'SETTING_SUN_FILL_COLOR',
    'SETTING_NIGHT_TIME_COLOR', 'SETTING_NIGHT_BG_COLOR',
    'SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR', 'SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR',
    'SETTING_NIGHT_PIP_COLOR_PRIMARY', 'SETTING_NIGHT_PIP_COLOR_SECONDARY',
    'SETTING_NIGHT_RING_STROKE_COLOR', 'SETTING_NIGHT_RING_NIGHT_COLOR', 'SETTING_NIGHT_RING_DAY_COLOR',
    'SETTING_NIGHT_RING_SUNRISE_COLOR', 'SETTING_NIGHT_RING_SUNSET_COLOR',
    'SETTING_NIGHT_SUN_STROKE_COLOR', 'SETTING_NIGHT_SUN_FILL_COLOR'
  ];

  // Widget string keys — these get Pass 1 applied instead of raw send
  var widgetKeys = [
    'SETTING_WIDGET_UPPER_SECONDARY',
    'SETTING_WIDGET_UPPER_PRIMARY',
    'SETTING_WIDGET_LOWER_PRIMARY',
    'SETTING_WIDGET_LOWER_SECONDARY'
  ];

  // Process color settings
  for (var i = 0; i < colorKeys.length; i++) {
    var key = colorKeys[i];
    if (configData[key]) {
      dict[key] = parseInt(configData[key].replace('#', ''), 16);
    }
  }

  // Process non-color, non-widget settings
  Object.keys(configData).forEach(function (key) {
    if (colorKeys.indexOf(key) === -1 && widgetKeys.indexOf(key) === -1) {
      var value = configData[key];
      if (typeof value === 'boolean') {
        dict[key] = value ? 1 : 0;
      } else if (typeof value === 'string' && !isNaN(value)) {
        dict[key] = parseInt(value, 10);
      } else {
        dict[key] = value;
      }
    }
  });

  console.log('Sending non-widget config to Pebble: ' + JSON.stringify(dict));

  Pebble.sendAppMessage(dict,
    function () { console.log('Config sent successfully!'); },
    function (e) { console.log('Error sending config: ' + JSON.stringify(e)); }
  );

  // Now apply Pass 1 to widget strings and send them with current weather/solar data
  sendDataToWatch();
});
