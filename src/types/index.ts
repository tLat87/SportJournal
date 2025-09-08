export interface JournalEntry {
  id: string;
  activityName: string;
  activityDescription: string;
  time: string;
  date: string;
  photoUri?: string;
  createdAt: number;
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
};

export type MainTabParamList = {
  Home: undefined;
  Journal: undefined;
  Stats: undefined;
};

