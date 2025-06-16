import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';

// Componente para cada item de chat
const ChatItem = ({ item, onPress }) => {
  const isUnread = item.unreadCount > 0;

  return (
    <TouchableOpacity 
      style={[styles.chatItem, isUnread && styles.chatItemUnread]} 
      onPress={() => onPress(item)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {isUnread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={[styles.chatName, isUnread && styles.chatNameUnread]}>
            {item.name}
          </Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text 
          style={[styles.chatMessage, isUnread && styles.chatMessageUnread]} 
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  chatItemUnread: {
    backgroundColor: '#111827',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  chatContent: {
    flex: 1,
    minWidth: 0,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    flex: 1,
  },
  chatNameUnread: {
    fontWeight: '600',
  },
  chatTime: {
    fontSize: 12,
    color: '#787D86',
  },
  chatMessage: {
    fontSize: 14,
    color: '#787D86',
  },
  chatMessageUnread: {
    color: '#ffffff',
  },
});

export default ChatItem;