module.exports = function (minified) {
  var clayConfig = this;
  var _ = minified._;
  var $ = minified.$;

  // Define shared theme definitions (day theme colors)
  var sharedThemes = {
    "default": {
      "SETTING_TIME_COLOR": "000000",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "000000",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "555555",
      "SETTING_BG_COLOR": "FFFFFF",
      "SETTING_PIP_COLOR_PRIMARY": "000000",
      "SETTING_PIP_COLOR_SECONDARY": "AAAAAA",
      "SETTING_RING_STROKE_COLOR": "000000",
      "SETTING_RING_NIGHT_COLOR": "0055AA",
      "SETTING_RING_DAY_COLOR": "00AAFF",
      "SETTING_RING_SUNRISE_COLOR": "FFAAAA",
      "SETTING_RING_SUNSET_COLOR": "FFAA00",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "FFFF00"
    },
    "orangeDreams": {
      SETTING_TIME_COLOR: "FF5500",
      SETTING_SUBTEXT_PRIMARY_COLOR: "FF5500",
      SETTING_SUBTEXT_SECONDARY_COLOR: "AA0000",
      SETTING_BG_COLOR: "000000",
      SETTING_PIP_COLOR_PRIMARY: "FF5500",
      SETTING_PIP_COLOR_SECONDARY: "AA0000",
      SETTING_RING_STROKE_COLOR: "000000",
      SETTING_RING_NIGHT_COLOR: "000000",
      SETTING_RING_DAY_COLOR: "FF5500",
      SETTING_RING_SUNRISE_COLOR: "AA0000",
      SETTING_RING_SUNSET_COLOR: "AA0000",
      SETTING_SUN_STROKE_COLOR: "000000",
      SETTING_SUN_FILL_COLOR: "FF5500"
    },
    terminalGreen: {
      "SETTING_TIME_COLOR": "00ff00",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "00ff00",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "00aa00",
      "SETTING_BG_COLOR": "000000",
      "SETTING_PIP_COLOR_PRIMARY": "00ff00",
      "SETTING_PIP_COLOR_SECONDARY": "005500",
      "SETTING_RING_STROKE_COLOR": "000000",
      "SETTING_RING_NIGHT_COLOR": "000000",
      "SETTING_RING_DAY_COLOR": "00ff00",
      "SETTING_RING_SUNRISE_COLOR": "005500",
      "SETTING_RING_SUNSET_COLOR": "005500",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "00ff00"
    },
    mauveTheme: {
      "SETTING_TIME_COLOR": "ffffff",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "ffffff",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "ffffff",
      "SETTING_BG_COLOR": "aa00aa",
      "SETTING_PIP_COLOR_PRIMARY": "000000",
      "SETTING_PIP_COLOR_SECONDARY": "550055",
      "SETTING_RING_STROKE_COLOR": "000000",
      "SETTING_RING_NIGHT_COLOR": "550055",
      "SETTING_RING_DAY_COLOR": "aa55aa",
      "SETTING_RING_SUNRISE_COLOR": "aa00aa",
      "SETTING_RING_SUNSET_COLOR": "aa00aa",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "ffffff"
    },
    fireworkTheme: {
      "SETTING_TIME_COLOR": "ffffff",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "ffaa00",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "aa0000",
      "SETTING_BG_COLOR": "000000",
      "SETTING_PIP_COLOR_PRIMARY": "ff5500",
      "SETTING_PIP_COLOR_SECONDARY": "aa0000",
      "SETTING_RING_STROKE_COLOR": "000000",
      "SETTING_RING_NIGHT_COLOR": "000000",
      "SETTING_RING_DAY_COLOR": "000000",
      "SETTING_RING_SUNRISE_COLOR": "aa0000",
      "SETTING_RING_SUNSET_COLOR": "aa0000",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "ffaa00"
    },
    lightOceanTheme: {
      "SETTING_TIME_COLOR": "000000",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "000000",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "aaaaaa",
      "SETTING_BG_COLOR": "ffffff",
      "SETTING_PIP_COLOR_PRIMARY": "000000",
      "SETTING_PIP_COLOR_SECONDARY": "aaaaaa",
      "SETTING_RING_STROKE_COLOR": "ffffff",
      "SETTING_RING_NIGHT_COLOR": "0055aa",
      "SETTING_RING_DAY_COLOR": "ffffff",
      "SETTING_RING_SUNRISE_COLOR": "00aaff",
      "SETTING_RING_SUNSET_COLOR": "00aaff",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "ffff00"
    },
    roseTheme: {
      "SETTING_TIME_COLOR": "000000",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "000000",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "555555",
      "SETTING_BG_COLOR": "ffffff",
      "SETTING_PIP_COLOR_PRIMARY": "000000",
      "SETTING_PIP_COLOR_SECONDARY": "aaaaaa",
      "SETTING_RING_STROKE_COLOR": "ffffff",
      "SETTING_RING_NIGHT_COLOR": "ff00aa",
      "SETTING_RING_DAY_COLOR": "ffffff",
      "SETTING_RING_SUNRISE_COLOR": "ffaaaa",
      "SETTING_RING_SUNSET_COLOR": "ffaaaa",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "ffff00"
    },
    oceanTheme: {
      "SETTING_TIME_COLOR": "ffffff",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "ffffff",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "ffffff",
      "SETTING_BG_COLOR": "000055",
      "SETTING_PIP_COLOR_PRIMARY": "ffffff",
      "SETTING_PIP_COLOR_SECONDARY": "0055aa",
      "SETTING_RING_STROKE_COLOR": "000000",
      "SETTING_RING_NIGHT_COLOR": "0000aa",
      "SETTING_RING_DAY_COLOR": "00aaff",
      "SETTING_RING_SUNRISE_COLOR": "0055ff",
      "SETTING_RING_SUNSET_COLOR": "0055ff",
      "SETTING_SUN_STROKE_COLOR": "ffffff",
      "SETTING_SUN_FILL_COLOR": "00aaff"
    },
    sandTheme: {
      "SETTING_TIME_COLOR": "000000",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "000000",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "550000",
      "SETTING_BG_COLOR": "ffff00",
      "SETTING_PIP_COLOR_PRIMARY": "aa5500",
      "SETTING_PIP_COLOR_SECONDARY": "ffaa00",
      "SETTING_RING_STROKE_COLOR": "ffff00",
      "SETTING_RING_NIGHT_COLOR": "aa5500",
      "SETTING_RING_DAY_COLOR": "ffff00",
      "SETTING_RING_SUNRISE_COLOR": "ffaa00",
      "SETTING_RING_SUNSET_COLOR": "ffaa00",
      "SETTING_SUN_STROKE_COLOR": "aa5500",
      "SETTING_SUN_FILL_COLOR": "ffaa55"
    },
    greyTheme: {
      "SETTING_TIME_COLOR": "ffffff",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "ffffff",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "ffffff",
      "SETTING_BG_COLOR": "000000",
      "SETTING_PIP_COLOR_PRIMARY": "ffffff",
      "SETTING_PIP_COLOR_SECONDARY": "aaaaaa",
      "SETTING_RING_STROKE_COLOR": "ffffff",
      "SETTING_RING_NIGHT_COLOR": "000000",
      "SETTING_RING_DAY_COLOR": "aaaaaa",
      "SETTING_RING_SUNRISE_COLOR": "555555",
      "SETTING_RING_SUNSET_COLOR": "555555",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "ffffff"
    },
    userTeal1: {
      "SETTING_TIME_COLOR": "00aaaa",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "ffff55",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "ffaa55",
      "SETTING_BG_COLOR": "000000",
      "SETTING_PIP_COLOR_PRIMARY": "000000",
      "SETTING_PIP_COLOR_SECONDARY": "000000",
      "SETTING_RING_STROKE_COLOR": "005555",
      "SETTING_RING_NIGHT_COLOR": "000000",
      "SETTING_RING_DAY_COLOR": "55ffff",
      "SETTING_RING_SUNRISE_COLOR": "ff5500",
      "SETTING_RING_SUNSET_COLOR": "ff5500",
      "SETTING_SUN_STROKE_COLOR": "005555",
      "SETTING_SUN_FILL_COLOR": "ffff55"
    },
    bwTheme1: {
      "SETTING_TIME_COLOR": "000000",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "000000",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "000000",
      "SETTING_BG_COLOR": "ffffff",
      "SETTING_PIP_COLOR_PRIMARY": "000000",
      "SETTING_PIP_COLOR_SECONDARY": "000000",
      "SETTING_RING_STROKE_COLOR": "000000",
      "SETTING_RING_NIGHT_COLOR": "000000",
      "SETTING_RING_DAY_COLOR": "ffffff",
      "SETTING_RING_SUNRISE_COLOR": "aaaaaa",
      "SETTING_RING_SUNSET_COLOR": "aaaaaa",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "ffffff"
    },
    bwTheme2: {
      "SETTING_TIME_COLOR": "ffffff",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "ffffff",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "ffffff",
      "SETTING_BG_COLOR": "000000",
      "SETTING_PIP_COLOR_PRIMARY": "ffffff",
      "SETTING_PIP_COLOR_SECONDARY": "ffffff",
      "SETTING_RING_STROKE_COLOR": "000000",
      "SETTING_RING_NIGHT_COLOR": "000000",
      "SETTING_RING_DAY_COLOR": "ffffff",
      "SETTING_RING_SUNRISE_COLOR": "aaaaaa",
      "SETTING_RING_SUNSET_COLOR": "aaaaaa",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "ffffff"
    },
    bwTheme3: {
      "SETTING_TIME_COLOR": "000000",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "000000",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "aaaaaa",
      "SETTING_BG_COLOR": "ffffff",
      "SETTING_PIP_COLOR_PRIMARY": "000000",
      "SETTING_PIP_COLOR_SECONDARY": "000000",
      "SETTING_RING_STROKE_COLOR": "ffffff",
      "SETTING_RING_NIGHT_COLOR": "000000",
      "SETTING_RING_DAY_COLOR": "ffffff",
      "SETTING_RING_SUNRISE_COLOR": "aaaaaa",
      "SETTING_RING_SUNSET_COLOR": "aaaaaa",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "ffffff"
    },
    "bwTheme4": {
      "SETTING_TIME_COLOR": "ffffff",
      "SETTING_SUBTEXT_PRIMARY_COLOR": "ffffff",
      "SETTING_SUBTEXT_SECONDARY_COLOR": "ffffff",
      "SETTING_BG_COLOR": "000000",
      "SETTING_PIP_COLOR_PRIMARY": "ffffff",
      "SETTING_PIP_COLOR_SECONDARY": "ffffff",
      "SETTING_RING_STROKE_COLOR": "000000",
      "SETTING_RING_NIGHT_COLOR": "000000",
      "SETTING_RING_DAY_COLOR": "000000",
      "SETTING_RING_SUNRISE_COLOR": "aaaaaa",
      "SETTING_RING_SUNSET_COLOR": "aaaaaa",
      "SETTING_SUN_STROKE_COLOR": "000000",
      "SETTING_SUN_FILL_COLOR": "ffffff"
    }
  };

  // Generate day and night presets from shared themes
  var presets = sharedThemes;
  var nightPresets = {};

  // Convert day theme keys to night theme keys
  var themeNames = Object.keys(sharedThemes);
  for (var i = 0; i < themeNames.length; i++) {
    var themeName = themeNames[i];
    var dayTheme = sharedThemes[themeName];
    var nightTheme = {};

    var dayKeys = Object.keys(dayTheme);
    for (var j = 0; j < dayKeys.length; j++) {
      var dayKey = dayKeys[j];
      var nightKey = dayKey.replace('SETTING_', 'SETTING_NIGHT_');
      nightTheme[nightKey] = dayTheme[dayKey];
    }

    nightPresets[themeName] = nightTheme;
  }

  function decimalToHex(decimalColor) {
    return ('0' + decimalColor.toString(16)).slice(-2);
  }

  function convertToHexFromDecimal(decimal) {
    var r = (decimal >> 16) & 0xFF;
    var g = (decimal >> 8) & 0xFF;
    var b = decimal & 0xFF;
    return '#' + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);
  }

  function toggleCustomSection(show, isNight) {
    var prefix = isNight ? 'SETTING_NIGHT_' : 'SETTING_';
    var customFields = [
      prefix + 'TIME_COLOR',
      prefix + 'SUBTEXT_PRIMARY_COLOR',
      prefix + 'SUBTEXT_SECONDARY_COLOR',
      prefix + 'BG_COLOR',
      prefix + 'PIP_COLOR_PRIMARY',
      prefix + 'PIP_COLOR_SECONDARY',
      prefix + 'RING_STROKE_COLOR',
      prefix + 'RING_NIGHT_COLOR',
      prefix + 'RING_DAY_COLOR',
      prefix + 'RING_SUNRISE_COLOR',
      prefix + 'RING_SUNSET_COLOR',
      prefix + 'SUN_STROKE_COLOR',
      prefix + 'SUN_FILL_COLOR'
    ];

    var items = [];
    for (var i = 0; i < customFields.length; i++) {
      var key = customFields[i];
      var item = clayConfig.getItemByMessageKey(key);
      items.push(item);
    }

    for (var j = 0; j < items.length; j++) {
      var currentItem = items[j];
      if (currentItem) {
        if (show) {
          currentItem.show();
        } else {
          currentItem.hide();
        }
      }
    }
  }

  function updateSVGColors(colorKey, colorValue, isNight) {
    var svgId = isNight ? 'svg-night-preview' : 'svg-preview';
    var svgContainer = document.getElementById(svgId);
    if (!svgContainer) return;

    var element = svgContainer.querySelector('#' + colorKey);
    if (element) {
      var hexColor;
      if (typeof colorValue === 'number') {
        hexColor = convertToHexFromDecimal(colorValue);
      } else {
        hexColor = '#' + colorValue;
      }
      element.setAttribute('fill', hexColor);
    }
  }


  function applyPreset() {
    var presetSelector = clayConfig.getItemByMessageKey('SETTING_PRESET');
    var selectedPreset = presetSelector.get();

    if (selectedPreset === "custom") {
      toggleCustomSection(true, false);
    } else {
      toggleCustomSection(false, false);

      var colors = presets[selectedPreset];
      var colorKeys = Object.keys(colors);
      for (var i = 0; i < colorKeys.length; i++) {
        var key = colorKeys[i];
        var item = clayConfig.getItemByMessageKey(key);
        if (item) {
          item.set(colors[key]);
        }
        updateSVGColors(key, colors[key], false);
      }
    }
  }

  function applyNightPreset() {
    var presetSelector = clayConfig.getItemByMessageKey('SETTING_NIGHT_PRESET');
    var selectedPreset = presetSelector.get();

    if (selectedPreset === "custom") {
      toggleCustomSection(true, true);
    } else {
      toggleCustomSection(false, true);

      var colors = nightPresets[selectedPreset];
      var colorKeys = Object.keys(colors);
      for (var i = 0; i < colorKeys.length; i++) {
        var key = colorKeys[i];
        var item = clayConfig.getItemByMessageKey(key);
        if (item) {
          item.set(colors[key]);
        }
        updateSVGColors(key, colors[key], true);
      }
    }
  }


  function attachColorListeners() {
    // Day theme color listeners
    var dayColorKeys = Object.keys(presets.default);
    for (var i = 0; i < dayColorKeys.length; i++) {
      var key = dayColorKeys[i];
      var colorPicker = clayConfig.getItemByMessageKey(key);
      if (colorPicker) {
        (function (localKey, localColorPicker) {
          colorPicker.on('change', function () {
            var newColor = localColorPicker.get();
            updateSVGColors(localKey, newColor, false);
          });
        })(key, colorPicker);
      }
    }

    // Night theme color listeners
    var nightColorKeys = Object.keys(nightPresets.default);
    for (var j = 0; j < nightColorKeys.length; j++) {
      var nightKey = nightColorKeys[j];
      var nightColorPicker = clayConfig.getItemByMessageKey(nightKey);
      if (nightColorPicker) {
        (function (localKey, localColorPicker) {
          nightColorPicker.on('change', function () {
            var newColor = localColorPicker.get();
            updateSVGColors(localKey, newColor, true);
          });
        })(nightKey, nightColorPicker);
      }
    }
  }

  function exportTheme() {
    var colorKeys = Object.keys(presets.default);
    var themeData = {};

    // Convert all colors to hex
    for (var i = 0; i < colorKeys.length; i++) {
      var key = colorKeys[i];
      var colorValue = clayConfig.getItemByMessageKey(key).get();

      // Ensure it's always in #RRGGBB format
      if (typeof colorValue === 'number') {
        themeData[key] = convertToHexFromDecimal(colorValue); // Convert decimal to hex
      } else {
        themeData[key] = '#' + colorValue; // Ensure hex is prefixed with #
      }
    }

    // Convert to JSON
    var jsonData = JSON.stringify(themeData, null, 2);
    var blob = new Blob([jsonData], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    // Create a download link
    var a = document.createElement("a");
    a.href = url;
    a.download = "watchface-theme.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }


  clayConfig.on(clayConfig.EVENTS.AFTER_BUILD, function () {
    var presetSelector = clayConfig.getItemByMessageKey('SETTING_PRESET');
    presetSelector.on('change', applyPreset);

    var nightPresetSelector = clayConfig.getItemByMessageKey('SETTING_NIGHT_PRESET');
    nightPresetSelector.on('change', applyNightPreset);

    applyPreset();
    applyNightPreset();
    attachColorListeners();

    var useNightThemeToggle = clayConfig.getItemByMessageKey('SETTING_USE_NIGHT_THEME');

    function toggleNightPresetAndPreview() {
      var isNightThemeEnabled = useNightThemeToggle.get();
      //  if night theme is disabled, hide everything related to it
      var nightPresetSelector = clayConfig.getItemByMessageKey('SETTING_NIGHT_PRESET');
      var nightPreviewElement = document.getElementById('svg-night-preview');

      if (isNightThemeEnabled) {
        nightPresetSelector.show();
        nightPreviewElement.style.display = 'block';
      } else {
        nightPresetSelector.hide();
        nightPreviewElement.style.display = 'none';
      }
    }
    useNightThemeToggle.on('change', toggleNightPresetAndPreview);
    toggleNightPresetAndPreview();

    // Initialize day theme preview
    var dayColorKeys = Object.keys(presets.default);
    for (var i = 0; i < dayColorKeys.length; i++) {
      var key = dayColorKeys[i];
      var colorValue = clayConfig.getItemByMessageKey(key).get();
      updateSVGColors(key, colorValue, false);
    }

    // Initialize night theme preview
    var nightColorKeys = Object.keys(nightPresets.default);
    for (var j = 0; j < nightColorKeys.length; j++) {
      var nightKey = nightColorKeys[j];
      var nightColorValue = clayConfig.getItemByMessageKey(nightKey).get();
      updateSVGColors(nightKey, nightColorValue, true);
    }

    // Create export button
    var exportButton = document.createElement("button");
    exportButton.textContent = "Export Theme";
    exportButton.style.cssText = "display: block; margin: 10px auto; padding: 10px; font-size: 16px;";
    exportButton.onclick = exportTheme;

    // Append to settings page
    document.body.appendChild(exportButton);
  });

};
