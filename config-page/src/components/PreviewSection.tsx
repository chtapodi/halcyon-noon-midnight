import React from 'react';
import SVGPreview from './SVGPreview';
import { useTheme } from '../context/ConfigContext';

const PreviewSection: React.FC = () => {
  const { isLoading, isNightThemeEnabled, setNightThemeEnabled } = useTheme();

  if (isLoading) {
    return <section className="preview-section"><div className="preview-loading">Loading previews...</div></section>;
  }

  const handleNightThemeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNightThemeEnabled(e.target.checked);
  };

  return (
    <section className="preview-section">
      <h2>Preview</h2>
      <div className="preview-container">
        <div className="preview-item">
          <SVGPreview themeType="day" title="Day Theme Preview" />
        </div>
        {isNightThemeEnabled() && (
          <div className="preview-item night-preview">
            <SVGPreview themeType="night" title="Night Theme Preview" />
          </div>
        )}
      </div>
      <div className="preview-controls">
        <label className="night-theme-toggle">
          <input
            type="checkbox"
            checked={isNightThemeEnabled()}
            onChange={handleNightThemeToggle}
          />
          Show Night Theme Preview
        </label>
      </div>
    </section>
  );
};

export default PreviewSection;