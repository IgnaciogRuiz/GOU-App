// src/api/graphql/user/getUserTrips.ts

import { gqlRequest } from '../client';

const query = `
  query {
    me {
        firstname
        lastname
        profile_photo
        created_at
        ratingRatio
        travelStats {
            totalTrips
            publishedTrips
            totalDistanceKm
        }
    }
  }
`;


export const getProfileData = async (token: string) => {
  return gqlRequest(query, {}, token);
};