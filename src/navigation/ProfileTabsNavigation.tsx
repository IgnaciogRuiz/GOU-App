import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "./types/NavigationTypes";

// Importá las pantallas
import { VehicleScreen, AddVehicleScreen, EditVehicleScreen, PaymentScreen, ChangePasswordScreen, SettingsScreen, PerfilScreen, AccountInfoScreen } from "../screens/profile";

const Stack = createNativeStackNavigator<ProfileStackParamList>(); 

const ProfileTabsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} id={undefined}>
      <Stack.Screen name="PerfilInfo" component={PerfilScreen} />
      <Stack.Screen name="Vehicle" component={VehicleScreen} />
      <Stack.Screen name="Config" component={SettingsScreen} />
      <Stack.Screen name="Info" component={AccountInfoScreen} />
      <Stack.Screen name="Payments" component={PaymentScreen} />
      <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
      <Stack.Screen name="ChangePass" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

export default ProfileTabsNavigation;
