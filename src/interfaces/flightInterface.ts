interface BoardingData {
  flightId: number;
  takeOffDateTime: number;
  takeOffAirport: string;
  landingDateTime: number;
  landingAirport: string;
  airplaneId: number;
  passengers?: [];
}

interface PassangerData {
  passengerId: number;
  dni: string;
  name: string;
  age: number;
  country: string;
}

export type { BoardingData, PassangerData };
