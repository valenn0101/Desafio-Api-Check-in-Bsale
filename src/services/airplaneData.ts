import transformKeysToCamelCase from "../utils/snakeToCamel.js";
import prisma from "../config/prisma.js";
import { type Airplane } from "../interfaces/dbInterfaces.js";

async function getAirplaneData(airplaneId: number | any): Promise<Airplane[]> {
  const airplaneData = await prisma.airplane.findUnique({
    where: {
      airplane_id: airplaneId
    }
  });

  return transformKeysToCamelCase(airplaneData);
}

export { getAirplaneData };
