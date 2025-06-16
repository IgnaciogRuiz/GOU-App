// components/MyReservationsSection.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionHeader from './sectionHeaderComponent';
import ReservationCard from './reservationCardComponent';
import { formatReservations } from '../../utils/formatReservations';

interface Props {
  reservedTrips: any[];
}

const MyReservationsSection: React.FC<Props> = ({ reservedTrips }) => {
  const reservations = formatReservations(reservedTrips);

  //console.log('Formatted Reservations:', reservations);

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