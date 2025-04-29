import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Title from "../../../components/title";
import CustomButton from "../../../components/button";

const AccountInfoScreen: React.FC = () => {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState("Roberto");
  const [apellido, setApellido] = useState("Diaz");
  const [telefono, setTelefono] = useState("3548573598");
  const [descripcion, setDescripcion] = useState("buenas");

  const handleGuardar = () => {
    // lógica para guardar cambios
    console.log({ nombre, apellido, telefono, descripcion });
    alert("Cambios guardados");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title title="Información De Cuenta"></Title>
      <Image
        style={styles.avatar}
        source={require("../../../../assets/images/negra.png")}
      />
      <Text style={styles.fullName}>{`${nombre} ${apellido}`}</Text>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />
      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />
      <View style={styles.fall}>
        <CustomButton title="Guardar Cambios"></CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  fullName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 100,
  },
});

export default AccountInfoScreen;
