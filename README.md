# Sport Uni Best Journal

Your personal sports diary in a modern style. Record your workouts and activities, add photos of moments and track your progress in convenient statistics.

## Features

- **Dark Design with Neon Accents**: Modern, motivational interface with vibrant green highlights
- **Activity Tracking**: Record your sports activities with photos, descriptions, and timestamps
- **Journal Management**: View all your entries with share and delete functionality
- **Progress Statistics**: Track your activity patterns with charts and achievements
- **Data Persistence**: All your data is saved locally and persists between app sessions
- **Onboarding Experience**: Beautiful 3-screen onboarding that shows every time you open the app
- **Smooth Animations**: Delightful animations throughout the app using React Native's built-in Animated API

## Screens

### Home Screen
- Overview of today's activities
- Quick access to add new entries
- Recent activity preview
- Motivational design elements

### Add Entry Screen
- Activity name and description input
- Photo capture from gallery
- Time picker for activity timing
- Form validation and error handling

### Journal Screen
- Complete list of all activities
- Search and filter capabilities
- Share and delete individual entries
- Empty state with motivational messaging

### Statistics Screen
- Activity overview and trends
- Weekly progress charts
- Achievement system
- Activity type breakdown

## Technical Stack

- **React Native 0.81.1**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Redux Toolkit**: State management with persistence
- **React Navigation**: Screen navigation and routing
- **React Native Vector Icons**: Icon library
- **React Native Image Picker**: Photo selection functionality
- **React Native DateTime Picker**: Time selection
- **AsyncStorage**: Local data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

3. Run the app:
```bash
# iOS
npm run ios

# Android
npm run android
```

## Project Structure

```
src/
├── constants/
│   └── colors.ts          # App color scheme
├── hooks/
│   ├── useAppDispatch.ts  # Redux dispatch hook
│   └── useAppSelector.ts  # Redux selector hook
├── navigation/
│   └── AppNavigator.tsx   # Navigation configuration
├── screens/
│   ├── HomeScreen.tsx     # Main dashboard
│   ├── AddEntryScreen.tsx # Activity creation
│   ├── JournalScreen.tsx  # Activity list
│   ├── StatsScreen.tsx    # Statistics and charts
│   └── EntryDetailsScreen.tsx # Entry details view
├── store/
│   ├── index.ts           # Redux store configuration
│   └── slices/
│       └── journalSlice.ts # Journal state management
└── types/
    └── index.ts           # TypeScript type definitions
```

## Key Features Implementation

### State Management
- Redux Toolkit for predictable state updates
- Redux Persist for data persistence
- Type-safe selectors and actions

### Navigation
- Bottom tab navigation for main screens
- Stack navigation for detailed views
- Type-safe navigation parameters

### Data Persistence
- AsyncStorage for local data storage
- Automatic data restoration on app launch
- Optimistic updates for better UX

### Image Handling
- Gallery photo selection
- Image compression and optimization
- Error handling for failed selections

## Customization

The app uses a centralized color scheme defined in `src/constants/colors.ts`. You can easily customize the theme by modifying these values:

```typescript
export const Colors = {
  primary: '#00FF88',      // Neon green accent
  background: '#1A1A1A',   // Dark background
  surface: '#2A2A2A',      // Card backgrounds
  text: '#FFFFFF',         // Primary text
  // ... more colors
};
```

## Future Enhancements

- [ ] Cloud synchronization
- [ ] Social sharing features
- [ ] Advanced analytics and insights
- [ ] Workout templates and routines
- [ ] Goal setting and tracking
- [ ] Export functionality (PDF, CSV)
- [ ] Dark/light theme toggle
- [ ] Push notifications for reminders

## License

This project is for personal use and educational purposes.