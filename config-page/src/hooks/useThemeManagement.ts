import { useTheme } from '../context/ConfigContext';

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
