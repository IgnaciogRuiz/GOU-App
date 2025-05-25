import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, Image, View, ActivityIndicator } from "react-native";
import { Title, Subtitle, CustomButton } from '../../components'
import { useBottomTabNavigation } from "../../navigation/Navigation";
import { useUserVehicles } from "../../hooks/app/useUserVehicles";

export default function PublicarScreen() {
  const navigation = useBottomTabNavigation();
  const { vehicles, loading } = useUserVehicles();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor="light" />
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="light" />
      <Title title="Publicar Viaje" />

      {/* Si no tiene vehículos */}
      {vehicles.length === 0 ? (
        <>
          <Image
            source={require("../../../assets/images/carMan.jpg")}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Title title="¡Parece que aún no tienes un auto registrado en la App!" />
          </View>
          <Subtitle subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." />
          <CustomButton
            title="Ir a Configuraciones"
            onPress={() => navigation.navigate("Perfil")}
          />
        </>
      ) : (
        // Si tiene vehículos
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            ¡Tengo auto!
          </Text>
          {/* Aquí irá el formulario para publicar un viaje */}
          <Text>Aquí irá el formulario para publicar un viaje.</Text>
        </View>
      )}
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