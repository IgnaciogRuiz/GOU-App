// src/api/graphql/user/getUserTrips.ts

import { gqlRequest } from '../client';

const query = `
  query {
    me {
        
    }
  }
`;


export const getUser = async (token: string) => {
  return gqlRequest(query, {}, token);
};