import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function AppWrapper() {
  const insets = useSafeAreaInsets(); 

  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <QueryClientProvider client={queryClient}>
              <AuthProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </AuthProvider>
      </QueryClientProvider>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppWrapper />
    </SafeAreaProvider>
  );
}
