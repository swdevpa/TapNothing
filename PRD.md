# Product Requirements Document (PRD)

## 📱 Project: Tap Nothing

### 🧠 Summary
"Tap Nothing" is an absurd, humorous, and purposefully pointless mobile app where users tap a button and are rewarded with random nonsense. The goal is not to win or advance but to laugh, reflect, and escape the productivity-driven app world for a moment.

---

## 🎯 Goals

- Create a playful, ironic experience that breaks user expectations.
- Deliver a "game" that has no objective or progress—only randomness.
- Keep the app lightweight, fast, and accessible via Expo Go and EAS.

---

## 🧑‍💻 Target Platform

- **React Native** via **Expo Go**
- **EAS Build** for app store distribution (iOS & Android)
- Minimum SDK: `expo@50+` (Expo SDK 50 or latest stable)

---

## 🛠️ Features (MVP)

### 1. Tap Button (Main Interaction)
- Large tappable button centered on screen.
- On tap:
  - Random message appears (from pre-defined array).
  - Optional: Random sound effect is played.
  - Optional: Fake achievement is displayed.

### 2. Random Message System
- A rotating pool of sarcastic, funny, demotivating, or totally random phrases.
- Message types:
  - Encouragement: “Nice… I guess.”
  - Sarcasm: “You’ve done nothing. Keep going.”
  - Existential: “Are you proud of this moment?”
  - Fake achievements: “Level 6 Unlocked – Master of Taps.”

### 3. Sound Effects (Optional)
- Play random sound clips on each tap.
- Examples: *Plop*, *Boo*, *Applause*, *Goat bleating*, silence.

### 4. Hidden Tap Counter (Optional)
- Hidden `tapCount` variable used to unlock:
  - Specific milestones (e.g., every 50 taps).
  - More sarcastic responses or altered button behavior.

### 5. Button Behavior (Optional for Post-MVP)
- Button begins to:
  - Move slightly.
  - Shrink or grow.
  - Flash/change color.
  - "Run away" from the user.
- Triggered based on tap count or randomly.

---

## 🧩 Optional (Post-MVP / Nice-to-Haves)

- **Dark Mode**
- **Multiple button styles / themes** ("Zen Mode", "Angry Mode", "Sad Mode")
- **User config toggle** (disable sounds, set sarcasm level, etc.)
- **Local notifications**: “It’s time to tap… nothing.”

---

## 🧪 Technical Stack

- **Framework:** React Native (via Expo)
- **Build/CI:** EAS Build (for iOS + Android)
- **Storage:** `expo-secure-store` or `AsyncStorage` (for tap count / achievements)
- **Audio:** `expo-av` (for sound effects)
- **UI Library:** Optional (e.g., NativeBase, Tailwind via `nativewind`)

---

## 📦 Dependencies (example `package.json` section)
```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "expo-av": "~13.5.0",
    "expo-secure-store": "~12.5.0"
  }
}
