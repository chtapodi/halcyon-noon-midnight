#include "utils.h"
#include <pebble.h>

void to_uppercase(char *str) {
  while (*str) {
    *str = toupper((unsigned char)*str);
    str++;
  }
}

#ifdef USE_FAKE_TIME
struct tm *getCurrentTime() {
  static struct tm fakeTime = {0};
  static bool initialized = false;

  if (!initialized) {
    // Set initial fake time: March 31st, 9:38 AM
    fakeTime.tm_year = 2026 - 1900;
    fakeTime.tm_mon = 2; // 0-indexed (March)
    fakeTime.tm_mday = 31;
    fakeTime.tm_hour = 19;
    fakeTime.tm_min = 38;
    fakeTime.tm_sec = 0;
    fakeTime.tm_isdst = -1; // Let mktime decide

    mktime(&fakeTime);
    initialized = true;
  }

  return &fakeTime;
}

void tick_fake_time() {
  struct tm *fakeTime = getCurrentTime();
  fakeTime->tm_min++;
  mktime(fakeTime);
}

#else
struct tm *getCurrentTime() {
  static struct tm timeInfo;
  time_t rawTime;

  time(&rawTime);
  timeInfo = *localtime(&rawTime);

  return &timeInfo;
}

void tick_fake_time() {
  // No-op when not in fake time mode
}
#endif