import React, { useMemo } from 'react';
import { useTheme } from '../context/hooks';
import { ThemeType } from '../types';
import { ClockFaceSVG } from './ClockFaceSVG';

interface ThemePreviewProps {
  themeName: string;
  themeType: ThemeType;
  isSelected: boolean;
  onClick: () => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  themeName,
  themeType,
  isSelected,
  onClick,
}) => {
  const { isLoading, state } = useTheme();

  // Get colors for theme preview from loaded themes data
  const previewColors = useMemo(() => {
    // Get theme data from state (loaded from themes.json) - add safety check
    if (!state || !state.themesData) {
      return {}; // Fallback to empty object if state not ready
    }

    const themesData = state.themesData.sharedThemes || {};
    const themeData = themesData[themeName];

    if (!themeData) {
      // Fallback to current colors if theme not found
      return {};
    }

    // Convert color values to proper hex format (add # prefix)
    const formattedColors: Record<string, string> = {};
    Object.entries(themeData).forEach(([key, value]) => {
      formattedColors[key] = value.startsWith('#') ? value : `#${value}`;
    });

    return formattedColors;
  }, [themeName, state?.themesData]);

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
          <ClockFaceSVG colors={previewColors} />
        </div>
        <span className="preset-name">{themeName}</span>
      </label>
    </div>
  );
};

export default ThemePreview;
