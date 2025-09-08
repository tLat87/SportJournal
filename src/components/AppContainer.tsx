import React, { useState } from 'react';
import OnboardingScreen from '../screens/OnboardingScreen';
import AppNavigator from '../navigation/AppNavigator';

const AppContainer: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return <AppNavigator />;
};

export default AppContainer;

