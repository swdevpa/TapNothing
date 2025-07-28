export interface EasterEgg {
  count: number;
  message: string;
  type: string;
  special?: boolean;
}

export const EASTER_EGGS: EasterEgg[] = [
  // Classic references
  { count: 42, message: "The answer to life, universe, and pointless tapping", type: "answer", special: true },
  { count: 69, message: "Nice.", type: "nice" },
  { count: 404, message: "Error 404: Meaning not found", type: "error" },
  { count: 1337, message: "Elite h4x0r of pointlessness detected", type: "elite", special: true },
  { count: 9999, message: "You have reached peak pointlessness", type: "peak", special: true },
  
  // Tech references
  { count: 128, message: "8-bit tapping detected", type: "tech" },
  { count: 256, message: "16-bit nostalgia activated", type: "tech" },
  { count: 512, message: "Memory overflow: Too much tapping", type: "tech" },
  { count: 1024, message: "1 KB of pure meaninglessness", type: "tech" },
  { count: 2048, message: "Achievement unlocked: 2048 ways to waste time", type: "tech" },
  
  // Pop culture
  { count: 7, message: "Bond, James Bond... of tapping", type: "spy" },
  { count: 101, message: "Tapping 101: Advanced Pointlessness", type: "academic" },
  { count: 300, message: "THIS! IS! TAPPING!", type: "sparta" },
  { count: 666, message: "Devilishly pointless", type: "devil" },
  { count: 777, message: "Lucky number, unlucky productivity", type: "lucky" },
  { count: 911, message: "Emergency: Excessive tapping detected", type: "emergency" },
  
  // Time references
  { count: 1969, message: "One small tap for man, one giant leap for pointlessness", type: "moon" },
  { count: 1984, message: "Big Brother is watching you... tap", type: "orwell" },
  { count: 2000, message: "Y2K bug: Still tapping after all these years", type: "y2k" },
  { count: 2012, message: "The world ended, but the tapping continues", type: "apocalypse" },
  
  // Mathematical
  { count: 314, message: "π-ing away your time, digit by digit", type: "math" },
  { count: 271, message: "e-xcellent pointlessness", type: "math" },
  { count: 360, message: "Full circle of meaninglessness", type: "math" },
  { count: 420, message: "Blaze it... with tapping", type: "meme" },
  
  // Gaming references
  { count: 100, message: "Extra life earned through pointless tapping", type: "gaming" },
  { count: 8008, message: "B00BS (Calculator humor never dies)", type: "calculator" },
  
  // Self-referential
  { count: 12345, message: "Sequential pointlessness achieved", type: "sequence" },
  { count: 54321, message: "Countdown to... more tapping", type: "countdown" },
  { count: 55555, message: "Quintuple pointlessness!", type: "quintuple" },
  
  // Absurd high numbers
  { count: 99999, message: "You need help. Seriously. But keep tapping!", type: "intervention", special: true },
  { count: 100000, message: "100K taps! You are officially insane. We respect that.", type: "insane", special: true },
];

// Convert array to map for faster lookup
export const EASTER_EGG_MAP = new Map(
  EASTER_EGGS.map(egg => [egg.count, egg])
);

export const getEasterEgg = (count: number): EasterEgg | null => {
  return EASTER_EGG_MAP.get(count) || null;
};

export const isSpecialEasterEgg = (count: number): boolean => {
  const egg = getEasterEgg(count);
  return egg?.special === true;
};