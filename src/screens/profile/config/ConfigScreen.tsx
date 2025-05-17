import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProfileNavigation } from "../../../navigation/Navigation";

const ConfiguracionScreen: React.FC = () => {
  const navigation = useProfileNavigation();

  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Configuración</Text>
      </View>

      {/* Notificaciones */}
      <Text style={styles.sectionTitle}>NOTIFICACIONES</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Notificaciones push</Text>
        <Switch value={pushEnabled} onValueChange={setPushEnabled} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Notificaciones por correo</Text>
        <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
      </View>

      {/* Privacidad */}
      <Text style={styles.sectionTitle}>PRIVACIDAD</Text>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("ChangePass")}
      >
        <Text style={styles.label}>Cambiar contraseña</Text>
        <Ionicons name="chevron-forward" size={20} />
      </TouchableOpacity>

      {/* General */}
      <Text style={styles.sectionTitle}>GENERAL</Text>
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Idioma</Text>
        <Text style={styles.value}>Español</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Tema de la app</Text>
        <Text style={styles.value}>Claro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Acerca de</Text>
        <Ionicons name="chevron-forward" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Términos y condiciones</Text>
        <Ionicons name="chevron-forward" size={20} />
      </TouchableOpacity>
    </ScrollView>
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
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#888",
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: "#111",
  },
  value: {
    fontSize: 16,
    color: "#888",
  },
});

export default ConfiguracionScreen;
