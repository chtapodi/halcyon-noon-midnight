import React from 'react';
import { ClockFaceSVG } from './ClockFaceSVG';
import { useTheme } from '../context/hooks';

const PreviewSection: React.FC = () => {
  const { isLoading, isNightThemeEnabled, getThemeColors } = useTheme();
  const dayColors = getThemeColors('day');
  const nightColors = getThemeColors('night');

  if (isLoading) {
    return (
      <section className="preview-section">
        <div className="preview-loading">Loading previews...</div>
      </section>
    );
  }

  return (
    <section className="preview-section">
      <h2>Preview</h2>
      <div className="preview-container">
        <div className="preview-item">
          <div className="svg-preview-container">
            <h4 className="preview-title">Day Theme Preview</h4>
            <div className="svg-wrapper">
              <ClockFaceSVG colors={dayColors} />
            </div>
          </div>
        </div>
        {isNightThemeEnabled && (
          <div className="preview-item night-preview">
            <div className="svg-preview-container">
              <h4 className="preview-title">Night Theme Preview</h4>
              <div className="svg-wrapper">
                <ClockFaceSVG colors={nightColors} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviewSection;
