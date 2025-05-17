import React from "react";
import { View, Text, StyleSheet } from "react-native";

type SubtitleProps = {
    subtitle: string;
};

export default function Subtitle({ subtitle }: SubtitleProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%", // Adjust width to match the Title component
        alignItems: "center",
        backgroundColor: "white",
    },
    text: {
        fontSize: 16,
        paddingBottom: 10,
        // textAlign: "center", // Center the text
    },
});
