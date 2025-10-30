import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image,
  TouchableOpacity, SafeAreaView, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import tripsData from '../../data/trips.json'; // 👈 Asegúrate de ajustar la ruta

const TripDetailsHeader = ({ onBackPress }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Detalles del viaje</Text>
  </View>
);

const TripDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { tripId } = route.params as { tripId: number };

  const [trip, setTrip] = useState<any | null>(null);

  useEffect(() => {
    const foundTrip = tripsData.find((t) => t.id === tripId);
    setTrip(foundTrip || null);
  }, [tripId]);

  if (!trip) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  const driver = trip.vehicle.user;
  const vehicle = trip.vehicle;

  return (
    <SafeAreaView style={styles.container}>
      <TripDetailsHeader onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <View style={styles.driverSection}>
          <View style={styles.driverHeader}>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
              }}
              style={styles.driverAvatar}
            />
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>
                {driver.firstname} {driver.lastname}
              </Text>
              <Text style={styles.ratingText}>⭐ {driver.ratingRatio} · Conductor verificado</Text>
              <Text style={styles.infoText}>
                {vehicle.brand} {vehicle.model}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ruta</Text>
          <Text style={styles.infoText}>
            {trip.origin} → {trip.destination}
          </Text>
          <Text style={styles.infoText}>
            Fecha: {new Date(trip.date).toLocaleString('es-ES')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Precio</Text>
          <Text style={styles.price}>${trip.price}</Text>
          <Text style={styles.infoText}>Asientos disponibles: {trip.available_seats}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 16 },
  header: {
    backgroundColor: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  backButton: { marginRight: 12 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  driverSection: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  driverHeader: { flexDirection: 'row', alignItems: 'center' },
  driverAvatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  driverDetails: { flex: 1 },
  driverName: { color: '#fff', fontSize: 18, fontWeight: '600' },
  ratingText: { color: '#9ca3af', marginTop: 4 },
  infoText: { color: '#d1d5db', fontSize: 14, marginTop: 4 },
  section: { marginBottom: 16 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  price: { color: '#10b981', fontSize: 18, fontWeight: '700' },
});

export default TripDetailsScreen;
