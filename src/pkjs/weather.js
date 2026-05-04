
// ---- OpenMeteo weather code → human-readable label ----

var Languages = require('./languages');

function getCondition(code, lang) {
  var langIndex = parseInt(lang) || 0;
  if (langIndex < 0 || langIndex > 36) langIndex = 0;

  var codes = Languages.weatherCodes;
  if (codes[code]) {
      return codes[code][langIndex] || codes[code][0];
  }
  return 'WX' + code;
}

var OPENMETEO_BASE = 'https://api.open-meteo.com/v1/forecast';
var FETCH_TIMEOUT_MS = 15000;

function fetchWeather(lat, lng, callback, errback) {
  var url = OPENMETEO_BASE +
    '?latitude=' + lat +
    '&longitude=' + lng +
    '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation,uv_index,dew_point_2m' +
    '&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max' +
    '&forecast_days=1' +
    '&timezone=auto';

  console.log(url);

  function fail(reason) {
    console.log('Weather fetch failed: ' + reason);
    if (errback) errback(reason);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.timeout = FETCH_TIMEOUT_MS;
  xhr.onload = function () {
    if (xhr.status !== 200) {
      fail('status ' + xhr.status);
      return;
    }
    try {
      var data = JSON.parse(xhr.responseText);
      var cur = data.current;
      var daily = data.daily;

      var weather = {
        temp: cur.temperature_2m,
        tempHi: daily.temperature_2m_max[0],
        tempLo: daily.temperature_2m_min[0],
        code: cur.weather_code,
        codeDay: daily.weather_code[0],
        hum: cur.relative_humidity_2m,
        wind: cur.wind_speed_10m,
        wind_dir: cur.wind_direction_10m,
        uv: cur.uv_index,
        rain: cur.precipitation,
        pop: daily.precipitation_probability_max[0],
        dew: cur.dew_point_2m,
        fetchedAt: Date.now()
      };

      localStorage.setItem('halcyonWeather', JSON.stringify(weather));
      console.log('Weather fetched: ' + JSON.stringify(weather));

      if (callback) callback(weather);
    } catch (e) {
      fail('parse error: ' + e);
    }
  };
  xhr.onerror = function () { fail('network error'); };
  xhr.ontimeout = function () { fail('timeout after ' + FETCH_TIMEOUT_MS + 'ms'); };
  xhr.send();
}

function restoreWeather() {
  var saved = localStorage.getItem('halcyonWeather');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  }
  return null;
}

function toF(celsius) {
  return Math.round(celsius * 9 / 5 + 32);
}

function toMPH(kmh) {
  return Math.round(kmh * 0.621371);
}

function toInch(mm) {
  return (mm * 0.03937).toFixed(2);
}

function getCardinal(degrees, lang) {
  var langIndex = parseInt(lang) || 0;
  if (langIndex < 0 || langIndex > 36) langIndex = 0;

  var index = Math.round(degrees / 45) % 8;
  return Languages.cardinals[langIndex][index];
}

module.exports = {
  fetch: fetchWeather,
  restore: restoreWeather,
  toF: toF,
  toMPH: toMPH,
  toInch: toInch,
  getCardinal: getCardinal,
  codes: Languages.weatherCodes,
  getCondition: getCondition
};
