# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TapNothing is a comprehensive React Native mobile app built with Expo SDK 53 that delivers a sophisticated, humor-driven "purposefully pointless" experience. Users tap a button to receive absurd messages while the app tracks extensive statistics, provides haptic feedback, detects Easter eggs, and offers sharing capabilities. The app has evolved from a simple MVP to include 8 themes, device integration, anti-achievements, and advanced button behaviors while maintaining its core absurdist philosophy.

## Development Commands

- `npm install --legacy-peer-deps` - Install dependencies (required due to React 19 compatibility issues)
- `npx expo start` - Start development server with QR code for Expo Go testing
- `npx expo start --clear` - Start with cache cleared (useful for debugging)
- `npx expo start --android` - Start for Android development
- `npx expo start --ios` - Start for iOS development
- `npx tsc --noEmit` - TypeScript compilation and error checking
- `eas build` - Production builds for app stores (requires EAS CLI setup)

## Architecture Overview

The app follows a **comprehensive hook-based React architecture** with extensive feature implementation:

### Core Architecture Pattern
- **App.tsx**: Main orchestrator importing and coordinating 8 custom hooks with SafeAreaProvider integration
- **8 Custom Hooks**: Complete business logic separation into specialized domains with state coordination through props and callbacks
- **4 UI Components**: Theme-aware components with progressive animations and advanced behaviors
- **6 Constants Files**: Centralized configuration for themes, Easter eggs, anti-achievements, notifications, messages, and sounds

### State Management Pattern
- **Hook-based state management** using React's built-in `useState` and `useCallback` - no external state libraries
- **Persistent storage** via `expo-secure-store` for all settings, statistics, themes, and achievement data
- **State coordination** through prop passing and callback functions between hooks
- **Session tracking** with comprehensive usage analytics and behavior pattern analysis

### Key Architectural Decisions

**Eight-Theme System**: Expanded from 4 to 8 themes (`Default`, `Zen`, `Angry`, `Sad`, `Chaos`, `Minimalist`, `Retro`, `Nature`) with unique `colors[]`, `buttonColors[]`, `textColor`, `isDark` properties, theme-specific messages, and behavioral characteristics.

**Advanced Persistence**: All settings and statistics stored via `expo-secure-store` including detailed usage metrics, session tracking, daily patterns, and achievement unlocks.

**Enhanced Button Dynamics**: Progressive behavior changes with glitching (400+ taps), teleportation (300+ taps), invisibility (200+ taps), theme-specific movement patterns, and chaos mechanics every 13 taps.

**Comprehensive Device Integration**: Shake-to-reset functionality, battery level influence on colors, time-based theme suggestions, and app state monitoring.

**Statistics & Achievements**: Detailed tracking of usage patterns, session lengths, theme preferences, and 15+ anti-achievements for procrastination behaviors.

**Screenshot & Sharing**: Full-screen capture with overlay management, absurd sharing messages, and certificate generation functionality.

## Enhanced Feature Implementation

### Haptic Feedback System (`useHaptics`)
Theme-specific haptic patterns with milestone celebrations and Easter egg vibrations using `expo-haptics` with device capability detection.

### Easter Egg System (`easterEggs.ts`)
25+ special messages triggered at specific tap counts (42, 69, 404, 1337, etc.) with pop culture references and mathematical constants.

### Anti-Achievement System (`antiAchievements.ts`)
15+ procrastination-focused achievements tracking time waste, usage patterns, theme preferences, and social commentary on digital habits.

### Advanced Statistics (`useAdvancedStats`)
Comprehensive tracking including session management, daily patterns, hourly distribution, theme usage statistics, and formatted display metrics.

### Device Integration (`useDeviceIntegration`)
Shake detection via `expo-sensors`, battery level monitoring with `expo-battery`, time-based theming, and contextual messaging based on device state.

### Screenshot Sharing (`useScreenshotShare`)
Clean screenshot capture using `react-native-view-shot` with automatic overlay hiding, custom filename generation, and themed sharing messages.

## Project Structure Notes

### Enhanced Hooks (`/hooks/`)
- **useTapLogic**: Core business logic with complete feature integration
- **useHaptics**: Theme-specific haptic feedback and milestone celebrations  
- **useAdvancedStats**: Comprehensive usage tracking and session management
- **useEnhancedButtonBehavior**: Advanced button animations and state management
- **useDeviceIntegration**: Shake detection, battery monitoring, time-based features
- **useScreenshotShare**: Clean screenshot capture with sharing functionality
- **useSoundEffects**: Audio system ready for sound file implementation
- **useNotifications**: Complete notification system with theme-specific messages

### Enhanced Constants (`/constants/`)
- **themes.ts**: Eight complete theme definitions with behavioral characteristics
- **easterEggs.ts**: 25+ Easter eggs with special tap count triggers
- **antiAchievements.ts**: 15+ procrastination achievements with unlock conditions
- **notifications.ts**: Theme-specific notification messages for all 8 themes
- **messages.ts**: Expanded message pools with theme-specific content
- **sounds.ts**: Sound effect identifiers for future audio integration

### Component Architecture
All components updated to support enhanced features:
- **TapButton**: Rotation, opacity, scale, theme-specific text progression, enhanced behaviors
- **SettingsPanel**: Expandable statistics, achievement display, sharing options
- **MessageDisplay**: Easter egg integration with time-based and contextual messages
- **ThemeSelector**: Support for 8 themes with preview and behavioral descriptions

## Development Notes

### Enhanced Dependencies
- **Core Framework**: Expo SDK 53, React Native 0.79.5, React 19.0.0, TypeScript 5.1.3
- **Device Integration**: `expo-sensors`, `expo-battery`, `expo-haptics`, `react-native-safe-area-context`
- **Media & Sharing**: `expo-media-library`, `expo-sharing`, `react-native-view-shot`
- **Notifications & Audio**: `expo-notifications`, `expo-audio` (foundation for future sound)
- **Storage**: `expo-secure-store` for comprehensive persistent data management

### Critical Implementation Details
- **Error Handling**: All hooks integrate seamlessly with error boundaries and fallback mechanisms
- **Cross-Platform**: iOS/Android compatibility with platform-specific optimizations throughout
- **Performance**: `useCallback` and proper dependency arrays, React Native Animated API integration
- **Accessibility**: Graceful degradation when device features (haptics, sensors) are unavailable
- **Screenshot System**: Automatic overlay hiding for clean captures with themed sharing messages
- **Progressive Complexity**: Button behaviors evolve based on tap count (200+ invisibility, 300+ teleportation, 400+ glitching)
- **Theme Behavioral Influence**: Themes affect not just visuals but entire user experience and device integration

### Current Implementation Status
**✅ Comprehensive Feature Set**: All MVP, Post-MVP, and advanced enhancement features fully implemented including the complete 8-hook architecture, device integration, sharing system, and achievement tracking.

**🎮 Production Ready**: Advanced error handling, performance optimizations, accessibility considerations, and cross-platform compatibility throughout the enhanced feature set.

### Architecture Benefits
This implementation demonstrates enterprise-level React Native patterns with comprehensive state management, advanced device integration, sophisticated user experience features, and extensive customization options while preserving the app's core absurdist entertainment value. The modular hook architecture allows for easy feature extension and maintenance.