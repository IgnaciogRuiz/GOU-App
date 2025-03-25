import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type BackButtonProps = {
    step?: number;
    setStep?: (step: number) => void;
};

export default function BackButton({ step, setStep }: BackButtonProps) {
    const navigation = useNavigation();

    const handlePress = () => {
        if (step && setStep && step > 1) {
            setStep(step - 1); // Retrocede un paso si no está en el primer paso
        } else {
            navigation.goBack(); // Si está en el primer paso o no hay steps, vuelve atrás
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.backButton}>
            <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: 40,
        left: 10,
        padding: 10,
        zIndex: 100,
    },
});
