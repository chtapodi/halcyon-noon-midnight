const USE_SERVER_CONFIG = true;
// const configDataUri = require('./configDataUri.js');
const configLocalUri = 'http://localhost:3000/config.html';

function locationError(err) {
  console.log('location error on the JS side :-(');
}

function locationSuccess(pos) {
  // now that we have the location, get the timezone offset 
  var tzOffset = new Date().getTimezoneOffset() * -1;

  // collect everything to send
  var message = {
    'LOCATION_LAT': Math.round(pos.coords.latitude * 1000000),
    'LOCATION_LNG': Math.round(pos.coords.longitude * 1000000),
    'LOCATION_GMT_OFFSET': tzOffset
  };

  // send the message to the watch
  Pebble.sendAppMessage(message,
    function (e) {
      // console.log('Location info sent to Pebble successfully!');
    },
    function (e) {
      // console.log('Error sending location info to Pebble!');
    }
  );
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    locationSuccess,
    locationError,
    { timeout: 15000, maximumAge: 60000 }
  );
}

// Listen for when the watchface is opened
Pebble.addEventListener('ready',
  function (e) {
    // first thing to do: send the watchface our location
    getLocation();
  }
);

// // Listen for when configuration is requested
// Pebble.addEventListener('showConfiguration', function () {
//   var url = USE_SERVER_CONFIG ? configLocalUri : configDataUri;
//   // Get watch platform
//   var watchInfo = Pebble.getWatchInfo();
//   var platform = watchInfo.platform;
//   // Append platform as URL param
//   url += (url.includes('?') ? '&' : '?') + 'platform=' + platform;
//   // Load persisted settings from localStorage
//   var persistedSettings = localStorage.getItem('halcyonSettings');
//   if (persistedSettings) {
//     try {
//       var settings = JSON.parse(persistedSettings);
//       // Append settings as URL param
//       url += '&settings=' + encodeURIComponent(JSON.stringify(settings));
//     } catch (e) {
//       console.log('Error loading persisted settings:', e);
//     }
//   }
//   Pebble.openURL(url);
// });

// Listen for when configuration is requested
Pebble.addEventListener('showConfiguration', function () {
  var url = USE_SERVER_CONFIG ? configLocalUri : configDataUri;
  
  // Load persisted settings from localStorage
  var persistedSettings = localStorage.getItem('halcyonSettings');
  if (persistedSettings) {
    try {
      var settings = JSON.parse(persistedSettings);
      // Append settings as URL param
      url += (url.indexOf('?') === -1 ? '?' : '&') + 'settings=' + encodeURIComponent(JSON.stringify(settings));
    } catch (e) {
      console.log('Error loading persisted settings:', e);
    }
  }
  
  console.log('Opening Config URL: ' + url);
  Pebble.openURL(url);
});

// Listen for when configuration is closed
Pebble.addEventListener('webviewclosed', function (e) {
  console.log('Configuration window closed');
  console.log('Response from config page: ' + e.response);

  if (!e.response || e.response === 'CANCELLED' || e.response === 'null' || e.response === '{}') {
    console.log('No configuration data returned');
    return;
  }

  // Decode and parse the configuration data
  var configData;
  try {
    configData = JSON.parse(decodeURIComponent(e.response));
  } catch (err) {
    console.log('Error parsing configuration response: ' + err);
    try {
      // Try without decoding just in case
      configData = JSON.parse(e.response);
    } catch (err2) {
      console.log('Failed to parse config data even without decoding');
      return;
    }
  }

  console.log('Parsed config data: ' + JSON.stringify(configData));

  // Remove return_to if it exists in configData to avoid loops
  if (configData.return_to) {
    delete configData.return_to;
  }

  // Save to localStorage for persistence
  localStorage.setItem('halcyonSettings', JSON.stringify(configData));

  // Convert to proper format and send to watch
  var dict = {};

  // color settings
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

  for (var i = 0; i < colorKeys.length; i++) {
    var key = colorKeys[i];
    if (configData[key]) {
      dict[key] = parseInt(configData[key].replace('#', ''), 16);
    }
  }

  // Process non-color settings
  Object.keys(configData).forEach(function (key) {
    if (colorKeys.indexOf(key) === -1) {
      var value = configData[key];
      if (typeof value === 'boolean') {
        dict[key] = value ? 1 : 0;
      } else if (typeof value === 'string' && !isNaN(value)) {
        // Convert string numbers to actual numbers
        dict[key] = parseInt(value, 10);
      } else {
        dict[key] = value;
      }
    }
  });

  console.log('Sending message to Pebble: ' + JSON.stringify(dict));

  // Send to watchapp
  Pebble.sendAppMessage(dict,
    function () {
      console.log('Config data sent successfully!');
    },
    function (e) {
      console.log('Error sending config data: ' + JSON.stringify(e));
    }
  );
});
