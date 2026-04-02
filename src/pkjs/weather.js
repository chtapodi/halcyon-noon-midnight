
// ---- OpenMeteo weather code → human-readable label ----

var WEATHER_CODES = {
  0: ['CLEAR', 'DESPEJADO', 'DÉGAGÉ', 'KLAR'],
  1: ['MOSTLY CLEAR', 'MAYORMENTE DESP.', 'PLUTÔT DÉGAGÉ', 'MEIST KLAR'],
  2: ['PARTLY CLOUDY', 'PARCIALMENTE NUB.', 'PART. NUAGEUX', 'TEILW. BEWÖLKT'],
  3: ['OVERCAST', 'NUBLADO', 'COUVERT', 'STARK BEWÖLKT'],
  45: ['FOGGY', 'NIEBLA', 'BROUILLARD', 'NEBEL'],
  48: ['FOGGY', 'NIEBLA', 'BROUILLARD', 'NEBEL'],
  51: ['DRIZZLE', 'LLOVIZNA', 'BRUINE', 'NIESELREGEN'],
  53: ['DRIZZLE', 'LLOVIZNA', 'BRUINE', 'NIESELREGEN'],
  55: ['DRIZZLE', 'LLOVIZNA', 'BRUINE', 'NIESELREGEN'],
  56: ['FRZG DRIZZLE', 'LLOVIZNA HELADA', 'BRUINE VERGL.', 'GEF. NIESELREGEN'],
  57: ['FRZG DRIZZLE', 'LLOVIZNA HELADA', 'BRUINE VERGL.', 'GEF. NIESELREGEN'],
  61: ['LIGHT RAIN', 'LLUVIA LIGERA', 'PLUIE LÉGÈRE', 'LEICHTER REGEN'],
  63: ['RAIN', 'LLUVIA', 'PLUIE', 'REGEN'],
  65: ['HEAVY RAIN', 'LLUVIA FUERTE', 'FORTE PLUIE', 'STARKER REGEN'],
  66: ['FREEZING RAIN', 'LLUVIA HELADA', 'PLUIE VERGL.', 'GEFRIERENDER REGEN'],
  67: ['FREEZING RAIN', 'LLUVIA HELADA', 'PLUIE VERGL.', 'GEFRIERENDER REGEN'],
  71: ['LIGHT SNOW', 'NIEVE LIGERA', 'NEIGE LÉGÈRE', 'LEICHTER SCHNEE'],
  73: ['SNOW', 'NIEVE', 'NEIGE', 'SCHNEE'],
  75: ['HEAVY SNOW', 'NIEVE FUERTE', 'FORTE NEIGE', 'STARKER SCHNEE'],
  77: ['SNOW GRAINS', 'GRANOS DE NIEVE', 'NEIGE EN GRAINS', 'SCHNEEGRIESEL'],
  80: ['SHOWERS', 'CHUBASCOS', 'AVERSES', 'REGENSCHAUER'],
  81: ['SHOWERS', 'CHUBASCOS', 'AVERSES', 'REGENSCHAUER'],
  82: ['HEAVY SHOWERS', 'CHUBASCOS FUCRTES', 'FORTES AVERSES', 'STARKE REGENSC.'],
  85: ['SNOW SHOWERS', 'CHUBASCOS NIEVE', 'AVERSES NEIGE', 'SCHNEESCHAUER'],
  86: ['SNOW SHOWERS', 'CHUBASCOS NIEVE', 'AVERSES NEIGE', 'SCHNEESCHAUER'],
  95: ['THUNDERSTORM', 'TORMENTA', 'ORAGE', 'GEWITTER'],
  96: ['HAIL STORM', 'TORM. GRANIZO', 'ORAGE GRÊLE', 'HAGELSTURM'],
  99: ['HAIL STORM', 'TORM. GRANIZO', 'ORAGE GRÊLE', 'HAGELSTURM']
};

function getCondition(code, lang) {
  var langIndex = lang || 0;
  if (WEATHER_CODES[code]) {
      return WEATHER_CODES[code][langIndex] || WEATHER_CODES[code][0];
  }
  return 'WX' + code;
}

var OPENMETEO_BASE = 'https://api.open-meteo.com/v1/forecast';

function fetchWeather(lat, lng, callback) {
  var url = OPENMETEO_BASE +
    '?latitude=' + lat +
    '&longitude=' + lng +
    '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation,uv_index,dew_point_2m' +
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
          code: code,
          codeDay: codeDay,
          hum: cur.relative_humidity_2m,
          wind: cur.wind_speed_10m,
          wind_dir: cur.wind_direction_10m,
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

function toF(celsius) {
  return Math.round(celsius * 9 / 5 + 32);
}

function toMPH(kmh) {
  return Math.round(kmh * 0.621371);
}

function toInch(mm) {
  return (mm * 0.03937).toFixed(2);
}

function getCardinal(degrees) {
  var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  var index = Math.round(degrees / 45) % 8;
  return directions[index];
}

module.exports = {
  fetch: fetchWeather,
  restore: restoreWeather,
  toF: toF,
  toMPH: toMPH,
  toInch: toInch,
  getCardinal: getCardinal,
  codes: WEATHER_CODES,
  getCondition: getCondition
};
