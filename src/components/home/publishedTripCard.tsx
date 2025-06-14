// components/PublishedTripCard.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { PublishedTrip } from './types';

interface PublishedTripCardProps {
  item: PublishedTrip;
}

const PublishedTripCard: React.FC<PublishedTripCardProps> = ({ item }) => {
  const handleManage = () => {
    console.log('Manage pressed for:', item.id);
  };

  return (
    <View style={homeStyles.card}>
      <View style={homeStyles.cardHeader}>
        <View>
          <Text style={homeStyles.routeText}>{item.route}</Text>
          <Text style={homeStyles.driverText}>{item.date}</Text>
        </View>
        <View style={homeStyles.priceInfo}>
          <Text style={homeStyles.priceText}>{item.price}</Text>
          <Text style={homeStyles.perSeatText}>por asiento</Text>
        </View>
      </View>
      <View style={homeStyles.cardFooter}>
        <View style={homeStyles.tripStatus}>
          <View style={homeStyles.seatsInfo}>
            <Icon name="users" size={12} color="#6B7280" />
            <Text style={homeStyles.seatsText}>{item.seats}</Text>
          </View>
          <View style={homeStyles.statusInfo}>
            <Icon name={item.statusIcon} size={12} color={item.statusColor} />
            <Text style={[homeStyles.statusText, { color: item.statusColor }]}>
              {item.status}
            </Text>
          </View>
        </View>
        <Pressable 
          style={({ pressed }) => [
            homeStyles.primaryButton,
            pressed && homeStyles.pressedPrimaryButton
          ]}
          onPress={handleManage}
        >
          <Text style={homeStyles.primaryButtonText}>Modificar</Text>
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
  routeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  driverText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  perSeatText: {
    fontSize: 12,
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
  tripStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  pressedPrimaryButton: {
    backgroundColor: '#F3F4F6',
  },
});

export default PublishedTripCard;