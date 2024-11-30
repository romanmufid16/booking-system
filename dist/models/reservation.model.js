"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReservationResponse = toReservationResponse;
function toReservationResponse(reservation) {
    // Format tanggal dan waktu yang diinginkan
    const reservationDate = reservation.reservationDate.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
    const reservationTime = reservation.reservationTime.toISOString().split('T')[1].slice(0, 5); // Format 'HH:mm'
    return {
        id: reservation.id,
        userId: reservation.userId,
        serviceId: reservation.serviceId,
        reservationDate, // Format 'YYYY-MM-DD'
        reservationTime, // Format 'HH:mm'
        status: reservation.status
    };
}
