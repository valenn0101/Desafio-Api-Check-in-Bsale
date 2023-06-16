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
}

interface Airplane {
  airplane_id: number;
  name: string;
  flight?: Flight[];
  seat?: Seat[];
}
interface Seat {
  seat_id: number;
  seat_column: string;
  seat_row: number;
  seat_type_id: number;
  airplane_id: number;
}

export type { Purchase, BoardingPass, Airplane, Seat };
