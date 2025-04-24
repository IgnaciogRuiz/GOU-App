import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import VehiculoForm from "../../../components/vehiculoForm";
import Title from "../../../components/title";

export default function AgregarVehiculoScreen() {
  const handleSubmit = (data: any) => {
    console.log("Nuevo vehículo:", data);
    // Podés guardar los datos acá o redirigir
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Editar Vehiculo" />
      <VehiculoForm onSubmit={handleSubmit} buttonLabel="Agregar Vehiculo" />
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
