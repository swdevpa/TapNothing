import { useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { ThemeMode } from '../constants/themes';

interface ButtonState {
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  opacity: number;
  isGlitching: boolean;
  isTeleporting: boolean;
  isInvisible: boolean;
}

const { width, height } = Dimensions.get('window');
const SAFE_MARGIN = 100; // Keep button away from edges

export const useEnhancedButtonBehavior = () => {
  const [buttonState, setButtonState] = useState<ButtonState>({
    position: { x: 0, y: 0 },
    scale: 1,
    rotation: 0,
    opacity: 1,
    isGlitching: false,
    isTeleporting: false,
    isInvisible: false,
  });

  // Enhanced button behavior based on tap count and theme
  const updateButtonBehavior = useCallback((tapCount: number, theme: ThemeMode) => {
    setButtonState(prevState => {
      let newState = { ...prevState };

      // Chaos theme - completely unpredictable
      if (theme === 'chaos') {
        if (Math.random() < 0.3) { // 30% chance of chaos behavior
          newState.position = {
            x: (Math.random() - 0.5) * (width / 3),
            y: (Math.random() - 0.5) * (height / 4),
          };
          newState.scale = 0.5 + Math.random() * 1.5;
          newState.rotation = Math.random() * 360;
          newState.isGlitching = Math.random() < 0.2;
        }
        return newState;
      }

      // Minimalist theme - very subtle changes
      if (theme === 'minimalist') {
        if (tapCount > 100) {
          newState.position = {
            x: Math.sin(tapCount / 20) * 5,
            y: Math.cos(tapCount / 20) * 5,
          };
        }
        return newState;
      }

      // Progressive behaviors for all themes
      
      // Invisible mode (200+ taps randomly)
      if (tapCount > 200 && Math.random() < 0.05) {
        newState.isInvisible = true;
        newState.opacity = 0.1;
        setTimeout(() => {
          setButtonState(prev => ({ ...prev, isInvisible: false, opacity: 1 }));
        }, 2000);
      }

      // Teleport mode (300+ taps)
      if (tapCount > 300 && Math.random() < 0.08) {
        newState.isTeleporting = true;
        newState.position = {
          x: (Math.random() - 0.5) * (width / 2 - SAFE_MARGIN),
          y: (Math.random() - 0.5) * (height / 3 - SAFE_MARGIN),
        };
        setTimeout(() => {
          setButtonState(prev => ({ ...prev, isTeleporting: false }));
        }, 500);
      }

      // Glitch mode (400+ taps)
      if (tapCount > 400 && Math.random() < 0.1) {
        newState.isGlitching = true;
        // Rapid position changes
        const glitchInterval = setInterval(() => {
          setButtonState(prev => ({
            ...prev,
            position: {
              x: prev.position.x + (Math.random() - 0.5) * 20,
              y: prev.position.y + (Math.random() - 0.5) * 20,
            },
            scale: prev.scale + (Math.random() - 0.5) * 0.2,
          }));
        }, 50);
        
        setTimeout(() => {
          clearInterval(glitchInterval);
          setButtonState(prev => ({ ...prev, isGlitching: false }));
        }, 1000);
      }

      // Size chaos mode (500+ taps)
      if (tapCount > 500) {
        if (Math.random() < 0.15) {
          newState.scale = Math.random() < 0.5 ? 0.3 : 2.5; // Extremely small or large
        }
      }

      // Rotation madness (600+ taps)
      if (tapCount > 600) {
        newState.rotation = (tapCount * 3) % 360;
      }

      // Theme-specific enhanced behaviors
      switch (theme) {
        case 'angry':
          // Aggressive movement and scaling
          if (tapCount > 50) {
            newState.position = {
              x: (Math.random() - 0.5) * Math.min(tapCount / 2, 100),
              y: (Math.random() - 0.5) * Math.min(tapCount / 2, 100),
            };
            newState.scale = 0.8 + (Math.random() * 0.6);
          }
          break;

        case 'zen':
          // Slow, meditative movement
          newState.position = {
            x: Math.sin(tapCount / 30) * 20,
            y: Math.cos(tapCount / 40) * 15,
          };
          newState.scale = 1 + Math.sin(tapCount / 50) * 0.1;
          break;

        case 'sad':
          // Droopy, sad movement
          if (tapCount > 30) {
            newState.position = {
              x: prevState.position.x * 0.95, // Gradually move towards center
              y: Math.max(prevState.position.y + 0.5, 50), // Slowly fall down
            };
            newState.scale = Math.max(0.7, prevState.scale * 0.999); // Slowly shrink
          }
          break;

        case 'retro':
          // Geometric, 80s-style movement
          const angle = (tapCount * 5) * (Math.PI / 180);
          newState.position = {
            x: Math.cos(angle) * 30,
            y: Math.sin(angle) * 20,
          };
          break;

        case 'nature':
          // Organic, growing movement
          newState.position = {
            x: Math.sin(tapCount / 25) * Math.log(tapCount + 1) * 3,
            y: Math.cos(tapCount / 35) * Math.log(tapCount + 1) * 2,
          };
          break;

        default:
          // Default progressive behavior
          if (tapCount > 20) {
            const maxOffset = Math.min(50, tapCount / 10);
            newState.position = {
              x: (Math.random() - 0.5) * maxOffset,
              y: (Math.random() - 0.5) * maxOffset,
            };
          }
          
          if (tapCount > 50) {
            const scaleVariation = 0.1 + (Math.random() * 0.3);
            newState.scale = 0.8 + scaleVariation;
          }
      }

      // Chaos reset every 13 taps (but more dramatic now)
      if (tapCount % 13 === 0 && tapCount > 0) {
        if (Math.random() < 0.7) { // 70% chance of reset
          newState.position = { x: 0, y: 0 };
          newState.scale = 1;
          newState.rotation = 0;
          newState.opacity = 1;
        } else {
          // 30% chance of SUPER chaos
          newState.position = {
            x: (Math.random() - 0.5) * 150,
            y: (Math.random() - 0.5) * 150,
          };
          newState.scale = 0.5 + Math.random() * 2;
          newState.rotation = Math.random() * 360;
        }
      }

      return newState;
    });
  }, []);

  // Get special button text based on state
  const getEnhancedButtonText = useCallback((normalText: string, tapCount: number) => {
    if (buttonState.isGlitching) {
      const glitchTexts = ['ERR0R', 'G1!TC#', '?!?!?!', '01010', 'HELP'];
      return glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
    }
    
    if (buttonState.isTeleporting) {
      return '∞ WARP ∞';
    }
    
    if (buttonState.isInvisible) {
      return '👻 GHOST 👻';
    }
    
    if (tapCount > 1000 && Math.random() < 0.1) {
      const epicTexts = ['ULTIMATE', 'MAXIMUM', 'LEGENDARY', 'GODLIKE', 'ETERNAL'];
      return epicTexts[Math.floor(Math.random() * epicTexts.length)];
    }
    
    return normalText;
  }, [buttonState]);

  // Reset button state
  const resetButtonState = useCallback(() => {
    setButtonState({
      position: { x: 0, y: 0 },
      scale: 1,
      rotation: 0,
      opacity: 1,
      isGlitching: false,
      isTeleporting: false,
      isInvisible: false,
    });
  }, []);

  return {
    buttonState,
    updateButtonBehavior,
    getEnhancedButtonText,
    resetButtonState,
  };
};