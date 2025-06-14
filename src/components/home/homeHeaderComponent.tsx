// components/Header.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import QuickActions from './quickActionsComponent';

const HomeHeader: React.FC = () => {
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.headerContent}>
        <View>
          <Text style={headerStyles.welcomeText}>¡Bienvenido de nuevo!</Text>
          <Text style={headerStyles.subtitleText}>¿Listo para tu proximo viaje?</Text>
        </View>
        <Image
          source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg' }}
          style={headerStyles.profileImage}
        />
      </View>
      <QuickActions />
    </View>
  );
};

 const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitleText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});

export default HomeHeader;