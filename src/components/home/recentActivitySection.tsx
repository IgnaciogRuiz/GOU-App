// components/RecentActivitySection.tsx
import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Activity } from './types';
import SectionHeader from './sectionHeaderComponent';
import ActivityItem from './activityItemComponent';

const RecentActivitySection: React.FC = () => {
    const activities: Activity[] = [
    {
        id: 1,
        title: 'Viaje completado',
        description: 'Córdoba → Rosario con Lucas G.',
        time: 'hace 2 días',
        icon: 'check',
        iconColor: '#10B981',
    },
    {
        id: 2,
        title: 'Nuevo pasajero agregado',
        description: 'Sofía T. reservó tu viaje Buenos Aires → Mar del Plata',
        time: 'hace 1 semana',
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

const homeStyles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  activityList: {
    gap: 12,
  },
});

export default RecentActivitySection;