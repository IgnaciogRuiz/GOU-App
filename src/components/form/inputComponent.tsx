import React from "react";
import { StyleSheet, TextInput, TextInputProps, KeyboardTypeOptions } from "react-native";

type CustomInputProps = {
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
};

const CustomInput = ({
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  value,
  onChangeText,
}: CustomInputProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "85%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default CustomInput;
