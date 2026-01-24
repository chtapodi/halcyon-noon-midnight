import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeManager } from '../core/theme-manager';

interface ThemeContextType {
  themeManager: ThemeManager;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeManager] = useState(() => new ThemeManager());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        await themeManager.loadThemes();
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load themes:', error);
        setIsLoading(false);
      }
    };

    loadThemes();
  }, [themeManager]);

  return (
    <ThemeContext.Provider value={{ themeManager, isLoading }}>
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