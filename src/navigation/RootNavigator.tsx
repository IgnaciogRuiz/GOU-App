// RootNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import { RootStackParamList } from "./types/NavigationTypes";
import BottomTabsNavigator from "./BottomTabsNavigator";
import SplashScreen from "../screens/SplashScreen" 
import { OnboardingScreen, LoginScreen, RegisterScreen, BiometricAuthScreen, EnableBiometricScreen, PasswordLoginScreen, VerifyEmail, ProfileStepsScreen, PhoneInputScreen, VerifyPhone } from '../screens/auth';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { loading, hasSeenOnboarding, isAuthenticated, biometricEnabled } =
    useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  const navigatorKey = `${hasSeenOnboarding}-${isAuthenticated}-${biometricEnabled}`;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} key={navigatorKey} id={undefined}>
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
          {/* auth test, if works is extremely temporary*/}
          <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
          <Stack.Screen name="PhoneInputScreen" component={PhoneInputScreen} />
          <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
          <Stack.Screen
            name="ProfileStepsScreen"
            component={ProfileStepsScreen}
          />
        </>
      )}

      {hasSeenOnboarding && isAuthenticated && biometricEnabled === true && (
        <>
          <Stack.Screen name="BiometricAuth" component={BiometricAuthScreen} />
          <Stack.Screen name="Home" component={BottomTabsNavigator} />
        </>
      )}

      {hasSeenOnboarding && isAuthenticated && biometricEnabled === false && (
        <>
          <Stack.Screen
            name="EnableBiometric"
            component={EnableBiometricScreen}
          />
          <Stack.Screen name="Home" component={BottomTabsNavigator} />
        </>
      )}

      {hasSeenOnboarding && isAuthenticated && biometricEnabled === "never" && (
        <>
          <Stack.Screen name="PasswordLogin" component={PasswordLoginScreen} />
          <Stack.Screen name="Home" component={BottomTabsNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
}
