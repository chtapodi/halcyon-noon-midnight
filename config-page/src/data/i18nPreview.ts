// Preview-only i18n helpers for the config page.

import { DEFAULT_DATE_FORMATS } from './dateFormats';

const LOCALE_BY_INDEX: string[] = [
  'en', 'fr', 'de', 'es', 'it', 'nl', 'tr', 'cs', 'pt', 'el',
  'sv', 'pl', 'sk', 'vi', 'ro', 'ca', 'no', 'ru', 'et', 'eu',
  'fi', 'da', 'lt', 'sl', 'hu', 'hr', 'ga', 'lv', 'sr', 'zh-CN',
  'id', 'uk', 'cy', 'gl', 'ja', 'ko', 'he',
];

// Short/uppercase labels per language, mirroring src/pkjs/languages.js LABELS.
// Used for {steps_label}, {day_label}, {week_label}, {dist_unit}, {wind_unit}.
const STEPS_LABELS = ["STEPS", "PAS", "SCHRITTE", "PASOS", "PASSI", "STAPPEN", "ADIMLAR", "KROKY", "PASSOS", "ΒΗΜΑΤΑ", "STEG", "KROKI", "KROKY", "BƯỚC", "PAȘI", "PASSOS", "SKRITT", "ШАГИ", "SAMMUD", "URRATSAK", "ASKELTA", "TRIN", "ŽINGSNIAI", "KORAKI", "LÉPÉSEK", "KORACI", "CÉIMEANNA", "SOĻI", "KORACI", "步数", "LANGKAH", "КРОКИ", "CAMAU", "PASOS", "歩数", "걸음", "צעדים"];
const DAY_LABELS = ["DAY", "JOUR", "TAG", "DÍA", "GIORNO", "DAG", "GÜN", "DEN", "DIA", "ΗΜΈ", "DAG", "DZIEŃ", "DEŇ", "NGÀY", "ZI", "DIA", "DAG", "ДЕН", "PÄEV", "EGUN", "PÄIVÄ", "DAG", "PARA", "DAN", "NAP", "DAN", "LÁ", "DIENA", "DAN", "天", "HARI", "ДЕНЬ", "DIWR", "DÍA", "日", "일", "יום"];
const WEEK_LABELS = ["WEEK", "SEM", "W", "SEM", "SETT", "WK", "HF", "TÝD", "SEM", "ΕΒΔ", "V", "TYDZ", "TÝŽ", "TUẦN", "SĂPT", "SETM", "UKE", "НЕД", "NÄD", "AST", "VK", "UGE", "SAV", "TED", "HÉT", "TJ", "SCHT", "NED", "NED", "周", "MING", "ТИЖ", "WNOS", "SEM", "週", "주", "שב"];

// Sample weather condition (WMO code 2, "Partly Cloudy") for previews. Mirrors
// src/pkjs/languages.js WEATHER_CODES[2]. Only one condition is needed since
// the preview never sees real weather data.
const SAMPLE_CONDITION = ["PARTLY CLOUDY", "PART. NUAGEUX", "TEILW. BEWÖLKT", "PARCIALMENTE NUB.", "PARZ. NUVOLOSO", "LICHT BEWÖLKT", "PARÇALI BULUTLU", "POLOJASNO", "PARCIAL. NUBLADO", "ΜΕΡΙΚΩΣ ΣΥΝΝΕΦΙΑΣΜΕΝΟΣ", "HALVKLART", "CZĘŚCIOWO ZACHMURZONE", "POLOJASNO", "CÓ MÂY", "PARȚIAL NOROS", "PARCIALMENT NUBOL", "LETTESKYET", "ПЕРЕМ. ОБЛАЧНОСТЬ", "VAHELDUV PILVISUS", "HODEI KERTSUAK", "PUOLIPILVISTÄ", "LETTESKYET", "MAŽAITIKIMYBE", "DELNO OBLAČNO", "RÉSZLEGESEN FELHŐS", "DJELOMIČNO OBLAČNO", "PÁIRTEACH SCALTA", "DAĻĒJI MĀKOŅAINS", "DELIMIČNO OBLAČNO", "多云", "BERAWAN SEBAGIAN", "МІНЛИВА ХМАРНІСТЬ", "RHANNOL GYMOGLOG", "PARCIALMENTE NUBRADO", "晴れ時々曇り", "구름 조금", "מעונן חלקית"];

// Sample wind direction (NW, cardinal index 7) per language. Mirrors index 7 of
// each row in src/pkjs/languages.js CARDINALS.
const SAMPLE_CARDINAL = ["NW", "NO", "NW", "NO", "NO", "NW", "KB", "SZ", "NO", "ΒΔ", "NV", "NW", "SZ", "TB", "NV", "NO", "NV", "СЗ", "LO", "IM", "LU", "NV", "ŠV", "SZ", "ÉNY", "SZ", "TI", "ZR", "SZ", "西北", "BL", "ПнЗ", "GG", "NO", "北西", "북서", "צמ׳"];

const safeIdx = (i: number) => (i >= 0 && i < 37 ? i : 0);

const intlFmt = (date: Date, lang: number, opts: Intl.DateTimeFormatOptions): string => {
  const locale = LOCALE_BY_INDEX[safeIdx(lang)];
  try {
    return new Intl.DateTimeFormat(locale, opts).format(date);
  } catch {
    return new Intl.DateTimeFormat('en', opts).format(date);
  }
};

// Pad a number to two digits.
const pad2 = (n: number) => (n < 10 ? '0' + n : '' + n);

// ISO 8601 week number (matches strftime %V on the watch).
const isoWeek = (d: Date): number => {
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const diff = (target.getTime() - firstThursday.getTime()) / 86400000;
  return 1 + Math.round((diff - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
};

const dayOfYear = (d: Date): number => {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
};

// Decimal separator per language (mirrors src/c/languages.c decimalSeparator[]).
const DECIMAL_SEPARATORS: string[] = [
    /*  0 en */ '.', /*  1 fr */ ',', /*  2 de */ ',', /*  3 es */ ',',
    /*  4 it */ ',', /*  5 nl */ ',', /*  6 tr */ ',', /*  7 cs */ ',',
    /*  8 pt */ ',', /*  9 el */ ',', /* 10 sv */ ',', /* 11 pl */ ',',
    /* 12 sk */ ',', /* 13 vi */ ',', /* 14 ro */ ',', /* 15 ca */ ',',
    /* 16 no */ ',', /* 17 ru */ ',', /* 18 et */ ',', /* 19 eu */ ',',
    /* 20 fi */ ',', /* 21 da */ ',', /* 22 lt */ ',', /* 23 sl */ ',',
    /* 24 hu */ ',', /* 25 hr */ ',', /* 26 ga */ '.', /* 27 lv */ ',',
    /* 28 sr */ ',', /* 29 zh */ '.', /* 30 id */ ',', /* 31 uk */ ',',
    /* 32 cy */ '.', /* 33 gl */ ',', /* 34 ja */ '.', /* 35 ko */ '.',
    /* 36 he */ '.',
];

export const getDecimalSeparator = (lang: number): string =>
  DECIMAL_SEPARATORS[safeIdx(lang)];

// Substitute tokens in a format string using sample values, language-aware.
// This matches what the watch will render, close enough for a preview.
export const renderPreview = (
  formatStr: string,
  lang: number,
  isImperial: boolean = false,
): string => {
  if (!formatStr) return '';
  const idx = safeIdx(lang);
  const now = new Date();

  // Expand the {local_date} super-token first so its inner tokens fall
  // through to the normal substitution loop. Mirrors widgets.c behavior.
  if (formatStr.indexOf('{local_date}') !== -1) {
    formatStr = formatStr.split('{local_date}').join(DEFAULT_DATE_FORMATS[idx]);
  }

  const dayName = intlFmt(now, lang, { weekday: 'short' }).toUpperCase().replace(/\.$/, '');
  const monthName = intlFmt(now, lang, { month: 'short' }).toUpperCase().replace(/\.$/, '');
  const dec = getDecimalSeparator(lang);

  const replacements: Record<string, string> = {
    // Date / time tokens (C-side)
    '{day_name}': dayName,
    '{month_name}': monthName,
    '{day0}': pad2(now.getDate()),
    '{day}': String(now.getDate()),
    '{month_num}': pad2(now.getMonth() + 1),
    '{year}': String(now.getFullYear()),
    '{day_of_year}': String(dayOfYear(now)),
    '{week_of_year}': String(isoWeek(now)),
    // Health / device (C-side)
    '{steps}': '1234',
    '{dist}': '0' + dec + '8',
    '{dist_unit}': isImperial ? 'MI' : 'KM',
    '{batt}': '85',
    // Solar / weather (PKJS-side)
    '{sunrise}': '6:42',
    '{sunset}': '18:18',
    '{temp}': isImperial ? '64' : '18',
    '{thi}': isImperial ? '72' : '22',
    '{tlo}': isImperial ? '57' : '14',
    '{cond}': SAMPLE_CONDITION[idx],
    '{cond_day}': SAMPLE_CONDITION[idx],
    '{hum}': '65',
    '{wind}': '12',
    '{wind_unit}': isImperial ? 'MPH' : 'KM/H',
    '{wind_dir}': SAMPLE_CARDINAL[idx],
    '{uv}': '6',
    '{rain}': '0' + dec + '0',
    '{pop}': '30',
    '{dew}': isImperial ? '54' : '12',
    '{temp_unit}': isImperial ? '°F' : '°C',
    // Localized labels
    '{steps_label}': STEPS_LABELS[idx],
    '{day_label}': DAY_LABELS[idx],
    '{week_label}': WEEK_LABELS[idx],
  };

  let out = formatStr;
  for (const [token, value] of Object.entries(replacements)) {
    out = out.split(token).join(value);
  }
  // Strip any unrecognized {tokens} so previews don't show raw braces.
  out = out.replace(/\{[a-z_:%]+\}/gi, '');
  return out;
};
