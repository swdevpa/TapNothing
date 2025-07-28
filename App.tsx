import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TapButton } from './components/TapButton';
import { MessageDisplay } from './components/MessageDisplay';
import { ThemeSelector } from './components/ThemeSelector';
import { SettingsPanel } from './components/SettingsPanel';
import { useTapLogic } from './hooks/useTapLogic';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useNotifications } from './hooks/useNotifications';
import { useHaptics } from './hooks/useHaptics';
import { useAdvancedStats } from './hooks/useAdvancedStats';
import { useEnhancedButtonBehavior } from './hooks/useEnhancedButtonBehavior';
import { useDeviceIntegration } from './hooks/useDeviceIntegration';
import { useScreenshotShare } from './hooks/useScreenshotShare';
import { THEMES } from './constants/themes';
import { EASTER_EGGS } from './constants/easterEggs';
import { checkAntiAchievements } from './constants/antiAchievements';

const AppContent = () => {
  const {
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
  } = useTapLogic();

  const { initializeAudio, playRandomSound } = useSoundEffects();
  const {
    notificationsEnabled,
    notificationFrequency,
    notificationTime,
    permissionStatus,
    toggleNotifications,
    changeNotificationFrequency,
    changeNotificationTime,
    scheduleNotification,
  } = useNotifications();
  
  const { triggerHapticForTheme, triggerMilestoneHaptic, triggerEasterEggHaptic } = useHaptics();
  const { stats, recordTap, getFormattedStats } = useAdvancedStats();
  const { buttonState, updateButtonBehavior, getEnhancedButtonText, resetButtonState } = useEnhancedButtonBehavior();
  const { 
    deviceState, 
    shakeDetected, 
    getTimeBasedTheme, 
    getTimeBasedMessage, 
    handleShakeReset,
    getBatteryInfluencedColor,
    getDeviceBehaviorModifier 
  } = useDeviceIntegration();
  const { shareScreenshot, shareFullScreenshot, shareMessage, shareCertificate } = useScreenshotShare();
  const insets = useSafeAreaInsets();
  
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [currentEasterEgg, setCurrentEasterEgg] = useState<string | null>(null);
  const viewRef = React.useRef<View>(null);

  // Function to take clean screenshot without overlays
  const takeCleanScreenshot = useCallback(async () => {
    const wasSettingsOpen = showSettings;
    const wasThemeSelectorOpen = showThemeSelector;
    
    // Close all overlays
    setShowSettings(false);
    setShowThemeSelector(false);
    
    // Wait for UI to update
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      await shareFullScreenshot(tapCount, currentTheme);
    } finally {
      // Restore original state
      if (wasSettingsOpen) setShowSettings(true);
      if (wasThemeSelectorOpen) setShowThemeSelector(true);
    }
  }, [showSettings, showThemeSelector, shareFullScreenshot, tapCount, currentTheme]);

  useEffect(() => {
    loadSettings();
    initializeAudio();
  }, [loadSettings, initializeAudio]);

  // Schedule notifications when theme or settings change
  useEffect(() => {
    if (notificationsEnabled && notificationFrequency !== 'off') {
      scheduleNotification(currentTheme);
    }
  }, [currentTheme, notificationsEnabled, notificationFrequency, notificationTime, scheduleNotification]);
  
  // Handle shake to reset
  useEffect(() => {
    if (handleShakeReset(() => {
      resetProgress();
      resetButtonState();
      setUnlockedAchievements([]);
      setCurrentEasterEgg(null);
    })) {
      // Shake reset was triggered
    }
  }, [shakeDetected, resetProgress, resetButtonState, handleShakeReset]);

  const handleTapWithSound = async () => {
    await handleTap();
    
    // Enhanced tap handling with all new features
    const newTapCount = tapCount + 1;
    
    // Record advanced statistics
    const isEasterEgg = EASTER_EGGS.some(egg => egg.count === newTapCount);
    const isMilestone = newTapCount % 100 === 0;
    await recordTap(currentTheme, isEasterEgg, isMilestone);
    
    // Update button behavior
    const behaviorModifier = getDeviceBehaviorModifier();
    updateButtonBehavior(newTapCount * behaviorModifier, currentTheme);
    
    // Trigger haptic feedback
    await triggerHapticForTheme(currentTheme, newTapCount);
    
    // Check for Easter eggs
    const easterEgg = EASTER_EGGS.find(egg => egg.count === newTapCount);
    if (easterEgg) {
      setCurrentEasterEgg(easterEgg.message);
      await triggerEasterEggHaptic();
      setTimeout(() => setCurrentEasterEgg(null), 4000);
    }
    
    // Check for milestones
    if (isMilestone) {
      await triggerMilestoneHaptic();
    }
    
    // Check for new anti-achievements
    const newAchievements = checkAntiAchievements(stats, unlockedAchievements);
    if (newAchievements.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newAchievements.map(a => a.id)]);
    }
    
    // Play sound if enabled
    if (soundEnabled) {
      await playRandomSound();
    }
  };

  // Enhanced background color with device integration
  const getBackgroundColor = () => {
    const themeData = THEMES[currentTheme];
    let baseColor;
    
    if (isDarkMode && !themeData.isDark) {
      baseColor = '#1A1A1A';
    } else {
      baseColor = themeData.colors[Math.floor(tapCount / 25) % themeData.colors.length];
    }
    
    // Apply battery-influenced color modification
    return getBatteryInfluencedColor(baseColor);
  };

  const getTextColor = () => {
    const themeData = THEMES[currentTheme];
    if (isDarkMode && !themeData.isDark) {
      return '#FFFFFF';
    }
    return themeData.textColor;
  };

  return (
    <View style={[styles.fullScreen, { backgroundColor: getBackgroundColor() }]}>
      <StatusBar 
        barStyle={isDarkMode || THEMES[currentTheme].isDark ? "light-content" : "dark-content"} 
        backgroundColor={getBackgroundColor()}
        translucent={true}
      />
      
      <View ref={viewRef} style={styles.container}>
          {/* Animated Background */}
          <View style={[styles.background, { backgroundColor: getBackgroundColor() }]}>
          {/* Header with absurd title and controls */}
          <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
            <View style={styles.headerTop}>
              <TouchableOpacity
                style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                onPress={() => setShowSettings(!showSettings)}
              >
                <Text style={[styles.headerButtonText, { color: getTextColor() }]}>
                  ⚙️
                </Text>
              </TouchableOpacity>
              
              <Text style={[styles.title, { color: getTextColor() }]}>TAP NOTHING</Text>
              
              <TouchableOpacity
                style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                onPress={() => setShowThemeSelector(true)}
              >
                <Text style={[styles.headerButtonText, { color: getTextColor() }]}>
                  🎨
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.subtitle, { color: getTextColor() }]}>
              The most purposeless app ever created
            </Text>
            
            <Text style={[styles.themeLabel, { color: getTextColor() }]}>
              {THEMES[currentTheme].name}
            </Text>
            
            {tapCount > 0 && (
              <Text style={[styles.secretCounter, { color: getTextColor() }]}>
                Hidden taps: {tapCount}
              </Text>
            )}
          </View>

          {/* Message Display */}
          <View style={styles.messageContainer}>
            <MessageDisplay 
              message={currentEasterEgg || getTimeBasedMessage() || currentMessage} 
              tapCount={tapCount} 
            />
          </View>

          {/* Main Tap Button */}
          <View style={styles.buttonContainer}>
            <TapButton
              onTap={handleTapWithSound}
              position={buttonState.position.x !== 0 || buttonState.position.y !== 0 ? buttonState.position : buttonPosition}
              scale={buttonState.scale !== 1 ? buttonState.scale : buttonScale}
              tapCount={tapCount}
              theme={currentTheme}
              rotation={buttonState.rotation}
              opacity={buttonState.opacity}
              buttonText={getEnhancedButtonText('TAP', tapCount)}
            />
          </View>

          {/* Footer with philosophical nonsense */}
          <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
            <Text style={[styles.footerText, { color: getTextColor() }]}>
              {tapCount === 0 
                ? "Your journey into meaninglessness awaits"
                : tapCount < 50
                ? "Every tap brings you closer to... nothing"
                : tapCount < 100
                ? "You're really doing it. Incredible."
                : "At this point, we're all just impressed"}
            </Text>
          </View>

          {/* Achievement-style notifications */}
          {tapCount > 0 && tapCount % 100 === 0 && (
            <View style={styles.achievementBanner}>
              <Text style={styles.achievementText}>
                🏆 MILESTONE REACHED: {tapCount} TAPS! 🏆
              </Text>
            </View>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <SettingsPanel
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              onOpenThemeSelector={() => {
                setShowSettings(false);
                setShowThemeSelector(true);
              }}
              onResetProgress={resetProgress}
              tapCount={tapCount}
              notificationsEnabled={notificationsEnabled}
              onToggleNotifications={toggleNotifications}
              notificationFrequency={notificationFrequency}
              onChangeNotificationFrequency={changeNotificationFrequency}
              notificationTime={notificationTime}
              onChangeNotificationTime={changeNotificationTime}
              permissionStatus={permissionStatus}
              formattedStats={getFormattedStats()}
              unlockedAchievements={unlockedAchievements}
              onShareScreenshot={takeCleanScreenshot}
              onShareMessage={() => shareMessage(tapCount, currentTheme)}
              onShareCertificate={() => shareCertificate(tapCount, currentTheme, stats.daysUsed)}
            />
          )}

          {/* Theme Selector Modal */}
          <ThemeSelector
            visible={showThemeSelector}
            currentTheme={currentTheme}
            onClose={() => setShowThemeSelector(false)}
            onSelectTheme={changeTheme}
            isDarkMode={isDarkMode}
          />
        </View>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  themeLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
    opacity: 0.9,
  },
  secretCounter: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
    opacity: 0.8,
  },
  achievementBanner: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  achievementText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
  },
});