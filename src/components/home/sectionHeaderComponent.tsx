// components/SectionHeader.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { homeStyles } from './homeStyles';

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

export default SectionHeader;