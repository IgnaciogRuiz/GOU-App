import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useLogout } from "../../hooks";
import { CustomButton, ListItem, Title, ProfileHeader } from '../../components'
import { useProfileNavigation } from "../../navigation/Navigation";

export default function PerfilScreen() {
  const { eliminarStorage } = useAuth();
  const { mutate: logout, isPending } = useLogout();
  const navigation = useProfileNavigation();
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
      <ListItem label="Pagos" onPress={() => navigation.navigate("Payments")} />
      <ListItem label="Vehiculo" onPress={() => navigation.navigate("Vehicle")} />
      <ListItem label="Información Cuenta" onPress={() => navigation.navigate("Info")} />
      <ListItem label="Configuraciones" onPress={() => navigation.navigate("Config")} />
      <View style={styles.fall}>
        <CustomButton title="Cerrar Sesion" disabled={isPending} onPress={() => logout()}></CustomButton>
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
