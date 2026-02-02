import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ConfigContext';

interface ThemePreviewProps {
  themeName: string;
  themeType: 'day' | 'night';
  isSelected: boolean;
  onClick: () => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ themeName, themeType, isSelected, onClick }) => {
  const { getThemeColors, isLoading, state } = useTheme();
  const currentColors = getThemeColors(themeType);

  // Get colors for theme preview from loaded themes data
  const previewColors = useMemo(() => {
    // Get theme data from state (loaded from themes.json) - add safety check
    if (!state || !state.themesData) {
      return currentColors; // Fallback to current colors if state not ready
    }
    
    const themesData = state.themesData.sharedThemes || {};
    const themeData = themesData[themeName];
    
    if (!themeData) {
      // Fallback to current colors if theme not found
      return currentColors;
    }

    // Convert color values to proper hex format (add # prefix)
    const formattedColors: Record<string, string> = {};
    Object.entries(themeData).forEach(([key, value]) => {
      formattedColors[key] = value.startsWith('#') ? value : `#${value}`;
    });

    return formattedColors;
  }, [themeName, currentColors, state?.themesData]);

  if (isLoading) {
    return <div className="theme-preview-loading">Loading...</div>;
  }

  return (
    <div className="preset-option">
      <input
        type="radio"
        id={`${themeType}-${themeName}`}
        name={`${themeType}-theme`}
        checked={isSelected}
        onChange={onClick}
        className="preset-radio"
      />
      <label htmlFor={`${themeType}-${themeName}`} className="preset-label">
        <div className="svg-preview-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="58"
            viewBox="0 0 144 168"
            fill="none"
            className="watchface-preview mini"
          >
            {/* Background */}
            <path
              fill={previewColors.SETTING_BG_COLOR || '#FFFFFF'}
              d="M16 16h112v136H16z"
            />

            {/* Day/Night Rings */}
            {themeType === 'day' ? (
              <path
                fill={previewColors.SETTING_RING_DAY_COLOR || '#00AAFF'}
                d="M0 0h144v82H0z"
              />
            ) : (
              <path
                fill={previewColors.SETTING_RING_NIGHT_COLOR || '#0055AA'}
                d="M0 86h144v82H0z"
              />
            )}

            {/* Sunrise/Sunset Rings */}
            <path
              fill={previewColors.SETTING_RING_SUNRISE_COLOR || '#FFAAAA'}
              d="M19 72v25H0V72h19Z"
            />
            <path
              fill={previewColors.SETTING_RING_SUNSET_COLOR || '#FFAA01'}
              d="M144 72v25h-19V72h19Z"
            />

            {/* Sun */}
            <path
              fill={previewColors.SETTING_SUN_FILL_COLOR || '#FFFF00'}
              d="M52 8.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
            />
            <path
              fill={previewColors.SETTING_SUN_STROKE_COLOR || '#000000'}
              fillRule="evenodd"
              d="M43.5 14a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0 3a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z"
              clipRule="evenodd"
            />

            {/* Pips */}
            <path
              fill={previewColors.SETTING_PIP_COLOR_SECONDARY || '#AAAAAA'}
              d="M17 19.121 19.12 17l4.243 4.243-2.122 2.12L17 19.122ZM125.243 17l2.121 2.121-4.243 4.243L121 21.243 125.243 17ZM17 149.243l2.121 2.121 4.243-4.243L21.242 145 17 149.243ZM125.243 151.364l2.121-2.121-4.243-4.243-2.121 2.121 4.243 4.243ZM15.83 105.404l5.949-.783.391 2.975-5.948.783-.392-2.975ZM16.49 38.275l5.796 1.553-.777 2.897-5.795-1.553.777-2.897ZM33.275 151.51l1.552-5.796 2.898.776-1.553 5.796-2.897-.776ZM34.827 22.286l-1.552-5.796 2.898.776 1.553 5.795-2.897.777ZM90.595 145.83l.784 5.949-2.975.391-.783-5.949 2.974-.391ZM87.621 21.779l.783-5.95 2.975.392-.784 5.95-2.974-.392ZM51.62 151.778l.784-5.948 2.898.391-.783 5.949-2.974-.392ZM54.595 15.83l.784 5.949-2.975.391-.783-5.949 2.974-.391ZM106.827 152.286l-1.552-5.796 2.898.776 1.553 5.795-2.897.777ZM105.275 21.51l1.552-5.796 2.898.776-1.553 5.796-2.897-.777ZM122.221 104.621l5.949.783-.391 2.975-5.949-.783.391-2.975ZM121.714 39.827l5.795-1.552.777 2.897-5.796 1.553-.776-2.898ZM15.714 127.827l5.795-1.552.777 2.897-5.796 1.553-.776-2.898ZM16.221 60.621l5.95.783-.392 2.975-5.95-.783.392-2.975ZM122.49 126.275l5.796 1.552-.777 2.898-5.795-1.553.776-2.897ZM121.83 61.404l5.949-.783.391 2.975-5.948.783-.392-2.975Z"
            />
            <path
              fill={previewColors.SETTING_PIP_COLOR_PRIMARY || '#000000'}
              d="M17 83h6v3h-6v-3ZM70 23v-5h3v5h-3ZM70 151v-6h3v6h-3ZM121 83h6v3h-6v-3Z"
            />

            {/* Ring Stroke */}
            <g fill={previewColors.SETTING_RING_STROKE_COLOR || '#000000'}>
              <path d="M125 19H19v130h106V19ZM16 16v136h112V16H16Z" fillRule="evenodd" clipRule="evenodd"/>
              <path d="M0 97h19V72H0v3h16v19H0v3ZM144 72h-19v25h19v-3h-16V75h16v-3Z" fillRule="evenodd" clipRule="evenodd"/>
            </g>
          </svg>
        </div>
        <span className="preset-name">{themeName}</span>
      </label>
    </div>
  );
};

export default ThemePreview;