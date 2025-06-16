import React from "react";
import { View, StatusBar} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function AppWrapper() {
  const insets = useSafeAreaInsets(); 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }} edges={['left', 'right', 'bottom']}>
      {/* Status Bar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000" // solo tiene efecto en Android
        translucent={true} 
      />

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppWrapper />
    </SafeAreaProvider>
  );
}
