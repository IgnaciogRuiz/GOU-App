import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

type Props = {
  avatar: any;
  name: string;
  message: string;
  date: string;
  onPress?: () => void;
};

const Chat = ({ avatar, name, message, date, onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.dateWrapper}>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
  },
  dateWrapper: {
    justifyContent: "center",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  message: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});

export default Chat;
