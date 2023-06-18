interface BoardingData {
  flightId: number;
  takeOffDateTime: number;
  takeOffAirport: string;
  landingDateTime: number;
  landingAirport: string;
  airplaneId: number;
  passengers?: PassengerData;
}

interface Flight {
  flight_id: number;
  takeoff_date_time: number;
  takeoff_airport: string;
  landing_date_time: number;
  landing_airport: string;
  airplane_id: number;
  airplaneId?: number;
}

interface PassengerData {
  passenger_id: number;
  passengerId?: number;
  dni: number;
  name: string;
  age: number;
  country: string;
  boardingPasses?: number;
  purchaseId?: number;
  seatTypeId?: number;
  seatId?: number;
}
interface PassengerCases {
  allNull: PassengerData[];
  someNull: PassengerData[];
  allDefined: PassengerData[];
}

interface FlightDetails {
  flightId: number;
  dni: number;
  name: string;
  age: number;
  country: string;
  airplaneId: number;
}

export type {
  BoardingData,
  PassengerData,
  Flight,
  FlightDetails,
  PassengerCases
};
