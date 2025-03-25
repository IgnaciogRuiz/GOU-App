import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, } from "react-native";

export default function ViajesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="light" />
            <Text>ViajesScreen</Text>
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
