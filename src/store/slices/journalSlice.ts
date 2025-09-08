import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JournalEntry, AppState } from '../../types';

const initialState: AppState = {
  entries: [],
  isLoading: false,
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<JournalEntry>) => {
      state.entries.unshift(action.payload);
    },
    updateEntry: (state, action: PayloadAction<JournalEntry>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loadEntries: (state, action: PayloadAction<JournalEntry[]>) => {
      state.entries = action.payload;
    },
  },
});

export const { addEntry, updateEntry, deleteEntry, setLoading, loadEntries } = journalSlice.actions;
export default journalSlice.reducer;
