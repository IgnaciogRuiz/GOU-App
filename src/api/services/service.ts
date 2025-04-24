// 📁 src/services/[model]Service.ts
import {
    User,
    Vehicle,
    Trip,
    Tag,
    Allows,
    Reservation,
    Payment,
    Transaction,
    Chat,
    Message,
    Rating,
    DriverBlock
  } from "../config/interfaces";
  
  import { createService } from "./common";
  
  export const UserService = createService<User>("users");
  export const VehicleService = createService<Vehicle>("vehicles");
  export const TripService = createService<Trip>("trips");
  export const TagService = createService<Tag>("tags");
  export const AllowsService = createService<Allows>("allows");
  export const ReservationService = createService<Reservation>("reservations");
  export const PaymentService = createService<Payment>("payments");
  export const TransactionService = createService<Transaction>("transactions");
  export const ChatService = createService<Chat>("chats");
  export const MessageService = createService<Message>("messages");
  export const RatingService = createService<Rating>("ratings");
  export const DriverBlockService = createService<DriverBlock>("driver-blocks");