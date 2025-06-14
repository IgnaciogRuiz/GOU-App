// components/MyPublishedTripsSection.tsx
import React from 'react';
import { View } from 'react-native';
import { PublishedTrip } from './types';
import { homeStyles } from './homeStyles';
import SectionHeader from './sectionHeaderComponent';
import PublishedTripCard from './PublishedTripCard';

const MyPublishedTripsSection: React.FC = () => {
  const publishedTrips: PublishedTrip[] = [
    {
      id: 1,
      route: 'La Cumbre → Cordoba',
      date: 'Diciembre 28, 09:00 AM',
      price: '$7.000',
      seats: '2/3 reservados',
      status: 'Activo',
      statusColor: '#10B981',
      statusIcon: 'circle-check',
    },
    {
      id: 2,
      route: 'Cruz Del Eje → Carlos Paz',
      date: 'Enero 5, 16:30 PM',
      price: '$12.000',
      seats: '0/4 reservados',
      status: 'pendiente',
      statusColor: '#F59E0B',
      statusIcon: 'clock',
    },
  ];

  const handleViewAll = () => {
    console.log('View All Published Trips pressed');
  };

  return (
    <View style={homeStyles.section}>
      <SectionHeader title="Mis Viajes Publicados" onViewAll={handleViewAll} />
      {publishedTrips.map((item) => (
        <PublishedTripCard key={item.id} item={item} />
      ))}
    </View>
  );
};

export default MyPublishedTripsSection;