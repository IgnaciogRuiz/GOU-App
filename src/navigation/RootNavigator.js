import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";


import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/auth/OnBoardingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/Register";
import BiometricAuthScreen from "../screens/auth/BiometricAuthScreen";
import EnableBiometricScreen from "../screens/auth/EnableBiometricScreen";
import BottomTabsNavigator from "./BottomTabsNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const {
    loading,
    hasSeenOnboarding,
    isAuthenticated,
    biometricEnabled,
  } = useAuth();

  if (loading) {
    return <SplashScreen />; // mientras se leen los datos
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenOnboarding && (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}

      {hasSeenOnboarding && !isAuthenticated && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}

      {hasSeenOnboarding && isAuthenticated && biometricEnabled && (
        <Stack.Screen name="BiometricAuth" component={BiometricAuthScreen} />
      )}

      {hasSeenOnboarding && isAuthenticated && !biometricEnabled && (
        <Stack.Screen name="EnableBiometric" component={EnableBiometricScreen} />
      )}

      {hasSeenOnboarding && isAuthenticated && (
        <Stack.Screen name="Home" component={BottomTabsNavigator} />
      )}
    </Stack.Navigator>
  );
}
