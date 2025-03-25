import React, { useEffect, useState } from "react";
import { View, GestureResponderEvent, TouchableOpacity, Text, StyleSheet, Animated, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

// Screens
//AUTH
import LoginScreen from "../screens/auth/LoginScreen";
import InfoScreen from "../screens/auth/InfoScreen";
import RegisterScreen from "../screens/auth/Register";

//HOME
import ViajesScreen from "../screens/home/ViajesScreen";
import BuscarScreen from "../screens/home/BuscarScreen";
import PublicarScreen from "../screens/home/PublicarScreen";
import MensajesScreen from "../screens/home/MensajesScreen";
import PerfilScreen from "../screens/home/PerfilScreen";

//PROFILE

export type StackParamList = {
  Login: undefined;
  Info: undefined;
  Register: undefined;
  Home: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<StackParamList>();

const CustomTabBarButton = ({ children, onPress }: { children: any; onPress?: (event: GestureResponderEvent) => void }) => (
  <TouchableOpacity
    style={styles.customButton}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.innerButton}>{children}</View>
  </TouchableOpacity>
);

//Tabs de home
function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Viajes") {
            iconName = "car-outline";
          } else if (route.name === "Buscar") {
            iconName = "search-outline";
          } else if (route.name === "Mensajes") {
            iconName = "chatbubble-outline";
          } else if (route.name === "Perfil") {
            iconName = "person-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
      })}
      id={undefined}
    >
      <Tab.Screen name="Viajes" component={ViajesScreen} />
      <Tab.Screen name="Buscar" component={BuscarScreen} />

      {/* Botón central personalizado */}
      <Tab.Screen
        name="Publicar"
        component={PublicarScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Icon name="add" size={30} color="#000" />
            </CustomTabBarButton>
          ),
        }}
      />

      <Tab.Screen name="Mensajes" component={MensajesScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  //const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Animación de opacidad

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        setIsAuthenticated(!!userToken);
      } catch (error) {
        console.error("Error al recuperar el estado de autenticación", error);
        setIsAuthenticated(false);
      }
    };

    //checkLoginStatus();
    AsyncStorage.setItem("isAuthenticated", "true"); //simular que esta autenticado
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // Animación de 2 segundos
      useNativeDriver: true,
    }).start(() => {
      setIsLoading(false); // Oculta la pantalla de carga después de la animación
    });
  }, []);

  if (isLoading) {
    return (
      <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
        <Image
          source={require("../../assets/images/cargando.gif")} // Imagen local
          style={styles.image}
        />
        <Text style={styles.loadingText} >GOU!</Text>
        <Text>Comparte el viaje, disfruta el camino.</Text>
        <Text>🌍🚗</Text>
      </Animated.View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} id={undefined} >
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={BottomTabsNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//estilos de la navegacion
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
    top: -20, // Eleva el botón
    justifyContent: "center",
    alignItems: "center",
  },
  innerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
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
