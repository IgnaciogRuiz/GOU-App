interface ReservationCardData {
  id: string;
  route: string;
  driver: string;
  date: string;
  time: string;
  seats: string;
  statusColor: string;
}

interface ApiReservation {
  id: string;
  trip: {
    origin: string;
    destination: string;
    date: string;
    available_seats: number;
    price: number;
    user: {
      name: string;
    };
  };
  seats: number;
}

export const transformReservationData = (apiReservations: ApiReservation[]): ReservationCardData[] => {
  return apiReservations.map((res) => {
    const tripDate = new Date(res.trip.date);
    const hours = tripDate.getHours().toString().padStart(2, '0');
    const minutes = tripDate.getMinutes().toString().padStart(2, '0');

    return {
      id: res.id,
      route: `${formatLocation(res.trip.origin)} → ${formatLocation(res.trip.destination)}`,
      driver: res.trip.user.name,
      date: formatDate(res.trip.date),
      time: `${hours}:${minutes}`,
      seats: `${res.seats} asiento${res.seats > 1 ? 's' : ''} reservado${res.seats > 1 ? 's' : ''}`,
      statusColor: '#10B981', // o usás lógica de estado si querés
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