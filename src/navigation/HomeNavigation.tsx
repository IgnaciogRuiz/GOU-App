import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from "./types/NavigationTypes";

// Importá tus pantallas
import SearchScreen from '../screens/home/BuscarScreen';
import TripsResultsScreen from '../screens/home/TripsResultsScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
  {...({
    initialRouteName: 'Buscar',
    screenOptions: {
      headerShown: false,
      animation: 'slide_from_right',
      gestureEnabled: true,
      contentStyle: { backgroundColor: '#000' },
    },
  } as any)}
>

      <Stack.Screen name="Buscar" component={SearchScreen} />
      <Stack.Screen name="TripsResults" component={TripsResultsScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
