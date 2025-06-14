// components/PublishedTripCard.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { PublishedTrip } from './types';
import { homeStyles } from './homeStyles';

interface PublishedTripCardProps {
  item: PublishedTrip;
}

const PublishedTripCard: React.FC<PublishedTripCardProps> = ({ item }) => {
  const handleManage = () => {
    console.log('Manage pressed for:', item.route);
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

export default PublishedTripCard;