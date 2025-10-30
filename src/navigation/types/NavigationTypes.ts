export type ProfileStackParamList = {
  PerfilInfo: undefined;
  Vehicle: undefined;
  Config: undefined;
  Info: undefined;
  Payments: undefined;
  AddVehicle: undefined;
  ChangePass: undefined;
};

export type BottomTabParamList = {
  Viajes: undefined;
  Buscar: undefined;
  Publicar: undefined;
  Mensajes: undefined;
  Perfil: undefined;
  TripDetail: { tripId: number };
  TripsResults: {
    origen: string;
    destino: string;
    fecha: string;
    pasajeros: number;
    precioMin?: string;
    precioMax?: string;
  };
};

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  VerifyEmail: undefined;
  PhoneInputScreen: undefined;
  VerifyPhone: undefined;
  ProfileStepsScreen: { phoneVerified?: boolean, infoVer?: boolean};
  BiometricAuth: undefined;
  EnableBiometric: undefined;
  PasswordLogin: undefined;
  Home: undefined;      
  PersonalInfo: undefined;
  // DNIFront: undefined;
  // DNIBack: undefined;
  AddOptVehicle: undefined;
  VehicleAdd: undefined;
};

export type HomeStackParamList = {
  Buscar: undefined;
  // TripsResults: {
  //   origen: string;
  //   destino: string;
  //   fecha: string;
  //   pasajeros: number;
  //   precioMin?: string;
  //   precioMax?: string;
  // };
};