import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Animated, Easing } from 'react-native';
import { SplashView, RelaxView, CareView, MoodDiaryView, WelcomeView, TopBackSkipView, CenterNextButton, } from './scenes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthNavigation } from '../../navigation/Navigation';

const LAST_INDEX = 3;

const valueToIndex = (v: number) => {
  if (v >= 0.75) return 3;
  if (v >= 0.50) return 2;
  if (v >= 0.25) return 1;
  return 0;
};

const IntroductionAnimationScreen: React.FC = () => {
  const { setHasSeenOnboarding } = useAuth();
  const navigation = useAuthNavigation();
  const window = useWindowDimensions();

  const [currentPage, setCurrentPage] = useState<number>(0);

  const animationController = useRef<Animated.Value>(new Animated.Value(0));
  const animValue = useRef<number>(0);
  const listenerRef = useRef<string | null>(null);

  useEffect(() => {
    // Listener que actualiza animValue y currentPage (índice)
    const listener = animationController.current.addListener(({ value }) => {
      animValue.current = value;
      setCurrentPage(valueToIndex(value));
    });
    listenerRef.current = listener;

    // intentar forzar valor inicial 0 para evitar comportamientos raros
    try {
      animationController.current.setValue(0);
      animValue.current = 0;
      setCurrentPage(0);
    } catch (e) {
      // ignore
    }

    return () => {
      if (listenerRef.current) {
        animationController.current.removeListener(listenerRef.current);
      }
    };
  }, []);

  const relaxTranslateY = React.useMemo(() => {
    return animationController.current.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8],
      outputRange: [window.height, 0, 0, 0, 0],
      extrapolate: 'clamp',
    });
  }, [window.height]);

  const playAnimation = useCallback((toValue: number, duration: number = 1600) => {
    try {
      Animated.timing(animationController.current, {
        toValue,
        duration,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
        useNativeDriver: false,
      }).start();
    } catch (error) {
      console.error('Error starting animation:', error);
    }
  }, []);

  const onNextClick = useCallback(() => {
    try {
      const v = animValue.current;
      if (v === 0) return playAnimation(0.2);
      if (v > 0 && v <= 0.2) return playAnimation(0.4);
      if (v > 0.2 && v <= 0.4) return playAnimation(0.6);
      if (v > 0.4 && v <= 0.6) return playAnimation(0.8);
    } catch (error) {
      console.error('Error in onNextClick:', error);
    }
  }, [playAnimation]);

  const onBackClick = useCallback(() => {
    try {
      const v = animValue.current;
      if (v >= 0.2 && v < 0.4) return playAnimation(0.0);
      if (v >= 0.4 && v < 0.6) return playAnimation(0.2);
      if (v >= 0.6 && v < 0.8) return playAnimation(0.4);
      if (v === 0.8) return playAnimation(0.6);
    } catch (error) {
      console.error('Error in onBackClick:', error);
    }
  }, [playAnimation]);

  const onSkipClick = useCallback(() => {
    try {
      playAnimation(0.8, 1200);
    } catch (error) {
      console.error('Error in onSkipClick:', error);
    }
  }, [playAnimation]);

  // callback que pasa al CenterNextButton para la acción del último slide
  const handleLastClick = useCallback(async () => {
  try {
    setHasSeenOnboarding(true);
    navigation.navigate('Register'); // o 'Login'
  } catch (e) {
    console.error("Error completing onboarding:", e);
  }
}, [navigation, setHasSeenOnboarding]);

  const renderSafeComponent = (ComponentName: string, Component: React.ComponentType<any>, props: any) => {
    try {
      return React.createElement(Component, props);
    } catch (error) {
      console.error(`Error rendering ${ComponentName}:`, error);
      return null;
    }
  };

  // DEBUG: imprime el currentPage en consola
  // useEffect(() => {
  //   console.log('[Intro] currentPage=', currentPage);
  // }, [currentPage]);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(0, 0, 0)' }}>
      {renderSafeComponent('SplashView', SplashView, { onNextClick, animationController })}

      <Animated.View style={[styles.scenesContainer, { transform: [{ translateY: relaxTranslateY }] }]}>
        {renderSafeComponent('RelaxView', RelaxView, { animationController })}
        {renderSafeComponent('CareView', CareView, { animationController })}
        {renderSafeComponent('MoodDiaryView', MoodDiaryView, { animationController })}
        {renderSafeComponent('WelcomeView', WelcomeView, { animationController })}
      </Animated.View>

      {renderSafeComponent('TopBackSkipView', TopBackSkipView, { onBackClick, onSkipClick, animationController })}

      {renderSafeComponent('CenterNextButton', CenterNextButton, {
        onNextClick,
        onLastClick: handleLastClick,
        animationController,
        isLast: currentPage === LAST_INDEX, // le pasamos explícitamente la info al hijo
        currentIndex: currentPage,
        lastIndex: LAST_INDEX,
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  scenesContainer: {
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});

export default IntroductionAnimationScreen;
