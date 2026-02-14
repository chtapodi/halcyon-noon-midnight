import React, { createContext, useContext, useState, useEffect } from 'react';

interface ConfigContextType {
  settings: Record<string, any>;
  updateSetting: (key: string, value: any) => void;
  save: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a PebbleConfigProvider');
  }
  return context;
};

export const PebbleConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    // Load initial settings from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialSettings: Record<string, any> = {};
    
    // Most Pebble configs pass initial state as a JSON string in a 'return_to' or similar,
    // or just as individual query params. Let's support both.
    urlParams.forEach((value, key) => {
      try {
        initialSettings[key] = JSON.parse(value);
      } catch (e) {
        initialSettings[key] = value;
      }
    });

    setSettings(initialSettings);
  }, []);

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const save = () => {
    const returnUrl = new URLSearchParams(window.location.search).get('return_to') || 'pebblejs://close#';
    const result = encodeURIComponent(JSON.stringify(settings));
    window.location.href = returnUrl + result;
  };

  return (
    <ConfigContext.Provider value={{ settings, updateSetting, save }}>
      {children}
    </ConfigContext.Provider>
  );
};
