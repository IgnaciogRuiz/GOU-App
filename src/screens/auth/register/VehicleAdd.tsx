// VERY TEMPORARY
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { VehiculoForm, Title } from '../../../components';
import { useAuthNavigation } from "../../../navigation/Navigation";

export default function AgregarVehiculoScreen() {
    const navigation = useAuthNavigation();
  const handleSubmit = (data: any) => {
    console.log("Nuevo vehículo:", data);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Agregar Vehiculo" />
      <VehiculoForm onSubmit={handleSubmit} buttonLabel="Agregar Vehiculo y Logearse" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
