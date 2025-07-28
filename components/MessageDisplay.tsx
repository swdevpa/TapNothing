import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

interface MessageDisplayProps {
  message: string;
  tapCount: number;
}

const { width } = Dimensions.get('window');

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  tapCount,
}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animate message changes
  useEffect(() => {
    // Fade out, then fade in with scale effect
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [message, fadeAnim, scaleAnim]);

  // Message styling changes based on tap count
  const getMessageStyle = () => {
    const baseStyle = styles.message;
    
    if (tapCount > 100) {
      return [baseStyle, styles.messageHighCount];
    } else if (tapCount > 50) {
      return [baseStyle, styles.messageMediumCount];
    }
    
    return baseStyle;
  };

  // Container style changes for extra absurdity
  const getContainerStyle = () => {
    if (tapCount > 200) {
      // Start rotating the message container slightly
      const rotation = `${(tapCount % 10) - 5}deg`;
      return [
        styles.container,
        {
          transform: [{ rotate: rotation }],
        },
      ];
    }
    
    return styles.container;
  };

  return (
    <Animated.View
      style={[
        getContainerStyle(),
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={getMessageStyle()}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minHeight: 80,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
    lineHeight: 24,
  },
  messageMediumCount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  messageHighCount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4ECDC4',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});