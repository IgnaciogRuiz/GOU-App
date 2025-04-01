import React from "react";
import { View } from "react-native";
import Navigation from "./navigation/Navigation";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";

function AppWrapper() {
  const insets = useSafeAreaInsets(); // ✅ Now it's used inside SafeAreaProvider

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <AuthProvider>
        <Navigation />
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

/*import React from "react";
import Navigation from "./navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
*/
