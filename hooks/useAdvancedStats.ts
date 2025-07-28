import { useState, useCallback, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ThemeMode } from '../constants/themes';

interface DetailedStats {
  totalTaps: number;
  totalTimeSpent: number; // in milliseconds
  sessionsCount: number;
  shortestSession: number;
  longestSession: number;
  averageSessionLength: number;
  dailyOpens: number;
  consecutiveDays: number;
  daysUsed: number;
  firstTapDate: string;
  lastTapDate: string;
  
  // Theme-specific stats
  zenModeTaps: number;
  angryModeTaps: number;
  sadModeTaps: number;
  defaultModeTaps: number;
  chaosModeTaps: number;
  minimalistModeTaps: number;
  retroModeTaps: number;
  natureModeTaps: number;
  
  // Achievement tracking
  easterEggsFound: number;
  milestonesReached: number;
  existentialMessages: number;
  lateNightTaps: number; // taps after midnight
  
  // Daily/Weekly patterns
  dailyTaps: { [date: string]: number };
  hourlyDistribution: number[]; // 0-23 hours
  
  // Efficiency metrics
  tapsPerMinute: number;
  pointlessnessEfficiency: number; // made-up metric
}

const STATS_KEY = 'advancedStats';

const defaultStats: DetailedStats = {
  totalTaps: 0,
  totalTimeSpent: 0,
  sessionsCount: 0,
  shortestSession: 0,
  longestSession: 0,
  averageSessionLength: 0,
  dailyOpens: 0,
  consecutiveDays: 0,
  daysUsed: 0,
  firstTapDate: '',
  lastTapDate: '',
  
  zenModeTaps: 0,
  angryModeTaps: 0,
  sadModeTaps: 0,
  defaultModeTaps: 0,
  chaosModeTaps: 0,
  minimalistModeTaps: 0,
  retroModeTaps: 0,
  natureModeTaps: 0,
  
  easterEggsFound: 0,
  milestonesReached: 0,
  existentialMessages: 0,
  lateNightTaps: 0,
  
  dailyTaps: {},
  hourlyDistribution: new Array(24).fill(0),
  
  tapsPerMinute: 0,
  pointlessnessEfficiency: 0,
};

export const useAdvancedStats = () => {
  const [stats, setStats] = useState<DetailedStats>(defaultStats);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [todayOpens, setTodayOpens] = useState<number>(0);

  // Load stats from storage
  const loadStats = useCallback(async () => {
    try {
      const savedStats = await SecureStore.getItemAsync(STATS_KEY);
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        setStats({ ...defaultStats, ...parsedStats });
      }
    } catch (error) {
      console.log('Error loading advanced stats:', error);
    }
  }, []);

  // Save stats to storage
  const saveStats = useCallback(async (newStats: DetailedStats) => {
    try {
      await SecureStore.setItemAsync(STATS_KEY, JSON.stringify(newStats));
    } catch (error) {
      console.log('Error saving advanced stats:', error);
    }
  }, []);

  // Start session tracking
  const startSession = useCallback(() => {
    const now = Date.now();
    setSessionStartTime(now);
    
    const today = new Date().toDateString();
    setTodayOpens(prev => prev + 1);
    
    setStats(prevStats => ({
      ...prevStats,
      dailyOpens: prevStats.dailyOpens + 1,
      sessionsCount: prevStats.sessionsCount + 1,
    }));
  }, []); // Remove todayOpens dependency

  // Record a tap with advanced tracking
  const recordTap = useCallback(async (theme: ThemeMode, isEasterEgg: boolean = false, isMilestone: boolean = false) => {
    const now = new Date();
    const hour = now.getHours();
    const today = now.toDateString();
    const isLateNight = hour >= 0 && hour < 6; // After midnight

    setStats(prevStats => {
      const newStats = {
        ...prevStats,
        totalTaps: prevStats.totalTaps + 1,
        lastTapDate: now.toISOString(),
        firstTapDate: prevStats.firstTapDate || now.toISOString(),
        
        // Theme-specific tracking
        [`${theme}ModeTaps`]: (prevStats[`${theme}ModeTaps` as keyof DetailedStats] as number) + 1,
        
        // Time-based tracking
        lateNightTaps: prevStats.lateNightTaps + (isLateNight ? 1 : 0),
        hourlyDistribution: prevStats.hourlyDistribution.map((count, index) => 
          index === hour ? count + 1 : count
        ),
        
        // Daily tracking
        dailyTaps: {
          ...prevStats.dailyTaps,
          [today]: (prevStats.dailyTaps[today] || 0) + 1,
        },
        
        // Achievement tracking
        easterEggsFound: prevStats.easterEggsFound + (isEasterEgg ? 1 : 0),
        milestonesReached: prevStats.milestonesReached + (isMilestone ? 1 : 0),
      };

      // Calculate dynamic metrics
      const uniqueDays = Object.keys(newStats.dailyTaps).length;
      newStats.daysUsed = uniqueDays;
      
      if (newStats.totalTimeSpent > 0) {
        newStats.tapsPerMinute = (newStats.totalTaps / (newStats.totalTimeSpent / 60000));
        newStats.pointlessnessEfficiency = Math.round(
          (newStats.totalTaps * uniqueDays) / (newStats.totalTimeSpent / 1000)
        );
      }

      saveStats(newStats);
      return newStats;
    });
  }, [saveStats]);

  // End session tracking
  const endSession = useCallback(() => {
    if (sessionStartTime > 0) {
      const sessionLength = Date.now() - sessionStartTime;
      
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalTimeSpent: prevStats.totalTimeSpent + sessionLength,
          shortestSession: prevStats.shortestSession === 0 
            ? sessionLength 
            : Math.min(prevStats.shortestSession, sessionLength),
          longestSession: Math.max(prevStats.longestSession, sessionLength),
        };
        
        newStats.averageSessionLength = newStats.totalTimeSpent / newStats.sessionsCount;
        
        saveStats(newStats);
        return newStats;
      });
      
      setSessionStartTime(0);
    }
  }, [sessionStartTime, saveStats]);

  // Get formatted statistics for display
  const getFormattedStats = useCallback(() => {
    const formatTime = (ms: number) => {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      
      if (hours > 0) return `${hours}h ${minutes % 60}m`;
      if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
      return `${seconds}s`;
    };

    const formatDate = (dateString: string) => {
      if (!dateString) return 'Never';
      return new Date(dateString).toLocaleDateString();
    };

    return {
      totalTaps: stats.totalTaps.toLocaleString(),
      totalTimeSpent: formatTime(stats.totalTimeSpent),
      averageSession: formatTime(stats.averageSessionLength),
      daysUsed: stats.daysUsed,
      pointlessnessLevel: Math.floor(stats.totalTaps / 10) + 1,
      efficiency: stats.pointlessnessEfficiency,
      firstTap: formatDate(stats.firstTapDate),
      mostActivePeriod: stats.hourlyDistribution.indexOf(Math.max(...stats.hourlyDistribution)) + ':00',
      favoriteTheme: Object.entries(stats)
        .filter(([key]) => key.endsWith('ModeTaps'))
        .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0]
        ?.replace('ModeTaps', '') || 'default',
    };
  }, [stats]);

  // Reset all statistics
  const resetStats = useCallback(async () => {
    setStats(defaultStats);
    await saveStats(defaultStats);
  }, [saveStats]);

  // Initialize on mount
  useEffect(() => {
    loadStats();
    startSession();
    
    return () => {
      endSession();
    };
  }, []); // Empty dependency array to run only once

  return {
    stats,
    recordTap,
    getFormattedStats,
    resetStats,
    startSession,
    endSession,
  };
};