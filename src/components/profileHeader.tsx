import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  name: string;
  memberSince: string;
  distance: string;
  onEdit: () => void;

  avatar: any; // usually require("path") or a remote URI
};

const ProfileHeader = ({ name, memberSince, distance, onEdit, avatar }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={avatar} style={styles.avatar} />
        <TouchableOpacity onPress={onEdit} style={styles.editIcon}>
          <Feather name="edit-2" size={16} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtext}>Miembro desde {memberSince}</Text>
        <Text style={styles.subtext}>{distance} recorridos en la app</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    width: "95%",
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  subtext: {
    fontSize: 12,
    color: "#555",
  },
});

export default ProfileHeader;
