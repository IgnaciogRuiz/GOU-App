import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, Image, View, FlatList, ActivityIndicator } from "react-native";
import { useBottomTabNavigation } from "../../navigation/Navigation";
import { Title, Subtitle, CustomButton, TripCard } from '../../components';
import { useUserTrips } from '../../hooks/';

export default function ViajesScreen() {
  const navigation = useBottomTabNavigation();
  const { loading, trips, error } = useUserTrips();

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error al cargar los viajes: {error.message || 'Intenta de nuevo'}</Text>
      </SafeAreaView>
    );
  }

  // Si hay viajes mostramos la lista
  if (trips.length > 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor="light" />
        <Title title="Mis Viajes" />
        <FlatList
          data={trips}
          keyExtractor={(_, index) => index.toString()}
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
      </SafeAreaView>
    );
  }

  // Si no hay viajes mostramos la UI por defecto
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="light" />
      <Title title="Mis Viajes" />
      <Image
        source={require("../../../assets/images/phoneViajes.jpg")}
        style={styles.image}
      />
      <Title title="Parece que no tenes viajes creados o reservados!" />
      <Subtitle subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." />
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
