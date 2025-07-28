import { useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { RANDOM_MESSAGES, MILESTONE_MESSAGES } from '../constants/messages';
import { ThemeMode, THEMES, getThemeMessages } from '../constants/themes';

const TAP_COUNT_KEY = 'tapCount';
const THEME_KEY = 'selectedTheme';
const DARK_MODE_KEY = 'isDarkMode';
const SOUND_ENABLED_KEY = 'soundEnabled';

export const useTapLogic = () => {
  const [tapCount, setTapCount] = useState<number>(0);
  const [currentMessage, setCurrentMessage] = useState<string>('Tap the button to begin your journey into nothingness');
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [buttonScale, setButtonScale] = useState(1);
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('default');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load all settings from storage on app start
  const loadSettings = useCallback(async () => {
    try {
      const [savedCount, savedTheme, savedDarkMode, savedSoundEnabled] = await Promise.all([
        SecureStore.getItemAsync(TAP_COUNT_KEY),
        SecureStore.getItemAsync(THEME_KEY),
        SecureStore.getItemAsync(DARK_MODE_KEY),
        SecureStore.getItemAsync(SOUND_ENABLED_KEY),
      ]);

      if (savedCount) {
        setTapCount(parseInt(savedCount, 10));
      }
      if (savedTheme) {
        setCurrentTheme(savedTheme as ThemeMode);
      }
      if (savedDarkMode) {
        setIsDarkMode(savedDarkMode === 'true');
      }
      if (savedSoundEnabled) {
        setSoundEnabled(savedSoundEnabled === 'true');
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  }, []);

  // Save tap count to storage
  const saveTapCount = useCallback(async (count: number) => {
    try {
      await SecureStore.setItemAsync(TAP_COUNT_KEY, count.toString());
    } catch (error) {
      console.log('Error saving tap count:', error);
    }
  }, []);

  // Get random message based on theme
  const getRandomMessage = useCallback((count: number): string => {
    // Check for milestone messages first
    if (MILESTONE_MESSAGES[count as keyof typeof MILESTONE_MESSAGES]) {
      return MILESTONE_MESSAGES[count as keyof typeof MILESTONE_MESSAGES];
    }
    
    // Get theme-specific messages
    const themeMessages = getThemeMessages(currentTheme);
    
    // If theme has specific messages, mix them with general messages
    if (themeMessages.length > 0) {
      // 70% chance for theme message, 30% for general message
      if (Math.random() < 0.7) {
        const randomIndex = Math.floor(Math.random() * themeMessages.length);
        return themeMessages[randomIndex];
      }
    }
    
    // Otherwise return random general message
    const randomIndex = Math.floor(Math.random() * RANDOM_MESSAGES.length);
    return RANDOM_MESSAGES[randomIndex];
  }, [currentTheme]);

  // Handle tap with all the absurd logic
  const handleTap = useCallback(async () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    await saveTapCount(newCount);

    // Get and display random message
    const message = getRandomMessage(newCount);
    setCurrentMessage(message);

    // Dynamic button behavior based on tap count
    if (newCount > 20) {
      // Start moving the button slightly
      const maxOffset = Math.min(50, newCount / 10);
      const randomX = (Math.random() - 0.5) * maxOffset;
      const randomY = (Math.random() - 0.5) * maxOffset;
      setButtonPosition({ x: randomX, y: randomY });
    }

    if (newCount > 50) {
      // Start scaling the button
      const scaleVariation = 0.1 + (Math.random() * 0.3);
      setButtonScale(0.8 + scaleVariation);
    }

    // Reset position and scale occasionally for chaos
    if (newCount % 13 === 0) {
      setButtonPosition({ x: 0, y: 0 });
      setButtonScale(1);
    }
  }, [tapCount, getRandomMessage, saveTapCount]);

  // Theme management
  const changeTheme = useCallback(async (theme: ThemeMode) => {
    setCurrentTheme(theme);
    try {
      await SecureStore.setItemAsync(THEME_KEY, theme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  }, []);

  // Dark mode toggle
  const toggleDarkMode = useCallback(async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    try {
      await SecureStore.setItemAsync(DARK_MODE_KEY, newDarkMode.toString());
    } catch (error) {
      console.log('Error saving dark mode:', error);
    }
  }, [isDarkMode]);

  // Sound toggle
  const toggleSound = useCallback(async () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    try {
      await SecureStore.setItemAsync(SOUND_ENABLED_KEY, newSoundEnabled.toString());
    } catch (error) {
      console.log('Error saving sound setting:', error);
    }
  }, [soundEnabled]);

  // Reset progress
  const resetProgress = useCallback(async () => {
    setTapCount(0);
    setCurrentMessage('Tap the button to begin your journey into nothingness... again');
    setButtonPosition({ x: 0, y: 0 });
    setButtonScale(1);
    try {
      await SecureStore.setItemAsync(TAP_COUNT_KEY, '0');
    } catch (error) {
      console.log('Error resetting progress:', error);
    }
  }, []);

  return {
    tapCount,
    currentMessage,
    buttonPosition,
    buttonScale,
    currentTheme,
    isDarkMode,
    soundEnabled,
    handleTap,
    loadSettings,
    changeTheme,
    toggleDarkMode,
    toggleSound,
    resetProgress,
  };
};