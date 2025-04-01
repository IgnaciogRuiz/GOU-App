import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, } from "react-native";
import CustomButton from "../../components/button";
import { useAuth } from "../../context/AuthContext";

export default function PerfilScreen() {
    const { logout, eliminarStorage } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="light" />
            <Text>PerfilScreen</Text>
            <CustomButton title="Cerrar Sesion" onPress={logout} ></CustomButton>
            <CustomButton title="Eliminar Storage" onPress={eliminarStorage} ></CustomButton>
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
