import React from 'react';
import { View, ScrollView, StyleSheet, Text} from 'react-native';
import { Header, MenuItem, UserInfoCard } from '../../components';
import { useLogout, useProfileData } from '../../hooks';
import { formatUserProfile } from '../../utils/formatProfileData';
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";


// Main Profile Screen Component
const ProfileScreen: React.FC = () => {
  const logout = useLogout();
  const { profileData, loading, error } = useProfileData();

  if (loading || !profileData) {
    return (
      <View >
        <Text>loading..</Text>
      </View>
    );
  }
 
  const userInfo = formatUserProfile(profileData!);
  

  //cuando se presiona un elemento del menú
  const handleMenuPress = (menuItem: string) => {
    if (menuItem === 'Logout') {
      ;
    }
  };

  // Renderiza el componente
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#111827' }}>
      </SafeAreaView>

      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            
            <UserInfoCard userInfo={userInfo} />

            <View style={styles.menuSection}>
              <MenuItem
                icon="credit-card"
                title="Pagos"
                subtitle="Administra tus métodos de pago"
                onPress={() => handleMenuPress('Payments')}
              />
              
              <MenuItem
                icon="car"
                title="Vehiculos"
                subtitle="Gestiona tus vehículos"
                onPress={() => handleMenuPress('Vehicles')}
              />
              
              <MenuItem
                icon="user"
                title="Informacion de la cuenta"
                subtitle="Datos de tu cuenta y perfil"
                onPress={() => handleMenuPress('Account Information')}
              />
              
              <MenuItem
                icon="gear"
                title="Configuración"
                subtitle="Ajustes de la aplicación y preferencias"
                onPress={() => handleMenuPress('Configuration')}
              />
            </View>

            <View style={styles.menuSection}>
              <MenuItem
                icon="circle-question"
                title="Ayuda y Soporte"
                subtitle="Preguntas y soporte de contacto"
                onPress={() => handleMenuPress('Help & Support')}
                iconColor="#6B7280"
                iconBgColor="rgba(107, 114, 128, 0.2)"
              />
              
              <MenuItem
                icon="file-lines"
                title="Terminos y Privacidad"
                subtitle="Informacion Legal"
                onPress={() => handleMenuPress('Terms & Privacy')}
                iconColor="#6B7280"
                iconBgColor="rgba(107, 114, 128, 0.2)"
              />
              
              <MenuItem
                icon="right-from-bracket"
                title="Logout"
                subtitle="Cerrar sesión"
                onPress={() => logout.mutate()}
                iconColor="#EF4444"
                titleColor="#EF4444"
                iconBgColor="rgba(239, 68, 68, 0.2)"
              />
            </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ProfileScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 80, // Space for bottom navigation
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  activeNavLabel: {
    color: '#2563eb',
  },
  inactiveNavLabel: {
    color: '#787D86',
  },
});
