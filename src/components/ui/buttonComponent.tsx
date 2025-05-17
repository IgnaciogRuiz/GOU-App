import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  backgroundColor = "#333",
  textColor = "#fff",
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#555" : backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
