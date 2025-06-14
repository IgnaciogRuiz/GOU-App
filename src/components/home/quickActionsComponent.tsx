// components/QuickActions.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { headerStyles } from './headerStyles';

const QuickActions: React.FC = () => {
  const handleFindTrip = () => {
    console.log('Find Trip pressed');
  };

  const handlePublishTrip = () => {
    console.log('Publish Trip pressed');
  };

  return (
    <View style={headerStyles.quickActions}>
      <Pressable 
        style={({ pressed }) => [
          headerStyles.primaryActionButton,
          pressed && headerStyles.pressedPrimary
        ]}
        onPress={handleFindTrip}
      >
        <Icon name="magnifying-glass" size={16} color="#000000" />
        <Text style={headerStyles.primaryActionText}>Encontrar Viaje</Text>
      </Pressable>
      
      <Pressable 
        style={({ pressed }) => [
          headerStyles.secondaryActionButton,
          pressed && headerStyles.pressedSecondary
        ]}
        onPress={handlePublishTrip}
      >
        <Icon name="plus" size={16} color="#FFFFFF" />
        <Text style={headerStyles.secondaryActionText}>Publicar Viaje</Text>
      </Pressable>
    </View>
  );
};

export default QuickActions;