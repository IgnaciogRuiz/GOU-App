import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Header, MenuItem, UserInfoCard } from '../../components';


// Main Profile Screen Component
const ProfileScreen: React.FC = () => {

  //ejemplo de datos de usuario
  const userInfo = {
    name: 'Carlos Martinez',
    memberSince: '2023',
    rating: 4.9,
    totalTrips: 47,
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    stats: {
      trips: 47,
      published: 12,
      recorrido: '1450KM',
    },
  };

  //cuando se presiona un elemento del menú
  const handleMenuPress = (menuItem: string) => {
    console.log(`${menuItem} pressed`);
  };

  // Renderiza el componente
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Header title='Perfil'/>
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
            onPress={() => handleMenuPress('Logout')}
            iconColor="#EF4444"
            titleColor="#EF4444"
            iconBgColor="rgba(239, 68, 68, 0.2)"
          />
        </View>
      </ScrollView>

    </SafeAreaView>
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
