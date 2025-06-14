// components/QuickActions.tsx
import React, { use } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useBottomTabNavigation } from '../../navigation/Navigation';

const QuickActions: React.FC = () => {
    const navigation = useBottomTabNavigation();
  return (
    <View style={headerStyles.quickActions}>
      <Pressable 
        style={({ pressed }) => [
          headerStyles.primaryActionButton,
          pressed && headerStyles.pressedPrimary
        ]}
        onPress={() => navigation.navigate('Buscar')}
      >
        <Icon name="magnifying-glass" size={16} color="#000000" />
        <Text style={headerStyles.primaryActionText}>Encontrar Viaje</Text>
      </Pressable>
      
      <Pressable 
        style={({ pressed }) => [
          headerStyles.secondaryActionButton,
          pressed && headerStyles.pressedSecondary
        ]}
        onPress={() => navigation.navigate('Publicar')}
      >
        <Icon name="plus" size={16} color="#FFFFFF" />
        <Text style={headerStyles.secondaryActionText}>Publicar Viaje</Text>
      </Pressable>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryActionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryActionButton: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryActionText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  pressedPrimary: {
    backgroundColor: '#F3F4F6',
  },
  pressedSecondary: {
    backgroundColor: '#4B5563',
  },
});

export default QuickActions;