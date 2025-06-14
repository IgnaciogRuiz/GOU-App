// types/index.ts
export interface Reservation {
  id: string;
  route: string;
  driver: string;
  date: string;
  time: string;
  seats: string;
  statusColor: string;
}

export interface PublishedTrip {
  id: string;
  route: string;
  date: string;
  price: string;
  seats: string;
  status: string;
  statusColor: string;
  statusIcon: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  iconColor: string;
}