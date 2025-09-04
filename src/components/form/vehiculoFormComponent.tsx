// components/VehiculoForm.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CustomButton from "../ui/buttonComponent";
import { useAuthNavigation } from "../../navigation/Navigation";

type VehiculoData = {
  nombre: string;
  marca: string;
  modelo: string;
  anio: string;
  patente: string;
  seguro: string;
};

type VehiculoFormProps = {
  onSubmit: (data: VehiculoData) => void;
  initialValues?: Partial<VehiculoData>;
  buttonLabel?: string;
};

const VehiculoForm: React.FC<VehiculoFormProps> = ({
  onSubmit,
  initialValues = {},
  buttonLabel = "Agregar Vehículo",
}) => {
  const [nombre, setNombre] = useState(initialValues.nombre || "");
  const [marca, setMarca] = useState(initialValues.marca || "");
  const [modelo, setModelo] = useState(initialValues.modelo || "");
  const [anio, setAnio] = useState(initialValues.anio || "");
  const [patente, setPatente] = useState(initialValues.patente || "");
  const [seguro, setSeguro] = useState(initialValues.seguro || "");

  const handleSubmit = () => {
    onSubmit({ nombre, marca, modelo, anio, patente, seguro });
  };
  const navigation = useAuthNavigation();

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nombre de Vehículo*</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Mi auto"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Marca*</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
        placeholder="Ej: Toyota"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Modelo*</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Ej: Corolla"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Año*</Text>
      <TextInput
        style={styles.input}
        value={anio}
        onChangeText={setAnio}
        keyboardType="numeric"
        placeholder="Ej: 2020"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Patente*</Text>
      <TextInput
        style={styles.input}
        value={patente}
        onChangeText={setPatente}
        placeholder="ABC123"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>N° de Seguro*</Text>
      <TextInput
        style={styles.input}
        value={seguro}
        onChangeText={setSeguro}
        placeholder="Ej: 123456789"
        placeholderTextColor="#888"
      />

      <View style={styles.fall}>
        <CustomButton 
          title={buttonLabel}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
    width: "100%",
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 12,
    color: "#ddd", // 🔹 Texto claro
  },
  input: {
    borderWidth: 1,
    borderColor: "#444", // 🔹 Bordes suaves
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#1E1E1E", // 🔹 Fondo input oscuro
    color: "#fff", // 🔹 Texto claro
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 100,
  },
});

export default VehiculoForm;
