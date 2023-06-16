import prisma from "../config/prisma.js";
import { type Seat } from "src/interfaces/dbInterfaces.js";

// Consulta si existe un asiento = null
// en el litado de pasajeros de un boleto
function findSeats(seatIds: number[]): boolean {
  return seatIds.some((seatId) => seatId === null);
}

// Genera una matriz de asientos en base al modelo de avion
async function generateSeats(airplaneId: number): Promise<Seat[][]> {
  const seatList = await prisma.seat.findMany({
    where: { airplane_id: airplaneId }
  });

  const maxRows = Math.max(...seatList.map((seat) => seat.seat_row));
  const maxColumns = Math.max(
    ...seatList.map((seat) => seat.seat_column.charCodeAt(0) - 65)
  );

  const seats: Seat[][] = Array.from({ length: maxRows }).map(() =>
    Array(maxColumns).fill(null)
  );

  seatList.forEach((seat) => {
    const rowIndex = seat.seat_row - 1;
    const columnIndex = seat.seat_column.charCodeAt(0) - 65;
    seats[rowIndex][columnIndex] = seat;
  });

  return seats;
}

export { findSeats, generateSeats };
