import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CustomButton, Title } from '../../../components';
import { useAuthNavigation } from "../../../navigation/Navigation";

const AgregarVehiculoScreen = () => {
  const navigation = useAuthNavigation();

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Agregar Vehículo</Title>

      <Image
        source={require("../../../../assets/images/blueCar.jpg")}
        style={styles.carImage}
        resizeMode="contain"
      />

      <Text style={styles.description}>
        🚗 Agregá un vehículo para publicar viajes en la app.{"\n"}
        🧍‍♂️ Si solo vas a reservar, continuá sin agregarlo.
      </Text>

      <View style={styles.fall}>
        <CustomButton
          title="Más tarde"
          onPress={() => navigation.navigate("Login")}
        />
        <CustomButton
          title="Agregar vehículo"
          onPress={() => navigation.navigate("VehicleAdd")}
        />
      </View>
    </View>
  );
};

export default AgregarVehiculoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // 🔹 Fondo oscuro
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    color: "#fff",
    marginTop: 50,
  },
  carImage: {
    width: '100%',
    height: 200,
    marginVertical: 32,
    marginBottom: 100,
  },
  description: {
    fontSize: 17,
    textAlign: 'left',
    marginBottom: 16,
    color: '#e0e0e0', // 🔹 Texto claro para contraste
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
});
