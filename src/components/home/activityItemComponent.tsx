// components/ActivityItem.tsx
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Activity } from './types';
import { homeStyles } from './homeStyles';

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

export default ActivityItem;