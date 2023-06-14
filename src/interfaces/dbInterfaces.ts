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
}

export type { Purchase, BoardingPass };
