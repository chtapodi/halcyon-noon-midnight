import React, { createContext, useContext, useState } from 'react';

interface ConfigContextType {
  settings: Record<string, any>;
  updateSetting: (key: string, value: any) => void;
  save: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within a PebbleConfigProvider');
  return context;
};

export const PebbleConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize settings directly from the 'settings' URL parameter
  const [settings, setSettings] = useState<Record<string, any>>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return JSON.parse(params.get('settings') || '{}');
    } catch {
      return {};
    }
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const save = () => {
    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get('return_to') || 'pebblejs://close#';
    
    // Pebble expects the response to be appended to the return_to URL
    window.location.href = returnTo + encodeURIComponent(JSON.stringify(settings));
  };

  return (
    <ConfigContext.Provider value={{ settings, updateSetting, save }}>
      {children}
    </ConfigContext.Provider>
  );
};
