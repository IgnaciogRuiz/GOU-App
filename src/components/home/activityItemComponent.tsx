// components/ActivityItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Activity } from './types';

interface ActivityItemProps {
  item: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ item }) => {
  return (
    <View style={homeStyles.activityItem}>
      <View style={homeStyles.activityIcon}>
        <Icon name={item.icon} size={14} color={item.iconColor} />
      </View>
      <View style={homeStyles.activityContent}>
        <Text style={homeStyles.activityTitle}>{item.title}</Text>
        <Text style={homeStyles.activityDescription}>{item.description}</Text>
      </View>
      <Text style={homeStyles.activityTime}>{item.time}</Text>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    padding: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  activityDescription: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default ActivityItem;