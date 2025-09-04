import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { OvalBackground, Title, CustomButton } from '../../../components'
import { Ionicons } from "@expo/vector-icons";
import { useAuthNavigation } from "../../../navigation/Navigation";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types/NavigationTypes";

type ProfileStepsRouteProp = RouteProp<RootStackParamList, "ProfileStepsScreen">;

const ProfileStepsScreen = () => {
  const navigation = useAuthNavigation();
  const route = useRoute<ProfileStepsRouteProp>();
  const phoneVerified = route.params?.phoneVerified;
  const infoVer = route.params?.infoVer;

  return (
    <View style={styles.container}>
      <OvalBackground color="#333" direction="left" />
      <Image
        source={require("../../../../assets/images/carAbove.png")}
        style={styles.carImage}
        resizeMode="contain"
      />
      <Title style={{ color: "#fff" }}>Datos a Completar</Title>
      <Text style={styles.subtitle}>Completa los siguientes requisitos</Text>
      <View style={styles.fall}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("PhoneInputScreen")}
        >
          <Image
            source={require("../../../../assets/images/carAbove.png")}
            style={styles.icon}
          />
          <Text style={styles.cardText}>Agregar número de teléfono</Text>
          {phoneVerified ? (
            <Ionicons name="checkmark" size={24} color="green" />
          ) : (
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("PersonalInfo")}
        >
          <Image
            source={require("../../../../assets/images/carAbove.png")}
            style={styles.icon}
          />
          <Text style={styles.cardText}>Completar información personal</Text>
          {infoVer ? (
            <Ionicons name="checkmark" size={24} color="green" />
          ) : (
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../../../assets/images/carAbove.png")}
            style={styles.icon}
          />
          <Text style={styles.cardText}>Valida tu identidad</Text>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>

        <CustomButton title="Finalizar" onPress={() => navigation.navigate("AddOptVehicle")} />
      </View>
    </View> 
  );
};

export default ProfileStepsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "flex-start",
  },
  carImage: {
    width: 350,
    height: 400,
    alignSelf: "flex-end",
    marginTop: -20,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 14,
    color: "#bbb",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1f1f1f",
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
    color: "#fff",
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
});
