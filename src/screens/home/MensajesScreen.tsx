import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, } from "react-native";
import { Title, Chat } from '../../components';
import { useBottomTabNavigation } from "../../navigation/Navigation";

export default function MensajesScreen() {
    const navigation = useBottomTabNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="light" />
            <Title title="Mensajes"></Title>
            <Chat
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <Chat
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <Chat
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <Chat
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <Chat
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <Chat
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <Chat
            avatar={require("../../../assets/images/payne.png")}
            name="Liam Payne"
            message="they ran out of tusi"
            date="16/10/24" 
            /> 
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
