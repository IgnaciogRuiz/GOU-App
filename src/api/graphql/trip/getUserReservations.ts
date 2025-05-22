// src/api/graphql/user/getUserReservations.ts

import { gqlRequest } from '../client';

const query = `
  query {
	me {
      reservations {
        trip {
          origin
          destination
          price
          date
          vehicle {
            license_plate
            user {
              firstname
              lastname
            }
          }
        }
      }
    }
  }
`;


export const getUserReservations = async (token: string) => {
  return gqlRequest(query, {}, token);
};