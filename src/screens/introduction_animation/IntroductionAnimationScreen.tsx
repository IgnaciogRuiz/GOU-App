import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  SplashView,
  RelaxView,
  CareView,
  MoodDiaryView,
  WelcomeView,
  TopBackSkipView,
  CenterNextButton,
} from './scenes';

const IntroductionAnimationScreen: React.FC = () => {
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(0);
  const animationController = useRef<Animated.Value>(new Animated.Value(0));
  const animValue = useRef<number>(0);
  const listenerRef = useRef<string | null>(null);

  useEffect(() => {
    // Agregar listener y guardar la referencia para limpieza
    const listener = animationController.current.addListener(({ value }) => {
      animValue.current = value;
      setCurrentPage(value);
    });
    listenerRef.current = listener;

    // Cleanup function
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

  const playAnimation = useCallback(
    (toValue: number, duration: number = 1600) => {
      //console.log('Starting animation to:', toValue);
      
      // Agregar manejo de errores para la animación
      try {
        Animated.timing(animationController.current, {
          toValue,
          duration,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
          useNativeDriver: false,
        }).start((finished) => {
          //console.log('Animation finished:', finished, 'Final value:', toValue);
          if (!finished) {
            console.warn('Animation was interrupted');
          }
        });
      } catch (error) {
        console.error('Error starting animation:', error);
      }
    },
    [],
  );

  const onNextClick = useCallback(() => {
    //console.log('onNextClick called, current value:', animValue.current);
    
    try {
      let toValue;
      const currentValue = animValue.current;
      
      if (currentValue === 0) {
        toValue = 0.2;
      } else if (currentValue >= 0 && currentValue <= 0.2) {
        toValue = 0.4;
      } else if (currentValue > 0.2 && currentValue <= 0.4) {
        toValue = 0.6;
      } else if (currentValue > 0.4 && currentValue <= 0.6) {
        toValue = 0.8;
      } else if (currentValue > 0.6 && currentValue <= 0.8) {
        //console.log('Animation complete, navigating back...');
        navigation.goBack();
        return;
      }
      
      if (toValue !== undefined) {
        //console.log('Playing animation to:', toValue);
        playAnimation(toValue);
      }
    } catch (error) {
      console.error('Error in onNextClick:', error);
    }
  }, [playAnimation, navigation]);

  const onBackClick = useCallback(() => {
    //console.log('onBackClick called, current value:', animValue.current);
    
    try {
      let toValue;
      const currentValue = animValue.current;
      
      if (currentValue >= 0.2 && currentValue < 0.4) {
        toValue = 0.0;
      } else if (currentValue >= 0.4 && currentValue < 0.6) {
        toValue = 0.2;
      } else if (currentValue >= 0.6 && currentValue < 0.8) {
        toValue = 0.4;
      } else if (currentValue === 0.8) {
        toValue = 0.6;
      }
      
      if (toValue !== undefined) {
        //console.log('Playing back animation to:', toValue);
        playAnimation(toValue);
      }
    } catch (error) {
      console.error('Error in onBackClick:', error);
    }
  }, [playAnimation]);

  const onSkipClick = useCallback(() => {
    //console.log('onSkipClick called');
    try {
      playAnimation(0.8, 1200);
    } catch (error) {
      console.error('Error in onSkipClick:', error);
    }
  }, [playAnimation]);

  // Función para renderizar componentes de forma segura
  const renderSafeComponent = (ComponentName: string, Component: React.ComponentType<any>, props: any) => {
    try {
      return React.createElement(Component, props);
    } catch (error) {
      console.error(`Error rendering ${ComponentName}:`, error);
      return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(0, 0, 0)' }}>
      
      {renderSafeComponent('SplashView', SplashView, {
        onNextClick,
        animationController,
      })}
      
      <Animated.View
        style={[
          styles.scenesContainer,
          { transform: [{ translateY: relaxTranslateY }] },
        ]}
      >
        {renderSafeComponent('RelaxView', RelaxView, { animationController })}
        {renderSafeComponent('CareView', CareView, { animationController })}
        {renderSafeComponent('MoodDiaryView', MoodDiaryView, { animationController })}
        {renderSafeComponent('WelcomeView', WelcomeView, { animationController })}
      </Animated.View>
      
      {renderSafeComponent('TopBackSkipView', TopBackSkipView, {
        onBackClick,
        onSkipClick,
        animationController,
      })}
      
      {renderSafeComponent('CenterNextButton', CenterNextButton, {
        onNextClick,
        animationController,
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