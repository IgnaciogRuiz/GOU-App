// RootNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import { RootStackParamList } from "./types/NavigationTypes";
import BottomTabsNavigator from "./BottomTabsNavigator";
import { LoginScreen, RegisterScreen, VerifyEmail, PhoneInputScreen, VerifyPhone, ProfileStepsScreen, PersonalInfo, AddOptVehicle, VehicleAdd } from "../screens/auth";

import { IntroductionAnimationScreen } from "../screens/introduction_animation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { loading, hasSeenOnboarding, isAuthenticated } = useAuth();
  console.log("Auth loading:", loading, "Onboarding seen:", hasSeenOnboarding, "Authenticated:", isAuthenticated);
  const navigatorKey = `${hasSeenOnboarding}-${isAuthenticated}`;

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }} key={navigatorKey}>
      {/* Onboarding flow */}
      {!hasSeenOnboarding && (
        <>
          <Stack.Screen name="Onboarding" component={IntroductionAnimationScreen} />
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
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
          {/* <Stack.Screen name="DNIFront" component={DNIFront} />
          <Stack.Screen name="DNIBack" component={DNIBack} /> */}
          <Stack.Screen name="AddOptVehicle" component={AddOptVehicle} />
          <Stack.Screen name="VehicleAdd" component={VehicleAdd} />
        </>
      )}

      {/* App main */}
      {hasSeenOnboarding && isAuthenticated && (
        <Stack.Screen name="Home" component={BottomTabsNavigator} />
      )}
    </Stack.Navigator>
  );
}
