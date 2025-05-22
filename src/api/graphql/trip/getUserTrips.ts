// src/api/graphql/user/getUserTrips.ts

import { gqlRequest } from '../client';

const query = `
  query GetUserTrips($id: ID!) {
    user(id: $id) {
      vehicles {
        license_plate
        trips {
          origin
          destination
          price
          available_seats
          date
          reservations {
            user {
              id
              firstname
            }
          }
        }
      }
    }
  }
`;


export const getUserTrips = async (id: string, token: string) => {
  return gqlRequest(query, { id }, token);
};