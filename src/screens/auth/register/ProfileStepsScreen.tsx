import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { OvalBackground, Title, CustomButton } from '../../../components'
import { Ionicons } from "@expo/vector-icons";
import { useAuthNavigation } from "../../../navigation/Navigation";

const ProfileStepsScreen = () => {
  const navigation = useAuthNavigation();
  return (
    <View style={styles.container}>
      <OvalBackground color="#000" direction="left" />

      <Image
        source={require("../../../../assets/images/carAbove.png")} // Reemplazá con tu ruta
        style={styles.carImage}
        resizeMode="contain"
      />
      <View style={styles.fall}>
        <Title title="Datos a completar" />
        <Text style={styles.subtitle}>completa los siguientes requisitos</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("PhoneInputScreen")}
        >
          <Image
            source={require("../../../../assets/images/carAbove.png")}
            style={styles.icon}
          />
          <Text style={styles.cardText}>Agregar numero de telefono</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
          {/* <View style={styles.check}></View> --> when the number is set and confirmed*/}
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../../../assets/images/carAbove.png")}
            style={styles.icon}
          />
          <Text style={styles.cardText}>Completar informacion personal</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../../../assets/images/carAbove.png")}
            style={styles.icon}
          />
          <Text style={styles.cardText}>Valida tu identidad</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <CustomButton title="Finalizar" onPress={() => console.log('Presionado')}/>
      </View>
    </View>
  );
};

export default ProfileStepsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "flex-start",
  },
  carImage: {
    width: 350,
    height: 400,
    alignSelf: "flex-end",
    marginTop: -30,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
    fontSize: 14,
    color: "#222",
  },
  check: {
    width: 22,
    height: 22,
    backgroundColor: "green",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
});
