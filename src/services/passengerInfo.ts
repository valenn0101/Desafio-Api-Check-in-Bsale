import prisma from "../config/prisma.js";
import { type PassengerData } from "../interfaces/dataInterfaces.js";
import transformKeysToCamelCase from "../utils/snakeToCamel.js";

async function getPassengerInfo(passengerId: number): Promise<PassengerData> {
  const passengerInfo = await prisma.passenger.findUnique({
    where: {
      passenger_id: passengerId
    }
  });

  if (passengerInfo != null) {
    // @ts-expect-error idk
    passengerInfo.dni = Number(passengerInfo.dni);
  }

  return transformKeysToCamelCase(passengerInfo) as PassengerData;
}

export { getPassengerInfo };
