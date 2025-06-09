import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Title, CustomButton, BackButton } from "../../../components"; // Ajustá según tu estructura
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
    console.log("Datos enviados:", {nombre, apellido, fecha, descripcion, password, repeatPassword,});
    navigation.navigate("ProfileStepsScreen"), { infoVer: true };
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Title title="Datos Personales" />

        <Text style={styles.subtext}>
          Tus datos deberán coincidir con los de tu DNI.
        </Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="julian"
        />

        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
          placeholder="taliente"
        />

        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
          placeholder="dd/mm/yy    00:00"
        />

        <Text style={styles.label}>Descripciones</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Hola! Soy Julian tengo 28 años, etc."
          multiline
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="********"
        />

        <Text style={styles.label}>Repetir Contraseña</Text>
        <TextInput
          style={styles.input}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
          placeholder="********"
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
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  subtext: {
    color: "#333",
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    textTransform: "lowercase",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
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
  },
});
