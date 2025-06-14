import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { homeStyles } from '../../components/home/homeStyles';
import { HomeHeader, MyPublishedTripsSection, MyReservationsSection, RecentActivitySection } from '../../components';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView style={homeStyles.scrollView} showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <View style={homeStyles.content}>
          <MyReservationsSection />
          <MyPublishedTripsSection />
          <RecentActivitySection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;