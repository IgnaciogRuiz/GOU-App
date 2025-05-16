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
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/button";
import Oval from "../../components/OvalBackground";
import { Dimensions } from "react-native";

const BienvenidaScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleComenzar = () => {
    console.log("Email ingresado:", email);
    navigation.navigate("VerifyEmail"); // Redirigir si querés
  };

  return (
    <View style={styles.container}>
      <Oval color="#0000" direction="down" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image
        source={require("../../../assets/images/carAbove.png")}
        style={styles.carImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Bienvenido a <Text style={styles.bold}>GOU</Text>!
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>e-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="tunombre@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomButton title="Comenzar" onPress={handleComenzar}></CustomButton>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  backButton: {
    backgroundColor: "#000",
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1, // este botón debe ir encima
  },
  carImage: {
    width: 400,
    height: 400,
    marginTop: 100, // subilo un poco
    transform: [{ rotate: "90deg" }],
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    zIndex: 1,
  },
  bold: {
    fontWeight: "900",
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
    zIndex: 1,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    zIndex: 1,
  },
});

export default BienvenidaScreen;
