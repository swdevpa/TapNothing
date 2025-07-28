export interface AntiAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: any) => boolean;
  unlocked?: boolean;
}

export const ANTI_ACHIEVEMENTS: AntiAchievement[] = [
  // Time-based procrastination
  {
    id: 'procrastinator',
    title: 'Professional Procrastinator',
    description: 'Wasted 30 minutes tapping - Congratulations!',
    icon: '🏆',
    condition: (stats) => stats.totalTimeSpent >= 30 * 60 * 1000, // 30 minutes in ms
  },
  {
    id: 'timeWaster',
    title: 'Master Time Waster',
    description: 'Spent over 2 hours accomplishing absolutely nothing',
    icon: '⏰',
    condition: (stats) => stats.totalTimeSpent >= 2 * 60 * 60 * 1000, // 2 hours
  },
  
  // Usage patterns
  {
    id: 'nightOwl',
    title: 'Digital Night Owl',
    description: 'Tapped after midnight - Sleep is overrated',
    icon: '🦉',
    condition: (stats) => stats.lateNightTaps > 0,
  },
  {
    id: 'obsessed',
    title: 'Dangerously Obsessed',
    description: 'Opened app 10 times today - Seek help',
    icon: '😵',
    condition: (stats) => stats.dailyOpens >= 10,
  },
  {
    id: 'quickie',
    title: 'Efficiency Expert',
    description: 'Tapped for exactly 1 second - Boring efficiency detected',
    icon: '⚡',
    condition: (stats) => stats.shortestSession <= 1000 && stats.shortestSession > 0,
  },
  
  // Milestone anti-achievements
  {
    id: 'century',
    title: 'Century of Pointlessness',
    description: '100 taps closer to the heat death of the universe',
    icon: '💯',
    condition: (stats) => stats.totalTaps >= 100,
  },
  {
    id: 'millenium',
    title: 'Millennial Mistake',
    description: '1000 taps of pure, concentrated meaninglessness',
    icon: '🎯',
    condition: (stats) => stats.totalTaps >= 1000,
  },
  {
    id: 'dedication',
    title: 'Questionable Dedication',
    description: 'Tapped every day for a week - Get a hobby',
    icon: '📅',
    condition: (stats) => stats.consecutiveDays >= 7,
  },
  
  // Social commentary
  {
    id: 'antisocial',
    title: 'Antisocial Media',
    description: 'Chose tapping over human interaction',
    icon: '🤳',
    condition: (stats) => stats.totalTaps > 500,
  },
  {
    id: 'philosopher',
    title: 'Accidental Philosopher',
    description: 'Contemplated existence through button pressing',
    icon: '🤔',
    condition: (stats) => stats.existentialMessages >= 10,
  },
  
  // Theme-based
  {
    id: 'zenMaster',
    title: 'Zen Master of Nothing',
    description: 'Found inner peace through pointlessness',
    icon: '🧘',
    condition: (stats) => stats.zenModeTaps >= 100,
  },
  {
    id: 'rageMonster',
    title: 'Rage Monster',
    description: 'Channeled pure fury into a button',
    icon: '👹',
    condition: (stats) => stats.angryModeTaps >= 100,
  },
  {
    id: 'emoKid',
    title: 'Digital Emo',
    description: 'Embraced the darkness of meaningless tapping',
    icon: '🖤',
    condition: (stats) => stats.sadModeTaps >= 100,
  },
  
  // Easter egg related
  {
    id: 'eggHunter',
    title: 'Easter Egg Hunter',
    description: 'Found 5 hidden messages - Congrats, detective',
    icon: '🥚',
    condition: (stats) => stats.easterEggsFound >= 5,
  },
  {
    id: 'memeLord',
    title: 'Meme Lord Supreme',
    description: 'Discovered the sacred number (69) - Nice.',
    icon: '👑',
    condition: (stats) => stats.easterEggsFound >= 1 && stats.totalTaps >= 69,
  },
  
  // Absurd achievements
  {
    id: 'mathematician',
    title: 'Pointless Mathematician',
    description: 'Calculated the exact amount of nothing accomplished',
    icon: '🧮',
    condition: (stats) => stats.totalTaps === 314 || stats.totalTaps === 271,
  },
  {
    id: 'archaeologist',
    title: 'Digital Archaeologist',
    description: 'Unearthed ancient tap counts from device storage',
    icon: '🏺',
    condition: (stats) => stats.daysUsed >= 30,
  },
  {
    id: 'therapist',
    title: 'Self-Appointed Therapist',
    description: 'Used button therapy for emotional healing',
    icon: '💊',
    condition: (stats) => stats.totalTimeSpent >= 60 * 60 * 1000, // 1 hour
  },
];

export const checkAntiAchievements = (stats: any, currentAchievements: string[] = []): AntiAchievement[] => {
  return ANTI_ACHIEVEMENTS.filter(achievement => 
    !currentAchievements.includes(achievement.id) && 
    achievement.condition(stats)
  );
};

export const getAchievementById = (id: string): AntiAchievement | undefined => {
  return ANTI_ACHIEVEMENTS.find(achievement => achievement.id === id);
};