import React, { useEffect, useRef } from 'react';
import { View, ViewProps, Animated } from 'react-native';

interface SimpleAnimatedViewProps extends ViewProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'fadeInDown' | 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'zoomIn' | 'bounceIn';
  delay?: number;
  duration?: number;
}

const SimpleAnimatedView: React.FC<SimpleAnimatedViewProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 500,
  style,
  ...props
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const translateX = useRef(new Animated.Value(50)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animate = () => {
      const animations: Animated.CompositeAnimation[] = [];

      // Always animate opacity
      animations.push(
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        })
      );

      // Add specific animations based on type
      switch (animation) {
        case 'fadeIn':
          // Only opacity, no transform
          break;
        case 'fadeInDown':
          animations.push(
            Animated.timing(translateY, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            })
          );
          break;
        case 'fadeInUp':
          animations.push(
            Animated.timing(translateY, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            })
          );
          break;
        case 'slideInLeft':
          animations.push(
            Animated.timing(translateX, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            })
          );
          break;
        case 'slideInRight':
          animations.push(
            Animated.timing(translateX, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            })
          );
          break;
        case 'zoomIn':
          animations.push(
            Animated.timing(scale, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            })
          );
          break;
        case 'bounceIn':
          animations.push(
            Animated.sequence([
              Animated.timing(scale, {
                toValue: 1.1,
                duration: duration * 0.6,
                useNativeDriver: true,
              }),
              Animated.timing(scale, {
                toValue: 1,
                duration: duration * 0.4,
                useNativeDriver: true,
              }),
            ])
          );
          break;
      }

      // Start animations with delay
      if (delay > 0) {
        setTimeout(() => {
          Animated.parallel(animations).start();
        }, delay);
      } else {
        Animated.parallel(animations).start();
      }
    };

    animate();
  }, [delay, duration, animation]);

  const getTransform = () => {
    const transforms = [];
    
    if (animation === 'fadeInDown' || animation === 'fadeInUp') {
      transforms.push({ translateY });
    }
    
    if (animation === 'slideInLeft' || animation === 'slideInRight') {
      transforms.push({ translateX });
    }
    
    if (animation === 'zoomIn' || animation === 'bounceIn') {
      transforms.push({ scale });
    }
    
    return transforms;
  };

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: getTransform(),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export default SimpleAnimatedView;

