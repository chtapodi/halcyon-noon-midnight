import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ThemeManager } from '../core/theme-manager';
import { ThemeType } from '../types';

interface ThemeContextType {
  themeManager: ThemeManager;
  isLoading: boolean;
  error: Error | null;
  getCurrentPreset: (themeType: ThemeType) => string;
  applyPreset: (presetName: string, themeType: ThemeType) => void;
  getColor: (colorKey: string, themeType: ThemeType) => string;
  updateColor: (colorKey: string, colorValue: string, themeType: ThemeType) => void;
  getThemeState: () => any;
  subscribe: (subscriber: () => void) => void;
  unsubscribe: (subscriber: () => void) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeManager] = useState(() => new ThemeManager());
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        await themeManager.loadThemes();
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load themes:', error);
        setError(error instanceof Error ? error : new Error('Failed to load themes'));
        setIsLoading(false);
      }
    };

    loadThemes();
  }, [themeManager]);

  // Memoized context methods
  const getCurrentPreset = useCallback((themeType: ThemeType) => {
    return themeManager.getCurrentPreset(themeType);
  }, [themeManager]);

  const applyPreset = useCallback((presetName: string, themeType: ThemeType) => {
    themeManager.applyPreset(presetName, themeType);
  }, [themeManager]);

  const getColor = useCallback((colorKey: string, themeType: ThemeType) => {
    return themeManager.getColor(colorKey, themeType);
  }, [themeManager]);

  const updateColor = useCallback((colorKey: string, colorValue: string, themeType: ThemeType) => {
    themeManager.updateColor(colorKey, colorValue, themeType);
  }, [themeManager]);

  const getThemeState = useCallback(() => {
    return themeManager.getThemeState();
  }, [themeManager]);

  const subscribe = useCallback((subscriber: () => void) => {
    themeManager.subscribe(subscriber);
  }, [themeManager]);

  const unsubscribe = useCallback((subscriber: () => void) => {
    themeManager.unsubscribe(subscriber);
  }, [themeManager]);

  const contextValue = {
    themeManager,
    isLoading,
    error,
    getCurrentPreset,
    applyPreset,
    getColor,
    updateColor,
    getThemeState,
    subscribe,
    unsubscribe,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};