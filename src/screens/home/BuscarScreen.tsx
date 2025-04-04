import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, } from "react-native";
import Card from "../../components/card";

export default function BuscarScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="light" />
            <Text>BuscarScreen</Text>
            <Card title="Victor - 17hs" info="Cordoba -> La Falda" items={[
        { icon: "✓", label: "Charlar" },
        { icon: "✓", label: "Comida" },
        { icon: "✗", label: "Fumar" }
    ]}
    price="$6.000"/>
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
