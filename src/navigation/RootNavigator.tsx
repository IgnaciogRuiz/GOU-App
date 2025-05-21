// RootNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import { RootStackParamList } from "./types/NavigationTypes";
import BottomTabsNavigator from "./BottomTabsNavigator";
import SplashScreen from "../screens/SplashScreen";
import {
  OnboardingScreen,
  LoginScreen,
  RegisterScreen,
  VerifyEmail,
  PhoneInputScreen,
  VerifyPhone,
  ProfileStepsScreen,
} from "../screens/auth";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { loading, hasSeenOnboarding, isAuthenticated } = useAuth();

  if (loading) return <SplashScreen />;

  const navigatorKey = `${hasSeenOnboarding}-${isAuthenticated}`;

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }} key={navigatorKey}>
      {/* Onboarding flow */}
      {!hasSeenOnboarding && (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}

      {/* Auth flow */}
      {hasSeenOnboarding && !isAuthenticated && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
          <Stack.Screen name="PhoneInputScreen" component={PhoneInputScreen} />
          <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
          <Stack.Screen name="ProfileStepsScreen" component={ProfileStepsScreen} />
        </>
      )}

      {/* App main */}
      {hasSeenOnboarding && isAuthenticated && (
        <Stack.Screen name="Home" component={BottomTabsNavigator} />
      )}
    </Stack.Navigator>
  );
}
