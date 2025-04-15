import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";

function AppWrapper() {
  const insets = useSafeAreaInsets(); 

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
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
