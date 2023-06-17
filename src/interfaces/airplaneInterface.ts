export interface Seat {
  seatId: number;
  row: string;
  column: number;
  occupied: boolean;
  seatTypeId: number;
  airplaneId: number;
}

export class Airplane {
  type: string;
  airplane_id: number;
  classes: AirplaneClass[];
  totalSeats: number;

  constructor(
    type: string,
    airplane_id: number,
    classes: AirplaneClass[],
    totalSeats: number
  ) {
    this.type = type;
    this.airplane_id = airplane_id;
    this.classes = classes;
    this.totalSeats = totalSeats;
  }
}

export class AirplaneClass {
  name: string;
  seatType: number;
  groups: AirplaneGroup[];

  constructor(name: string, seatType: number, groups: AirplaneGroup[]) {
    this.name = name;
    this.seatType = seatType;
    this.groups = groups;
  }
}

export class AirplaneGroup {
  rows: number;
  columns: number;
  rowsLabel: string[];
  columnsLabel: number[];
  seats: Seat[][];

  constructor(
    rows: number,
    columns: number,
    rowsLabel: string[],
    columnsLabel: number[]
  ) {
    this.rows = rows;
    this.columns = columns;
    this.rowsLabel = rowsLabel;
    this.columnsLabel = columnsLabel;
    this.seats = [];
    this.initializeSeats();
  }

  initializeSeats(): void {
    for (let i = 0; i < this.rows; i++) {
      const row: Seat[] = [];
      for (let j = 0; j < this.columns; j++) {
        const seat: Seat = {
          seatId: -1, // Asignar un valor único a cada asiento
          row: this.rowsLabel[i],
          column: this.columnsLabel[j],
          occupied: false,
          seatTypeId: -1, // Asignar el tipo de asiento correspondiente
          airplaneId: -1 // Asignar el ID del avión correspondiente
        };
        row.push(seat);
      }
      this.seats.push(row);
    }
  }
}
