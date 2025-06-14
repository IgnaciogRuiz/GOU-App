// components/SectionHeader.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onViewAll }) => {
  return (
    <View style={homeStyles.sectionHeader}>
      <Text style={homeStyles.sectionTitle}>{title}</Text>
      {onViewAll && (
        <Pressable 
          style={({ pressed }) => [pressed && homeStyles.pressedViewAll]}
          onPress={onViewAll}
        >
          <Text style={homeStyles.viewAllText}>Ver Todos</Text>
        </Pressable>
      )}
    </View>
  );
};


const homeStyles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  pressedViewAll: {
    opacity: 0.7,
  },
});

export default SectionHeader;