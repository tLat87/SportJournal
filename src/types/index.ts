export interface JournalEntry {
  id: string;
  activityName: string;
  activityDescription: string;
  time: string;
  date: string;
  photoUri?: string;
  createdAt: number;
  tags?: string[];
  category?: string;
  duration?: number; // in minutes
  intensity?: 'low' | 'medium' | 'high';
  calories?: number;
  mood?: 'excited' | 'happy' | 'neutral' | 'tired' | 'exhausted';
  weather?: string;
  location?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  category: 'streak' | 'total' | 'special' | 'social';
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: string;
  category: 'workouts' | 'duration' | 'calories' | 'streak';
  isCompleted: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastActivity?: string;
  totalWorkouts: number;
  streak: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: string[];
  startDate: string;
  endDate: string;
  targetValue: number;
  unit: string;
  prize?: string;
  isActive: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'reminder' | 'social' | 'goal';
  isRead: boolean;
  createdAt: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  uri: string;
  genre: string;
}

export interface WorkoutPlaylist {
  id: string;
  name: string;
  tracks: MusicTrack[];
  duration: number;
  intensity: 'low' | 'medium' | 'high';
}

export interface AppState {
  entries: JournalEntry[];
  isLoading: boolean;
}

export type RootStackParamList = {
  MainTabs: undefined;
  Information: undefined;
  Journal: undefined;
  EntryDetails: { entryId: string };
  AddEntry: undefined;
  Achievements: undefined;
  Goals: undefined;
  Social: undefined;
  Analytics: undefined;
  Calendar: undefined;
  Music: undefined;
  Settings: undefined;
  Profile: undefined;
  Challenges: undefined;
  Notifications: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Journal: undefined;
  Stats: undefined;
};

