import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

type Props = {
    label: string;
    placeholder: string;
    value: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "numeric";
    error?: string;
    onChangeText: (text: string) => void;
};

export default function CustomInput({
    label,
    placeholder,
    value,
    secureTextEntry = false,
    keyboardType = "default",
    error,
    onChangeText,
}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});
