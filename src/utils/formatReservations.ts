// utils/formatReservations.ts
export interface Reservation {
  id: string;
  route: string;
  driver: string;
  date: string;
  time: string;
  seats: string;
  statusColor: string;
}

function abbreviateLocation(location: string): string {
  const lower = location.toLowerCase();
  if (lower.startsWith('villa ')) {
    return location.replace(/^Villa\s+/i, 'V. ');
  }
  if (lower.startsWith('san ')) {
    return location.replace(/^San\s+/i, 'S. ');
  }
  if (lower.startsWith('santa ')) {
    return location.replace(/^Santa\s+/i, 'Sta. ');
  }
  return location;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();

  if (isTomorrow) return 'Mañana';

  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
  });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${hours}:${minutes} ${ampm}`;
}

export function formatReservations(reservedTrips: any[]): Reservation[] {
  return reservedTrips.map((r) => {
    const trip = r.trip;

    const origin = abbreviateLocation(trip.origin);
    const destination = abbreviateLocation(trip.destination);
    const route = `${origin} → ${destination}`;

    const date = formatDate(trip.date);
    const time = formatTime(trip.date);

    const driver = trip.vehicle?.user
      ? `${trip.vehicle.user.firstname} ${trip.vehicle.user.lastname}`
      : 'Sin conductor asignado';

    const seatCount = r.seats ?? 1;
    const seats = seatCount === 1
    ? '1 asiento reservado'
    : `${seatCount} asientos reservados`;

    return {
      id: r.id,
      route,
      driver,
      date,
      time,
      seats,
      statusColor: '#3B82F6', // fijo por ahora
    };
  });
}
