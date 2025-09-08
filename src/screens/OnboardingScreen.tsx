import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import SimpleAnimatedView from '../components/SimpleAnimatedView';

const { width, height } = Dimensions.get('window');

interface OnboardingData {
  id: number;
  title: string;
  description: string;
  emoji: string;
}

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    title: 'Record your path',
    description: 'Record your activity: runs, workouts or just movement. Every day is part of your sports journey.',
    emoji: require('../assets/img/1.png'),
  },
  {
    id: 2,
    title: 'Add moments',
    description: 'Save photos of your training: favorite sneakers, stadium or moment of victory.',
    emoji: require('../assets/img/2.png'),
  },
  {
    id: 3,
    title: 'Track your progress',
    description: 'View weekly statistics and see your progress in sports.',
    emoji: require('../assets/img/3.png'),
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentData = onboardingData[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header with Skip button */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View> */}

      {/* Main Content */}
      <View style={styles.content}>
        {/* Emoji */}
        <SimpleAnimatedView animation="zoomIn" delay={0}>
            <View style={styles.emojiContainer}>
              <Image source={currentData.emoji} style={styles.emoji} />
          </View>
        </SimpleAnimatedView>

        {/* Text Content */}
        <SimpleAnimatedView animation="fadeInUp" delay={300}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentData.title}</Text>
            <Text style={styles.description}>{currentData.description}</Text>
          </View>
        </SimpleAnimatedView>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === 0 && styles.navButtonInactive
          ]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
         <Image source={require('../assets/img/Group11.png')}/>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNext}
        >
           <Image source={require('../assets/img/Group10.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emojiContainer: {
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    // borderRadius: 999,
    // backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  emoji: {
    // fontSize: 120,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
    // padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  navButtonInactive: {
    backgroundColor: Colors.border,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  navEmoji: {
    fontSize: 24,
  },
  navEmojiInactive: {
    opacity: 0.3,
  },
});

export default OnboardingScreen;