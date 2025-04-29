import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../../../components/title";
import CustomButton from "../../../components/button";

const PagosScreen = () => {
  const [cvu, setCvu] = useState("00000000000001234");

  const handleAbonar = () => {
    // Lógica para abonar
    console.log("Abonar");
  };

  return (
    <View style={styles.container}>
      <Title title="Pagos"></Title>

      <View style={styles.card}>
        <Text style={styles.title}>Tu cuenta</Text>
        <Text style={styles.label}>CVU</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={cvu}
            onChangeText={setCvu}
            editable={false}
          />
          <Ionicons name="pencil" size={18} color="gray" style={styles.icon} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Saldo Pendiente</Text>
        <CustomButton title="Abonar"></CustomButton>
      </View>
    </View>
  );
};

export default PagosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  card: {
    marginTop: "10%",
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
  },
  label: {
    color: "#fff",
    marginBottom: 4,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    color: "#000",
  },
  icon: {
    marginLeft: 8,
  },
});
