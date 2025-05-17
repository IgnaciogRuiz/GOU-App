import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
  color?: string;
  direction?: "up" | "down" | "left" | "right";
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

const OvalBackground: React.FC<Props> = ({
  color = "#000",
  direction = "down",
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
}) => {
  const rotation = {
    up: "180deg",
    left: "270deg",
    right: "90deg",
    down: "0deg",
  };

  const ovalStyle: StyleProp<ViewStyle> = [
    styles.oval,
    {
      backgroundColor: color,
      transform: [{ rotate: rotation[direction] }],
      marginTop,
      marginBottom,
    },
  ];

  return <View style={ovalStyle} />;
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
