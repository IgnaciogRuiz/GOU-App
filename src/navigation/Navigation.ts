// navigation/useTypedNavigation.ts
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  RootStackParamList,
  BottomTabParamList,
  ProfileStackParamList,
} from "./types/NavigationTypes";

// Navegación para autenticación (Root)
export const useAuthNavigation = () =>
  useNavigation<StackNavigationProp<RootStackParamList>>();

// Navegación para la home principal (BottomTabs)
export const useBottomTabNavigation = () =>
  useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

// Navegación para perfil/configuración (ProfileStack)
export const useProfileNavigation = () =>
  useNavigation<StackNavigationProp<ProfileStackParamList>>();
