import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TituloProps = {
    titulo: string;
};

export default function Tittle({ titulo }: TituloProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{titulo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 10,
        alignItems: "center",
        backgroundColor: "white",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
