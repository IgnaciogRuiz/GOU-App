import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tripsData from "../../data/trips.json";

const TripsResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { origen, destino, fecha, pasajeros, precioMin, precioMax } = route.params as {
    origen: string;
    destino: string;
    fecha: Date;
    pasajeros: number;
    precioMin?: string;
    precioMax?: string;
  };

  const [loading, setLoading] = useState(true);
  const [exactTrips, setExactTrips] = useState<any[]>([]);
  const [nearTrips, setNearTrips] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const selectedDate = new Date(fecha);
        const startRange = new Date(selectedDate);
        const endRange = new Date(selectedDate);
        startRange.setDate(startRange.getDate() - 3);
        endRange.setDate(endRange.getDate() + 3);

        const minPrice = precioMin ? parseFloat(precioMin) : 0;
        const maxPrice = precioMax ? parseFloat(precioMax) : Infinity;

        // Filtro general (origen/destino/fecha rango/precio/pasajeros)
        const filtered = tripsData.filter((t) => {
          const tripDate = new Date(t.date);
          return (
            t.origin.toLowerCase() === origen.toLowerCase() &&
            t.destination.toLowerCase() === destino.toLowerCase() &&
            tripDate >= startRange &&
            tripDate <= endRange &&
            t.available_seats >= pasajeros &&
            t.price >= minPrice &&
            t.price <= maxPrice
          );
        });

        // Separar viajes exactos de los cercanos
        const exact = filtered.filter(
          (t) => new Date(t.date).toDateString() === selectedDate.toDateString()
        );
        const near = filtered.filter(
          (t) => new Date(t.date).toDateString() !== selectedDate.toDateString()
        );

        setExactTrips(exact);
        setNearTrips(near);
      } catch (error) {
        console.error("Error cargando viajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
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
        <Text style={styles.infoText}>
          Asientos disponibles: {item.available_seats}
        </Text>
        <Text style={styles.infoText}>
          Vehículo: {item.vehicle.brand} {item.vehicle.model}
        </Text>
      </View>

      <View style={styles.driverRow}>
        <Text style={styles.driverName}>
          👤 {item.vehicle.user.firstname} {item.vehicle.user.lastname}
        </Text>
        {item.vehicle.user.ratingRatio && (
          <Text style={styles.rating}>
            ⭐ {item.vehicle.user.ratingRatio.toFixed(1)}
          </Text>
        )}
      </View>
    </View>
  );

  const renderSection = (title: string, data: any[]) => (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrip}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Resultados de tu búsqueda</Text>

      {loading ? (
        <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 40 }} />
      ) : exactTrips.length === 0 && nearTrips.length === 0 ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            😔 No se encontraron viajes disponibles.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Volver a buscar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {exactTrips.length > 0 ? (
            <>
              {renderSection("Viajes en la fecha seleccionada", exactTrips)}
              {nearTrips.length > 0 && renderSection("Viajes en fechas cercanas", nearTrips)}
            </>
          ) : (
            <>
              <View style={styles.notice}>
                <Text style={styles.noticeText}>
                  No existen viajes en la fecha exacta, pero sí en estas fechas cercanas:
                </Text>
              </View>
              {renderSection("Viajes en fechas cercanas", nearTrips)}
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TripsResultsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  title: { fontSize: 20, fontWeight: "600", color: "#fff", marginBottom: 16 },
  sectionTitle: {
    color: "#93c5fd",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  routeText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  priceText: { color: "#10b981", fontSize: 16, fontWeight: "700" },
  dateText: { color: "#9ca3af", marginBottom: 8 },
  infoRow: { marginBottom: 8 },
  infoText: { color: "#d1d5db", fontSize: 14 },
  driverRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  driverName: { color: "#93c5fd", fontSize: 14, fontWeight: "500" },
  rating: { color: "#facc15", fontWeight: "600" },
  notice: {
    backgroundColor: "#1e3a8a",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  noticeText: { color: "#bfdbfe", fontSize: 14, textAlign: "center" },
  noResults: { marginTop: 100, alignItems: "center" },
  noResultsText: { color: "#9ca3af", fontSize: 16, marginBottom: 20 },
  backButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: { color: "#fff", fontWeight: "600" },
});
