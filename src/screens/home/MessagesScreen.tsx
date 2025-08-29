import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import dayjs from 'dayjs';

const { STORAGE_URL } = Constants.expoConfig?.extra || {};

// colores del tema
const colors = {
  primary: '#2563eb',
  secondary: '#111827',
  accent: '#10B981',
  background: '#000000',
  gray800: '#1f2937',
  gray700: '#374151',
  gray400: '#9ca3af',
  white: '#ffffff',
  red500: '#ef4444',
};

// ---- Componente burbuja de mensaje ----
const MessageBubble = ({ message, isOwn }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isOwn ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.messageTime}>
        {dayjs(message.created_at).format('HH:mm')}
      </Text>
    </View>
  );
};

const ChatScreen = ({ route }) => {
  const { chatId, user } = route.params;

  // mensajes simulados
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hola! Cómo estás?', created_at: new Date(), sender_id: 2 },
    { id: '2', text: 'Todo bien, y vos?', created_at: new Date(), sender_id: 1 },
    { id: '3', text: 'Bien también, gracias!', created_at: new Date(), sender_id: 2 },
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      created_at: new Date(),
      sender_id: 1, // simulamos que soy yo
    };

    setMessages((prev) => [newMessage, ...prev]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble message={item} isOwn={item.sender_id === 1} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        inverted // para que aparezcan de abajo hacia arriba
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          placeholderTextColor={colors.gray400}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 12,
  },
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
  },
  ownMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: colors.gray800,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: colors.white,
    fontSize: 15,
  },
  messageTime: {
    fontSize: 11,
    color: colors.gray400,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: colors.gray800,
    borderTopWidth: 1,
    borderTopColor: colors.gray700,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.white,
    padding: 10,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    padding: 10,
    marginLeft: 6,
  },
});
