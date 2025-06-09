import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CustomButton, Title } from '../../../components';
import { useAuthNavigation, useProfileNavigation } from "../../../navigation/Navigation";

const AgregarVehiculoScreen = () => {
    const navigation = useAuthNavigation();
    // const profile = useProfileNavigation();
  return (
    <View style={styles.container}>
      <Title title='Agregar Vehiculo'></Title>

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
        <CustomButton title="Mas tarde" onPress={() => navigation.navigate("Login")} />
        <CustomButton title="Agregar vehiculo" onPress={() => navigation.navigate("VehicleAdd")} />
      </View>
    </View>
  );
};

export default AgregarVehiculoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'space-between',
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
    color: '#000',
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
});
