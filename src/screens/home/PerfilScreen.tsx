import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, } from "react-native";
import CustomButton from "../../components/button";
import { logout } from "../../api/services/authService";
import { useAuth } from "../../context/AuthContext";

export default function PerfilScreen() {
    const { setIsAuthenticated } = useAuth();
    const handleLogout = async () => {
        try {
            const data = await logout();
            setIsAuthenticated(false);

        } catch (errorMessage) {
            console.log(errorMessage);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="light" />
            <Text>PerfilScreen</Text>
            <CustomButton title="Cerrar Sesion" onPress={handleLogout} ></CustomButton>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
});
