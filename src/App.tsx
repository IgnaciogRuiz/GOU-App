import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./contexts";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function AppWrapper() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuth(); // 👈 asumimos que el contexto devuelve esto

  const backgroundColor = isAuthenticated ? "#111827" : "#000000";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} edges={['left', 'right', 'bottom']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor} // Android
        translucent={true}
      />

      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
