import React from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { HomeHeader, MyPublishedTripsSection, MyReservationsSection, RecentActivitySection } from '../../components';
import { useHomeData } from '../../hooks';
import Constants from 'expo-constants';

const HomeScreen: React.FC = () => {
  const { dashboardData, loading, error } = useHomeData();
  //console.log('Dashboard Data:', dashboardData?.reservations);
  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
  }



  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView style={homeStyles.scrollView} showsVerticalScrollIndicator={false}>
        <HomeHeader profile_photo={dashboardData?.profile_photo}/>
        <View style={homeStyles.content}>
          <MyReservationsSection reservedTrips={dashboardData?.reservations ?? []}/>
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