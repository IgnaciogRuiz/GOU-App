import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomTabParamList } from "./types/NavigationTypes";

// Screens
import ProfileTabsNavigation from './ProfileTabsNavigation';
import { ViajesScreen, BuscarScreen, PublicarScreen, MensajesScreen } from "../screens/home";

 

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Publicar: "add",
            Buscar: "search-outline",
            Mensajes: "chatbubble-outline",
            Perfil: "person-outline",
          };
          const iconName = icons[route.name];
          return iconName ? (
            <Icon name={iconName} size={size} color={color} />
          ) : null;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Publicar" component={PublicarScreen} />
      <Tab.Screen name="Buscar" component={BuscarScreen} />
      <Tab.Screen
        name="Viajes"
        component={ViajesScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity style={styles.customButton} {...props}>
              <View style={styles.innerButton}>
                <Icon name="car-outline" size={30} color="#000" />
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
    top: -30,
    justifyContent: "center",
    alignItems: "center",
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
