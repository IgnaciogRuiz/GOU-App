// src/api/graphql/user/getUserTrips.ts

import { gqlRequest } from '../client';

const query = `
  query {
    me {
        vehicles {
            id
            brand
            model
            year
            license_plate
        }
    }
  }
`;


export const getUserVehicles = async (token: string) => {
  return gqlRequest(query, {}, token);
};