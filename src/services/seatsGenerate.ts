import prisma from "../config/prisma.js";
import { type Seat } from "src/interfaces/dbInterfaces.js";
import transformKeysToCamelCase from "../utils/snakeToCamel.js";

// Genera una matriz de asientos en base al modelo de avion
async function generateSeats(airplaneId: number): Promise<Seat[][]> {
  const seatList = await prisma.seat.findMany({
    where: { airplane_id: airplaneId },
    include: {
      boarding_pass: true
    }
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
    seats[rowIndex][columnIndex] = transformKeysToCamelCase(seat);
  });

  return seats;
}

export { generateSeats };
