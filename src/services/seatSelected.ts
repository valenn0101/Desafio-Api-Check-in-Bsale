import prisma from "../config/prisma.js";
import { type Seats, type Seat } from "../interfaces/dbInterfaces.js";

import transformKeysToCamelCase from "../utils/snakeToCamel.js";

export async function getSeatsData(airplaneId: number): Promise<Seats> {
  const seatList = await prisma.seat.findMany({
    where: { airplane_id: airplaneId },
    include: {
      boarding_pass: true
    }
  });

  const filteredSeatList = seatList.filter(
    (seat) => !seat.boarding_pass || seat.boarding_pass.length === 0
  );
  const filteredSeatOccupied = seatList.filter(
    (seat) => seat.boarding_pass && seat.boarding_pass.length > 0
  );
  const seatAvailable = transformKeysToCamelCase(filteredSeatList);
  const seatOccupied = transformKeysToCamelCase(filteredSeatOccupied);
  return await Promise.resolve({ seatAvailable, seatOccupied });
}

export function findAdjacentSeatsBySeatId(
  seatId: number,
  seatData: Seats,
  maxDistance: number
): Seat[] {
  const { seatAvailable } = seatData;
  const selectedSeat = seatAvailable.find((seat) => seat.seatId === seatId);

  if (!selectedSeat) {
    console.log("No seat available");
    return [];
  }

  const adjacentSeats: Seat[] = [];
  const selectedColumn = selectedSeat.seatColumn;
  const selectedRow = selectedSeat.seatRow;
  const selectedSeatType = selectedSeat.seatTypeId;

  for (const seat of seatAvailable) {
    if (
      seat.seatColumn === selectedColumn &&
      Math.abs(seat.seatRow - selectedRow) <= maxDistance &&
      seat.seatTypeId === selectedSeatType
    ) {
      adjacentSeats.push(seat);
    }
  }

  const squareSeats: Seat[] = [];
  const rowRange = [
    selectedRow - 2,
    selectedRow - 1,
    selectedRow,
    selectedRow + 1
  ];
  const columnRange = [
    selectedColumn.charCodeAt(0) - 2,
    selectedColumn.charCodeAt(0) - 1,
    selectedColumn.charCodeAt(0),
    selectedColumn.charCodeAt(0) + 1
  ];

  for (const row of rowRange) {
    for (const column of columnRange) {
      const seat = seatAvailable.find(
        (s) =>
          s.seatRow === row &&
          s.seatColumn.charCodeAt(0) === column &&
          s.seatTypeId === selectedSeatType
      );
      if (seat) {
        squareSeats.push(seat);
      }
    }
  }

  return squareSeats;
}
