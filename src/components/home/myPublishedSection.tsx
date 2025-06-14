// components/MyPublishedTripsSection.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SectionHeader from './sectionHeaderComponent';
import PublishedTripCard from './publishedTripCard';
import { transformTripData } from '../../utils/tripDataTransformer';

interface Props {
  publishedTrips: any[];
}

const MyPublishedTripsSection: React.FC<Props> = ({ publishedTrips }) => {
  const handleViewAll = () => {
    console.log('View All Published Trips pressed');
  };

  if (!publishedTrips || publishedTrips.length === 0) {
    return (
      <View style={homeStyles.section}>
        <SectionHeader title="Mis Viajes Publicados" onViewAll={handleViewAll} />
        <Text style={{ color: 'gray' }}>No tenés viajes publicados.</Text>
      </View>
    );
  }

  const transformedTrips = transformTripData(publishedTrips);

  return (
    <View style={homeStyles.section}>
      <SectionHeader title="Mis Viajes Publicados" onViewAll={handleViewAll} />
      {transformedTrips.map((trip, index) => (
        <PublishedTripCard
          key={index}
          item={{
            id: trip.id,
            route: trip.origin + ' → ' + trip.destination,
            date: trip.date,
            price: `$${trip.price}`,
            seats: `${trip.available_seats}/4`,
            status: trip.status,
            statusColor: trip.statusColor,
            statusIcon: trip.statusIcon,
          }}
        />
      ))}
    </View>
  );
};

const homeStyles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
});

export default MyPublishedTripsSection;
