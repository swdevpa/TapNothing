# TapNothing

A comprehensive React Native mobile app built with Expo SDK 53 that delivers a sophisticated, humor-driven "purposefully pointless" experience. Users tap a button to receive absurd messages while the app tracks extensive statistics, provides haptic feedback, detects Easter eggs, and offers sharing capabilities.

## Features

- **8 Unique Themes**: Default, Zen, Angry, Sad, Chaos, Minimalist, Retro, and Nature
- **Advanced Button Behaviors**: Progressive changes with glitching, teleportation, and invisibility
- **Easter Egg System**: 25+ special messages at specific tap counts (42, 69, 404, 1337, etc.)
- **Anti-Achievement System**: 15+ procrastination-focused achievements
- **Device Integration**: Shake-to-reset, battery level influence, time-based suggestions
- **Screenshot & Sharing**: Full-screen capture with themed sharing messages
- **Comprehensive Statistics**: Detailed usage tracking and session management
- **Haptic Feedback**: Theme-specific vibration patterns

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd TapNothing

# Install dependencies (legacy peer deps required for React 19 compatibility)
npm install --legacy-peer-deps
```

### Development

```bash
# Start development server with QR code for Expo Go testing
npx expo start

# Start with cache cleared (useful for debugging)
npx expo start --clear

# Platform-specific development
npx expo start --android
npx expo start --ios

# TypeScript compilation and error checking
npx tsc --noEmit
```

### Production Build

```bash
# Requires EAS CLI setup
eas build
```

## Architecture

The app follows a comprehensive hook-based React architecture with extensive feature implementation:

### Core Components

- **App.tsx**: Main orchestrator with SafeAreaProvider integration
- **8 Custom Hooks**: Complete business logic separation
- **Theme-Aware Components**: Advanced animations and behaviors
- **Centralized Constants**: Easter eggs, anti-achievements, and device integration

### Key Hooks

- `useTapLogic`: Core business logic with complete feature integration
- `useHaptics`: Theme-specific haptic feedback and milestone celebrations
- `useAdvancedStats`: Comprehensive usage tracking and session management
- `useEnhancedButtonBehavior`: Advanced button animations and state management
- `useDeviceIntegration`: Shake detection, battery monitoring, time-based features
- `useScreenshotShare`: Clean screenshot capture with sharing functionality
- `useSoundEffects`: Audio system ready for sound file implementation
- `useNotifications`: Complete notification system with theme-specific messages

## Dependencies

### Core Dependencies
- Expo SDK 53
- React Native
- TypeScript

### Enhanced Features
- `expo-haptics`: Tactile feedback system
- `expo-sensors`: Device motion and shake detection
- `expo-battery`: Battery level monitoring
- `expo-media-library`: Screenshot saving to device gallery
- `expo-sharing`: Social sharing functionality
- `react-native-view-shot`: Screenshot capture capabilities
- `expo-secure-store`: Persistent storage for settings and statistics

## Project Structure

```
├── App.tsx                 # Main application component
├── hooks/                  # Custom React hooks
│   ├── useTapLogic.ts
│   ├── useHaptics.ts
│   ├── useAdvancedStats.ts
│   └── ...
├── constants/              # Centralized configuration
│   ├── themes.ts
│   ├── easterEggs.ts
│   ├── antiAchievements.ts
│   └── ...
├── components/             # UI components
│   ├── TapButton.tsx
│   ├── SettingsPanel.tsx
│   └── ...
└── CLAUDE.md              # Development guidance
```

## Contributing

This project uses a modular hook architecture that allows for easy feature extension and maintenance. All features integrate seamlessly with error boundaries and fallback mechanisms.

## About

TapNothing demonstrates enterprise-level React Native patterns with comprehensive state management, advanced device integration, sophisticated user experience features, and extensive customization options while preserving the app's core absurdist entertainment value.