#pragma once

#include <ctype.h>
#include <pebble.h>

#define USE_FAKE_TIME

void to_uppercase(char *str);
struct tm *getCurrentTime();
void tick_fake_time();
