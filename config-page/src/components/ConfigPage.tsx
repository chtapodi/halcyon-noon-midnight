import React from 'react';
import { useTheme } from '../context/ThemeContext';
import PreviewSection from './PreviewSection';
import SettingsForm from './SettingsForm';

const ConfigPage: React.FC = () => {
  const { isLoading } = useTheme();

  if (isLoading) {
    return <div className="loading">Loading themes...</div>;
  }

  return (
    <div className="config-content">
      <PreviewSection />
      <SettingsForm />
    </div>
  );
};

export default ConfigPage;