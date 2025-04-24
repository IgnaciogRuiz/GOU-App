import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileTabsNavigation from './ProfileTabsNavigation';

// Screens
import ViajesScreen from "../screens/home/ViajesScreen";
import BuscarScreen from "../screens/home/BuscarScreen";
import PublicarScreen from "../screens/home/PublicarScreen";
import MensajesScreen from "../screens/home/MensajesScreen";


const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Viajes: "car-outline",
            Buscar: "search-outline",
            Mensajes: "chatbubble-outline",
            Perfil: "person-outline",
          };
          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Viajes" component={ViajesScreen} />
      <Tab.Screen name="Buscar" component={BuscarScreen} />
      <Tab.Screen
        name="Publicar"
        component={PublicarScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity style={styles.customButton} {...props}>
              <View style={styles.innerButton}>
                <Icon name="add" size={30} color="#000" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Mensajes" component={MensajesScreen} />
      <Tab.Screen name="Perfil" component={ProfileTabsNavigation} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    height: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#fff",
    elevation: 5,
  },
  customButton: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  innerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
});
