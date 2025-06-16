// utils/formatUserProfile.ts

type TravelStats = {
  publishedTrips: number;
  totalDistanceKm: number;
  totalTrips: number;
};

type ProfileData = {
  created_at: string;
  firstname: string;
  lastname: string;
  profile_photo: string;
  ratingRatio: number;
  travelStats: TravelStats;
};

//devuelve
interface UserInfo {
  name: string;
  memberSince: string;
  rating: number;
  totalTrips: number;
  avatar: string;
  stats: UserStats;
}

interface UserStats {
  trips: number;
  published: number;
  recorrido: string;
}

export const formatUserProfile = (profile: ProfileData): UserInfo => {
  const name = `${profile.firstname} ${profile.lastname}`;
  const memberSince = new Date(profile.created_at).getFullYear().toString();
  const rating = Number(profile.ratingRatio / 2); // de 10 a 5 estrellas
  const avatar = profile.profile_photo;
  const totalTrips = profile.travelStats.totalTrips;
  const published = profile.travelStats.publishedTrips;
  const recorrido = `${profile.travelStats.totalDistanceKm}`;

  return {
    name,
    memberSince,
    rating,
    totalTrips,
    avatar,
    stats: {
      trips: totalTrips,
      published,
      recorrido,
    },
  };
};
