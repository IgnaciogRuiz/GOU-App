// api/graphql/client.ts
import { GraphQLClient } from 'graphql-request';
import Constants from 'expo-constants';

const { API_URL } = Constants.expoConfig.extra;

const client = new GraphQLClient(API_URL+'/graphql');
console.log(client);

export async function gqlRequest<T = any>(
  query: string,
  variables: Record<string, any> = {},
  token?: string
) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return client.request<T>(query, variables, headers);
}

export default client;