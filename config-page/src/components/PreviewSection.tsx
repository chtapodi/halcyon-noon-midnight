import React, { useState } from 'react';
import SVGPreview from './SVGPreview';
import { useTheme } from '../context/ThemeContext';

const PreviewSection: React.FC = () => {
  const { isLoading } = useTheme();
  const [useNightTheme, setUseNightTheme] = useState(false);

  if (isLoading) {
    return <section className="preview-section"><div className="preview-loading">Loading previews...</div></section>;
  }

  return (
    <section className="preview-section">
      <h2>Preview</h2>
      <div className="preview-container">
        <div className="preview-item">
          <SVGPreview themeType="day" title="Day Theme Preview" />
        </div>
        {useNightTheme && (
          <div className="preview-item night-preview">
            <SVGPreview themeType="night" title="Night Theme Preview" />
          </div>
        )}
      </div>
      <div className="preview-controls">
        <label className="night-theme-toggle">
          <input
            type="checkbox"
            checked={useNightTheme}
            onChange={(e) => setUseNightTheme(e.target.checked)}
          />
          Show Night Theme Preview
        </label>
      </div>
    </section>
  );
};

export default PreviewSection;