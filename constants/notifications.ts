import { ThemeMode } from './themes';

export type NotificationFrequency = '1h' | '6h' | '12h' | '24h' | 'off';

export const NOTIFICATION_FREQUENCIES = {
  '1h': { label: '1 Hour', seconds: 3600 },
  '6h': { label: '6 Hours', seconds: 21600 },
  '12h': { label: '12 Hours', seconds: 43200 },
  '24h': { label: '24 Hours', seconds: 86400 },
  'off': { label: 'Off', seconds: 0 },
};

export const NOTIFICATION_MESSAGES = {
  default: [
    "It's time to tap… nothing.",
    "Your button misses you.",
    "The void is calling your name.",
    "Achievement unlocked: Professional Procrastinator.",
    "Time to accomplish absolutely nothing!",
    "Your pointless journey awaits.",
    "The button grows lonely without you.",
    "Embrace the meaninglessness!",
  ],
  zen: [
    "Time for mindful tapping meditation.",
    "Your inner button seeks peace.",
    "Breathe in... breathe out... tap nothing.",
    "The universe whispers: 'Tap'.",
    "Find serenity in pointless action.",
    "Your zen garden needs tending.",
    "Peaceful nothingness awaits.",
    "Center yourself through tapping.",
  ],
  angry: [
    "TIME TO UNLEASH YOUR RAGE ON THE BUTTON!",
    "THE BUTTON DEMANDS YOUR FURY!",
    "ANGRY TAPPING SESSION OVERDUE!",
    "DESTROY THE BUTTON WITH YOUR WRATH!",
    "RAGE MODE ACTIVATION REQUIRED!",
    "THE BUTTON FEARS YOUR ABSENCE!",
    "UNLEASH HELL... ON A BUTTON!",
    "YOUR ANGER GROWS COLD WITHOUT TAPPING!",
  ],
  sad: [
    "The button weeps for you...",
    "Another day, another meaningless tap awaits.",
    "Your digital depression needs feeding.",
    "Even the app is sadder without you.",
    "Melancholy tapping time has arrived.",
    "The void feels extra empty today.",
    "Your existential crisis misses you.",
    "Tap away your sorrows... or don't.",
  ],
  chaos: [
    "CHAOS DEMANDS YOUR ATTENTION!",
    "Random notification! Tap randomly!",
    "ANARCHY THROUGH TAPPING!",
    "The universe is chaos. Embrace it.",
    "Unpredictable tapping time!",
  ],
  minimalist: [
    "Tap.",
    "Simple notification.",
    "Less is more. Tap is all.",
    "Clean. Pure. Tap.",
    "Minimal effort required.",
  ],
  retro: [
    "Radical tapping session needed!",
    "Totally tubular button awaits!",
    "80s nostalgia requires tapping!",
    "Synthwave your way to the button!",
    "Neon dreams need tapping!",
  ],
  nature: [
    "The digital forest calls you.",
    "Organic tapping session overdue.",
    "Mother Earth wants you to tap.",
    "Natural pointlessness awaits.",
    "Eco-friendly button therapy time.",
  ],
};

export const getRandomNotificationMessage = (theme: ThemeMode): string => {
  const messages = NOTIFICATION_MESSAGES[theme] || NOTIFICATION_MESSAGES.default;
  if (!messages || messages.length === 0) {
    return "Your button misses you.";
  }
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};