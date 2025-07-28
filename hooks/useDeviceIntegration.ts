import { useState, useEffect, useCallback } from 'react';
import { DeviceMotion } from 'expo-sensors';
import { AppState, AppStateStatus } from 'react-native';
import * as Battery from 'expo-battery';

interface DeviceState {
  isShaking: boolean;
  batteryLevel: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  deviceOrientation: 'portrait' | 'landscape';
  appState: AppStateStatus;
}

export const useDeviceIntegration = () => {
  const [deviceState, setDeviceState] = useState<DeviceState>({
    isShaking: false,
    batteryLevel: 1,
    timeOfDay: 'afternoon',
    deviceOrientation: 'portrait',
    appState: 'active',
  });

  const [shakeDetected, setShakeDetected] = useState(false);

  // Shake detection
  useEffect(() => {
    let subscription: any;
    
    const startShakeDetection = async () => {
      const { status } = await DeviceMotion.requestPermissionsAsync();
      if (status === 'granted') {
        DeviceMotion.setUpdateInterval(100);
        
        subscription = DeviceMotion.addListener(({ acceleration }) => {
          if (acceleration) {
            const { x = 0, y = 0, z = 0 } = acceleration;
            const magnitude = Math.sqrt(x * x + y * y + z * z);
            
            // Detect shake (threshold can be adjusted)
            if (magnitude > 2.5) {
              setDeviceState(prev => ({ ...prev, isShaking: true }));
              setShakeDetected(true);
              
              // Reset shake detection after 1 second
              setTimeout(() => {
                setDeviceState(prev => ({ ...prev, isShaking: false }));
                setShakeDetected(false);
              }, 1000);
            }
          }
        });
      }
    };

    startShakeDetection();

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  // Time of day detection
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
      
      if (hour >= 6 && hour < 12) {
        timeOfDay = 'morning';
      } else if (hour >= 12 && hour < 18) {
        timeOfDay = 'afternoon';
      } else if (hour >= 18 && hour < 22) {
        timeOfDay = 'evening';
      } else {
        timeOfDay = 'night';
      }
      
      setDeviceState(prev => ({ ...prev, timeOfDay }));
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Battery level detection
  useEffect(() => {
    const updateBatteryLevel = async () => {
      try {
        const batteryLevel = await Battery.getBatteryLevelAsync();
        setDeviceState(prev => ({ ...prev, batteryLevel }));
      } catch (error) {
        console.log('Battery API not available:', error);
      }
    };

    updateBatteryLevel();
    const interval = setInterval(updateBatteryLevel, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // App state detection
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setDeviceState(prev => ({ ...prev, appState: nextAppState }));
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  // Get time-based theme suggestions
  const getTimeBasedTheme = useCallback(() => {
    switch (deviceState.timeOfDay) {
      case 'morning':
        return 'nature'; // Fresh, natural start
      case 'afternoon':
        return 'default'; // Standard productive hours
      case 'evening':
        return 'retro'; // Relaxing evening vibes
      case 'night':
        return 'sad'; // Late night existential crisis
      default:
        return 'default';
    }
  }, [deviceState.timeOfDay]);

  // Get time-based messages
  const getTimeBasedMessage = useCallback(() => {
    const messages = {
      morning: [
        'Good morning! Time to waste your day productively.',
        'Rise and grind... into pointlessness.',
        'Morning coffee pairs well with meaningless tapping.',
        'Start your day with a healthy dose of nothing.',
      ],
      afternoon: [
        'Procrastinating during work hours? Perfect!',
        'Lunch break productivity at its finest.',
        'The afternoon slump calls for button therapy.',
        'Post-lunch tapping session initiated.',
      ],
      evening: [
        'Winding down with some quality pointlessness.',
        'Evening entertainment: provided by a button.',
        'Sunset tapping for maximum relaxation.',
        'End your day the way you started: accomplishing nothing.',
      ],
      night: [
        'Midnight tapping session? You need help.',
        'The witching hour of pointlessness.',
        'While others sleep, you tap into the void.',
        'Night owl or just addicted to buttons?',
      ],
    };

    const timeMessages = messages[deviceState.timeOfDay];
    return timeMessages[Math.floor(Math.random() * timeMessages.length)];
  }, [deviceState.timeOfDay]);

  // Handle shake to reset
  const handleShakeReset = useCallback((onReset: () => void) => {
    if (shakeDetected) {
      onReset();
      return true;
    }
    return false;
  }, [shakeDetected]);

  // Get battery-influenced button color
  const getBatteryInfluencedColor = useCallback((originalColor: string) => {
    // As battery gets low, make colors more "drained"
    if (deviceState.batteryLevel < 0.2) {
      // Very low battery - make colors darker/grayer
      return '#666666';
    } else if (deviceState.batteryLevel < 0.5) {
      // Medium battery - slightly fade colors
      return originalColor + '88'; // Add alpha for fading effect
    }
    return originalColor; // Full battery - full color
  }, [deviceState.batteryLevel]);

  // Get device-based button behavior modifier
  const getDeviceBehaviorModifier = useCallback(() => {
    let modifier = 1;

    // Shake detection affects behavior
    if (deviceState.isShaking) {
      modifier *= 2; // Double the chaos during shaking
    }

    // Time of day affects intensity
    switch (deviceState.timeOfDay) {
      case 'morning':
        modifier *= 0.8; // Calmer in the morning
        break;
      case 'night':
        modifier *= 1.5; // More chaotic at night
        break;
      default:
        break;
    }

    // App state affects behavior
    if (deviceState.appState !== 'active') {
      modifier *= 0.5; // Less aggressive when app is in background
    }

    return modifier;
  }, [deviceState]);

  // Check if it's an appropriate time for notifications
  const isAppropriateNotificationTime = useCallback(() => {
    const hour = new Date().getHours();
    return hour >= 8 && hour <= 22; // Between 8 AM and 10 PM
  }, []);

  return {
    deviceState,
    shakeDetected,
    getTimeBasedTheme,
    getTimeBasedMessage,
    handleShakeReset,
    getBatteryInfluencedColor,
    getDeviceBehaviorModifier,
    isAppropriateNotificationTime,
  };
};