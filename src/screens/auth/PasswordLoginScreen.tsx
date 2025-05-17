import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { CustomButton } from "../../components";

const PasswordLoginScreen = ({ navigation }) => {
    const { loginWithPassword, eliminarStorage } = useAuth();
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Aquí puedes validar la contraseña con la API
        if (password) {
            console.log(password)
            const response = loginWithPassword(password);
            if (response) {
                navigation.navigate("Home")
            }
        } else {
            Alert.alert("Error", "Contraseña incorrecta");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Ingresa tu contraseña</Text>
            <TextInput
                secureTextEntry
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                style={{ borderBottomWidth: 1, width: "80%", marginVertical: 10 }}
            />
            <CustomButton
                title="Iniciar sesión"
                onPress={handleLogin}
            ></CustomButton>
            <CustomButton
                title="Eliminar Storage"
                onPress={eliminarStorage}
            ></CustomButton>
        </View>
    );
};

export default PasswordLoginScreen;
