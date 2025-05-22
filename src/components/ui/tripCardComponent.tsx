import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TripCardProps = {
  origin: string;
  destination: string;
  date: string;
  price: number;
  availableSeats?: number;
  driverName?: string;
  licensePlate?: string;
};

export function TripCard({ origin, destination, date, price, availableSeats }: TripCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{origin} → {destination}</Text>
      <Text>Fecha: {new Date(date).toLocaleDateString()}</Text>
      <Text>Precio: ${price}</Text>
      <Text>Asientos disponibles: {availableSeats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
