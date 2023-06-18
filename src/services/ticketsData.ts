// @ts-nocheck

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

import {
  getSeatsData,
  findAdjacentSeatsBySeatId,
  findAdjacentSeatsForGroup
} from "../services/seatSelected.js";

export async function getTicketsData(
  purchaseId: number
): Promise<PassengerData | boolean | any> {
  const purchaseData = await prisma.purchase.findUnique({
    where: { purchase_id: purchaseId },
    include: { boarding_pass: true }
  });

  if (purchaseData == null) return false;

  const [flightDetails, passengerInfo] = await Promise.all([
    getFlightDetails(purchaseData),
    getPassengerInfoForBoardingPasses(purchaseData.boarding_pass)
  ]);

  const boardingPassData = createBoardingPassData(
    purchaseData.boarding_pass,
    passengerInfo
  );

  const whatIsThePlane = flightDetails.theAirplane;
  const plane = getPlane(whatIsThePlane.name);
  const seats = await getSeatsData(plane);
  const seatIds = boardingPassData.map((passenger) => passenger.seatId);

  if (seatIds.every((id) => id !== null)) {
    return;
  } else if (seatIds.every((id) => id === null)) {
    const seatsAleatorios = findAdjacentSeatsForGroup(
      boardingPassData,
      seats,
      3
    );
    seatsAleatorios[0].forEach((seat, index) => {
      boardingPassData[index].seatId = seat.seatId;
    });
  } else {
    const adyacentes = findAdjacentSeatsBySeatId(seatIds, seats);

    const adyacentesList = adyacentes[0];
    let adyacentesIndex = 0;

    for (let i = 0; i < boardingPassData.length; i++) {
      const passenger = boardingPassData[i];
      if (passenger.seatId === null) {
        if (adyacentesIndex < adyacentesList.length) {
          passenger.seatId = adyacentesList[adyacentesIndex].seatId;
          adyacentesIndex++;
        } else {
          break;
        }
      }
    }
  }

  return {
    ...flightDetails.flightDetails,
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
function getPlane(whatIsThePlane) {
  if (whatIsThePlane === "AirNova-660") {
    return 1;
  } else {
    return 2;
  }
}
