import prisma from "../config/prisma.js";
import {
  type BoardingData,
  type PassangerData
} from "../interfaces/flightInterface.js";

import { type purchase } from "../interfaces/dbInterfaces.js";
import transformKeysToCamelCase from "../utils/snakeToCamel.js";

async function getFlightData(flightId: number): Promise<BoardingData | null> {
  const flighData: any = await prisma.flight.findUnique({
    where: {
      flight_id: flightId
    }
  });
  return transformKeysToCamelCase(flighData);
}

async function getPassengerInfo(passengerId: number): Promise<PassangerData> {
  const passangerInfo: any = await prisma.passenger.findUnique({
    where: {
      passenger_id: passengerId
    }
  });

  return transformKeysToCamelCase(passangerInfo);
}

async function getTicketsData(purchaseId: number): Promise<purchase | boolean> {
  const purchase = await prisma.purchase.findUnique({
    where: { purchase_id: purchaseId },
    include: { boarding_pass: true }
  });
  if (purchase == null) return false;
  const [flightId] = purchase.boarding_pass.map((bp) => bp.flight_id);
  const flightDetails = transformKeysToCamelCase(await getFlightData(flightId));
  const passengerIds = purchase.boarding_pass.map((bp) => bp.passenger_id);
  const passengerInfo = await Promise.all(
    passengerIds.map(async (id) =>
      transformKeysToCamelCase(await getPassengerInfo(id))
    )
  );
  const boardingPassData = purchase.boarding_pass.map((bp) => {
    const passenger = passengerInfo.find(
      (pi) => pi.passengerId === bp.passenger_id
    );
    return {
      passengerId: passenger.passengerId,
      dni: passenger.dni,
      name: passenger.name,
      age: passenger.age,
      country: passenger.country,
      boardingPassId: bp.boarding_pass_id,
      purchaseId: bp.purchase_id,
      seatTypeId: bp.seat_type_id,
      seatId: bp.seat_id
    };
  });
  return {
    ...flightDetails,
    passenger: boardingPassData
  };
}

export { getTicketsData };
