import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>¿Quieres habilitar Face ID o Huella Dactilar?</Text>
      {biometricAvailable ? (
        <>
          <Button title="Sí, habilitar" onPress={enableBiometrics} />
          <Button title="No, gracias" onPress={skipBiometrics} />
        </>
      ) : (
        //redirigir a home no poner nada
        <Text>Tu dispositivo no admite autenticación biométrica.</Text>
      )}
    </View>
  );
};

export default EnableBiometricScreen;
