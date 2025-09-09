import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import journalReducer from './slices/journalSlice';
import appReducer from './slices/appSlice';
import achievementsReducer from './slices/achievementsSlice';
import goalsReducer from './slices/goalsSlice';
import socialReducer from './slices/socialSlice';
import notificationsReducer from './slices/notificationsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['journal', 'app', 'achievements', 'goals', 'social', 'notifications'],
};

const rootReducer = combineReducers({
  journal: journalReducer,
  app: appReducer,
  achievements: achievementsReducer,
  goals: goalsReducer,
  social: socialReducer,
  notifications: notificationsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
