// api/services/graphql/client.ts
import { GraphQLClient } from 'graphql-request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { API_URL, ENTORNO } = Constants.expoConfig.extra;

const client = new GraphQLClient(API_URL);

export async function gqlRequest<T = any>(
  query: string,
  variables: Record<string, any> = {}
) {
  const token = await AsyncStorage.getItem("userToken");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return client.request<T>(query, variables, headers);
}

export default client;