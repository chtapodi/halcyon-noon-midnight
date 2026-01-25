import { useTheme } from '../context/ThemeContext';

export const useThemeManagement = () => {
  const {
    getCurrentPreset,
    applyPreset,
    getColor,
    updateColor,
    getThemeState,
    subscribe,
    unsubscribe,
    isLoading,
  } = useTheme();

  return {
    getCurrentPreset,
    applyPreset,
    getColor,
    updateColor,
    getThemeState,
    subscribe,
    unsubscribe,
    isLoading,
  };
};

export default useThemeManagement;
