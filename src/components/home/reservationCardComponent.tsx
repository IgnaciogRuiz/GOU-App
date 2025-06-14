// components/ReservationCard.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Reservation } from './types';

interface ReservationCardProps {
  item: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ item }) => {
  const handleViewDetails = () => {
    console.log('View Details pressed for:', item.route);
  };

  return (
    <View style={homeStyles.card}>
      <View style={homeStyles.cardHeader}>
        <View style={homeStyles.routeInfo}>
          <View style={[homeStyles.statusDot, { backgroundColor: item.statusColor }]} />
          <View>
            <Text style={homeStyles.routeText}>{item.route}</Text>
            <Text style={homeStyles.driverText}>con {item.driver}</Text>
          </View>
        </View>
        <View style={homeStyles.dateInfo}>
          <Text style={homeStyles.dateText}>{item.date}</Text>
          <Text style={homeStyles.timeText}>{item.time}</Text>
        </View>
      </View>
      <View style={homeStyles.cardFooter}>
        <View style={homeStyles.seatsInfo}>
          <Icon name="users" size={12} color="#6B7280" />
          <Text style={homeStyles.seatsText}>{item.seats}</Text>
        </View>
        <Pressable 
          style={({ pressed }) => [
            homeStyles.secondaryButton,
            pressed && homeStyles.pressedSecondaryButton
          ]}
          onPress={handleViewDetails}
        >
          <Text style={homeStyles.secondaryButtonText}>Ver Detalles</Text>
        </Pressable>
      </View>
    </View>
  );
};


const homeStyles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  routeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  driverText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  dateInfo: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  timeText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seatsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seatsText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  secondaryButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  pressedSecondaryButton: {
    backgroundColor: '#4B5563',
  },
});

export default ReservationCard;