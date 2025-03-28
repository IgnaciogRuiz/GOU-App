import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../navigation/Navigation";
import CustomButton from "../../components/button";
import BackButton from "../../components/backButton";

type InfoScreenProps = {
  navigation: StackNavigationProp<StackParamList, "Info">;
};

export default function InfoScreen({ navigation }: InfoScreenProps) {
  const [step, setStep] = useState(1);

  // Contenido de los pasos
  const steps = [
    "Bienvenido a GOU, la app de carpooling que te ayuda a viajar de forma económica y sostenible.",
    "Reserva viajes a tus destinos favoritos o comparte tu auto para reducir costos y ganar dinero.",
    "Viaja más rápido y barato que con otros servicios, mientras ayudas al medio ambiente.",
    "¡Listo! Regístrate ahora y comienza a disfrutar de una nueva forma de moverte.",
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <BackButton step={step} setStep={setStep} />

      <View style={styles.imageContainer}>
        <Image source={require("../../../assets/images/carMan.jpg")} />
      </View>

      <Text style={styles.title}>{steps[step - 1]}</Text>

      <View style={styles.containerbutton}>
        <CustomButton
          title={step < steps.length ? "Siguiente" : "Registrarse"}
          onPress={() => {
            if (step < steps.length) {
              setStep(step + 1);
            } else {
              navigation.navigate("Register"); // Va a la pantalla de registro
            }
          }}
        />
      </View>
    </View>
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
  containerbutton: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
});
