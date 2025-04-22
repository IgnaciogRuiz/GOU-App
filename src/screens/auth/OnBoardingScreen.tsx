import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/button";
import BackButton from "../../components/backButton";
import FadeInView from "../../components/fadeIn";


export default function OnBoardingScreen({ navigation }) {
  const [step, setStep] = useState(1);

  const steps = [
    "Bienvenido a GOU, la app de carpooling que te ayuda a viajar de forma económica y sostenible.",
    "Reserva viajes a tus destinos favoritos o comparte tu auto para reducir costos y ganar dinero.",
    "Viaja más rápido y barato que con otros servicios, mientras ayudas al medio ambiente.",
    "¡Listo! Regístrate ahora y comienza a disfrutar de una nueva forma de moverte.",
  ];

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
  };

  return (
    <FadeInView style={styles.container}>
      {step > 1 && (
        <BackButton step={step} setStep={setStep} />
      )}

      <View style={styles.imageContainer}>
        <Image source={require("../../../assets/images/carMan.jpg")} />
      </View>

      <Text style={styles.title}>{steps[step - 1]}</Text>

      <View style={styles.containerbutton}>
        {step < steps.length ? (
          <CustomButton title="Siguiente" onPress={() => setStep(step + 1)} />
        ) : (
          <>
            <CustomButton
              title="Iniciar Sesión"
              onPress={() => {
                completeOnboarding();
                navigation.navigate("Login");
              }}
            />
            <CustomButton
              title="Registrarse"
              onPress={() => {
                completeOnboarding();
                navigation.navigate("Register");
              }}
            />
          </>
        )}
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  containerbutton: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
});
