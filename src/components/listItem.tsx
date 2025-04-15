import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  label: string;
  onPress: () => void;
};

const ListItem = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <Feather name="chevron-right" size={20} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // <-- this centers items vertically
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 6,
    width: "85%",
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});

export default ListItem;
