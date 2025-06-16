import React from 'react';
import { FlatList, StyleSheet, SafeAreaView, View } from 'react-native';
import { ChatItem, Header } from '../../components';
import { useChats } from '../../hooks/app/useChats';
import Constants from 'expo-constants';
import dayjs from 'dayjs';


const MessagesScreen = () => {
  const { chats, loading, error } = useChats();
  const { STORAGE_URL } = Constants.expoConfig?.extra || {};

  //console.log('Chats Data:', chats);

  const mapChats = (chats) => {
    return chats.map((chat) => ({
      id: chat.id,
      name: `${chat.other_user.firstname} ${chat.other_user.lastname}`,
      avatar: `${STORAGE_URL}${chat.other_user.profile_photo}`,
      lastMessage: chat.last_message.message,
      time: dayjs(chat.last_message.created_at).format('h:mm A'), // ej: "2:34 PM"
      unreadCount: 0, 
    }));
  };

  const mappedChats = chats ? mapChats(chats) : [];

  const handleChatPress = (chatItem) => {
    console.log('Chat pressed:', chatItem.id);
    //navegar a la screen de chat
  };

  const renderChatItem = ({ item }) => (
    <ChatItem item={item} onPress={handleChatPress} />
  );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#111827' }}>
        <Header
          title="Mensajes"
          showSearch={true}
          onSearchPress={() => console.log("Buscar chats")}
        />
       </SafeAreaView>
    
      <View style={styles.container}>
        <FlatList
          data={mappedChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
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

function formatTime(created_at: any) {
  throw new Error('Function not implemented.');
}
