import prisma from "../config/prisma.js";
import { type PassengerData } from "../interfaces/dataInterfaces.js";
import { type Seat } from "../interfaces/dbInterfaces.js";

function findSeats(seatIds: number[]): boolean {
  return seatIds.some((seatId) => seatId === null);
}
function filterPassengersWithSeat(
  passengers: PassengerData[]
): Array<number | false> {
  const filteredPassengers: Array<number | false | any> = [];

  for (const passenger of passengers) {
    if (passenger.seatId !== null) {
      filteredPassengers.push(passenger.seatId);
    }
  }

  // @ts-expect-error idk
  return filteredPassengers.length > 0 ? filteredPassengers : false;
}

function filterPassengersWithoutSeat(
  passengers: PassengerData[]
): PassengerData[] {
  const filteredPassengers: PassengerData[] = [];

  for (const passenger of passengers) {
    if (passenger.seatId === null) {
      filteredPassengers.push(passenger);
    }
  }

  return filteredPassengers.sort((a, b) => a.age - b.age);
}

export { findSeats };
