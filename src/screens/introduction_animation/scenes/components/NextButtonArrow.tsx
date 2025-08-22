// NextButtonArrow.tsx - Versión corregida: usa onBtnPress pasado por props
import React from 'react';
import { StyleSheet, Text, Animated, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPressable from '../../../../components/ui/MyPressable';

interface Props {
  onBtnPress: () => void;
  animationController: React.MutableRefObject<Animated.Value>;
}

const NextButtonArrow: React.FC<Props> = ({ animationController, onBtnPress }) => {
  // Verificar que animationController existe antes de usarlo
  if (!animationController?.current) {
    console.error('NextButtonArrow: animationController.current is null or undefined');
    return null;
  }

  // Interpolaciones (mantuve las tuyas, solo las genero con useMemo implícito aquí)
  const arrowAnim = React.useMemo(() => {
    try {
      return animationController.current.interpolate({
        inputRange: [0, 0.2, 0.4, 0.6, 0.8],
        outputRange: [0, 0, 0, 0, 1],
        extrapolate: 'clamp',
      });
    } catch (error) {
      console.error('Error creating arrowAnim interpolation:', error);
      return new Animated.Value(0);
    }
  }, [animationController]);

  const transitionAnim = React.useMemo(() => {
    try {
      return arrowAnim.interpolate({
        inputRange: [0, 0.85, 1],
        outputRange: [36, 0, 0],
        extrapolate: 'clamp',
      });
    } catch (error) {
      console.error('Error creating transitionAnim interpolation:', error);
      return new Animated.Value(36);
    }
  }, [arrowAnim]);

  const opacityAnim = React.useMemo(() => {
    try {
      return arrowAnim.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
      });
    } catch (error) {
      console.error('Error creating opacityAnim interpolation:', error);
      return new Animated.Value(0);
    }
  }, [arrowAnim]);

  const iconTransitionAnim = React.useMemo(() => {
    try {
      return arrowAnim.interpolate({
        inputRange: [0, 0.35, 0.85, 1],
        outputRange: [0, 0, -36, -36],
        extrapolate: 'clamp',
      });
    } catch (error) {
      console.error('Error creating iconTransitionAnim interpolation:', error);
      return new Animated.Value(0);
    }
  }, [arrowAnim]);

  const iconOpacityAnim = React.useMemo(() => {
    try {
      return arrowAnim.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp',
      });
    } catch (error) {
      console.error('Error creating iconOpacityAnim interpolation:', error);
      return new Animated.Value(1);
    }
  }, [arrowAnim]);

  const widthAnim = React.useMemo(() => {
    try {
      return arrowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [58, 258],
        extrapolate: 'clamp',
      });
    } catch (error) {
      console.error('Error creating widthAnim interpolation:', error);
      return new Animated.Value(58);
    }
  }, [arrowAnim]);

  const marginBottomAnim = React.useMemo(() => {
    try {
      return arrowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [38, 0],
        extrapolate: 'clamp',
      });
    } catch (error) {
      console.error('Error creating marginBottomAnim interpolation:', error);
      return new Animated.Value(38);
    }
  }, [arrowAnim]);

  const radiusAnim = React.useMemo(() => {
    try {
      return arrowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [40, 8],
        extrapolate: 'clamp',
      });
    } catch (error) {
      console.error('Error creating radiusAnim interpolation:', error);
      return new Animated.Value(40);
    }
  }, [arrowAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: widthAnim,
          borderRadius: radiusAnim,
          marginBottom: marginBottomAnim,
        },
      ]}
    >
      <MyPressable
        style={{ flex: 1, justifyContent: 'center' }}
        android_ripple={{ color: 'darkgrey' }}
        onPress={() => {
          // IMPORTANT: ahora LLAMAMOS la función pasada por props,
          // el padre decide si hace onNextClick() o navega a Register.
          try {
            onBtnPress();
          } catch (e) {
            console.error('NextButtonArrow: error calling onBtnPress', e);
          }
        }}
      >
        <Animated.View
          style={[
            styles.signupContainer,
            {
              opacity: opacityAnim,
              transform: [{ translateY: transitionAnim }],
            },
          ]}
        >
          <Text style={styles.signupText}>Registrarse</Text>
          <Icon name="arrow-forward" size={24} color="white" />
        </Animated.View>

        <Animated.View
          style={[
            styles.icon,
            {
              opacity: iconOpacityAnim,
              transform: [{ translateY: iconTransitionAnim }],
            },
          ]}
        >
          <Icon name="arrow-forward-ios" size={24} color="white" />
        </Animated.View>
      </MyPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    backgroundColor: 'rgb(21, 32, 54)',
    overflow: 'hidden',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  signupText: {
    fontSize: 18,
    fontFamily: 'WorkSans-Medium',
    color: 'white',
  },
  icon: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default NextButtonArrow;
