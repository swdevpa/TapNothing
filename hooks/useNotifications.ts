import { useState, useEffect, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { 
  NotificationFrequency, 
  NOTIFICATION_FREQUENCIES, 
  getRandomNotificationMessage 
} from '../constants/notifications';
import { ThemeMode } from '../constants/themes';

const NOTIFICATIONS_ENABLED_KEY = 'notificationsEnabled';
const NOTIFICATION_FREQUENCY_KEY = 'notificationFrequency';
const NOTIFICATION_TIME_KEY = 'notificationTime';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState<NotificationFrequency>('24h');
  const [notificationTime, setNotificationTime] = useState({ hour: 18, minute: 0 }); // Default 6 PM
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'undetermined'>('undetermined');

  // Load settings from storage
  const loadNotificationSettings = useCallback(async () => {
    try {
      const [enabled, frequency, time] = await Promise.all([
        SecureStore.getItemAsync(NOTIFICATIONS_ENABLED_KEY),
        SecureStore.getItemAsync(NOTIFICATION_FREQUENCY_KEY),
        SecureStore.getItemAsync(NOTIFICATION_TIME_KEY),
      ]);

      if (enabled) {
        setNotificationsEnabled(enabled === 'true');
      }
      if (frequency) {
        setNotificationFrequency(frequency as NotificationFrequency);
      }
      if (time) {
        const parsedTime = JSON.parse(time);
        setNotificationTime(parsedTime);
      }
    } catch (error) {
      console.log('Error loading notification settings:', error);
    }
  }, []);

  // Request notification permissions
  const requestPermissions = useCallback(async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      setPermissionStatus(finalStatus);
      return finalStatus === 'granted';
    } catch (error) {
      console.log('Error requesting notification permissions:', error);
      setPermissionStatus('denied');
      return false;
    }
  }, []);

  // Schedule notification
  const scheduleNotification = useCallback(async (theme: ThemeMode) => {
    try {
      if (notificationFrequency === 'off' || !notificationsEnabled) {
        return;
      }

      // Cancel existing notifications
      await Notifications.cancelAllScheduledNotificationsAsync();

      const message = getRandomNotificationMessage(theme);
      const frequencyData = NOTIFICATION_FREQUENCIES[notificationFrequency];

      // Calculate trigger time
      const now = new Date();
      const triggerDate = new Date();
      triggerDate.setHours(notificationTime.hour, notificationTime.minute, 0, 0);

      // If the time has passed today, schedule for tomorrow
      if (triggerDate <= now) {
        triggerDate.setDate(triggerDate.getDate() + 1);
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Tap Nothing',
          body: message,
          sound: 'default',
          badge: 1,
        },
        trigger: null,
      });

      console.log(`Notification scheduled for ${triggerDate.toLocaleString()}: ${message}`);
    } catch (error) {
      console.log('Error scheduling notification:', error);
    }
  }, [notificationsEnabled, notificationFrequency, notificationTime]);

  // Toggle notifications
  const toggleNotifications = useCallback(async (enabled: boolean) => {
    if (enabled) {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        return false;
      }
    } else {
      // Cancel all notifications when disabled
      await Notifications.cancelAllScheduledNotificationsAsync();
    }

    setNotificationsEnabled(enabled);
    try {
      await SecureStore.setItemAsync(NOTIFICATIONS_ENABLED_KEY, enabled.toString());
    } catch (error) {
      console.log('Error saving notification enabled setting:', error);
    }

    return true;
  }, [requestPermissions]);

  // Change notification frequency
  const changeNotificationFrequency = useCallback(async (frequency: NotificationFrequency) => {
    setNotificationFrequency(frequency);
    try {
      await SecureStore.setItemAsync(NOTIFICATION_FREQUENCY_KEY, frequency);
    } catch (error) {
      console.log('Error saving notification frequency:', error);
    }
  }, []);

  // Change notification time
  const changeNotificationTime = useCallback(async (time: { hour: number; minute: number }) => {
    setNotificationTime(time);
    try {
      await SecureStore.setItemAsync(NOTIFICATION_TIME_KEY, JSON.stringify(time));
    } catch (error) {
      console.log('Error saving notification time:', error);
    }
  }, []);

  // Check current permissions
  const checkPermissions = useCallback(async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      setPermissionStatus(status);
      return status === 'granted';
    } catch (error) {
      console.log('Error checking permissions:', error);
      return false;
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    loadNotificationSettings();
    checkPermissions();
  }, [loadNotificationSettings, checkPermissions]);

  return {
    notificationsEnabled,
    notificationFrequency,
    notificationTime,
    permissionStatus,
    toggleNotifications,
    changeNotificationFrequency,
    changeNotificationTime,
    scheduleNotification,
    requestPermissions,
    loadNotificationSettings,
  };
};