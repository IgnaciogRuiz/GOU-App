import React from "react";
import { ScrollView, SafeAreaView, View, StyleSheet, Text } from "react-native";
import { HomeHeader, MyPublishedTripsSection, MyReservationsSection, RecentActivitySection } from "../../components";
import { useAuth } from "../../contexts";

const HomeScreen: React.FC = () => {
  const { dashboardData, homeError } = useAuth();

  if (homeError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error al cargar datos</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView style={homeStyles.scrollView} showsVerticalScrollIndicator={false}>
        <HomeHeader profile_photo={dashboardData?.profile_photo} />
        <View style={homeStyles.content}>
          <MyReservationsSection reservedTrips={dashboardData?.reservations ?? []} />
          <MyPublishedTripsSection publishedTrips={dashboardData?.published_trips ?? []} />
          <RecentActivitySection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});

export default HomeScreen;
