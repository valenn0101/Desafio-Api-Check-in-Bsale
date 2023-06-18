import prisma from "../config/prisma.js";
import { type Flight } from "../interfaces/dataInterfaces.js";
import transformKeysToCamelCase from "../utils/snakeToCamel.js";

async function getFlightData(flightId: number): Promise<Flight | null> {
  const flightData: Flight | null = await prisma.flight.findUnique({
    where: {
      flight_id: flightId
    }
  });
  return transformKeysToCamelCase(flightData);
}

export { getFlightData };
