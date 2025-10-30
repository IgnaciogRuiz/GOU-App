import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import trips from "../../data/trips.json";

const TripDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { tripId } = route.params as { tripId: number };

  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noTripText}>🚫 No se encontró el viaje.</Text>
      </SafeAreaView>
    );
  }

  const driver = trip.vehicle.user;
  const vehicle = trip.vehicle;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles del viaje</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* DRIVER CARD */}
        <View style={styles.driverCard}>
          <Image
              source={{
                uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
              }}
              style={styles.driverImage}
            />
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>
              {driver.firstname} {driver.lastname}
            </Text>
            <Text style={styles.driverSubtext}>
              ⭐ {driver.ratingRatio?.toFixed(1) ?? "N/A"} · Conductor verificado
            </Text>
            <Text style={styles.driverCar}>
              {vehicle.brand} {vehicle.model}
            </Text>
          </View>
        </View>

        {/* ROUTE INFO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ruta</Text>
          <View style={styles.routeBox}>
            <View style={styles.routeRow}>
              <View style={[styles.dot, { backgroundColor: "#10B981" }]} />
              <Text style={styles.routeText}>{trip.origin}</Text>
            </View>
            <View style={styles.connector} />
            <View style={styles.routeRow}>
              <View style={[styles.dot, { backgroundColor: "#EF4444" }]} />
              <Text style={styles.routeText}>{trip.destination}</Text>
            </View>
            <Text style={styles.dateText}>📅 {formatDate(trip.date)}</Text>
          </View>
        </View>

        {/* PRICE & SEATS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles</Text>
          <View style={styles.detailBox}>
            <View style={styles.detailRow}>
              <Ionicons name="card-outline" size={18} color="#10B981" />
              <Text style={styles.detailLabel}>Precio:</Text>
              <Text style={styles.priceText}>${trip.price}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="people-outline" size={18} color="#60A5FA" />
              <Text style={styles.detailLabel}>Asientos disponibles:</Text>
              <Text style={styles.detailValue}>{trip.available_seats}</Text>
            </View>
          </View>
        </View>

        {/* ACTION BUTTON */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Reservar Asiento</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    backgroundColor: "#111827",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  driverCard: {
    flexDirection: "row",
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  driverImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 14,
  },
  driverName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  driverSubtext: {
    color: "#9CA3AF",
    marginTop: 2,
    fontSize: 14,
  },
  driverCar: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  routeBox: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  connector: {
    height: 20,
    borderLeftWidth: 1,
    borderLeftColor: "#374151",
    marginLeft: 4.5,
    marginVertical: 4,
  },
  dateText: {
    marginTop: 10,
    color: "#9CA3AF",
    fontSize: 14,
  },
  detailBox: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
    marginRight: 4,
  },
  detailValue: {
    color: "#E5E7EB",
    fontSize: 16,
  },
  priceText: {
    color: "#10B981",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    marginTop: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  noTripText: {
    color: "#9CA3AF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 100,
  },
});
