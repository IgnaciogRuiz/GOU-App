import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importá las pantallas
import Vehicle from "../screens/profile/vehicle/VehiculoScreen";
import PerfilScreen from "../screens/home/PerfilScreen";
import AddVehicle from "../screens/profile/vehicle/AgregarVehiculo"; // temporary?
import ChangePass from "../screens/profile/config/ChangePass"; // temporary?
import Payments from "../screens/profile/pagos/PagoScreen";
import Info from "../screens/profile/info/AccountInfoScreen";
import Settings from "../screens/profile/config/ConfigScreen";
import AccountInfoScreen from "../screens/profile/info/AccountInfoScreen";

const Stack = createNativeStackNavigator();

const ProfileTabsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="Vehicle" component={Vehicle} />
      <Stack.Screen name="Config" component={Settings} />
      <Stack.Screen name="Info" component={AccountInfoScreen} />
      <Stack.Screen name="Payments" component={Payments} />

      <Stack.Screen name="AddVehicle" component={AddVehicle} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
    </Stack.Navigator>
  );
};

export default ProfileTabsNavigation;


