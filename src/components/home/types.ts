// types/index.ts
export interface Reservation {
  id: number;
  route: string;
  driver: string;
  date: string;
  time: string;
  seats: string;
  statusColor: string;
}

export interface PublishedTrip {
  id: number;
  route: string;
  date: string;
  price: string;
  seats: string;
  status: string;
  statusColor: string;
  statusIcon: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
  iconColor: string;
}