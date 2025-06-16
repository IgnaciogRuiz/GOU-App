export interface ApiTripTransformed {
  id: string;
  origin: string;
  destination: string;
  date: string;
  price: string;
  available_seats: string;
  reservations: any[];
  seats: string; // ← nuevo
  status: string;
  statusIcon: string;
  statusColor: string;
}

interface ApiTrip {
    id: string;
  available_seats: number;
  date: string;
  destination: string;
  origin: string;
  price: number;
  reservations: any[];
}


export const formtaTripData = (apiTrips: ApiTrip[]): ApiTripTransformed[] => {
  return apiTrips.map(trip => {
    const reservedSeats = trip.reservations.length;
    const availableSeats = trip.available_seats;
    const totalSeats = reservedSeats + availableSeats;

    return {
      ...trip,
      origin: formatLocation(trip.origin),
      destination: formatLocation(trip.destination),
      date: formatDate(trip.date),
      price: formatPrice(trip.price),
      available_seats: `${trip.available_seats}`,
      seats: `${reservedSeats}/${totalSeats}`,
      status: getStatus(trip.available_seats, trip.reservations.length),
      statusIcon: getStatusIcon(trip.available_seats, trip.reservations.length),
      statusColor: getStatusColor(trip.available_seats, trip.reservations.length),
      id: trip.id,
    };
  });
};


// Ejemplo de formateo solo para texto de origen y destino (si necesitás)
const formatLocation = (location: string): string => {
  const excludedWords = ['de', 'Santa', 'El', 'La', 'Los', 'Las', 'Villa', 'Estancia', 'Campo'];
  
  // Separar en palabras y filtrar las que no aportan
  const words = location.split(' ').filter(word => !excludedWords.includes(word));

  // Si quedó vacío (ej. solo había palabras excluidas), devolvés la original
  if (words.length === 0) return location;

  // Podés devolver solo la primera palabra significativa o unir hasta 2 si querés más contexto
  return words.slice(0, 2).join(' ');
};



// Formatear fecha en formato legible en español
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    return 'Fecha no válida';
  }
  
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${day} de ${month}, ${hours}:${minutes}`;
};

// Formatear precio sin signo pesos y sin centavos
const formatPrice = (price: number): string => {
  const roundedPrice = Math.round(price);
  return roundedPrice.toLocaleString('es-AR');
};

// Determinar estado del viaje
const getStatus = (availableSeats: number, reservationsCount: number): string => {
  if (availableSeats === 0) return 'Completo';
  if (reservationsCount > 0) return 'Con reservas';
  return 'Disponible';
};

// Obtener icono según el estado
const getStatusIcon = (availableSeats: number, reservationsCount: number): string => {
  if (availableSeats === 0) return 'ban';
  if (reservationsCount > 0) return 'clock';
  return 'check-circle';
};

// Obtener color según el estado
const getStatusColor = (availableSeats: number, reservationsCount: number): string => {
  if (availableSeats === 0) return '#EF4444'; // rojo
  if (reservationsCount > 0) return '#F59E0B'; // amarillo
  return '#10B981'; // verde
};