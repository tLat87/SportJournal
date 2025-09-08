import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isOnboardingCompleted: boolean;
  isFirstLaunch: boolean;
}

const initialState: AppState = {
  isOnboardingCompleted: false,
  isFirstLaunch: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    completeOnboarding: (state) => {
      state.isOnboardingCompleted = true;
      state.isFirstLaunch = false;
    },
    resetApp: (state) => {
      state.isOnboardingCompleted = false;
      state.isFirstLaunch = true;
    },
  },
});

export const { completeOnboarding, resetApp } = appSlice.actions;
export default appSlice.reducer;


