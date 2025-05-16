import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type Direction = "up" | "down" | "left" | "right";

interface OvalBackgroundProps {
  color?: string;
  direction?: Direction;
}

const OvalBackground: React.FC<OvalBackgroundProps> = ({
  color = "#000",
  direction = "down",
}) => {
  const rotation: Record<Direction, string> = {
    down: "0deg",
    up: "180deg",
    left: "-90deg",
    right: "90deg",
  };

  const transformStyle: ViewStyle = {
    transform: [{ rotate: rotation[direction] }],
  };

  return (
    <View style={[styles.oval, { backgroundColor: color }, transformStyle]} />
  );
};

const styles = StyleSheet.create({
  oval: {
    position: "absolute",
    top: -75,
    width: 411,
    height: 500,
    borderBottomLeftRadius: 450,
    borderBottomRightRadius: 450,
    zIndex: 0,
  },
});

export default OvalBackground;
