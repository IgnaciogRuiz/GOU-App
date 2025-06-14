// components/MyReservationsSection.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Reservation } from './types';
import SectionHeader from './sectionHeaderComponent';
import ReservationCard from './reservationCardComponent';

const MyReservationsSection: React.FC = () => {
  const reservations: Reservation[] = [
    {
      id: "1",
      route: 'Cordoba → CABA',
      driver: 'Carlos M.',
      date: 'Mañana',
      time: '08:30 AM',
      seats: '1 asientos reservados',
      statusColor: '#10B981',
    },
    {
      id: "2",
      route: 'CABA → Mendoza',
      driver: 'Maria L.',
      date: '1 de Octubre',
      time: '14:00 PM',
      seats: '2 asientos reservados',
      statusColor: '#3B82F6',
    },
  ];

  const handleViewAll = () => {
    console.log('View All Reservations pressed');
  };

  return (
    <View style={homeStyles.section}>
      <SectionHeader title="Mis Reservas" onViewAll={handleViewAll} />
      {reservations.map((item) => (
        <ReservationCard key={item.id} item={item} />
      ))}
    </View>
  );
};

const homeStyles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
});

export default MyReservationsSection;