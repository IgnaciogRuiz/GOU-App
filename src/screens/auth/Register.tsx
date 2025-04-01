import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../navigation/Navigation";
import BackButton from "../../components/backButton";
import Tittle from "../../components/title";
type InfoScreenProps = {
    navigation: StackNavigationProp<StackParamList, "Info">;
};

export default function RegisterScreen({ navigation }: InfoScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="light" />
            <Tittle titulo="Registrarse"></Tittle>
            <Text>RegisterScreen</Text>
            <BackButton></BackButton>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 10,
        padding: 10,
        zIndex: 100,
    },
});
