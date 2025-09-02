import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NextButtonArrow from './components/NextButtonArrow';
import { useAuthNavigation } from '../../../navigation/Navigation';
import MyPressable from '../../../components/ui/MyPressable';
import { useAuth } from '../../../contexts';

interface Props {
  onNextClick: () => void;
  animationController: React.RefObject<Animated.Value>;
}

interface DotIndicatorProps {
  index: number;
  selectedIndex: number;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ index, selectedIndex }) => {
  const activeIndexRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(activeIndexRef.current, {
      toValue: index === selectedIndex ? 1 : 0,
      duration: 480,
      useNativeDriver: false,
    }).start();
  }, [selectedIndex, index]);

  const bgColor = activeIndexRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E3E4E4', '#132137'],
  });

  return <Animated.View style={[styles.pageIndicator, { backgroundColor: bgColor }]} />;
};

const CenterNextButton: React.FC<Props> = ({ onNextClick, animationController }) => {
  const { completeOnboarding } = useAuth();
  const navigation = useAuthNavigation();
  const opacity = useRef<Animated.Value>(new Animated.Value(0));
  const currentOpacity = useRef<number>(0);
  const listenerRef = useRef<string | null>(null);

  const onBtnPress = () => {
    navigation.navigate('Login');
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { bottom } = useSafeAreaInsets();
  const paddingBottom = 16 + bottom;

  const dots = useMemo(() => [0, 1, 2, 3], []);

  useEffect(() => {
    if (!animationController?.current) {
      console.error('CenterNextButton: animationController.current is null');
      return;
    }

    const listener = animationController.current.addListener(({ value }) => {
      const isVisible = value >= 0.2 && value <= 0.6;

      if ((isVisible && currentOpacity.current === 0) || (!isVisible && currentOpacity.current === 1)) {
        Animated.timing(opacity.current, {
          toValue: isVisible ? 1 : 0,
          duration: 480,
          useNativeDriver: true,
        }).start();
        currentOpacity.current = isVisible ? 1 : 0;
      }

      // Actualizar selectedIndex basado en el valor de animación
      if (value >= 0.7) {
        setSelectedIndex(3);
      } else if (value >= 0.5) {
        setSelectedIndex(2);
      } else if (value >= 0.3) {
        setSelectedIndex(1);
      } else if (value >= 0.1) {
        setSelectedIndex(0);
      }
    });

    listenerRef.current = listener;

    return () => {
      if (listenerRef.current && animationController?.current) {
        animationController.current.removeListener(listenerRef.current);
      }
    };
  }, [animationController]);

  const topViewAnim = useMemo(() => {
    if (!animationController?.current) {
      return new Animated.Value(96 * 5);
    }
    return animationController.current.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8],
      outputRange: [96 * 5, 0, 0, 0, 0],
      extrapolate: 'clamp',
    });
  }, [animationController]);

  const loginTextMoveAnimation = useMemo(() => {
    if (!animationController?.current) {
      return new Animated.Value(30 * 5);
    }
    return animationController.current.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8],
      outputRange: [30 * 5, 30 * 5, 30 * 5, 30 * 5, 0],
      extrapolate: 'clamp',
    });
  }, [animationController]);

  // Aquí está la única modificación: si estamos en la última página (index 3), navegar a Register.
  const handleNextClick = () => {
    if (selectedIndex === 3) {
      completeOnboarding();
      navigation.navigate('Register');
    } else {
      onNextClick();
    }
  };

  if (!animationController?.current) {
    console.error('CenterNextButton: animationController is null, rendering fallback');
    return null;
  }

  return (
    <Animated.View
      style={[styles.container, { paddingBottom, transform: [{ translateY: topViewAnim }] }]}
    >
      <Animated.View style={[styles.dotsContainer, { opacity: opacity.current }]}>
        {dots.map(item => (
          <DotIndicator key={item} index={item} selectedIndex={selectedIndex} />
        ))}
      </Animated.View>

      <NextButtonArrow animationController={animationController} onBtnPress={handleNextClick} />

      <Animated.View
        style={[styles.footerTextContainer, { transform: [{ translateY: loginTextMoveAnimation }] }]}
      >
        <Text style={styles.footerText}>¿Tienes una cuenta? </Text>
        <MyPressable
          onPress={() => {
            onBtnPress();
          }}
        >
          <Text style={styles.loginText}>Iniciar Sesion</Text>
        </MyPressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  pageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 4,
  },
  footerTextContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  footerText: {
    color: 'grey',
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
  },
  loginText: {
    color: '#132137',
    fontSize: 16,
    fontFamily: 'WorkSans-Bold',
  },
});

export default CenterNextButton;
