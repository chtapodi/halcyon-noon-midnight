
// ---- OpenMeteo weather code → human-readable label ----

var WEATHER_CODES = {
  0: 'CLEAR',
  1: 'MOSTLY CLEAR', 2: 'PARTLY CLOUDY', 3: 'OVERCAST',
  45: 'FOGGY', 48: 'FOGGY',
  51: 'DRIZZLE', 53: 'DRIZZLE', 55: 'DRIZZLE',
  56: 'FRZG DRIZZLE', 57: 'FRZG DRIZZLE',
  61: 'LIGHT RAIN', 63: 'RAIN', 65: 'HEAVY RAIN',
  66: 'FREEZING RAIN', 67: 'FREEZING RAIN',
  71: 'LIGHT SNOW', 73: 'SNOW', 75: 'HEAVY SNOW',
  77: 'SNOW GRAINS',
  80: 'SHOWERS', 81: 'SHOWERS', 82: 'HEAVY SHOWERS',
  85: 'SNOW SHOWERS', 86: 'SNOW SHOWERS',
  95: 'THUNDERSTORM', 96: 'HAIL STORM', 99: 'HAIL STORM'
};

var OPENMETEO_BASE = 'https://api.open-meteo.com/v1/forecast';

function toF(celsius) {
  return Math.round(celsius * 9 / 5 + 32);
}

function fetchWeather(lat, lng, callback) {
  var url = OPENMETEO_BASE +
    '?latitude=' + lat +
    '&longitude=' + lng +
    '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,uv_index,dew_point_2m' +
    '&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max' +
    '&timezone=auto';

  console.log(url);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        var data = JSON.parse(xhr.responseText);
        var cur = data.current;
        var daily = data.daily;

        var code = cur.weather_code;
        var codeDay = daily.weather_code[0];
        var weather = {
          temp: cur.temperature_2m,
          tempHi: daily.temperature_2m_max[0],
          tempLo: daily.temperature_2m_min[0],
          cond: WEATHER_CODES[code] || ('WX' + code),
          cond_day: WEATHER_CODES[codeDay] || ('WX' + codeDay),
          hum: cur.relative_humidity_2m,
          wind: cur.wind_speed_10m,
          uv: cur.uv_index,
          rain: cur.precipitation,
          pop: daily.precipitation_probability_max[0],
          dew: cur.dew_point_2m
        };

        localStorage.setItem('halcyonWeather', JSON.stringify(weather));
        console.log('Weather fetched: ' + JSON.stringify(weather));

        if (callback) callback(weather);
      } catch (e) {
        console.log('Error parsing weather response: ' + e);
      }
    } else {
      console.log('Weather fetch failed, status: ' + xhr.status);
    }
  };
  xhr.onerror = function () {
    console.log('Weather fetch network error');
  };
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

module.exports = {
  fetch: fetchWeather,
  restore: restoreWeather,
  toF: toF,
  codes: WEATHER_CODES
};
