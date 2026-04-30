#!/usr/bin/env node
// Verifies that every localized array in src/pkjs/languages.js has exactly 37
// entries (one per supported language) and that no entry is missing or empty.
// Run via `npm run check:i18n`.

var Languages = require('../src/pkjs/languages');

var EXPECTED = 37;
var failures = [];

function checkArray(label, arr) {
  if (!Array.isArray(arr)) {
    failures.push(label + ': not an array');
    return;
  }
  if (arr.length !== EXPECTED) {
    failures.push(label + ': has ' + arr.length + ' entries, expected ' + EXPECTED);
    return;
  }
  for (var i = 0; i < arr.length; i++) {
    var v = arr[i];
    if (typeof v !== 'string' || v.length === 0) {
      failures.push(label + ': entry [' + i + '] is missing or empty');
    }
  }
}

// Weather codes: object keyed by WMO code, each value an array of 37 strings.
var codes = Languages.weatherCodes;
var codeKeys = Object.keys(codes).sort(function (a, b) { return Number(a) - Number(b); });
codeKeys.forEach(function (k) {
  checkArray('weatherCodes[' + k + ']', codes[k]);
});

// Cardinals: array of 37 sub-arrays (8 directions each).
if (!Array.isArray(Languages.cardinals)) {
  failures.push('cardinals: not an array');
} else if (Languages.cardinals.length !== EXPECTED) {
  failures.push('cardinals: has ' + Languages.cardinals.length + ' entries, expected ' + EXPECTED);
} else {
  Languages.cardinals.forEach(function (dirs, i) {
    if (!Array.isArray(dirs) || dirs.length !== 8) {
      failures.push('cardinals[' + i + ']: expected 8 directions, got ' + (Array.isArray(dirs) ? dirs.length : 'non-array'));
    } else {
      dirs.forEach(function (d, j) {
        if (typeof d !== 'string' || d.length === 0) {
          failures.push('cardinals[' + i + '][' + j + ']: missing or empty');
        }
      });
    }
  });
}

// Labels: array of 37 objects with required keys.
var requiredLabelKeys = ['STEPS', 'WEEK', 'DAY', 'DIST_METRIC', 'DIST_IMPERIAL', 'WIND_METRIC', 'WIND_IMPERIAL'];
if (!Array.isArray(Languages.labels)) {
  failures.push('labels: not an array');
} else if (Languages.labels.length !== EXPECTED) {
  failures.push('labels: has ' + Languages.labels.length + ' entries, expected ' + EXPECTED);
} else {
  Languages.labels.forEach(function (lbl, i) {
    requiredLabelKeys.forEach(function (k) {
      if (typeof lbl[k] !== 'string' || lbl[k].length === 0) {
        failures.push('labels[' + i + '].' + k + ': missing or empty');
      }
    });
  });
}

console.log('Checked ' + codeKeys.length + ' weather codes, cardinals, and labels.');

if (failures.length > 0) {
  console.error('\nFAILED with ' + failures.length + ' issue(s):');
  failures.forEach(function (f) { console.error('  - ' + f); });
  process.exit(1);
}

console.log('OK — all localized tables have ' + EXPECTED + ' entries.');
