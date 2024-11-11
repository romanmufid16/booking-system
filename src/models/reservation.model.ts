import { Reservation, Service, User } from "@prisma/client";


export type ReservationResponse = {
  id: string;
  userId: string;
  serviceId: string;
  reservationDate: string; // Format 'YYYY-MM-DD'
  reservationTime: string; // Format 'HH:mm'
  status: string;
}

export type CreateReservationRequest = {
  serviceId: string;
  reservationDate: Date;
  reservationTime: string;
  numberOfPeople: number;
}

export function toReservationResponse(reservation: Reservation & { user: User; service: Service }): ReservationResponse {
  // Format tanggal dan waktu yang diinginkan
  const reservationDate = reservation.reservationDate.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
  const reservationTime = reservation.reservationTime.toISOString().split('T')[1].slice(0, 5); // Format 'HH:mm'

  return {
    id: reservation.id,
    userId: reservation.userId,
    serviceId: reservation.serviceId,
    reservationDate,  // Format 'YYYY-MM-DD'
    reservationTime,  // Format 'HH:mm'
    status: reservation.status
  };
}