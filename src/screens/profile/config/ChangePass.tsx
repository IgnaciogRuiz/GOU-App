import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Title, CustomButton } from '../../../components';

const CambiarContrasenaScreen: React.FC = () => {
  const navigation = useNavigation();
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [repetir, setRepetir] = useState("");

  const handleSubmit = () => {
    // Validación simple
    if (!actual || !nueva || !repetir) {
      alert("Completa todos los campos");
      return;
    }

    if (nueva !== repetir) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Lógica para actualizar contraseña
    console.log("Contraseña actual:", actual);
    console.log("Contraseña nueva:", nueva);
    alert("Contraseña cambiada con éxito");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Title title="Cambiar Contraseña"></Title>
      </View>

      {/* Form */}
      <Text style={styles.label}>Contraseña Actual</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={actual}
        onChangeText={setActual}
      />

      <Text style={styles.label}>Contraseña Nueva</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={nueva}
        onChangeText={setNueva}
      />

      <Text style={styles.label}>Repetir Contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={repetir}
        onChangeText={setRepetir}
      />
      <View style={styles.fall}>
        <CustomButton title="Reestablecer" onPress={() => console.log('Presionado')}></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
    lineHeight: 28,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 100,
  },
});

export default CambiarContrasenaScreen;
