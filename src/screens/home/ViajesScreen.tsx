import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, Image, View, FlatList, ActivityIndicator } from "react-native";
import { useBottomTabNavigation } from "../../navigation/Navigation";
import { Title, Subtitle, CustomButton, TripCard } from '../../components';
import { useUserTrips, useUserReservations } from '../../hooks/';

export default function ViajesScreen() {
  const navigation = useBottomTabNavigation();
  const { loading: loadingTrips, trips, error: errorTrips } = useUserTrips();
  const { loading: loadingRes, reservations, error: errorRes } = useUserReservations();

  if (loadingTrips || loadingRes) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (errorTrips || errorRes) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error al cargar los viajes: {(errorTrips?.message || errorRes?.message || 'Intenta de nuevo')}</Text>
      </SafeAreaView>
    );
  }

  const hasTrips = trips.length > 0;
  const hasReservations = reservations.length > 0;

  if (hasTrips || hasReservations) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor="light" />
        <Title title="Mis Viajes" />
        
        {hasTrips && (
          <>
            <Subtitle subtitle="Tus viajes Publicados" />
            <FlatList
              data={trips}
              keyExtractor={(_, index) => `trip-${index}`}
              renderItem={({ item }) => (
                <TripCard
                  origin={item.origin}
                  destination={item.destination}
                  date={item.date}
                  price={item.price}
                  availableSeats={item.available_seats}
                />
              )}
              contentContainerStyle={{ paddingVertical: 10 }}
              style={{ width: '100%' }}
            />
          </>
        )}

        {hasReservations && (
          <>
            <Subtitle subtitle="Tus viajes Reservados" />
            <FlatList
              data={reservations}
              keyExtractor={(_, index) => `res-${index}`}
              renderItem={({ item }) => (
                <TripCard
                  origin={item.origin}
                  destination={item.destination}
                  date={item.date}
                  price={item.price}
                  driverName={`${item.vehicle.user.firstname} ${item.vehicle.user.lastname}`}
                  licensePlate={item.vehicle.license_plate}
                />
              )}
              contentContainerStyle={{ paddingVertical: 10 }}
              style={{ width: '100%' }}
            />
          </>
        )}
      </SafeAreaView>
    );
  }

  // Si no hay viajes ni reservas
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="light" />
      <Title title="Mis Viajes" />
      <Image
        source={require("../../../assets/images/phoneViajes.jpg")}
        style={styles.image}
      />
      <Title title="Parece que no tenes viajes creados o reservados!" />
      <Subtitle subtitle="Podés comenzar publicando o buscando un viaje." />
      <CustomButton
        title="Publicar Viaje"
        onPress={() => navigation.navigate("Publicar")}
      />
      <CustomButton
        title="Buscar Viaje"
        onPress={() => navigation.navigate("Buscar")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: "35%",
    height: "35%",
  },
});
