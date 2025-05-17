import React, { useEffect, useState } from "react";
import {  Text, StyleSheet, Animated, Image } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function SplashScreen() {
  const {
    loading,
  } = useAuth();

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (loading) return;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [loading]);

  return (
    <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
      <Image
        source={require("../../assets/images/cargando.gif")}
        style={styles.image}
      />
      <Text style={styles.loadingText}>GOU!</Text>
      <Text>Comparte el viaje, disfruta el camino.</Text>
      <Text>🌍🚗</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBEDEE",
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
  },
});
