// src/components/Title.tsx
import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

interface TitleProps extends TextProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 8,
    color: "#000",
    fontWeight: "bold",
  },
});

export default Title;
