// api/graphql/trips.ts
import { gqlRequest } from '../client';

/* 🚗 Traer vehículos del usuario autenticado */
const VEHICLES_QUERY = `
  query {
    me {
		vehicles {
            id
            brand
            model
            license_plate
      }
    }
  }
`;

/* 🏷️ Traer todas las etiquetas disponibles */
const TAGS_QUERY = `
  query GetAllTags {
    tags {
      id
      name
    }
  }
`;

/* 🧭 Crear un nuevo viaje */
const CREATE_TRIP_MUTATION = `
  mutation CreateTrip($input: CreateTripInput!) {
    createTrip(input: $input) {
      id
      origin
      destination
      date
      available_seats
      price
      vehicle {
        id
        brand
        model
      }
      tags {
        id
        name
      }
    }
  }
`;

/* Hooks */
export const getMyVehicles = async (token: string) => {
  const data = await gqlRequest(VEHICLES_QUERY, {}, token);
  return data?.me.vehicles ?? [];
};

export const getAllTags = async (token: string) => {
  const data = await gqlRequest(TAGS_QUERY, {}, token);
  return data?.tags ?? [];
};

export const createTrip = async (input: {
  origin: string;
  destination: string;
  date: string;
  available_seats: number;
  price: number;
  vehicle_id: string;
  tagIds?: string[];
}, token: string) => {
  const variables = { input };
  const data = await gqlRequest(CREATE_TRIP_MUTATION, variables, token);
  return data?.createTrip;
};
