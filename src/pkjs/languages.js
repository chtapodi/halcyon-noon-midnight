// ---- Localized strings for PebbleKit JS ----
//
// Language data lives in src/pkjs/languages/<code>.js.
// LANG_ORDER maps the numeric index sent from the watch to a language code.

var LANG_ORDER = [
  'en',
  'fr',
  'de',
  'es',
  'it',
  'nl',
  'tr',
  'cz',
  'pt',
  'el',
  'sv',
  'pl',
  'sk',
  'vi',
  'ro',
  'ca',
  'no',
  'ru',
  'et',
  'eu',
  'fi',
  'da',
  'lt',
  'sl',
  'hu',
  'hr',
  'ga',
  'lv',
  'sr',
  'zh',
  'id',
  'uk',
  'cy',
  'gl',
  'ja',
  'ko',
  'he',
  'en_gb'
];

var LANGUAGES = {
  en: require('./languages/en'),
  fr: require('./languages/fr'),
  de: require('./languages/de'),
  es: require('./languages/es'),
  it: require('./languages/it'),
  nl: require('./languages/nl'),
  tr: require('./languages/tr'),
  cz: require('./languages/cz'),
  pt: require('./languages/pt'),
  el: require('./languages/el'),
  sv: require('./languages/sv'),
  pl: require('./languages/pl'),
  sk: require('./languages/sk'),
  vi: require('./languages/vi'),
  ro: require('./languages/ro'),
  ca: require('./languages/ca'),
  no: require('./languages/no'),
  ru: require('./languages/ru'),
  et: require('./languages/et'),
  eu: require('./languages/eu'),
  fi: require('./languages/fi'),
  da: require('./languages/da'),
  lt: require('./languages/lt'),
  sl: require('./languages/sl'),
  hu: require('./languages/hu'),
  hr: require('./languages/hr'),
  ga: require('./languages/ga'),
  lv: require('./languages/lv'),
  sr: require('./languages/sr'),
  zh: require('./languages/zh'),
  id: require('./languages/id'),
  uk: require('./languages/uk'),
  cy: require('./languages/cy'),
  gl: require('./languages/gl'),
  ja: require('./languages/ja'),
  ko: require('./languages/ko'),
  he: require('./languages/he'),
  en_gb: require('./languages/en_gb')
};

function getLang(idx) {
  var i = parseInt(idx, 10) || 0;
  if (i < 0 || i >= LANG_ORDER.length) i = 0;
  return LANGUAGES[LANG_ORDER[i]] || LANGUAGES.en;
}

module.exports = {
  getLang: getLang,
  LANG_ORDER: LANG_ORDER,
  LANGUAGES: LANGUAGES
};
