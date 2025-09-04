import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Title, CustomButton, BackButton } from "../../../components";
import { useAuthNavigation } from "../../../navigation/Navigation";

const DatosPersonalesScreen = () => {
  const navigation = useAuthNavigation();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = () => {
    console.log("Datos enviados:", {
      nombre,
      apellido,
      fecha,
      descripcion,
      password,
      repeatPassword,
    });
    navigation.navigate("ProfileStepsScreen", { infoVer: true });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <BackButton />

        <Title style={styles.title}>Datos Personales</Title>

        <Text style={styles.subtext}>
          Tus datos deberán coincidir con los de tu DNI.
        </Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Julian"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
          placeholder="Taliente"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Cumpleaños</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
          placeholder="dd/mm/yy"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Hola! Soy Julian, tengo 28 años, etc."
          placeholderTextColor="#888"
          multiline
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="********"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Repetir Contraseña</Text>
        <TextInput
          style={styles.input}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
          placeholder="********"
          placeholderTextColor="#888"
        />

        <View style={styles.fall}>
          <CustomButton title="Verificar" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default DatosPersonalesScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 20,
    flexGrow: 1,
    backgroundColor: "#121212", // fondo oscuro
  },
  container: {
    padding: 20,
    backgroundColor: "#121212",
    flex: 1,
  },
  title: {
    color: "#fff",
  },
  subtext: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    textTransform: "capitalize",
    color: "#ddd",
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#1E1E1E",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});
