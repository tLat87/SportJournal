import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Achievement } from '../../types';

interface AchievementsState {
  achievements: Achievement[];
  unlockedAchievements: string[];
  isLoading: boolean;
}

const initialState: AchievementsState = {
  achievements: [
    {
      id: 'first_workout',
      title: 'First Steps',
      description: 'Complete your first workout',
      icon: '🏃‍♀️',
      progress: 0,
      maxProgress: 1,
      category: 'special',
    },
    {
      id: 'week_streak',
      title: 'Week Warrior',
      description: 'Workout for 7 days in a row',
      icon: '🔥',
      progress: 0,
      maxProgress: 7,
      category: 'streak',
    },
    {
      id: 'hundred_workouts',
      title: 'Century Club',
      description: 'Complete 100 workouts',
      icon: '💯',
      progress: 0,
      maxProgress: 100,
      category: 'total',
    },
    {
      id: 'social_butterfly',
      title: 'Social Butterfly',
      description: 'Add 5 friends',
      icon: '🦋',
      progress: 0,
      maxProgress: 5,
      category: 'social',
    },
    {
      id: 'early_bird',
      title: 'Early Bird',
      description: 'Workout before 7 AM',
      icon: '🌅',
      progress: 0,
      maxProgress: 1,
      category: 'special',
    },
    {
      id: 'night_owl',
      title: 'Night Owl',
      description: 'Workout after 10 PM',
      icon: '🦉',
      progress: 0,
      maxProgress: 1,
      category: 'special',
    },
  ],
  unlockedAchievements: [],
  isLoading: false,
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    updateAchievementProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const achievement = state.achievements.find(a => a.id === action.payload.id);
      if (achievement) {
        achievement.progress = Math.min(action.payload.progress, achievement.maxProgress);
        
        // Check if achievement is unlocked
        if (achievement.progress >= achievement.maxProgress && !state.unlockedAchievements.includes(achievement.id)) {
          state.unlockedAchievements.push(achievement.id);
          achievement.unlockedAt = new Date().toISOString();
        }
      }
    },
    resetAchievements: (state) => {
      state.achievements = initialState.achievements;
      state.unlockedAchievements = [];
    },
  },
});

export const { updateAchievementProgress, resetAchievements } = achievementsSlice.actions;
export default achievementsSlice.reducer;
