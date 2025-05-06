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

const BienvenidaScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleComenzar = () => {
    console.log("Email ingresado:", email);
    // Podés hacer navegación a Home o cualquier otra lógica
    // navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Botón volver (opcional) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.circleBackground} />
        <Image
          source={require("../../../assets/images/carAbove.png")}
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>

      {/* Texto bienvenida */}
      <Text style={styles.title}>
        Bienvenido a <Text style={styles.bold}>GOU</Text>!
      </Text>

      {/* Formulario */}
      <Text style={styles.label}>e-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="tunombre@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Botón */}
      <CustomButton title="Comenzar" onPress={handleComenzar}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  header: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
    marginBottom: 20,
  },
  circleBackground: {
    position: "absolute",
    width: 400,
    height: 400,
    backgroundColor: "#000",
    borderRadius: 200,
    top: -200, // Moverlo hacia arriba para que solo se vea medio círculo
  },
  carImage: {
    width: "100%",
    height: 200,
    transform: [{ rotate: "90deg" }], // Rotación de 90 grados
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "900",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default BienvenidaScreen;
