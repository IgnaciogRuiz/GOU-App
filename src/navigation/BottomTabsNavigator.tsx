import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomTabParamList } from "./types/NavigationTypes";

// Screens
import ProfileTabsNavigation from './ProfileTabsNavigation';
import { HomeScreen, BuscarScreen, PublicarScreen, MessageScreen, TripDetailScreen } from "../screens/home";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Viajes"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tab.Screen 
        name="Publicar" 
        component={PublicarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Buscar" 
        component={BuscarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Viajes" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="car-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Mensajes" 
        component={MessageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileTabsNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingBottom: 20,
    paddingTop: 8,
    height: 80,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabBarItem: {
    paddingVertical: 8,
  },
});