import React from 'react';
import { FlatList, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { ChatItem, Header } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome6';

// Componente principal
const MessagesScreen = () => {
  const chatData = [
    {
      id: '1',
      name: 'Carlos M.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
      lastMessage: 'Perfect! See you at the pickup point at 8:30 AM',
      time: '2:34 PM',
      unreadCount: 3,
    },
    {
      id: '2',
      name: 'Maria S.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      lastMessage: 'Thanks for accepting my booking!',
      time: '1:15 PM',
      unreadCount: 1,
    },
    {
      id: '3',
      name: 'David R.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
      lastMessage: 'Great trip! Thanks for the smooth ride',
      time: 'Yesterday',
      unreadCount: 0,
    },
    {
      id: '4',
      name: 'Ana L.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
      lastMessage: 'Hi! Is there still space for one more passenger?',
      time: 'Monday',
      unreadCount: 0,
    },
    {
      id: '5',
      name: 'Miguel P.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg',
      lastMessage: 'Could we make a quick stop for coffee?',
      time: '11:45 AM',
      unreadCount: 2,
    },
    {
      id: '6',
      name: 'Sofia R.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg',
      lastMessage: 'Thanks for the comfortable trip to Valencia!',
      time: 'Sunday',
      unreadCount: 0,
    },
    {
      id: '7',
      name: 'Roberto M.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      lastMessage: 'Perfect timing! See you next week',
      time: 'Friday',
      unreadCount: 0,
    },
    {
      id: '8',
      name: 'Laura G.',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
      lastMessage: 'Can you pick me up 5 minutes earlier?',
      time: '9:20 AM',
      unreadCount: 1,
    }
  ];

  const handleChatPress = (chatItem) => {
    console.log('Chat pressed:', chatItem.name);
    // Aquí puedes navegar a la pantalla de chat individual
  };

  const renderChatItem = ({ item }) => (
    <ChatItem item={item} onPress={handleChatPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <Header
        title="Mensajes"
        showSearch={true}
        onSearchPress={() => console.log("Buscar chats")}
      />

      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  searchButton: {
    padding: 8,
  },
  chatList: {
    flex: 1,
  },
});

export default MessagesScreen;