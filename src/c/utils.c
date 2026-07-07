#include "utils.h"
#include "settings.h"
#include <pebble.h>

void to_uppercase(char *str) {
  while (*str) {
    *str = toupper((unsigned char)*str);
    str++;
  }
}

struct tm *getCurrentTime() {
  static struct tm timeInfo;
  time_t rawTime;

  time(&rawTime);
  timeInfo = *localtime(&rawTime);

  return &timeInfo;
}

int16_t tide_interpolate_height(int minuteOfDay) {
  if (tidePointCount < 2) return 0;

  // Wrap minute to 0-1439 range
  int m = minuteOfDay % 1440;
  if (m < 0) m += 1440;

  // Find the two surrounding extrema
  // Points are sorted by minute, but we also need to handle wrap-around
  // (e.g., minute 1400 is between last point and first point of next cycle)

  int idxA = -1, idxB = -1;

  // Handle wrap-around: if minute is before first point,
  // wrap to last point of previous cycle
  if (m < tideData[0].minute) {
    idxA = tidePointCount - 1;
    idxB = 0;
    // Adjust minute for wrap: add 1440 to m so it's after last point
    m += 1440;
  } else {
    // Find the segment
    for (int i = 0; i < tidePointCount - 1; i++) {
      if (m >= tideData[i].minute && m <= tideData[i + 1].minute) {
        idxA = i;
        idxB = i + 1;
        break;
      }
    }
    // If after last point, wrap to first point of next cycle
    if (idxA == -1) {
      idxA = tidePointCount - 1;
      idxB = 0;
      m += 1440; // push past midnight into next cycle's first point
    }
  }

  // Compute period properly for wrap case
  int32_t aMin = tideData[idxA].minute;
  int32_t bMin = tideData[idxB].minute;

  if (idxB == 0 && idxA == tidePointCount - 1) {
    // Wrapping: A is last point today, B is first point tomorrow
    bMin += 1440;
  }

  int32_t period = bMin - aMin;
  if (period <= 0) return tideData[idxA].height_cm;

  // Use sin² interpolation: height = A + (B-A) * sin²(π/2 * frac)
  // Map fraction to quarter-circle angle
  int32_t angle = ((m - aMin) * TRIG_MAX_ANGLE) / (period * 4);
  int32_t s = sin_lookup(angle);
  // s is in range [0, TRIG_MAX_RATIO] for quarter-circle
  int32_t blend = (s * s) / TRIG_MAX_RATIO;

  return (int16_t)(tideData[idxA].height_cm +
      ((tideData[idxB].height_cm - tideData[idxA].height_cm) * blend) /
      TRIG_MAX_RATIO);
}
