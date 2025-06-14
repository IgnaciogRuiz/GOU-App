// components/Header.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { headerStyles } from './headerStyles';
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

export default HomeHeader;