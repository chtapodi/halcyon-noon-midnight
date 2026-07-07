#ifdef PBL_RECT

#include "drawUtils.h"
#include "settings.h"
#include "solarUtils.h"
#include "utils.h"

static ColorTheme currentTheme;

GPoint get_rect_position(float progress, GRect bounds) {
  if (progress < 0.25f) {
    float t = progress / 0.25f;
    return GPoint(bounds.origin.x + (int)(t * bounds.size.w), bounds.origin.y);
  } else if (progress < 0.5f) {
    float t = (progress - 0.25f) / 0.25f;
    return GPoint(bounds.origin.x + bounds.size.w,
                  bounds.origin.y + (int)(t * bounds.size.h));
  } else if (progress < 0.75f) {
    float t = (progress - 0.5f) / 0.25f;
    return GPoint(bounds.origin.x + bounds.size.w - (int)(t * bounds.size.w),
                  bounds.origin.y + bounds.size.h);
  } else {
    float t = (progress - 0.75f) / 0.25f;
    return GPoint(bounds.origin.x,
                  bounds.origin.y + bounds.size.h - (int)(t * bounds.size.h));
  }
}

GPoint getPipPosition(int id, int numPips, GRect bounds) {
  float progress = (float)id / (float)numPips;
  return get_rect_position(progress, bounds);
}

GRect snap_to_edges(GRect rect, GRect bounds, int thickness) {
  // vertical snapping
  if (rect.origin.y + rect.size.h > bounds.size.h - thickness) {
    rect.size.h = bounds.size.h - rect.origin.y;
  }
  if (rect.origin.y < thickness) {
    rect.size.h += rect.origin.y;
    rect.origin.y = 0;
  }

  // horizontal snapping
  if (rect.origin.x + rect.size.w > bounds.size.w - thickness) {
    rect.size.w = bounds.size.w - rect.origin.x;
  }
  if (rect.origin.x < thickness) {
    rect.size.w += rect.origin.x;
    rect.origin.x = 0;
  }

  return rect;
}

void draw_center_layer(Layer *layer, GContext *ctx) {
  currentTheme = getCurrentColorTheme();
  GRect bounds = layer_get_bounds(layer);
  graphics_context_set_fill_color(ctx, currentTheme.bgColor);

  graphics_fill_rect(ctx, bounds, 0, GCornerNone);

  int innerPadding = 0;

  bounds.origin.x += innerPadding;
  bounds.origin.y += innerPadding;
  bounds.size.w -= innerPadding * innerPadding + 1;
  bounds.size.h -= innerPadding * innerPadding + 1;

  int numPips = 24;
  int pip_length = 2;
  int long_pip_length = 3;

  for (int i = 0; i < numPips; i++) {
    bool is_main_pip = ((i - (numPips / 8)) % (numPips / 4) == 0);

    // Check pip visibility setting
    bool should_draw_pip = false;
    switch (globalSettings.pipVisibility) {
    case PIP_SHOW_ALL:
      should_draw_pip = true;
      break;
    case PIP_SHOW_MAJOR:
      should_draw_pip = is_main_pip;
      break;
    case PIP_HIDDEN:
      should_draw_pip = false;
      break;
    }

    if (!should_draw_pip)
      continue;

    int length = is_main_pip ? long_pip_length : pip_length;

    graphics_context_set_stroke_color(
        ctx, is_main_pip ? currentTheme.pipColorPrimary
                         : currentTheme.pipColorSecondary);
    graphics_context_set_stroke_width(ctx, 3);

    GPoint start = getPipPosition(i, numPips, bounds);

    GRect contracted_bounds = bounds;
    contracted_bounds.origin.x += length;
    contracted_bounds.origin.y += length;
    contracted_bounds.size.w -= 2 * length;
    contracted_bounds.size.h -= 2 * length;

    GPoint end = getPipPosition(i, numPips, contracted_bounds);

    graphics_draw_line(ctx, start, end);
  }
}

void draw_ring_layer(Layer *layer, GContext *ctx) {
  currentTheme = getCurrentColorTheme();
  GRect bounds = layer_get_bounds(layer);
  int thickness = RING_THICKNESS;
  int strokeWidth = RING_STROKE_WIDTH;
  GRect innerBounds =
      GRect(bounds.origin.x + thickness / 2, bounds.origin.y + thickness / 2,
            bounds.size.w - thickness, bounds.size.h - thickness);

  GRect sunBounds = GRect(bounds.origin.x + SUN_INSET, bounds.origin.y + SUN_INSET,
                          bounds.size.w - SUN_INSET * 2,
                          bounds.size.h - SUN_INSET * 2);

  int numPositions = 96;
  int width = bounds.size.w;
  int height = bounds.size.h;

  // Draw outer rectangular ring
  graphics_context_set_fill_color(ctx, currentTheme.ringNightColor);

  // Top bar
  graphics_fill_rect(ctx, GRect(0, 0, width, thickness), 0, GCornerNone);
  // Bottom bar
  graphics_fill_rect(ctx, GRect(0, height - thickness, width, thickness), 0,
                     GCornerNone);
  // Left bar
  graphics_fill_rect(ctx, GRect(0, 0, thickness, height), 0, GCornerNone);
  // Right bar
  graphics_fill_rect(ctx, GRect(width - thickness, 0, thickness, height), 0,
                     GCornerNone);

  // Get time and sun position
  struct tm *timeInfo = getCurrentTime();
  int hour = timeInfo->tm_hour;
  int minute = timeInfo->tm_min;

  // Shift time by 15 hours so that it starts at the bottom
  int shiftedHour = (hour + 15) % 24;
  float progress = ((shiftedHour % 24) + (minute / 60.0f)) / 24.0f;

  GPoint sunPos = get_rect_position(progress, sunBounds);

  // Apply the same 15-hour shift to the sunrise and sunset times
  int shiftedSunriseMinute =
      (currentSolarInfo.sunriseMinute + 15 * 60) % (24 * 60);
  int shiftedSunsetMinute =
      (currentSolarInfo.sunsetMinute + 15 * 60) % (24 * 60);

  // Calculate sunrise and sunset positions on the ring using getPipPosition
  int dayStartPos =
      (int)(((shiftedSunriseMinute / 1440.0f) * numPositions) + 0.5);
  int dayEndPos = (int)(((shiftedSunsetMinute / 1440.0f) * numPositions) + 0.5);

  GPoint dayStart = getPipPosition(dayStartPos, numPositions, innerBounds);
  GPoint dayEnd = getPipPosition(dayEndPos, numPositions, innerBounds);

  // Fill the day section
  graphics_context_set_fill_color(ctx, currentTheme.ringDayColor);
  for (int i = dayStartPos; i != dayEndPos; i = (i + 1) % numPositions) {
    GPoint pipPos = getPipPosition(i, numPositions, innerBounds);
    graphics_fill_rect(ctx,
                       GRect(pipPos.x - thickness / 2, pipPos.y - thickness / 2,
                             thickness, thickness),
                       0, GCornerNone);
  }

  // Calculate positioning of twilight interface blocks
  int boxSize = thickness;
  graphics_context_set_stroke_color(ctx, currentTheme.ringStrokeColor);
  graphics_context_set_stroke_width(ctx, strokeWidth);

  GRect twilightStartRect = GRect(dayStart.x - boxSize / 2,
                                  dayStart.y - boxSize / 2, boxSize, boxSize);
  GRect twilightEndRect =
      GRect(dayEnd.x - boxSize / 2, dayEnd.y - boxSize / 2, boxSize, boxSize);

  // Correct boundaries of the twilight blocks, if necessary
  // (this ensures that the ring doesn't "break" if a block is on an edge)
  twilightStartRect = snap_to_edges(twilightStartRect, bounds, thickness);
  twilightEndRect = snap_to_edges(twilightEndRect, bounds, thickness);

  // draw sunrise block
  graphics_context_set_fill_color(ctx, currentTheme.ringSunriseColor);
  graphics_fill_rect(ctx, twilightStartRect, 0, GCornerNone);
  graphics_draw_rect(
      ctx, GRect(twilightStartRect.origin.x - 2, twilightStartRect.origin.y - 2,
                 twilightStartRect.size.w + 4, twilightStartRect.size.h + 4));

  // draw sunset block
  graphics_context_set_fill_color(ctx, currentTheme.ringSunsetColor);
  graphics_fill_rect(ctx, twilightEndRect, 0, GCornerNone);
  graphics_draw_rect(
      ctx, GRect(twilightEndRect.origin.x - 2, twilightEndRect.origin.y - 2,
                 twilightEndRect.size.w + 4, twilightEndRect.size.h + 4));

  // cue the sun!
  graphics_context_set_fill_color(ctx, currentTheme.sunFillColor);
  graphics_context_set_stroke_color(ctx, currentTheme.sunStrokeColor);
  graphics_fill_circle(ctx, sunPos, SUN_DIAMETER);
  graphics_draw_circle(ctx, sunPos, SUN_DIAMETER);

  // ---- Draw noon and midnight markers on the ring ---- //
  if (globalSettings.showNoonMidnightMarkers) {
    // Solar noon = midpoint between sunrise and sunset
    int solarNoonMinute = (currentSolarInfo.sunriseMinute + currentSolarInfo.sunsetMinute) / 2;
    // Solar midnight = 12 hours (720 min) after solar noon
    int solarMidnightMinute = (solarNoonMinute + 720) % 1440;

    // Apply 15h shift
    int shiftedNoonMinute = (solarNoonMinute + 15 * 60) % (24 * 60);
    int shiftedMidnightMinute = (solarMidnightMinute + 15 * 60) % (24 * 60);

    float noonProgress = shiftedNoonMinute / 1440.0f;
    float midnightProgress = shiftedMidnightMinute / 1440.0f;

    GPoint noonPos = get_rect_position(noonProgress, bounds);
    GPoint midnightPos = get_rect_position(midnightProgress, bounds);

    int lw = globalSettings.noonMidnightLineWidth;
    int ol = RING_STROKE_WIDTH;  // outline — matches sun outline thickness

    // Helper macro: draw a black-bordered marker perpendicular to the edge
    #define DRAW_EDGE_MARKER(x, y, progress, color) \
      if ((progress) < 0.25f) { \
        /* TOP edge — bar extends down */ \
        graphics_context_set_fill_color(ctx, GColorBlack); \
        graphics_fill_rect(ctx, GRect((x) - lw/2 - ol, (y) - ol, lw + 2*ol, thickness + 2*ol), 0, GCornerNone); \
        graphics_context_set_fill_color(ctx, color); \
        graphics_fill_rect(ctx, GRect((x) - lw/2, (y), lw, thickness), 0, GCornerNone); \
      } else if ((progress) < 0.5f) { \
        /* RIGHT edge — bar extends left */ \
        graphics_context_set_fill_color(ctx, GColorBlack); \
        graphics_fill_rect(ctx, GRect((x) - thickness - ol, (y) - lw/2 - ol, thickness + 2*ol, lw + 2*ol), 0, GCornerNone); \
        graphics_context_set_fill_color(ctx, color); \
        graphics_fill_rect(ctx, GRect((x) - thickness, (y) - lw/2, thickness, lw), 0, GCornerNone); \
      } else if ((progress) < 0.75f) { \
        /* BOTTOM edge — bar extends up */ \
        graphics_context_set_fill_color(ctx, GColorBlack); \
        graphics_fill_rect(ctx, GRect((x) - lw/2 - ol, (y) - thickness - ol, lw + 2*ol, thickness + 2*ol), 0, GCornerNone); \
        graphics_context_set_fill_color(ctx, color); \
        graphics_fill_rect(ctx, GRect((x) - lw/2, (y) - thickness, lw, thickness), 0, GCornerNone); \
      } else { \
        /* LEFT edge — bar extends right */ \
        graphics_context_set_fill_color(ctx, GColorBlack); \
        graphics_fill_rect(ctx, GRect((x) - ol, (y) - lw/2 - ol, thickness + 2*ol, lw + 2*ol), 0, GCornerNone); \
        graphics_context_set_fill_color(ctx, color); \
        graphics_fill_rect(ctx, GRect((x), (y) - lw/2, thickness, lw), 0, GCornerNone); \
      }

    DRAW_EDGE_MARKER(noonPos.x, noonPos.y, noonProgress, currentTheme.noonMarkerColor);
    DRAW_EDGE_MARKER(midnightPos.x, midnightPos.y, midnightProgress, currentTheme.midnightMarkerColor);

    #undef DRAW_EDGE_MARKER
  }

  // ---- Draw tide plot on the ring ---- //
  if (globalSettings.showTidePlot && tidePointCount >= 2) {
    int tideSteps = 96;
    int amp = globalSettings.tideAmplitude;
    int16_t range = tideDataMaxHeight - tideDataMinHeight;
    if (range < 1) range = 1;

    // Step widths for gap-free fill — rect spans full segment along ring
    int hStep = (bounds.size.w * 4) / tideSteps + 1;  // top/bottom step width
    int vStep = (bounds.size.h * 4) / tideSteps + 1;  // left/right step height
    bool inside = globalSettings.tidePlotInside;
    int stroke = RING_STROKE_WIDTH;  // 3px — inside mode starts past the black border

    // Anchor point: outside = ring boundary, inside = past the stroke
    int anchorTop = thickness + (inside ? stroke : 0);
    int anchorBottom = bounds.size.h - thickness - (inside ? stroke : 0);
    int anchorRight = bounds.size.w - thickness - (inside ? stroke : 0);
    int anchorLeft = thickness + (inside ? stroke : 0);

    // Clip rectangle: inside mode stops at inset boundary; outside fills full ring perimeter
    int clipLeft   = inside ? (thickness + stroke) : 0;
    int clipRight  = inside ? (bounds.size.w - thickness - stroke) : bounds.size.w;
    int clipTop    = inside ? (thickness + stroke) : 0;
    int clipBottom = inside ? (bounds.size.h - thickness - stroke) : bounds.size.h;

    graphics_context_set_fill_color(ctx, currentTheme.tidePlotColor);

    for (int i = 0; i < tideSteps; i++) {
      float progress = (float)i / (float)tideSteps;
      GPoint pos = get_rect_position(progress, bounds);

      int shiftedMinute = (int)(progress * 1440.0f);
      int realMinute = (shiftedMinute - 15 * 60 + 1440) % 1440;

      int16_t height = tide_interpolate_height(realMinute);
      int16_t d = ((height - tideDataMinHeight) * amp) / range;
      if (d > amp) d = amp;
      if (d < 0) d = 0;

      int cx = pos.x, cy = pos.y;

      // Outside mode: cap corners at 45° diagonal from inner boundary to screen edge
      // This creates a clean mitered join where adjacent edges meet
      int cap;
      if (progress < 0.25f) {
        // TOP edge: cap depth varies with x in corner zones
        cap = thickness;
        if (cx < thickness) cap = cx;
        else if (cx > bounds.size.w - thickness) cap = bounds.size.w - cx;
      } else if (progress < 0.5f) {
        // RIGHT edge: cap varies with y
        cap = thickness;
        if (cy < thickness) cap = cy;
        else if (cy > bounds.size.h - thickness) cap = bounds.size.h - cy;
      } else if (progress < 0.75f) {
        // BOTTOM edge
        cap = thickness;
        if (cx < thickness) cap = cx;
        else if (cx > bounds.size.w - thickness) cap = bounds.size.w - cx;
      } else {
        // LEFT edge
        cap = thickness;
        if (cy < thickness) cap = cy;
        else if (cy > bounds.size.h - thickness) cap = bounds.size.h - cy;
      }
      // Clamp d so it doesn't exceed the cap
      if (d > cap) d = cap;

      if (progress < 0.25f && cx >= clipLeft && cx <= clipRight) {
        int y0 = inside ? anchorTop : cap;
        int rx = cx - hStep/2;
        int rw = hStep;
        if (rx < clipLeft) { rw -= (clipLeft - rx); rx = clipLeft; }
        if (rx + rw > clipRight) rw = clipRight - rx;
        if (rw <= 0) continue;
        if (inside) {
          graphics_fill_rect(ctx, GRect(rx, y0, rw, d), 0, GCornerNone);
        } else {
          graphics_fill_rect(ctx, GRect(rx, y0 - d, rw, d), 0, GCornerNone);
        }
      } else if (progress < 0.5f && cy >= clipTop && cy <= clipBottom) {
        int x0 = inside ? anchorRight : (bounds.size.w - cap);
        int ry = cy - vStep/2;
        int rh = vStep;
        if (ry < clipTop) { rh -= (clipTop - ry); ry = clipTop; }
        if (ry + rh > clipBottom) rh = clipBottom - ry;
        if (rh <= 0) continue;
        if (inside) {
          graphics_fill_rect(ctx, GRect(x0 - d, ry, d, rh), 0, GCornerNone);
        } else {
          graphics_fill_rect(ctx, GRect(x0, ry, d, rh), 0, GCornerNone);
        }
      } else if (progress < 0.75f && cx >= clipLeft && cx <= clipRight) {
        int y0 = inside ? anchorBottom : (bounds.size.h - cap);
        int rx = cx - hStep/2;
        int rw = hStep;
        if (rx < clipLeft) { rw -= (clipLeft - rx); rx = clipLeft; }
        if (rx + rw > clipRight) rw = clipRight - rx;
        if (rw <= 0) continue;
        if (inside) {
          graphics_fill_rect(ctx, GRect(rx, y0 - d, rw, d), 0, GCornerNone);
        } else {
          graphics_fill_rect(ctx, GRect(rx, y0, rw, d), 0, GCornerNone);
        }
      } else if (cy >= clipTop && cy <= clipBottom) {
        int x0 = inside ? anchorLeft : cap;
        int ry = cy - vStep/2;
        int rh = vStep;
        if (ry < clipTop) { rh -= (clipTop - ry); ry = clipTop; }
        if (ry + rh > clipBottom) rh = clipBottom - ry;
        if (rh <= 0) continue;
        if (inside) {
          graphics_fill_rect(ctx, GRect(x0, ry, d, rh), 0, GCornerNone);
        } else {
          graphics_fill_rect(ctx, GRect(x0 - d, ry, d, rh), 0, GCornerNone);
        }
      }
    }
  }
}
#endif