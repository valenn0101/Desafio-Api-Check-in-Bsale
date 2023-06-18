interface Purchase {
  purchase_id: number;
  purchase_date: number;
  boarding_pass?: BoardingPass[];
}

interface BoardingPass {
  boarding_pass_id: number;
  purchase_id: number;
  passenger_id: number;
  seat_type_id: number;
  seat_id: number | null;
  flight_id: number;
  airplane_id?: number;

  boardingPassId?: number;
  purchaseId?: number;
  passengerId?: number;
  seatTypeId?: number;
  seatId?: number | null;
  flightId?: number;
  airplaneId?: number;
}

interface Airplane {
  airplane_id: number;
  name: string;
  flight?: Flight[];
  seat?: Seat[];
}
interface Seat {
  seat_id: number;
  seatId?: number | any;
  seat_column: string;
  seat_row: number;
  seat_type_id: number;
  airplane_id: number;
}
interface Seats {
  seatId: number;
  seatColumn: string;
  seatRow: number;
  seatTypeId: number;
  airplaneId: number;
  boardingPass?: BoardingPass[] | undefined;
}

export type { Purchase, BoardingPass, Airplane, Seat, Seats };
