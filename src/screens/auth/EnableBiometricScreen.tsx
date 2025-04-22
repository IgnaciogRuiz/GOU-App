import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const EnableBiometricScreen = ({ navigation }) => {
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBiometricAvailable(compatible);
    };
    checkBiometricSupport();
  }, []);

  const enableBiometrics = async () => {
    await AsyncStorage.setItem("biometricEnabled", "true");
    Alert.alert("Activado", "La autenticación biométrica ha sido habilitada.");
    navigation.replace("Home");
  };

  const skipBiometrics = async () => {
    await AsyncStorage.setItem("biometricEnabled", "false");
    navigation.replace("Home");
  };

  const skipForever = async () => {
    await AsyncStorage.setItem("biometricEnabled", "never");
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Quieres habilitar Face ID o Huella Dactilar?</Text>

      {biometricAvailable ? (
        <>
          <Button title="Sí, habilitar" onPress={enableBiometrics} />
          <View style={styles.buttonSpacing}>
            <Button title="No, mas tarde" onPress={skipBiometrics} />
          </View>
          <View style={styles.buttonSpacing}>
            <Button title="No, no volver a preguntar" onPress={skipForever} />
          </View>
        </>
      ) : (
        <Text style={styles.text}>Tu dispositivo no admite autenticación biométrica.</Text>
      )}

      {/* Gif animado */}
      <View style={styles.gifContainer}>
        <Image
          source={{ uri: 'https://media.giphy.com/media/3o85xnmwPO4TZXzy9m/giphy.gif' }}
          style={styles.gif}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonSpacing: {
    marginVertical: 10,
    width: "80%",
  },
  text: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  gifContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 200,
    height: 200,
  },
});

export default EnableBiometricScreen;
