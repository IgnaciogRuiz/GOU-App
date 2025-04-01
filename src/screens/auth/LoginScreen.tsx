import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Animated, Text, View, Dimensions, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../navigation/Navigation";
import CustomButton from "../../components/button";
import CustomInput from "../../components/input";
import { login } from "../../api/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import FadeInView from "../../components/fadeIn";
const { width } = Dimensions.get("window");

type LoginScreenNavigationProp = StackNavigationProp<StackParamList, "Login">;
type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const { setIsAuthenticated } = useAuth();
  const [form, setForm] = useState({ dni: "", password: "" });
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const fadeAnim = useRef(new Animated.Value(0)).current; // Para la opacidad
  const translateY = useRef(new Animated.Value(-10)).current; // Para la posición vertical
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Referencia al timeout

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

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem("hasSeenOnboarding");
    console.log("Onboarding reset! Reinicia la app para verlo de nuevo.");
  };

  const handleLogin = async () => {
    if (!form.dni) {
      setError("El DNI es obligatorio");
    } else if (form.dni.length < 7) {
      setError("El DNI debe tener al menos 8 caracteres");
    } else if (!form.password) {
      setError("La contraseña es obligatoria");
    } else {
      setError(""); // Limpiar el error si los datos están correctos

      try {
        const data = await login(form.dni, form.password); // 🔹 Llamamos a la API
        console.log("Login exitoso:", data);

        //guardar token
        await AsyncStorage.setItem("userToken", data.token);
        setIsAuthenticated(true);

      } catch (errorMessage) {
        setError(errorMessage);
      }
    }
  };


  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setError("");

    if (name === "dni" && value.length >= 7) {
      setError("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <FadeInView style={styles.animatedContainer}>

        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/car.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.containerText}>
          <Animated.View
            style={[
              styles.errorContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY }],
                display: error ? "flex" : "none",
              },
            ]}
          >
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </Animated.View>

          <View style={styles.containerform}>
            <Text style={styles.label}>DNI</Text>
            <CustomInput
              placeholder="46762316"
              secureTextEntry={false}
              keyboardType="numeric"
              value={form.dni}
              onChangeText={(text) => handleChange("dni", text)}
            />

            <Text style={styles.label}>Contraseña</Text>
            <CustomInput
              placeholder="************"
              secureTextEntry={true}
              keyboardType="default"
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
            />

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>
                ¿Olvidaste la contraseña?
              </Text>
            </TouchableOpacity>

            <CustomButton title="Iniciar Sesión" onPress={handleLogin} />
            <CustomButton title="Test OnBoarding" onPress={resetOnboarding} />

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                ¿Aún no tienes cuenta en GOU!?
              </Text>
              <CustomButton
                title="Registrarse"
                onPress={() => navigation.navigate("Info")}
              />
            </View>
          </View>
        </View>
      </FadeInView>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  animatedContainer: {
    flex: 1,
    width: "100%",
  },
  containerText: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerform: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },
  errorContainer: {
    position: "absolute",
    top: -5,
    backgroundColor: "red", // Fondo rojo
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: "white", // Texto blanco
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 40,
  },
  imageContainer: {
    width: "100%",
    height: width * 0.8, // Ajusta la altura en base al ancho (relación 16:9 aprox)
    overflow: "hidden", // Evita que la imagen sobresalga
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Cubre el área manteniendo proporciones
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 10,
  },
  left: {
    textAlign: "left",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end", // 📌 Ahora se alinea a la izquierda
    width: "100%", // 📌 Ocupar todo el ancho disponible
    paddingRight: 30, // 📌 Ajusta el margen izquierdo para alinearlo con el input
  },
  forgotPassword: {
    color: "#2879ff",
    textAlign: "right", // Asegura que el texto se alinee a la izquierda
  },
  registerText: {
    marginVertical: 10,
  },
  registerContainer: {
    flex: 1,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
