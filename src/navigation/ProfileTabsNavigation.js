import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importá las pantallas
import Vehicle from '../screens/profile/vehicle/VehiculoScreen';
import PerfilScreen from "../screens/home/PerfilScreen";
import AddVehicle from "../screens/profile/vehicle/AgregarVehiculo"; // temporary?
/*import Payments from '../screens/profile/PagosScreen';
import Info from '../screens/profile/InfoCuentaScreen';
import Settings from '../screens/profile/ConfiguracionScreen';*/

const Stack = createNativeStackNavigator();

const ProfileTabsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Vehicle" component={Vehicle} />
        <Stack.Screen name="AddVehicle" component={AddVehicle} />
    </Stack.Navigator>
  );
};

export default ProfileTabsNavigation;

{/* <Stack.Screen name="Payments" component={Payments} />

      <Stack.Screen name="Info" component={Info} options={{ title: 'Información de Cuenta' }} />
      <Stack.Screen name="Settings" component={Settings} /> */}