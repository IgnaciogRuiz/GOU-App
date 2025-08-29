import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  useWindowDimensions,
  Image,
} from "react-native";
import { AppImages } from "../../../assets";

interface Props {
  animationController: React.RefObject<Animated.Value>;
}

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 250;

const CareView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();

  const careRef = useRef<Text | null>(null);

  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [window.width, window.width, 0, -window.width, -window.width],
  });

  const careEndVal = 26 * 2; // 26 being text's height (font size)
  const careAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [careEndVal, careEndVal, 0, -careEndVal, -careEndVal],
  });

  const imageEndVal = IMAGE_WIDTH * 4;
  const imageAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [imageEndVal, imageEndVal, 0, -imageEndVal, -imageEndVal],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <Animated.Text
        style={[styles.title, { transform: [{ translateX: careAnim }] }]}
        ref={careRef}
      >
        Compartí gastos
      </Animated.Text>
      <Text style={styles.subtitle}>
        Viajá más barato compartiendo el auto con otros. Ahorrás dinero y
        disfrutás del camino.
      </Text>
      <Image
        source={require("../../../../assets/images/handshake.png")}
        style={{
          width: 250,
          height: 250,
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
    backgroundColor: "black",
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: 100,
  },
  image: {
    maxWidth: IMAGE_WIDTH,
    maxHeight: IMAGE_HEIGHT,
  },
  title: {
    fontSize: 26,
    color: "white",
    textAlign: "center",
    fontFamily: "WorkSans-Bold",
  },
  subtitle: {
    color: "#787D86",
    textAlign: "center",
    fontFamily: "WorkSans-Regular",
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
});

export default CareView;
