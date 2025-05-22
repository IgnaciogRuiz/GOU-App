import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, Image, View } from "react-native";
import { Title, Subtitle, CustomButton } from '../../components'
import { useBottomTabNavigation } from "../../navigation/Navigation";

export default function ViajesScreen() {
  const navigation = useBottomTabNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="light" />
      <Title title="Publicar Viaje"></Title>
      <Image
        source={require("../../../assets/images/carMan.jpg")}
        style={styles.image}
      ></Image>
      <View style={styles.textContainer}>
        <Title title="¡Parece que aun no tienes un auto registrado en la App!"></Title>
      </View>
      <Subtitle subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."></Subtitle>
      <CustomButton
        title="Ir a Configuraciones"
        onPress={() => navigation.navigate("Perfil")}
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
    width: "100%",
    height: "35%",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});
