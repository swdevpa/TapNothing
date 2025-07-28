export type ThemeMode = 'default' | 'zen' | 'angry' | 'sad' | 'chaos' | 'minimalist' | 'retro' | 'nature';

export const THEMES = {
  default: {
    name: 'Default',
    colors: ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#a8edea', '#ff9a9e'],
    buttonColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'],
    textColor: '#333',
    isDark: false,
  },
  zen: {
    name: 'Zen Mode',
    colors: ['#E8F5E8', '#F0F8F0', '#E0F0E0', '#D8E8D8', '#F8FFF8', '#F0F8F0', '#E8F0E8'],
    buttonColors: ['#90EE90', '#98FB98', '#F0FFF0', '#E0FFE0', '#D0F0D0', '#C0E0C0', '#B0D0B0'],
    textColor: '#2D5016',
    isDark: false,
  },
  angry: {
    name: 'Angry Mode',
    colors: ['#8B0000', '#DC143C', '#B22222', '#FF0000', '#CD5C5C', '#F08080', '#FF6347'],
    buttonColors: ['#FF0000', '#DC143C', '#B22222', '#8B0000', '#CD5C5C', '#F08080', '#FF4500'],
    textColor: '#FFFFFF',
    isDark: true,
  },
  sad: {
    name: 'Sad Mode',
    colors: ['#2C3E50', '#34495E', '#1A252F', '#34495E', '#2C3E50', '#1B2631', '#283747'],
    buttonColors: ['#34495E', '#2C3E50', '#1B2631', '#283747', '#212F3D', '#1C2833', '#17202A'],
    textColor: '#BDC3C7',
    isDark: true,
  },
  chaos: {
    name: 'Chaos Mode',
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'],
    buttonColors: ['#FF1493', '#32CD32', '#1E90FF', '#FFD700', '#DC143C', '#00CED1', '#FF4500', '#9932CC'],
    textColor: '#FFFFFF',
    isDark: false,
    special: 'chaos', // Special behavior flag
  },
  minimalist: {
    name: 'Ultra Minimal',
    colors: ['#FFFFFF', '#F8F8FF', '#F5F5F5', '#FAFAFA', '#F9F9F9', '#FCFCFC', '#FDFDFD'],
    buttonColors: ['#000000', '#1C1C1C', '#2F2F2F', '#333333', '#404040', '#4D4D4D', '#666666'],
    textColor: '#333333',
    isDark: false,
  },
  retro: {
    name: 'Retro Wave',
    colors: ['#FF006E', '#8338EC', '#3A86FF', '#06FFA5', '#FFBE0B', '#FB5607', '#FF006E'],
    buttonColors: ['#FF10F0', '#FF6EC7', '#C77DFF', '#7209B7', '#560BAD', '#480CA8', '#3F37C9'],
    textColor: '#FFFFFF',
    isDark: true,
  },
  nature: {
    name: 'Nature Mode',
    colors: ['#2D5016', '#3C6318', '#4F7C1A', '#68A020', '#7CB518', '#A8CC3B', '#C9E265'],
    buttonColors: ['#228B22', '#32CD32', '#6B8E23', '#9ACD32', '#ADFF2F', '#7CFC00', '#00FF32'],
    textColor: '#2F4F2F',
    isDark: false,
  },
};

export const getThemeMessages = (theme: ThemeMode) => {
  switch (theme) {
    case 'zen':
      return [
        'Breathe in... breathe out... tap.',
        'One with the button, you are.',
        'In tapping, find your center.',
        'The button is. You are. All is one.',
        'Mindful tapping brings inner peace.',
        'Let the tap flow through you.',
        'Serenity through pointless action.',
        'The way of the tap is the way of zen.',
      ];
    case 'angry':
      return [
        'ANGRY TAP! GRAAAHHH!',
        'TAP IT HARDER! SHOW NO MERCY!',
        'THE BUTTON FEARS YOUR WRATH!',
        'UNLEASH YOUR FURY ON THIS BUTTON!',
        'RAGE! PURE RAGE!',
        'DESTROY THE BUTTON WITH TAPS!',
        'YOUR ANGER FUELS THE TAPPING!',
        'NO MERCY! TAP WITHOUT REMORSE!',
      ];
    case 'sad':
      return [
        'Another tap... another tear.',
        'Why do we tap? Why do we exist?',
        'In sadness, we find... more sadness.',
        'The button cries with you.',
        'Each tap echoes through the void.',
        'Melancholy in button form.',
        'Even the app is depressed now.',
        'Tap... if you must... *sigh*',
      ];
    case 'chaos':
      return [
        'CHAOS! RANDOMNESS! MADNESS!',
        'ERROR ERROR ERROR... wait, that\'s normal.',
        'The universe is breaking! Keep tapping!',
        'RANDOM WORDS: BANANA PURPLE QUANTUM!',
        'System.chaos.engage() = TRUE',
        '01101000 01100101 01101100 01110000',
        'RED! NO BLUE! NO... CONFUSION!',
        'Maximum chaos achieved. Somehow.',
      ];
    case 'minimalist':
      return [
        '.',
        'Tap.',
        'Nothing.',
        '...',
        'Simple.',
        'Minimal tap.',
        'Less is more.',
        '',
      ];
    case 'retro':
      return [
        'Welcome to the future of pointlessness!',
        'Neon dreams and digital screams.',
        'Synthwave your way to nowhere.',
        'OUTRUN the meaning of existence.',
        'Retrograde into pointlessness.',
        'VHS-quality tapping detected.',
        'Miami Vice meets meaningless taps.',
        'Time to get radical... with nothing.',
      ];
    case 'nature':
      return [
        'One with nature... and pointlessness.',
        'Like a tree falling with no one around.',
        'Natural selection favors the tappers.',
        'Photosynthesis: converting light to taps.',
        'Even the leaves think this is pointless.',
        'Mother Earth disapproves of your tapping.',
        'Organic, free-range meaninglessness.',
        'Touch grass... or just keep tapping.',
      ];
    default:
      return [];
  }
};