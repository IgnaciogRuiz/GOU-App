import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TituloProps = {
    title: string;
};

export default function Title({ title }: TituloProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
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
        fontSize: 32,
        fontWeight: "bold",
    },
});
