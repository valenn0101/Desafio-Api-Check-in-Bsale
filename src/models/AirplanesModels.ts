const airplane1 = {
  type: "AirNova-660",
  airplane_id: 1,
  classes: [
    {
      name: "Primera Clase",
      seatType: 1,
      groups: [
        { rows: 2, columns: 4 },
        { rows: 2, columns: 4 }
      ]
    },
    {
      name: "Económica Premium",
      seatType: 2,
      groups: [
        { rows: 3, columns: 8 },
        { rows: 3, columns: 8 }
      ]
    },
    {
      name: "Clase Económica 3",
      seatType: 3,
      groups: [
        { rows: 3, columns: 16 },
        { rows: 3, columns: 16 }
      ]
    }
  ],
  totalSeats: 160
};

const airplane2 = {
  type: "AirMax-720neo",
  airplane_id: 2,
  classes: [
    {
      name: "Primera Clase",
      seatType: 1,
      groups: [
        { rows: 1, columns: 5 },
        { rows: 1, columns: 5 },
        { rows: 1, columns: 5 }
      ]
    },
    {
      name: "Económica Premium",
      seatType: 2,
      groups: [
        { rows: 2, columns: 6 },
        { rows: 3, columns: 6 },
        { rows: 2, columns: 6 }
      ]
    },
    {
      name: "Clase Económica",
      seatType: 3,
      groups: [
        { rows: 2, columns: 14 },
        { rows: 3, columns: 14 },
        { rows: 2, columns: 14 }
      ]
    }
  ],
  totalSeats: 155
};

export { airplane1, airplane2 };
