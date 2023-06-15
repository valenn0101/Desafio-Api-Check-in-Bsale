import prisma from "../config/prisma.js";
import { type BoardingPass } from "../interfaces/dbInterfaces.js";
import {
  type FlightDetails,
  type PassengerData
} from "../interfaces/dataInterfaces.js";
import transformKeysToCamelCase from "../utils/snakeToCamel.js";
import { getFlightData } from "./flightData.js";
import { getPassengerInfo } from "./passengerInfo.js";
import { getAirplaneData } from "./airplaneData.js";
import { findSeats, generateSeatMatrix } from "./seatSelector.js";
import { airplane1, airplane2 } from "../models/AirplanesModels.js";

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

  const whatIsThePlane = flightDetails.theAirplane;
  console.log("The airplane is: ", whatIsThePlane.name);

  console.log(await airplaneMatrix(whatIsThePlane.airplaneId));

  const boardingPassData = createBoardingPassData(
    purchaseData.boarding_pass,
    // @ts-expect-error idk
    passengerInfo
  );

  const seatIds = boardingPassData.map((passenger) => passenger.seatId);
  console.log("Seat IDs: ", seatIds);

  const existingSeats = findSeats(seatIds);
  console.log("Seats exist: ", existingSeats);

  // const seatName = passengerInfo.theSeatIs;
  // console.log("Seat name: ", seatName);

  return {
    ...flightDetails.flightDetails,
    // @ts-expect-error idk
    passengers: boardingPassData
  };
}

async function getFlightDetails(
  purchaseData: any
): Promise<{ theAirplane: any; flightDetails: FlightDetails }> {
  const [flightId] = purchaseData.boarding_pass.map((bp: any) => bp.flight_id);
  const flightDetails = await getFlightData(flightId);
  const avionInfo = await getAirplaneData(flightDetails.airplaneId);
  const theAirplane = avionInfo;
  flightDetails.airplaneId = purchaseData.airplaneId;
  return {
    theAirplane,
    flightDetails: transformKeysToCamelCase(flightDetails)
  };
}

async function getPassengerInfoForBoardingPasses(
  boardingPasses: BoardingPass[]
): Promise<{ passengerInfo: BoardingPass[] }> {
  const passengerIds = boardingPasses.map((bp) => bp.passenger_id);
  const passengerInfo = await Promise.all(
    passengerIds.map(async (id) =>
      transformKeysToCamelCase(await getPassengerInfo(id))
    )
  );
  // const seatInfo = await readSeatType(boardingPasses[0].seat_type_id);
  // const theSeatIs = seatInfo;
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

function airplaneMatrix(airplane: any): any {
  const $airplane1 = airplane1;
  const $airplane2 = airplane2;
  if (airplane === 1) {
    return generateSeatMatrix($airplane1);
  } else {
    return generateSeatMatrix($airplane2);
  }
}

export { getTicketsData };
