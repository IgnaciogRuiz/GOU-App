import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import Title from "../../../components/title";
import Card from "../../../components/card";
import CustomButton from "../../../components/button";
import { useNavigation } from "@react-navigation/native";

export default function VehiculoScreen() {
  const navigation = useNavigation();

  const handleAddVehicle = () => {
    navigation.navigate("AddVehicle");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="light" />
      <Title title="Vehiculos" />
      {/* <Card title="Mi Auto"
      info="Toyota Corolla 2021"
      items={[
        { icon: "🚗", label: "Marca: Fiat" },
        { icon: "🛣️", label: "Año: 2021" },
        { icon: "🔒", label: ": ABC123" },]}></Card> */}
      <View style={styles.emptyState}>
        <Text style={styles.title}>Nothing to see here - Yet</Text>
        <Text style={styles.subtitle}>
          Agrega un vehículo para empezar a publicar viajes!
        </Text>
      </View>

      <View style={styles.fall}>
        <CustomButton title="Agregar un Vehiculo" onPress={handleAddVehicle} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 100,
  },
});
