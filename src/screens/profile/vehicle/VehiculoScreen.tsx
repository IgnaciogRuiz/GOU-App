import React from "react";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import { CustomButton } from '../../../components';
import { useProfileNavigation } from "../../../navigation/Navigation";

export default function VehiculoScreen() {
  const navigation = useProfileNavigation();

  const handleAddVehicle = () => {
    navigation.navigate("AddVehicle");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Card title="Mi Auto"
      info="Toyota Corolla 2021"
      items={[
        { icon: "🚗", label: "Marca: Fiat" },
        { icon: "🛣️", label: "Año: 2021" },
        { icon: "🔒", label: ": ABC123" },]}></Card> */}
      <View style={styles.emptyState}>
        <Image
          style={styles.image}
          source={require("../../../../assets/images/blueCar.jpg")}
        ></Image>
        <Text style={styles.text}>Aun no tenes vehiculos asociados</Text>
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
  text: {
    fontSize: 20,
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
  image: {
    marginTop: "50%",
  },
});
