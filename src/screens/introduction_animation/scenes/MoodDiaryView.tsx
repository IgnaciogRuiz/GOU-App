import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions, Image} from 'react-native';
import { AppImages } from '../../../assets';

interface Props {
  animationController: React.RefObject<Animated.Value>;
}

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 250;

const MoodDiaryView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();

  const careRef = useRef<Text | null>(null);

  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.4, 0.6, 0.8],
    outputRange: [window.width, window.width, 0, -window.width],
  });

  const textEndVal = window.width * 2; // 26 being text's height (font size)
  const textAnim = animationController.current.interpolate({
    inputRange: [0, 0.4, 0.6, 0.8],
    outputRange: [textEndVal, textEndVal, 0, -textEndVal],
  });

  const imageEndVal = IMAGE_WIDTH * 4;
  const imageAnim = animationController.current.interpolate({
    inputRange: [0, 0.4, 0.6, 0.8],
    outputRange: [imageEndVal, imageEndVal, 0, -imageEndVal],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <Text style={styles.title} ref={careRef}>
       Conectá con personas
      </Text>
      <Animated.Text
        style={[styles.subtitle, { transform: [{ translateX: textAnim }] }]}
      >
        Unite a una comunidad de viajeros que comparten tus mismos destinos y experiencias.
      </Animated.Text>
      <Image
                    source={require("../../assets/images/community.png")}
                    style={{
                      width: 275,
                      height: 275,
                      aspectRatio: 500 / 470,
                      alignSelf: "center",
                      resizeMode: "contain", // mantiene proporción
                    }}
                  />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
  },
  subtitle: {
    color: '#787D86',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
  image: {
    maxWidth: IMAGE_WIDTH,
    maxHeight: IMAGE_HEIGHT,
  },
});

export default MoodDiaryView;
