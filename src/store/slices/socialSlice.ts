import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Friend, Challenge } from '../../types';

interface SocialState {
  friends: Friend[];
  challenges: Challenge[];
  isLoading: boolean;
}

const initialState: SocialState = {
  friends: [
    {
      id: 'friend1',
      name: 'Alex Johnson',
      isOnline: true,
      lastActivity: '2 hours ago',
      totalWorkouts: 45,
      streak: 7,
    },
    {
      id: 'friend2',
      name: 'Sarah Wilson',
      isOnline: false,
      lastActivity: '1 day ago',
      totalWorkouts: 32,
      streak: 3,
    },
    {
      id: 'friend3',
      name: 'Mike Chen',
      isOnline: true,
      lastActivity: '30 minutes ago',
      totalWorkouts: 67,
      streak: 12,
    },
  ],
  challenges: [
    {
      id: 'challenge1',
      title: 'Weekly Warriors',
      description: 'Complete 5 workouts this week',
      participants: ['friend1', 'friend2', 'friend3'],
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      targetValue: 5,
      unit: 'workouts',
      prize: '🏆 Premium Badge',
      isActive: true,
    },
    {
      id: 'challenge2',
      title: 'Distance Masters',
      description: 'Run 50km this month',
      participants: ['friend1', 'friend3'],
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      targetValue: 50,
      unit: 'km',
      prize: '🥇 Gold Medal',
      isActive: true,
    },
  ],
  isLoading: false,
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(f => f.id !== action.payload);
    },
    updateFriendActivity: (state, action: PayloadAction<{ id: string; activity: string }>) => {
      const friend = state.friends.find(f => f.id === action.payload.id);
      if (friend) {
        friend.lastActivity = action.payload.activity;
      }
    },
    createChallenge: (state, action: PayloadAction<Challenge>) => {
      state.challenges.push(action.payload);
    },
    joinChallenge: (state, action: PayloadAction<{ challengeId: string; userId: string }>) => {
      const challenge = state.challenges.find(c => c.id === action.payload.challengeId);
      if (challenge && !challenge.participants.includes(action.payload.userId)) {
        challenge.participants.push(action.payload.userId);
      }
    },
    leaveChallenge: (state, action: PayloadAction<{ challengeId: string; userId: string }>) => {
      const challenge = state.challenges.find(c => c.id === action.payload.challengeId);
      if (challenge) {
        challenge.participants = challenge.participants.filter(p => p !== action.payload.userId);
      }
    },
  },
});

export const { 
  addFriend, 
  removeFriend, 
  updateFriendActivity, 
  createChallenge, 
  joinChallenge, 
  leaveChallenge 
} = socialSlice.actions;
export default socialSlice.reducer;
