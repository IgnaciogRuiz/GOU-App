// VERY TEMPORARY
import React from "react";
import { View, StyleSheet } from "react-native";
import { VehiculoForm, Title } from '../../../components';
import { useAuthNavigation } from "../../../navigation/Navigation";

export default function AgregarVehiculoScreen() {
  const navigation = useAuthNavigation();

  const handleSubmit = (data: any) => {
    console.log("Nuevo vehículo:", data);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Agregar Vehículo</Title>
      <VehiculoForm
        onSubmit={handleSubmit}
        // buttonLabel="Agregar Vehículo y Logearse"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // 🔹 Fondo oscuro
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    marginTop: 60,
  }
});
