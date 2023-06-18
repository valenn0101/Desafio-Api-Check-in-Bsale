import prisma from "../config/prisma.js";
import { type Seats, type Seat } from "../interfaces/dbInterfaces.js";
import {
  type PassengerData,
  type PassengerCases
} from "../interfaces/dataInterfaces.js";

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
  seatIds: Array<number | null>,
  seatData: Seats,
  maxDistance = 2
): Seat[][] {
  const { seatAvailable, seatOccupied } = seatData;

  const adjacentSeatsList: Seat[][] = [];

  for (const seatId of seatIds) {
    if (seatId !== null) {
      const selectedSeat = seatOccupied.find((seat) => seat.seatId === seatId);

      if (selectedSeat) {
        const adjacentSeats: Seat[] = [];

        const selectedColumn = selectedSeat.seatColumn;
        const selectedRow = selectedSeat.seatRow;
        const selectedSeatType = selectedSeat.seatTypeId;

        for (const seat of seatAvailable) {
          if (
            seat.seatTypeId === selectedSeatType &&
            Math.abs(seat.seatRow - selectedRow) <= maxDistance &&
            Math.abs(
              seat.seatColumn.charCodeAt(0) - selectedColumn.charCodeAt(0)
            ) <= maxDistance
          ) {
            adjacentSeats.push(seat);
          }
        }

        adjacentSeatsList.push(adjacentSeats);
      }
    }
  }

  return adjacentSeatsList;
}

export function findAdjacentSeatsForGroup(
  group,
  seatData,
  numRows = 3,
  numColumns = 3
) {
  const { seatAvailable, seatOccupied } = seatData;
  const adjacentSeatsList = [];

  const seatsOfType = seatAvailable.filter(
    (seat) => seat.seatTypeId === group[0].seatTypeId
  );

  if (seatsOfType.length === 0) {
    return adjacentSeatsList;
  }

  const randomSeat =
    seatsOfType[Math.floor(Math.random() * seatsOfType.length)];

  if (randomSeat) {
    const { seatRow, seatColumn } = randomSeat;
    const adjacentSeats = [];

    const groupWithAdult = group.filter((passenger) => passenger.age >= 18);
    const groupWithMinor = group.filter((passenger) => passenger.age < 18);

    for (const seat of seatAvailable) {
      if (
        seat.seatTypeId === randomSeat.seatTypeId &&
        Math.abs(seat.seatRow - seatRow) <= numRows - 1 &&
        Math.abs(seat.seatColumn.charCodeAt(0) - seatColumn.charCodeAt(0)) <=
          numColumns - 1
      ) {
        if (adjacentSeats.length < group.length) {
          if (groupWithAdult.length > 0) {
            adjacentSeats.push(seat);
            groupWithAdult.shift();
          } else if (groupWithMinor.length > 0) {
            adjacentSeats.push(seat);
            groupWithMinor.shift();
          }
        } else {
          break;
        }
      }
    }

    adjacentSeatsList.push(adjacentSeats.slice(0, group.length));
  }

  return adjacentSeatsList;
}
