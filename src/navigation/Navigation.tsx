import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, GestureResponderEvent } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/AuthContext";

// Screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/Register";
import OnboardingScreen from "../screens/auth/OnBoardingScreen";
import BiometricAuthScreen from "../screens/auth/BiometricAuthScreen";
import PasswordLoginScreen from "../screens/auth/PasswordLoginScreen";
import ViajesScreen from "../screens/home/ViajesScreen";
import BuscarScreen from "../screens/home/BuscarScreen";
import PublicarScreen from "../screens/home/PublicarScreen";
import MensajesScreen from "../screens/home/MensajesScreen";
import PerfilScreen from "../screens/home/PerfilScreen";

export type StackParamList = {
  Login: undefined;
  Info: undefined;
  Register: undefined;
  Onboarding: undefined;
  BiometricAuth: undefined;
  PasswordLogin: undefined;
  Home: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<StackParamList>();


const CustomTabBarButton = ({ children, onPress }: { children: any; onPress?: (event: GestureResponderEvent) => void }) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.innerButton}>{children}</View>
  </TouchableOpacity>
);

function BottomTabsNavigator() {
  return (
    <Tab.Navigator id={undefined}
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
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { isAuthenticated, hasSeenOnboarding, biometricEnabled } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
        <Image source={require("../../assets/images/cargando.gif")} style={styles.image} />
        <Text style={styles.loadingText}>GOU!</Text>
        <Text>Comparte el viaje, disfruta el camino.</Text>
        <Text>🌍🚗</Text>
      </Animated.View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} id={undefined}>
        {!hasSeenOnboarding && (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}

        {biometricEnabled && (
          <Stack.Screen name="BiometricAuth" component={BiometricAuthScreen} />
        )}

        {isAuthenticated ? (
          <Stack.Screen name="Home" component={BottomTabsNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="PasswordLogin" component={PasswordLoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
    bottom: 20, // Eleva el botón
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Asegura que esté por encima de otros elementos
  },
  innerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    elevation: 10, // Aumenta la elevación en Android
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Sombra en iOS
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBEDEE",
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
  },
});
