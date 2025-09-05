import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthNavigation } from "../../../navigation/Navigation";
import { OvalBackground, CustomButton } from "../../../components";
import { Dimensions } from "react-native";

const BienvenidaScreen: React.FC = () => {
  const navigation = useAuthNavigation();
  const [phone, setPhone] = useState("");

  const handleComenzar = () => {
    console.log("numero ingresado:", phone);
  };

  return (
    <View style={styles.container}>
      <OvalBackground color="#111" direction="down" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image
        source={require("../../../../assets/images/carAbove.png")}
        style={styles.carImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Ingresa tu Telefono
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>numero de telefono</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="sin codigo de area"
          placeholderTextColor="#888"
          // keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomButton title="Enviar" onPress={() => navigation.navigate("VerifyPhone")}/>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // fondo oscuro
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    position: "relative",
  },
  backButton: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  carImage: {
    width: 400,
    height: 400,
    marginTop: 100,
    transform: [{ rotate: "90deg" }],
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // texto blanco
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    zIndex: 1,
  },
  bold: {
    fontWeight: "900",
    color: "#00aced", // un celeste atractivo para resaltar
  },
  form: {
    width: "85%",
    alignItems: "center",
    zIndex: 1,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 6,
    color: "#ddd", // gris claro
    zIndex: 1,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#111", // input oscuro
    color: "#fff", // texto blanco
    zIndex: 1,
  },
});

export default BienvenidaScreen;
