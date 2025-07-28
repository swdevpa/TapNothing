import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { ThemeMode, THEMES } from '../constants/themes';

interface TapButtonProps {
  onTap: () => void;
  position: { x: number; y: number };
  scale: number;
  tapCount: number;
  theme: ThemeMode;
  rotation?: number;
  opacity?: number;
  buttonText?: string;
}

const { width, height } = Dimensions.get('window');

export const TapButton: React.FC<TapButtonProps> = ({
  onTap,
  position,
  scale,
  tapCount,
  theme,
  rotation = 0,
  opacity = 1,
  buttonText,
}) => {
  // Button color changes based on tap count and theme
  const getButtonColor = () => {
    const themeData = THEMES[theme];
    return themeData.buttonColors[tapCount % themeData.buttonColors.length];
  };

  // Button text changes based on tap count and theme
  const getButtonText = () => {
    // If custom button text is provided (from enhanced behavior), use it
    if (buttonText) return buttonText;
    
    if (tapCount === 0) {
      switch (theme) {
        case 'zen': return 'BREATHE & TAP';
        case 'angry': return 'RAGE TAP!';
        case 'sad': return 'TAP... *sigh*';
        case 'chaos': return 'CHAOS TAP!';
        case 'minimalist': return 'TAP';
        case 'retro': return 'CLICK ME!';
        case 'nature': return 'ORGANIC TAP';
        default: return 'TAP ME';
      }
    }
    
    if (tapCount < 10) {
      switch (theme) {
        case 'zen': return 'MINDFUL TAP';
        case 'angry': return 'MORE RAGE!';
        case 'sad': return 'TAP AGAIN...';
        case 'chaos': return 'M0R3 CH40S!';
        case 'minimalist': return 'AGAIN';
        case 'retro': return 'RADICAL!';
        case 'nature': return 'GROW TAP';
        default: return 'TAP AGAIN';
      }
    }
    
    if (tapCount < 50) {
      switch (theme) {
        case 'zen': return 'FLOW STATE';
        case 'angry': return 'UNLEASH FURY!';
        case 'sad': return 'WHY CONTINUE?';
        case 'chaos': return 'ANARCHY!';
        case 'minimalist': return 'CONTINUE';
        case 'retro': return 'TOTALLY!';
        case 'nature': return 'FLOURISH';
        default: return 'KEEP GOING';
      }
    }
    
    if (tapCount < 100) {
      switch (theme) {
        case 'zen': return 'ENLIGHTENED';
        case 'angry': return 'DESTROY!';
        case 'sad': return 'STILL TAPPING...';
        case 'chaos': return 'PANDEMONIUM!';
        case 'minimalist': return 'PERSIST';
        case 'retro': return 'GNARLY!';
        case 'nature': return 'BLOOM';
        default: return 'WHY STOP?';
      }
    }
    
    if (tapCount < 200) {
      switch (theme) {
        case 'zen': return 'TRANSCENDENT';
        case 'angry': return 'ULTIMATE RAGE';
        case 'sad': return 'HOLLOW TAPS';
        case 'chaos': return 'VOID CHAOS';
        case 'minimalist': return 'ESSENCE';
        case 'retro': return 'TUBULAR!';
        case 'nature': return 'ECOSYSTEM';
        default: return 'STILL HERE?';
      }
    }
    
    if (tapCount < 500) {
      switch (theme) {
        case 'zen': return 'NIRVANA';
        case 'angry': return 'GODLIKE FURY';
        case 'sad': return 'EMPTY INSIDE';
        case 'chaos': return 'ENTROPY MAX';
        case 'minimalist': return 'PURE';
        case 'retro': return 'BODACIOUS!';
        case 'nature': return 'ANCIENT TREE';
        default: return 'IMPRESSIVE';
      }
    }
    
    switch (theme) {
      case 'zen': return 'ONE WITH TAP';
      case 'angry': return 'ETERNAL RAGE';
      case 'sad': return 'MEANINGLESS';
      case 'chaos': return 'UNIVERSAL CHAOS';
      case 'minimalist': return 'ABSOLUTE';
      case 'retro': return 'ULTIMATE!';
      case 'nature': return 'GAIA TOUCHED';
      default: return 'UNSTOPPABLE';
    }
  };

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        {
          opacity,
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { scale },
            { rotate: `${rotation}deg` },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: getButtonColor() },
        ]}
        onPress={onTap}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { opacity: opacity }]}>{getButtonText()}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});