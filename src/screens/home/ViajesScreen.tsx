import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, Image} from "react-native";
import Title from "../../components/title";
import Subtitle from "../../components/subtitle";
import CustomButton from "../../components/button";

export default function ViajesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="light" />
            <Title title="Mis Viajes"></Title>
            <Image source={require("../../../assets/images/phoneViajes.jpg")} style={styles.image}></Image>
            <Title title="Parece que no tenes viajes creados o reservados!"></Title>
            <Subtitle subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."></Subtitle>
            <CustomButton title="Publicar Viaje" />
            <CustomButton title="Buscar Viaje" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    image: {
        width: "35%",
        height: "35%",
    },
});
