/**
 * Sport Uni Best Journal
 * Your personal sports diary in a modern style
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import AppContainer from './src/components/AppContainer';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
          <AppContainer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
