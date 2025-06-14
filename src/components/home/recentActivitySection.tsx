// components/RecentActivitySection.tsx
import React from 'react';
import { View } from 'react-native';
import { Activity } from './types';
import { homeStyles } from './homeStyles';
import SectionHeader from './sectionHeaderComponent';
import ActivityItem from './activityItemComponent';

const RecentActivitySection: React.FC = () => {
  const activities: Activity[] = [
    {
      id: 1,
      title: 'Trip completed',
      description: 'Barcelona → Madrid with Carlos M.',
      time: '2 days ago',
      icon: 'check',
      iconColor: '#10B981',
    },
    {
      id: 2,
      title: 'New passenger joined',
      description: 'Ana R. booked your Madrid → Seville trip',
      time: '1 week ago',
      icon: 'user-plus',
      iconColor: '#3B82F6',
    },
  ];

  return (
    <View style={homeStyles.section}>
      <SectionHeader title="Actividad Reciente" />
      <View style={homeStyles.activityList}>
        {activities.map((item) => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default RecentActivitySection;