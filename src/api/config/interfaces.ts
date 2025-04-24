export type TripStatus = "pending" | "in_progress" | "completed" | "canceled";
export type ReservationStatus = "pending" | "confirmed" | "canceled";
export type PaymentMethod = "cash" | "mercadopago";
export type PaymentStatus = "pending" | "completed" | "failed";
export type TransactionStatus = "pending" | "processed" | "failed";
export type MessageStatus = "sent" | "read";
export type DriverBlockStatus = "active" | "removed";

export interface User {
  id: number;
  dni: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  validated: boolean;
  cvu: string;
  pending_balance: number;
}

export interface Vehicle {
  id: number;
  user_id: number;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  dnrpa_approved: boolean;
}

export interface Trip {
  id: number;
  vehicle_id: number;
  origin: string;
  destination: string;
  date: string;
  available_seats: number;
  price: number;
  status: TripStatus;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Allows {
  tag_id: number;
  trip_id: number;
}

export interface Reservation {
  id: number;
  user_id: number;
  trip_id: number;
  status: ReservationStatus;
  reservation_date: string;
}

export interface Payment {
  id: number;
  transaction: number;
  reservation_id: number;
  amount: number;
  payment_method: PaymentMethod;
  payment_date: string;
  status: PaymentStatus;
}

export interface Transaction {
  id: number;
  transaction: number;
  payment_id: number;
  driver_id: number;
  total_amount: number;
  company_commission: number;
  driver_final_amount: number;
  transaction_date: string;
  status: TransactionStatus;
}

export interface Chat {
  id: number;
  user1_id: number;
  user2_id: number;
  creation_date: string;
}

export interface Message {
  id: number;
  chat_id: number;
  sender_id: number;
  message: string;
  sent_date: string;
  status: MessageStatus;
}

export interface Rating {
  id: number;
  trip_id: number;
  user_id: number;
  driver_id: number;
  rating: number;
  comment: string;
  rating_date: string;
}

export interface DriverBlock {
  id: number;
  driver_id: number;
  reason: string;
  block_date: string;
  status: DriverBlockStatus;
}