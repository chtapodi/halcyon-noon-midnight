import React from 'react';
import { useTheme } from '../context/ThemeContext';
import PreviewSection from './PreviewSection';
import SettingsForm from './SettingsForm';

const ConfigPage: React.FC = () => {
  const { isLoading, error } = useTheme();

  if (isLoading) {
    return <div className="loading">Loading themes...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Error Loading Themes</h3>
        <p>There was an error loading the theme configuration.</p>
        <button 
          onClick={() => window.location.reload()}
          className="reload-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="config-content">
      {/* <PreviewSection /> */}
      <SettingsForm />
    </div>
  );
};

export default ConfigPage;
