import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { NotificationFrequency, NOTIFICATION_FREQUENCIES } from '../constants/notifications';

interface SettingsPanelProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenThemeSelector: () => void;
  onResetProgress: () => void;
  tapCount: number;
  // Notification props
  notificationsEnabled: boolean;
  onToggleNotifications: (enabled: boolean) => Promise<boolean>;
  notificationFrequency: NotificationFrequency;
  onChangeNotificationFrequency: (frequency: NotificationFrequency) => void;
  notificationTime: { hour: number; minute: number };
  onChangeNotificationTime: (time: { hour: number; minute: number }) => void;
  permissionStatus: 'granted' | 'denied' | 'undetermined';
  // Enhanced features
  formattedStats?: any;
  unlockedAchievements?: string[];
  onShareScreenshot?: () => void;
  onShareMessage?: () => void;
  onShareCertificate?: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isDarkMode,
  onToggleDarkMode,
  soundEnabled,
  onToggleSound,
  onOpenThemeSelector,
  onResetProgress,
  tapCount,
  notificationsEnabled,
  onToggleNotifications,
  notificationFrequency,
  onChangeNotificationFrequency,
  notificationTime,
  onChangeNotificationTime,
  permissionStatus,
  formattedStats,
  unlockedAchievements = [],
  onShareScreenshot,
  onShareMessage,
  onShareCertificate,
}) => {
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const backgroundColor = isDarkMode ? '#2C2C2C' : '#F8F8F8';
  const textColor = isDarkMode ? '#FFFFFF' : '#333333';
  const borderColor = isDarkMode ? '#444' : '#DDD';

  const handleNotificationToggle = async (enabled: boolean) => {
    const success = await onToggleNotifications(enabled);
    if (!success && enabled) {
      Alert.alert(
        'Permission Required',
        'Please enable notifications in your device settings to receive reminders.',
        [{ text: 'OK' }]
      );
    }
  };

  const formatTime = (time: { hour: number; minute: number }) => {
    const hours = time.hour.toString().padStart(2, '0');
    const minutes = time.minute.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor, borderColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Settings</Text>
      
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: textColor }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={onToggleDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: textColor }]}>
          Sound Effects
        </Text>
        <Switch
          value={soundEnabled}
          onValueChange={onToggleSound}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={soundEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {/* Notifications Section */}
      <View style={styles.sectionDivider} />
      <Text style={[styles.sectionTitle, { color: textColor }]}>Notifications</Text>
      
      <View style={styles.settingRow}>
        <View style={styles.settingLabelContainer}>
          <Text style={[styles.settingLabel, { color: textColor }]}>
            Reminders
          </Text>
          {permissionStatus === 'denied' && (
            <Text style={[styles.permissionStatus, { color: '#FF6B6B' }]}>
              Permission denied
            </Text>
          )}
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationToggle}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {notificationsEnabled && (
        <>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: textColor }]}>
              Frequency
            </Text>
            <View style={styles.frequencyContainer}>
              {(Object.keys(NOTIFICATION_FREQUENCIES) as NotificationFrequency[])
                .filter(freq => freq !== 'off')
                .map((freq) => (
                <TouchableOpacity
                  key={freq}
                  style={[
                    styles.frequencyOption,
                    { borderColor },
                    notificationFrequency === freq && { backgroundColor: '#81b0ff' }
                  ]}
                  onPress={() => onChangeNotificationFrequency(freq)}
                >
                  <Text style={[
                    styles.frequencyText,
                    { color: notificationFrequency === freq ? '#FFFFFF' : textColor }
                  ]}>
                    {NOTIFICATION_FREQUENCIES[freq].label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: textColor }]}>
              Time
            </Text>
            <TouchableOpacity
              style={[styles.timeButton, { borderColor }]}
              onPress={() => setShowTimeSelector(!showTimeSelector)}
            >
              <Text style={[styles.timeText, { color: textColor }]}>
                {formatTime(notificationTime)}
              </Text>
            </TouchableOpacity>
          </View>

          {showTimeSelector && (
            <View style={styles.timeSelector}>
              <Text style={[styles.timeSelectorTitle, { color: textColor }]}>
                Select Notification Time
              </Text>
              <View style={styles.timeInputContainer}>
                <View style={styles.timeInputGroup}>
                  <Text style={[styles.timeInputLabel, { color: textColor }]}>Hour</Text>
                  <View style={styles.timeButtons}>
                    {[6, 12, 18, 21].map(hour => (
                      <TouchableOpacity
                        key={hour}
                        style={[
                          styles.timeOptionButton,
                          { borderColor },
                          notificationTime.hour === hour && { backgroundColor: '#81b0ff' }
                        ]}
                        onPress={() => onChangeNotificationTime({ ...notificationTime, hour })}
                      >
                        <Text style={[
                          styles.timeOptionText,
                          { color: notificationTime.hour === hour ? '#FFFFFF' : textColor }
                        ]}>
                          {hour}:00
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}
        </>
      )}

      <View style={styles.sectionDivider} />
      
      <TouchableOpacity
        style={[styles.button, { borderColor }]}
        onPress={onOpenThemeSelector}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>
          Change Theme
        </Text>
      </TouchableOpacity>

      {/* Enhanced Statistics Section */}
      <View style={styles.statsContainer}>
        <TouchableOpacity 
          style={styles.statsHeader}
          onPress={() => setShowAdvancedStats(!showAdvancedStats)}
        >
          <Text style={[styles.statsTitle, { color: textColor }]}>
            📊 Your Statistics {showAdvancedStats ? '▼' : '▶'}
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.statsText, { color: textColor }]}>
          Total Taps: {tapCount}
        </Text>
        <Text style={[styles.statsText, { color: textColor }]}>
          Pointlessness Level: {Math.floor(tapCount / 10) + 1}
        </Text>
        
        {showAdvancedStats && formattedStats && (
          <View style={styles.advancedStatsContainer}>
            <Text style={[styles.statsText, { color: textColor }]}>
              Time Wasted: {formattedStats.totalTimeSpent}
            </Text>
            <Text style={[styles.statsText, { color: textColor }]}>
              Days Used: {formattedStats.daysUsed}
            </Text>
            <Text style={[styles.statsText, { color: textColor }]}>
              Avg Session: {formattedStats.averageSession}
            </Text>
            <Text style={[styles.statsText, { color: textColor }]}>
              Efficiency: {formattedStats.efficiency}
            </Text>
            <Text style={[styles.statsText, { color: textColor }]}>
              Most Active: {formattedStats.mostActivePeriod}
            </Text>
            <Text style={[styles.statsText, { color: textColor }]}>
              Favorite Theme: {formattedStats.favoriteTheme}
            </Text>
            <Text style={[styles.statsText, { color: textColor }]}>
              First Tap: {formattedStats.firstTap}
            </Text>
          </View>
        )}
      </View>
      
      {/* Anti-Achievements Section */}
      {unlockedAchievements.length > 0 && (
        <View style={styles.achievementsContainer}>
          <TouchableOpacity 
            style={styles.statsHeader}
            onPress={() => setShowAchievements(!showAchievements)}
          >
            <Text style={[styles.statsTitle, { color: textColor }]}>
              🏆 Anti-Achievements ({unlockedAchievements.length}) {showAchievements ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          
          {showAchievements && (
            <View style={styles.achievementsList}>
              <Text style={[styles.achievementText, { color: textColor }]}>
                You've unlocked {unlockedAchievements.length} meaningless achievements!
              </Text>
            </View>
          )}
        </View>
      )}
      
      {/* Sharing Section */}
      {(onShareScreenshot || onShareMessage || onShareCertificate) && (
        <>
          <View style={styles.sectionDivider} />
          <Text style={[styles.sectionTitle, { color: textColor }]}>Share Your Pointlessness</Text>
          
          <View style={styles.shareButtonsContainer}>
            {onShareMessage && (
              <TouchableOpacity
                style={[styles.shareButton, { borderColor }]}
                onPress={onShareMessage}
              >
                <Text style={[styles.shareButtonText, { color: textColor }]}>📱 Share Message</Text>
              </TouchableOpacity>
            )}
            
            {onShareScreenshot && (
              <TouchableOpacity
                style={[styles.shareButton, { borderColor }]}
                onPress={onShareScreenshot}
              >
                <Text style={[styles.shareButtonText, { color: textColor }]}>📸 Screenshot</Text>
              </TouchableOpacity>
            )}
            
            {onShareCertificate && tapCount > 100 && (
              <TouchableOpacity
                style={[styles.shareButton, { borderColor }]}
                onPress={onShareCertificate}
              >
                <Text style={[styles.shareButtonText, { color: textColor }]}>🎓 Certificate</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      <TouchableOpacity
        style={[styles.resetButton, { borderColor: '#FF6B6B' }]}
        onPress={onResetProgress}
      >
        <Text style={[styles.resetButtonText]}>
          Reset Progress (Why?)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 20,
    width: 320,
    maxHeight: '80%',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  statsText: {
    fontSize: 14,
    marginVertical: 2,
    textAlign: 'center',
  },
  resetButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 15,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF6B6B',
  },
  // Enhanced stats styles
  statsHeader: {
    marginBottom: 8,
  },
  advancedStatsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  achievementsContainer: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  achievementsList: {
    marginTop: 10,
  },
  achievementText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  shareButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  shareButton: {
    flex: 1,
    minWidth: 90,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  // Notification styles
  sectionDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingLabelContainer: {
    flex: 1,
  },
  permissionStatus: {
    fontSize: 12,
    marginTop: 2,
  },
  frequencyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  frequencyOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
  },
  frequencyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  timeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  timeSelector: {
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  timeSelectorTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  timeInputContainer: {
    gap: 10,
  },
  timeInputGroup: {
    gap: 8,
  },
  timeInputLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  timeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeOptionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});