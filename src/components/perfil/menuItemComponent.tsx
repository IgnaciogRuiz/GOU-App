 import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  iconColor?: string;
  titleColor?: string;
  iconBgColor?: string;
}

// Menu Item Component
const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  iconColor = '#2563eb',
  titleColor = '#FFFFFF',
  iconBgColor = 'rgba(37, 99, 235, 0.2)',
}) => {
  return (
    <View style={styles.menuItem}>
      <TouchableOpacity style={styles.menuButton} onPress={onPress}>
        <View style={styles.menuContent}>
          <View style={[styles.menuIconContainer, { backgroundColor: iconBgColor }]}>
            <Icon name={icon} size={16} color={iconColor} />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: titleColor }]}>{title}</Text>
            <Text style={styles.menuSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <Icon name="chevron-right" size={14} color="#787D86" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: '#111827',
    borderRadius: 12,
    marginBottom: 8,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#787D86',
  },
});

export default MenuItem;
