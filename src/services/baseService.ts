import prisma from "../config/prisma.js";
import {
  type BoardingData,
  type purchaseId
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

async function getPassengerInfo(passengerId: number): Promise<any> {
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

  const flightId = purchase.boarding_pass[0].flight_id;
  const flightInfo = await getFlightData(flightId);
  const flightDetails = transformKeysToCamelCase(flightInfo);

  const passengerInfos = [];
  for (const boardingPass of purchase.boarding_pass) {
    const passengerId = boardingPass.passenger_id;
    const passengerInfo = await getPassengerInfo(passengerId);
    passengerInfos.push(transformKeysToCamelCase(passengerInfo));
    console.log("Passenger Info:", transformKeysToCamelCase(passengerInfo));
  }

  return {
    ...flightDetails,
    boardingPass: purchase.boarding_pass.map(transformKeysToCamelCase),
    passenger: passengerInfos
  };
}

export { getTicketsData };
