import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTrips } from '../../api/graphql/queries/getTrips';
import { useAuth } from '../../contexts/AuthContext';

const TripsResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { token } = useAuth();

  const { origen, destino, fecha, pasajeros, precioMin, precioMax } = route.params as {
    origen: string;
    destino: string;
    fecha: Date;
    pasajeros: number;
    precioMin?: string;
    precioMax?: string;
  };

  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<any[]>([]);
  const [isApproximate, setIsApproximate] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await getTrips(token, {
          origen,
          destino,
          fecha,
          pasajeros,
          precioMin,
          precioMax,
        });

        const tripsData = data?.getTrips || [];

        // Detectar si las fechas son distintas a la buscada
        const hasExactMatch = tripsData.some(
          (t: any) => new Date(t.date).toDateString() === new Date(fecha).toDateString()
        );

        setIsApproximate(!hasExactMatch && tripsData.length > 0);
        setTrips(tripsData);
      } catch (error) {
        console.error('Error al buscar viajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderTrip = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.routeText}>
          {item.origin} → {item.destination}
        </Text>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
      <Text style={styles.dateText}>{formatDate(item.date)}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Asientos disponibles: {item.available_seats}</Text>
        <Text style={styles.infoText}>
          Vehículo: {item.vehicle.brand} {item.vehicle.model}
        </Text>
      </View>

      <View style={styles.driverRow}>
        <Text style={styles.driverName}>
          👤 {item.vehicle.user.firstname} {item.vehicle.user.lastname}
        </Text>
        {item.vehicle.user.ratingRatio && (
          <Text style={styles.rating}>⭐ {item.vehicle.user.ratingRatio.toFixed(1)}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Resultados de tu búsqueda</Text>

      {loading ? (
        <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 40 }} />
      ) : trips.length > 0 ? (
        <>
          {isApproximate && (
            <View style={styles.notice}>
              <Text style={styles.noticeText}>
                No hay viajes exactamente el {formatDate(fecha.toString())}, pero encontramos otros cercanos.
              </Text>
            </View>
          )}

          <FlatList
            data={trips}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTrip}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </>
      ) : (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>😔 No se encontraron viajes disponibles.</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Volver a buscar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TripsResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  routeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  priceText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '700',
  },
  dateText: {
    color: '#9ca3af',
    marginBottom: 8,
  },
  infoRow: {
    marginBottom: 8,
  },
  infoText: {
    color: '#d1d5db',
    fontSize: 14,
  },
  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverName: {
    color: '#93c5fd',
    fontSize: 14,
    fontWeight: '500',
  },
  rating: {
    color: '#facc15',
    fontWeight: '600',
  },
  notice: {
    backgroundColor: '#1e3a8a',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  noticeText: {
    color: '#bfdbfe',
    fontSize: 14,
    textAlign: 'center',
  },
  noResults: {
    marginTop: 100,
    alignItems: 'center',
  },
  noResultsText: {
    color: '#9ca3af',
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
