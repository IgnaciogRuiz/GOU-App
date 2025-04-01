import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";

const PasswordLoginScreen = ({ navigation }) => {
    const { login } = useAuth();
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Aquí puedes validar la contraseña con la API
        if (password === "123456") { // Reemplazar con validación real
            login("password_token");
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
            <Button title="Iniciar sesión" onPress={handleLogin} />
            <Button title="Volver" onPress={() => navigation.goBack()} color="gray" />
        </View>
    );
};

export default PasswordLoginScreen;
