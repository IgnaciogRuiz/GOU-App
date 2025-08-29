// Loader.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const Loader = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { transform: [{ scale }] }]}>
        G!
      </Animated.Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#fff",
  },
});
