import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatsScreen, MessageScreen } from "../screens/home";

// Rutas y params del stack de Mensajes
export type MessagesStackParamList = {
  MessagesList: undefined;                              // Lista de chats
  Chat: { chatId: string; user: any };                  // Conversación
};

const Stack = createStackNavigator<MessagesStackParamList>();

export default function MessagesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} id={undefined}>
      {/* Lista de chats */}
      <Stack.Screen name="MessagesList" component={ChatsScreen} />
      {/* Conversación */}
      <Stack.Screen name="Chat" component={MessageScreen} />
    </Stack.Navigator>
  );
}
