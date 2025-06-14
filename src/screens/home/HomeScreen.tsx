import React from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import { HomeHeader, MyPublishedTripsSection, MyReservationsSection, RecentActivitySection } from '../../components';
import { useHomeData } from '../../hooks';

const HomeScreen: React.FC = () => {
  const { dashboardData, loading, error } = useHomeData();


  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView style={homeStyles.scrollView} showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <View style={homeStyles.content}>
          <MyReservationsSection />
          <MyPublishedTripsSection publishedTrips={dashboardData?.published_trips ?? []} />
          <RecentActivitySection  />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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