import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/colors';

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  animation?: 'fadeIn' | 'slideIn' | 'zoomIn' | 'bounceIn';
  delay?: number;
  duration?: number;
  elevation?: number;
  glow?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  style,
  onPress,
  animation = 'fadeIn',
  delay = 0,
  duration = 300,
  elevation = 4,
  glow = false,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [animatedValue, delay, duration]);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getAnimatedStyle = () => {
    const baseStyle: any = {
      transform: [{ scale: scaleValue }],
    };

    switch (animation) {
      case 'fadeIn':
        baseStyle.opacity = animatedValue;
        break;
      case 'slideIn':
        baseStyle.opacity = animatedValue;
        baseStyle.transform.push({
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        });
        break;
      case 'zoomIn':
        baseStyle.opacity = animatedValue;
        baseStyle.transform.push({
          scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        });
        break;
      case 'bounceIn':
        baseStyle.opacity = animatedValue;
        baseStyle.transform.push({
          scale: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.3, 1.1, 1],
          }),
        });
        break;
    }

    return baseStyle;
  };

  const cardStyle = [
    styles.card,
    {
      elevation,
      shadowColor: glow ? Colors.glow : Colors.shadow,
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: glow ? 0.4 : 0.1,
      shadowRadius: elevation * 2,
    },
    style,
  ];

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <Animated.View style={getAnimatedStyle()}>
      <CardComponent
        style={cardStyle}
        onPress={onPress}
        onPressIn={onPress ? handlePressIn : undefined}
        onPressOut={onPress ? handlePressOut : undefined}
        activeOpacity={0.9}
      >
        {children}
      </CardComponent>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default AnimatedCard;
