import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, Image, View } from "react-native";
import Title from "../../components/title";
import Subtitle from "../../components/subtitle";
import CustomButton from "../../components/button";
import { useNavigation } from "@react-navigation/native";
// import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function ViajesScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="light" />
      <Title title="Mis Viajes"></Title>
      <Image
        source={require("../../../assets/images/phoneViajes.jpg")}
        style={styles.image}
      ></Image>
      <Title title="Parece que no tenes viajes creados o reservados!"></Title>
      <Subtitle subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."></Subtitle>
      <CustomButton
        title="Publicar Viaje"
        onPress={() => navigation.navigate("Publicar")}
      />
      <CustomButton
        title="Buscar Viaje"
        onPress={() => navigation.navigate("Buscar")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: "35%",
    height: "35%",
  },
});
