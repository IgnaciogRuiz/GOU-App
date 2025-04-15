import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, } from "react-native";
import Title from "../../components/title";
import CommentItem from "../../components/commentItem";
import { useNavigation } from "@react-navigation/native";

export default function MensajesScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="light" />
            <Title title="Mensajes"></Title>
            <CommentItem
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <CommentItem
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <CommentItem
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <CommentItem
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <CommentItem
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <CommentItem
            avatar={require("../../../assets/images/negra.png")}
            name="Ava Martinez"
            message="I'm actually taking the CalTrain"
            date="09/02/25" />
            <CommentItem
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
