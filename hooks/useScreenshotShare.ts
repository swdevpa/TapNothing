import { useCallback } from 'react';
import { Alert, Share, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { captureRef, captureScreen } from 'react-native-view-shot';

export const useScreenshotShare = () => {
  
  // Request permissions for media library
  const requestPermissions = useCallback(async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.log('Error requesting media permissions:', error);
      return false;
    }
  }, []);

  // Generate absurd sharing messages
  const generateShareMessage = useCallback((tapCount: number, theme: string) => {
    const absurdMessages = [
      `I just tapped a button ${tapCount} times for absolutely no reason. Peak productivity! 🏆`,
      `Breaking: Local person achieves ${tapCount} taps of pure meaninglessness. More at 11. 📰`,
      `${tapCount} taps later, I've discovered the secret to accomplishing nothing. AMA. 🤔`,
      `Current status: ${tapCount} taps into the void. My therapist will hear about this. 🛋️`,
      `Achievement unlocked: ${tapCount} ways to avoid real work. Parents are so proud. 👨‍👩‍👧‍👦`,
      `Scientific breakthrough: Converted ${tapCount} finger movements into pure pointlessness. Nobel Prize pending. 🏅`,
      `Update: Still tapping. ${tapCount} taps in. Send help... or more buttons. 🆘`,
      `Ladies and gentlemen, we got 'em. ${tapCount} taps of certified organic meaninglessness. 🌿`,
    ];

    const themeMessages = {
      zen: `Found inner peace through ${tapCount} mindful taps. Enlightenment achieved. 🧘‍♀️`,
      angry: `CHANNELED MY RAGE INTO ${tapCount} FURIOUS TAPS! BUTTON FEARS ME NOW! 😡`,
      sad: `Expressed my existential dread through ${tapCount} melancholic taps... *sigh* 😢`,
      chaos: `${tapCount} CHAOTIC TAPS OF PURE RANDOMNESS! UNIVERSE = BROKEN! 🌀`,
      minimalist: `${tapCount} taps. Simple. Clean. Pointless. ⚪`,
      retro: `Synthwaved my way through ${tapCount} radical taps. Totally tubular! 🕺`,
      nature: `${tapCount} organic, free-range, grass-fed taps. Mother Earth disapproves. 🌍`,
    };

    const themeMessage = themeMessages[theme as keyof typeof themeMessages];
    if (themeMessage) return themeMessage;

    return absurdMessages[Math.floor(Math.random() * absurdMessages.length)];
  }, []);

  // Take screenshot and save to gallery
  const takeScreenshot = useCallback(async (viewRef: any, tapCount: number, theme: string) => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'We need access to your photo library to save screenshots.',
          [{ text: 'OK' }]
        );
        return null;
      }

      let uri: string;
      try {
        // First try to capture the specific view
        if (viewRef) {
          uri = await captureRef(viewRef, {
            format: 'png',
            quality: 0.9,
            result: 'tmpfile',
            height: undefined, // Use full height
            width: undefined,  // Use full width
            snapshotContentContainer: false, // Capture the entire view
          });
        } else {
          throw new Error('No viewRef provided');
        }
      } catch (viewError) {
        console.log('ViewRef capture failed, trying screen capture:', viewError);
        // Fallback to full screen capture
        uri = await captureScreen({
          format: 'png',
          quality: 0.9,
          result: 'tmpfile',
        });
      }

      // Create a custom filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `TapNothing_${tapCount}taps_${theme}_${timestamp}.png`;
      
      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Tap Nothing Screenshots', asset, false);

      return {
        uri,
        filename,
        message: 'Screenshot saved to gallery! 📸',
      };

    } catch (error) {
      console.log('Screenshot error:', error);
      Alert.alert('Error', 'Failed to take screenshot. Try again!');
      return null;
    }
  }, [requestPermissions]);

  // Share screenshot with message
  const shareScreenshot = useCallback(async (viewRef: any, tapCount: number, theme: string) => {
    try {
      const screenshot = await takeScreenshot(viewRef, tapCount, theme);
      if (!screenshot) return;

      const shareMessage = generateShareMessage(tapCount, theme);
      
      await Share.share({
        message: shareMessage,
        url: screenshot.uri,
        title: 'My Pointless Achievement',
      });

    } catch (error) {
      console.log('Share error:', error);
      Alert.alert('Error', 'Failed to share screenshot. The universe prevented it.');
    }
  }, [takeScreenshot, generateShareMessage]);

  // Share just the message (without screenshot)
  const shareMessage = useCallback(async (tapCount: number, theme: string) => {
    try {
      const message = generateShareMessage(tapCount, theme);
      
      await Share.share({
        message,
        title: 'My Pointless Achievement',
      });

    } catch (error) {
      console.log('Share message error:', error);
      Alert.alert('Error', 'Failed to share your pointlessness. How ironic.');
    }
  }, [generateShareMessage]);

  // Generate certificate text
  const generateCertificate = useCallback((tapCount: number, theme: string, daysUsed: number) => {
    const certificates = [
      `🏆 CERTIFICATE OF POINTLESSNESS 🏆\n\nThis certifies that the bearer has successfully\nwasted ${tapCount} finger movements\nover ${daysUsed} days of their precious life\n\nTheme mastered: ${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode\n\nAchievement Level: ${Math.floor(tapCount / 100) + 1}\nPointlessness Degree: PhD in Nothing\n\nCongratulations on this meaningless milestone!\n\n- The Department of Digital Futility`,
      
      `📜 DIPLOMA IN DIGITAL PROCRASTINATION 📜\n\nBe it known that the holder has earned\n${tapCount} Credits in Advanced Button Studies\n\nSpecialization: ${theme} Methodology\nTime Invested: ${daysUsed} days of questionable choices\n\nGPA: ${(tapCount / 1000).toFixed(2)} out of ∞\n\nGranted with all the privileges and\nresponsibilities of a Certified Time Waster\n\n- University of Pointless Pursuits`,
      
      `🎖️ MILITARY COMMENDATION 🎖️\n\nFor distinguished service in the\nWar Against Productivity\n\n${tapCount} confirmed taps\n${daysUsed} days of active duty\nSpecialist in ${theme} Operations\n\nDecorations earned:\n• Purple Thumb (${Math.floor(tapCount / 100)} awards)\n• Medal of Dishonor\n• Distinguished Flying Cross (into meaninglessness)\n\n- Department of Digital Defense`,
    ];

    return certificates[Math.floor(Math.random() * certificates.length)];
  }, []);

  // Share certificate
  const shareCertificate = useCallback(async (tapCount: number, theme: string, daysUsed: number) => {
    try {
      const certificate = generateCertificate(tapCount, theme, daysUsed);
      
      await Share.share({
        message: certificate,
        title: 'My Certificate of Pointlessness',
      });

    } catch (error) {
      console.log('Certificate share error:', error);
      Alert.alert('Error', 'Failed to share your certificate. Degree revoked.');
    }
  }, [generateCertificate]);

  // Take full screen screenshot (alternative method)
  const takeFullScreenshot = useCallback(async (tapCount: number, theme: string) => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'We need access to your photo library to save screenshots.',
          [{ text: 'OK' }]
        );
        return null;
      }

      // Capture full screen
      const uri = await captureScreen({
        format: 'png',
        quality: 0.9,
        result: 'tmpfile',
      });

      // Create a custom filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `TapNothing_${tapCount}taps_${theme}_${timestamp}.png`;
      
      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Tap Nothing Screenshots', asset, false);

      return {
        uri,
        filename,
        message: 'Full screenshot saved to gallery! 📸',
      };

    } catch (error) {
      console.log('Full screenshot error:', error);
      Alert.alert('Error', 'Failed to take screenshot. Try again!');
      return null;
    }
  }, [requestPermissions]);

  // Share full screenshot with message
  const shareFullScreenshot = useCallback(async (tapCount: number, theme: string) => {
    try {
      const screenshot = await takeFullScreenshot(tapCount, theme);
      if (!screenshot) return;

      const shareMessage = generateShareMessage(tapCount, theme);
      
      await Share.share({
        message: shareMessage,
        url: screenshot.uri,
        title: 'My Pointless Achievement',
      });

    } catch (error) {
      console.log('Share full screenshot error:', error);
      Alert.alert('Error', 'Failed to share screenshot. The universe prevented it.');
    }
  }, [takeFullScreenshot, generateShareMessage]);

  return {
    takeScreenshot,
    shareScreenshot,
    takeFullScreenshot,
    shareFullScreenshot,
    shareMessage,
    shareCertificate,
    generateShareMessage,
  };
};