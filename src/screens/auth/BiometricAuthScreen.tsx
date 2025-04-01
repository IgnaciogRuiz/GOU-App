import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuth } from "../../context/AuthContext";

const BiometricAuthScreen = ({ navigation }) => {
    const { login, logout } = useAuth();
    const [biometricFailed, setBiometricFailed] = useState(false);

    useEffect(() => {
        authenticate();
    }, []);

    const authenticate = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Autenticación biométrica",
            fallbackLabel: "Usar contraseña",
        });

        if (result.success) {
            login("biometric_token");
        } else {
            setBiometricFailed(true);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {biometricFailed ? (
                <>
                    <Text>La autenticación falló.</Text>
                    <Button title="Reintentar" onPress={authenticate} />
                    <Button title="Ingresar con contraseña" onPress={() => navigation.navigate("PasswordLogin")} />
                    <Button title="No soy yo / Cerrar sesión" onPress={logout} color="red" />
                </>
            ) : (
                <Text>Verificando autenticación biométrica...</Text>
            )}
        </View>
    );
};

export default BiometricAuthScreen;
