// Halcyon Watchface Configuration with Data URI
var configURL = "http://localhost:3000/config.html";

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

// Listen for when configuration is requested
Pebble.addEventListener('showConfiguration', function () {
  var url = configURL;
  Pebble.openURL(url);
});

// Listen for when configuration is closed
Pebble.addEventListener('webviewclosed', function (e) {
  // Decode and parse the configuration data
  var configData = JSON.parse(decodeURIComponent(e.response));

  // Convert to proper format and send to watch
  var dict = {};

  // color settings
  if(configData.SETTING_TIME_COLOR) {
    dict.SETTING_TIME_COLOR = parseInt(configData.SETTING_TIME_COLOR, 16);
  }

  if(configData.SETTING_BG_COLOR) {
    dict.SETTING_BG_COLOR = parseInt(configData.SETTING_BG_COLOR, 16);
  }

  if(configData.SETTING_SUBTEXT_PRIMARY_COLOR) {
    dict.SETTING_SUBTEXT_PRIMARY_COLOR = parseInt(configData.SETTING_SUBTEXT_PRIMARY_COLOR, 16);
  }

  if(configData.SETTING_SUBTEXT_SECONDARY_COLOR) {
    dict.SETTING_SUBTEXT_SECONDARY_COLOR = parseInt(configData.SETTING_SUBTEXT_SECONDARY_COLOR, 16);
  }

  if(configData.SETTING_PIP_COLOR_PRIMARY) {
    dict.SETTING_PIP_COLOR_PRIMARY = parseInt(configData.SETTING_PIP_COLOR_PRIMARY, 16);
  }

  if(configData.SETTING_PIP_COLOR_SECONDARY) {
    dict.SETTING_PIP_COLOR_SECONDARY = parseInt(configData.SETTING_PIP_COLOR_SECONDARY, 16);
  }

  if(configData.SETTING_RING_STROKE_COLOR) {
    dict.SETTING_RING_STROKE_COLOR = parseInt(configData.SETTING_RING_STROKE_COLOR, 16);
  }

  if(configData.SETTING_RING_NIGHT_COLOR) {
    dict.SETTING_RING_NIGHT_COLOR = parseInt(configData.SETTING_RING_NIGHT_COLOR, 16);
  }

  if(configData.SETTING_RING_DAY_COLOR) {
    dict.SETTING_RING_DAY_COLOR = parseInt(configData.SETTING_RING_DAY_COLOR, 16);
  }

  if(configData.SETTING_RING_SUNRISE_COLOR) {
    dict.SETTING_RING_SUNRISE_COLOR = parseInt(configData.SETTING_RING_SUNRISE_COLOR, 16);
  }

  if(configData.SETTING_RING_SUNSET_COLOR) {
    dict.SETTING_RING_SUNSET_COLOR = parseInt(configData.SETTING_RING_SUNSET_COLOR, 16);
  }

  if(configData.SETTING_SUN_STROKE_COLOR) {
    dict.SETTING_SUN_STROKE_COLOR = parseInt(configData.SETTING_SUN_STROKE_COLOR, 16);
  }

  if(configData.SETTING_SUN_FILL_COLOR) {
    dict.SETTING_SUN_FILL_COLOR = parseInt(configData.SETTING_SUN_FILL_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_TIME_COLOR) {
    dict.SETTING_NIGHT_TIME_COLOR = parseInt(configData.SETTING_NIGHT_TIME_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_BG_COLOR) {
    dict.SETTING_NIGHT_BG_COLOR = parseInt(configData.SETTING_NIGHT_BG_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR) {
    dict.SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR = parseInt(configData.SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR) {
    dict.SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR = parseInt(configData.SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_PIP_COLOR_PRIMARY) {
    dict.SETTING_NIGHT_PIP_COLOR_PRIMARY = parseInt(configData.SETTING_NIGHT_PIP_COLOR_PRIMARY, 16);
  }

  if(configData.SETTING_NIGHT_PIP_COLOR_SECONDARY) {
    dict.SETTING_NIGHT_PIP_COLOR_SECONDARY = parseInt(configData.SETTING_NIGHT_PIP_COLOR_SECONDARY, 16);
  }

  if(configData.SETTING_NIGHT_RING_STROKE_COLOR) {
    dict.SETTING_NIGHT_RING_STROKE_COLOR = parseInt(configData.SETTING_NIGHT_RING_STROKE_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_RING_NIGHT_COLOR) {
    dict.SETTING_NIGHT_RING_NIGHT_COLOR = parseInt(configData.SETTING_NIGHT_RING_NIGHT_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_RING_DAY_COLOR) {
    dict.SETTING_NIGHT_RING_DAY_COLOR = parseInt(configData.SETTING_NIGHT_RING_DAY_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_RING_SUNRISE_COLOR) {
    dict.SETTING_NIGHT_RING_SUNRISE_COLOR = parseInt(configData.SETTING_NIGHT_RING_SUNRISE_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_RING_SUNSET_COLOR) {
    dict.SETTING_NIGHT_RING_SUNSET_COLOR = parseInt(configData.SETTING_NIGHT_RING_SUNSET_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_SUN_STROKE_COLOR) {
    dict.SETTING_NIGHT_SUN_STROKE_COLOR = parseInt(configData.SETTING_NIGHT_SUN_STROKE_COLOR, 16);
  }

  if(configData.SETTING_NIGHT_SUN_FILL_COLOR) {
    dict.SETTING_NIGHT_SUN_FILL_COLOR = parseInt(configData.SETTING_NIGHT_SUN_FILL_COLOR, 16);
  }

  // Process non-color settings
  Object.keys(configData).forEach(function (key) {
    if (!key.includes('COLOR')) {
      if (typeof configData[key] === 'boolean') {
        dict[key] = configData[key] ? 1 : 0;
      } else {
        dict[key] = configData[key];
      }
    }
  });

  // Send to watchapp
  Pebble.sendAppMessage(dict,
    function () {
      console.log('Config data sent successfully!');
    },
    function (e) {
      console.log('Error sending config data!');
    }
  );
});
