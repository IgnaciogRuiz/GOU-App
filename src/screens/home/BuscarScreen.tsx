import React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, } from "react-native";
import { Card, Title, InputLocation } from '../../components'

export default function BuscarScreen() {
    const [origen, setOrigen] = useState("Buenos Aires");
    const [destino, setDestino] = useState("Córdoba");
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="light" />
            <Title title="Buscar Viajes"></Title>
            <InputLocation
                origen={origen}
                setOrigen={setOrigen}
                destino={destino}
                setDestino={setDestino}
                origenOptions={["Buenos Aires", "Rosario", "Mendoza"]}
                destinoOptions={["Córdoba", "Salta", "Tucumán"]}
                onFilterPress={() => console.log("Filter clicked")}
                onCalendarPress={() => console.log("Calendar clicked")}
            />
            <Card title="Victor - 17hs" info="Cordoba -> La Falda" items={[
        { icon: "✓", label: "Charlar" },
        { icon: "✓", label: "Comida" },
        { icon: "✗", label: "Fumar" }
    ]}
    price="$6.000"
    imageSource={require("../../../assets/images/phoneViajes.jpg")}/>
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
