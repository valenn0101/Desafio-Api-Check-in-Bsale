import prisma from "../config/prisma.js";
import { type BoardingPass } from "../interfaces/dbInterfaces.js";
import {
  type FlightDetails,
  type PassengerData
} from "../interfaces/dataInterfaces.js";
import transformKeysToCamelCase from "../utils/snakeToCamel.js";
import { getFlightData } from "./flightData.js";
import { getPassengerInfo } from "./passengerInfo.js";

async function getTicketsData(
  purchaseId: number
): Promise<PassengerData | boolean> {
  const purchaseData = await prisma.purchase.findUnique({
    where: { purchase_id: purchaseId },
    include: { boarding_pass: true }
  });

  if (purchaseData == null) return false;

  const [flightDetails, passengerInfo] = await Promise.all([
    getFlightDetails(purchaseData),
    getPassengerInfoForBoardingPasses(purchaseData.boarding_pass)
  ]);

  console.log(flightDetails, passengerInfo);

  const boardingPassData = createBoardingPassData(
    purchaseData.boarding_pass,
    // @ts-expect-error idk
    passengerInfo
  );

  return {
    ...flightDetails,
    // @ts-expect-error idk
    passengers: boardingPassData
  };
}

async function getFlightDetails(purchaseData: any): Promise<FlightDetails> {
  const [flightId] = purchaseData.boarding_pass.map((bp: any) => bp.flight_id);
  const flightDetails = await getFlightData(flightId);
  return transformKeysToCamelCase(flightDetails);
}

async function getPassengerInfoForBoardingPasses(
  boardingPasses: BoardingPass[]
): Promise<BoardingPass[]> {
  const passengerIds = boardingPasses.map((bp) => bp.passenger_id);
  const passengerInfo = await Promise.all(
    passengerIds.map(async (id) =>
      transformKeysToCamelCase(await getPassengerInfo(id))
    )
  );
  return passengerInfo;
}

function createBoardingPassData(
  boardingPasses: BoardingPass[],
  passengerInfo: PassengerData[]
): any[] {
  const passengerMap = new Map(passengerInfo.map((p) => [p.passengerId, p]));
  return boardingPasses.map((bp) => ({
    ...passengerMap.get(bp.passenger_id),
    boardingPassId: bp.boarding_pass_id,
    purchaseId: bp.purchase_id,
    seatTypeId: bp.seat_type_id,
    seatId: bp.seat_id
  }));
}

export { getTicketsData };
