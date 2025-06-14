// components/ReservationCard.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Reservation } from './types';
import { homeStyles } from './homeStyles';

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

export default ReservationCard;