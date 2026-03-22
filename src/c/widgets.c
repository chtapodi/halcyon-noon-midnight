#include "widgets.h"
#include "utils.h"
#include <pebble.h>

void widget_get_text(const char *format_string, char *buf, int buf_len) {
  if (!format_string || buf_len <= 0)
    return;

  int out_idx = 0;
  int in_idx = 0;
  buf[0] = '\0';

  while (format_string[in_idx] != '\0' && out_idx < buf_len - 1) {
    if (format_string[in_idx] == '{') {
      // Find closing brace
      int end_brace = in_idx + 1;
      while (format_string[end_brace] != '\0' &&
             format_string[end_brace] != '}') {
        end_brace++;
      }

      if (format_string[end_brace] == '}') {
        // We have a token
        int token_len = end_brace - in_idx - 1;
        const char *token = &format_string[in_idx + 1];

        char temp[32] = {0};
        bool matched = false;

        if (strncmp(token, "date:", (token_len > 5 ? 5 : token_len)) == 0 &&
            token_len > 5) {
          const char *fmt_start = token + 5;
          int fmt_len = token_len - 5;
          char fmt[32] = {0};
          if (fmt_len < (int)sizeof(fmt)) {
            memcpy(fmt, fmt_start, fmt_len);
            struct tm *t = getCurrentTime();
            strftime(temp, sizeof(temp), fmt, t);
            to_uppercase(temp);
            matched = true;
          }
        } else if (strncmp(token, "steps", token_len) == 0 && token_len == 5) {
#if defined(PBL_HEALTH)
          HealthServiceAccessibilityMask mask =
              health_service_metric_accessible(
                  HealthMetricStepCount, time_start_of_today(), time(NULL));
          if (mask & HealthServiceAccessibilityMaskAvailable) {
            HealthValue steps = health_service_sum_today(HealthMetricStepCount);
            snprintf(temp, sizeof(temp), "%d", (int)steps);
          } else {
            snprintf(temp, sizeof(temp), "--");
          }
#else
          temp[0] = '\0';
#endif
          matched = true;
        } else if (strncmp(token, "dist", token_len) == 0 && token_len == 4) {
#if defined(PBL_HEALTH)
          HealthServiceAccessibilityMask mask =
              health_service_metric_accessible(HealthMetricWalkedDistanceMeters,
                                               time_start_of_today(),
                                               time(NULL));
          if (mask & HealthServiceAccessibilityMaskAvailable) {
            HealthValue meters =
                health_service_sum_today(HealthMetricWalkedDistanceMeters);
            MeasurementSystem ms =
                health_service_get_measurement_system_for_display(
                    HealthMetricWalkedDistanceMeters);
            if (ms == MeasurementSystemMetric) {
              int km_whole = (int)(meters / 1000);
              int km_tenths = (int)((meters % 1000) / 100);
              snprintf(temp, sizeof(temp), "%d.%d", km_whole, km_tenths);
            } else {
              // Imperial: miles
              // 10000 meters = 6.21371 miles
              // miles * 10 = (meters * 10) / 1609
              int miles_ten = (int)((meters * 10) / 1609);
              int miles_whole = miles_ten / 10;
              int miles_tenths = miles_ten % 10;
              snprintf(temp, sizeof(temp), "%d.%d", miles_whole, miles_tenths);
            }
          } else {
            snprintf(temp, sizeof(temp), "-.--");
          }
#else
          temp[0] = '\0';
#endif
          matched = true;
        } else if (strncmp(token, "dist_unit", token_len) == 0 &&
                   token_len == 9) {
#if defined(PBL_HEALTH)
          MeasurementSystem ms =
              health_service_get_measurement_system_for_display(
                  HealthMetricWalkedDistanceMeters);
          snprintf(temp, sizeof(temp), "%s",
                   (ms == MeasurementSystemMetric) ? "KM" : "MI");
#else
          temp[0] = '\0';
#endif
          matched = true;
        } else if (strncmp(token, "batt", token_len) == 0 && token_len == 4) {
          BatteryChargeState state = battery_state_service_peek();
          snprintf(temp, sizeof(temp), "%d", state.charge_percent);
          matched = true;
        }

        if (matched) {
          // copy temp into buf
          int t_idx = 0;
          while (temp[t_idx] != '\0' && out_idx < buf_len - 1) {
            buf[out_idx++] = temp[t_idx++];
          }
          in_idx = end_brace + 1;
          continue;
        }
      }
    }

    // Default: copy character
    buf[out_idx++] = format_string[in_idx++];
  }

  buf[out_idx] = '\0';
}
