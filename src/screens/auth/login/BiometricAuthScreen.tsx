import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuth } from "../../../contexts/AuthContext";

const BiometricAuthScreen = ({ navigation }) => {
    const { logout, bioAuth } = useAuth();
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
            const success = await bioAuth();
            if (success) {
                navigation.navigate("Home");
            } else {
                Alert.alert("Error", "No se pudo autenticar el usuario.");
                setBiometricFailed(true);
            }
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
                <Text>Verificando...</Text>
            )}
        </View>
    );
};

export default BiometricAuthScreen;
