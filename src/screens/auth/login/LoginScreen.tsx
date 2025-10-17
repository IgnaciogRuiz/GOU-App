import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from "react-native";
import { CustomButton } from "../../../components";
import { useLogin } from "../../../hooks";
import { useAuthNavigation } from "../../../navigation/Navigation";
import { useAuth } from "../../../contexts";

const LoginScreen = () => {
  const navigation = useAuthNavigation();
  const { mutate: login, isPending } = useLogin();
  const { eliminarStorage } = useAuth();

  const [form, setForm] = useState({ dni: "", password: "" });
  const [error, setError] = useState("");

  // Animaciones para error
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (error) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      timeoutRef.current = setTimeout(() => setError(""), 5000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [error]);


  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleLogin = () => {
    if (!form.dni) {
      setError("El DNI es obligatorio");
    } else if (form.dni.length < 7) {
      setError("El DNI debe tener al menos 8 caracteres");
    } else if (!form.password) {
      setError("La contraseña es obligatoria");
    } else {
      setError("");
      login(
        { dni: form.dni, password: form.password },
        {
          onError: (err) => {
            setError(
              err instanceof Error ? err.message : "Error al iniciar sesión"
            );
          },
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con título y slogan */}
      <View style={styles.header}>
        <Text style={styles.title}>GOU!</Text>
        <Text style={styles.slogan}>comparte el viaje, disfruta el camino!</Text>
      </View>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>DNI</Text>
        <TextInput
          placeholder="Ingresa tu DNI"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="numeric"
          value={form.dni}
          onChangeText={(text) => handleChange("dni", text)}
        />

          <>
            <Text style={[styles.label, { marginTop: 20 }]}>Contraseña</Text>
            <TextInput
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#aaa"
              style={styles.input}
              secureTextEntry
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
            />
          </>

          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotContainer} onPress={eliminarStorage}>
            <Text style={styles.forgotText}>Test Onboarding</Text>
          </TouchableOpacity>

        {/* Error animado */}
        {error ? (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY }],
              marginTop: 15,
            }}
          >
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        ) : null}
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title={isPending ? "Cargando..." : "Iniciar Sesión"}
          onPress={handleLogin}
          disabled={isPending}
        />
        <CustomButton
          title="Registrarse"
          onPress={() => navigation.navigate("Register")}
          backgroundColor="#fff"
          textColor="#000"
        />
      </View>

      {/* Footer */}
      <Text style={styles.terms}>
        Al continuar, aceptás nuestros{" "}
        <Text style={styles.link}>Términos de Servicio</Text> y{" "}
        <Text style={styles.link}>Política de Privacidad</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  header: {
    marginTop: 40,
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  slogan: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    fontStyle: "italic",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 40,
  },
  label: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#111827",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: "#2D2D2D",
    borderWidth: 1,
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  forgotText: {
    color: "#3182CE",
    fontSize: 16,
  },
  errorText: {
    color: "#f87171",
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    width: "110%",
  },
  terms: {
    fontSize: 11,
    color: "#aaa",
    textAlign: "center",
    marginTop: "auto",
    marginBottom: 10,
  },
  link: {
    color: "#3182CE",
    textDecorationLine: "underline",
  },
});