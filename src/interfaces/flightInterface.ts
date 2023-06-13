interface purchaseId {
  code: number;
}

interface BoardingData {
  flightId: number;
  takeOffDateTime: number;
  takeOffAirport: string;
  landingDateTime: number;
  landingAirport: string;
  airplaneId: number;
  passengers: [];
}

export type { purchaseId, BoardingData };
