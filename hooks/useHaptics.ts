import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { ThemeMode } from '../constants/themes';

export const useHaptics = () => {
  // Theme-specific haptic feedback
  const triggerHapticForTheme = useCallback(async (theme: ThemeMode, tapCount: number) => {
    try {
      switch (theme) {
        case 'zen':
          // Soft, calming feedback
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
          
        case 'angry':
          // Strong, aggressive feedback
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
          
        case 'sad':
          // Weak, depressing feedback (or none for extra sadness)
          if (Math.random() > 0.3) { // 70% chance of no feedback (too sad)
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          break;
          
        default:
          // Default playful feedback
          if (tapCount < 50) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          } else if (tapCount < 200) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          } else {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }
          break;
      }
    } catch (error) {
      console.log('Haptic feedback error:', error);
    }
  }, []);

  // Special haptic patterns for milestones
  const triggerMilestoneHaptic = useCallback(async (tapCount: number) => {
    try {
      if (tapCount % 100 === 0) {
        // Triple burst for big milestones
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 100);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 200);
      } else if ([10, 25, 50, 250, 500, 1000].includes(tapCount)) {
        // Double burst for special milestones
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 80);
      }
    } catch (error) {
      console.log('Milestone haptic error:', error);
    }
  }, []);

  // Easter egg haptic patterns
  const triggerEasterEggHaptic = useCallback(async (easterEggType: string) => {
    try {
      switch (easterEggType) {
        case 'nice':
          // Playful double tap
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 50);
          break;
          
        case 'answer':
          // The answer to everything - epic pattern
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 200);
          break;
          
        case 'error':
          // Error pattern
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
          
        case 'elite':
          // Elite hacker pattern
          const pattern = [100, 50, 100, 50, 200];
          for (let i = 0; i < pattern.length; i++) {
            setTimeout(() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }, pattern.slice(0, i).reduce((a, b) => a + b, 0));
          }
          break;
          
        default:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      console.log('Easter egg haptic error:', error);
    }
  }, []);

  return {
    triggerHapticForTheme,
    triggerMilestoneHaptic,
    triggerEasterEggHaptic,
  };
};