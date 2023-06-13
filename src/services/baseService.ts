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

async function getTicketsData(purchaseId: number): Promise<purchase | boolean> {
  const purchase = await prisma.purchase.findUnique({
    where: { purchase_id: purchaseId },
    include: { boarding_pass: true }
  });
  if (purchase == null) return false;

  const boardingPasses = purchase.boarding_pass.map(transformKeysToCamelCase);
  const flightId = purchase.boarding_pass[0].flight_id;
  const flightInfo = await getFlightData(flightId);
  const flightDetails = transformKeysToCamelCase(flightInfo);
  return { ...flightDetails, boardingPass: boardingPasses };
}

export { getTicketsData };
