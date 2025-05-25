// src/api/graphql/user/getUserTrips.ts

import { gqlRequest } from '../client';

const query = `
  query {
    me {
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


export const getUserTrips = async (token: string) => {
  return gqlRequest(query, {}, token);
};