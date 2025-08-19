import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CustomButton } from "../../../components";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Imagen principal */}
      <Image
        source={require("../../../../assets/images/car.png")}
        style={styles.banner}
      />

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>DNI</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Ingresa tu DNI"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>Contraseña</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <CustomButton title="Iniciar Sesión ➜" onPress={() => {}} />
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
    paddingTop: 60,
  },
  banner: {
  width: 400,
  height: 300,
  // resizeMode: "contain",
  marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
  },
  inputBox: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: "#2D2D2D",
    borderWidth: 1,
  },
  input: {
    color: "#fff",
  },
  forgotText: {
    color: "#3182CE",
    marginTop: 10,
    fontSize: 12,
    alignSelf: "flex-end",
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




/* codigo onboarding dsp implementar
  const { mutate: login, isPending } = useLogin();
  const [form, setForm] = useState({ dni: "", password: "" });
  const [error, setError] = useState("");
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
        login({ dni: form.dni, password: form.password })
      } catch (errorMessage) {
        setError(errorMessage instanceof Error ? errorMessage.message : String(errorMessage));
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

*/