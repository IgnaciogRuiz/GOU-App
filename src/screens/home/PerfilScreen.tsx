import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import CustomButton from "../../components/button";
import { useAuth } from "../../context/AuthContext";
import ListItem from "../../components/listItem";
import Title from "../../components/title";
import ProfileHeader from "../../components/profileHeader"

export default function PerfilScreen() {
  const { logout, eliminarStorage } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="light" />
      <Title title="Perfil"></Title>
      <ProfileHeader
      name="Roberto Diaz"
      memberSince="2021"
      distance="1.000KMs"
      onEdit={() => console.log("Edit pressed")}
      avatar={require("../../../assets/images/negra.png")}
      />
      <ListItem label="Pagos" />
      <ListItem label="Vehiculo" />
      <ListItem label="Información Cuenta" />
      <ListItem label="Configuraciones" />
      <View style={styles.fall}>
        <CustomButton title="Cerrar Sesion" onPress={logout}></CustomButton>
        <CustomButton
          title="Eliminar Storage"
          onPress={eliminarStorage}
        ></CustomButton>
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
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 100,
  },
});
