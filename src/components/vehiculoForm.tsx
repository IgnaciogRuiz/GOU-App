// components/VehiculoForm.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CustomButton from "./button";

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
  buttonLabel = "Agregar Vehiculo",
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

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nombre de Vehículo*</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Marca*</Text>
      <TextInput style={styles.input} value={marca} onChangeText={setMarca} />

      <Text style={styles.label}>Modelo*</Text>
      <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

      <Text style={styles.label}>Año*</Text>
      <TextInput
        style={styles.input}
        value={anio}
        onChangeText={setAnio}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Patente*</Text>
      <TextInput
        style={styles.input}
        value={patente}
        onChangeText={setPatente}
      />

      <Text style={styles.label}>N° de Seguro*</Text>
      <TextInput style={styles.input} value={seguro} onChangeText={setSeguro} />

      <View style={styles.fall}>
        <CustomButton title={buttonLabel} onPress={handleSubmit} />
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 4,
  },
  fall: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 100,
  },
});

export default VehiculoForm;
