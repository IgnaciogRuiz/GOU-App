import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import Constants from 'expo-constants';
import { useMessages } from '../../hooks/';
import { useAuth } from '../../contexts';
import { createMessage } from '../../api/graphql';
import { createEcho } from '../../api/echo';

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

const ChatHeader = ({ name, avatar, onBackPress }) => (
  <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.white} />
      </TouchableOpacity>
      
      <View style={styles.headerCenter}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>
              {name?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </View>
        )}
        <Text style={styles.headerName} numberOfLines={1}>
          {name}
        </Text>
      </View>

      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const MessageBubble = ({ message, isOwn }) => (
  <View
    style={[
      styles.messageContainer,
      isOwn ? styles.ownMessage : styles.otherMessage,
    ]}
  >
    <Text style={styles.messageText}>{message.message}</Text>
    <Text style={styles.messageTime}>
      {dayjs(message.created_at).format('HH:mm')}
    </Text>
  </View>
);

const ChatScreen = ({ route, navigation }) => {
  const { chatId, user: chatUser } = route.params;
  const { user, token } = useAuth();
  const { messages, setMessages, loading, error } = useMessages(chatId);
  const [input, setInput] = useState('');
  const { STORAGE_URL } = Constants.expoConfig?.extra || {};

  const chatName = chatUser?.name || 'Usuario';
  const chatAvatar = chatUser?.avatar;

  // Ocultar el header de React Navigation
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Escuchar mensajes nuevos en tiempo real
  useEffect(() => {
    if (!chatId || !token) return;

    const echo = createEcho(token);
    const channel = echo.private(`chat.${chatId}`);

    channel.listen('.message.sent', (data) => {
      console.log('📩 Nuevo mensaje recibido vía Echo:', data);
      
      // Solo agregar mensajes de OTROS usuarios
      // Los propios ya están por el optimistic UI
      if (data.sender.id !== user.id) {
        setMessages((prev) => {
          const exists = prev.some((msg) => msg.id === data.id);
          if (exists) {
            console.log('⚠️ Mensaje duplicado ignorado:', data.id);
            return prev;
          }
          return [...prev, data];
        });
      }
    });

    return () => {
      echo.leave(`chat.${chatId}`);
    };
  }, [chatId, token, user.id]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const messageText = input;
    setInput('');

    const tempId = `temp_${Date.now()}`;
    const tempMessage = {
      id: tempId,
      chat_id: chatId,
      message: messageText,
      created_at: new Date().toISOString(),
      sender: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };

    // Mostrar localmente (optimistic UI)
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const response = await createMessage(chatId, user.id, messageText, token);
      console.log('✅ Mensaje enviado, respuesta:', response);
      
      // Reemplazar mensaje temporal con el real del servidor
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId 
            ? { ...response, sender: tempMessage.sender } 
            : msg
        )
      );
    } catch (err) {
      console.error('❌ Error enviando mensaje:', err);
      // Remover mensaje temporal si falla
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      // Restaurar el texto en el input
      setInput(messageText);
    }
  };

  if (loading)
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );

  if (error)
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.red500 }}>Error: {error}</Text>
      </View>
    );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ChatHeader
      name={chatName}
      avatar={chatAvatar ? chatAvatar : null}
      onBackPress={() => navigation.goBack()}
    />
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble 
            message={item} 
            isOwn={item.sender.id == user.id} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
        contentContainerStyle={{ paddingVertical: 12 }}
      />

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
  flex: {
    flex: 1,
  },
  headerSafeArea: {
    backgroundColor: colors.secondary,
  },
  header: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  headerName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  moreButton: {
    padding: 8,
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