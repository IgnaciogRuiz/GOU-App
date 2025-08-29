import React from "react";
import { StyleSheet, Animated, useWindowDimensions, Image } from "react-native";
import { AppImages } from "../../../assets";
import { AppAnimations } from "../../../../assets";
import LottieView from "lottie-react-native";

interface Props {
  animationController: React.RefObject<Animated.Value>;
}

const RelaxView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();

  const relaxAnimation = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.8],
    outputRange: [-(26 * 2), 0, 0],
  });

  const textAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [0, 0, -window.width * 2, 0, 0],
  });

  const imageAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [0, 0, -350 * 4, 0, 0],
  });

  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.8],
    outputRange: [0, 0, -window.width, -window.width],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <Animated.Text
        style={[styles.title, { transform: [{ translateY: relaxAnimation }] }]}
      >
        Viaja seguro
      </Animated.Text>
      <Animated.Text
        style={[styles.subtitle, { transform: [{ translateX: textAnim }] }]}
      >
        Tu bienestar es nuestra prioridad. Todas las cuentas y viajes están
        verificados para brindarte tranquilidad.
      </Animated.Text>
      <Image
        source={require("../../../../assets/images/carsecure1.png")}
        style={{
          width: 300,
          height: 300,
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
    alignItems: "center",
    paddingBottom: 100,
  },
  title: {
    color: "white",
    fontSize: 26,
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

export default RelaxView;
