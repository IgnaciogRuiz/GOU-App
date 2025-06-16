import React from "react";
import { View, Text, StyleSheet, Pressable, Platform, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  onSearchPress?: () => void;
}

export default function Header({ title, showSearch = false, onSearchPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {showSearch && (
        <Pressable style={styles.searchButton} onPress={onSearchPress}>
          <Icon name="magnifying-glass" size={18} color="#ffffff" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    height: 40,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  searchButton: {
    padding: 0,
  }
});
