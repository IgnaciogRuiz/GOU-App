import { gqlRequest } from '../client';

const query = `
  query GetTrips {
    trips {
      id
      origin
      destination
      date
      price
      available_seats
      vehicle {
        id
        brand
        model
        user {
          firstname
          lastname
          ratingRatio
          profile_photo
        }
      }
    }
  }
`;

export const getTrips = async (token: string) => {
  return gqlRequest(query, {}, token);
};
