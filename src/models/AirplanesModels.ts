const airplane1 = {
  type: "AirNova-660",
  airplane_id: 1,
  classes: [
    {
      name: "Primera Clase",
      seatType: 1,
      groups: [
        {
          rows: 2,
          columns: 4,
          rowsLabel: ["G", "F"],
          columnsLabel: [1, 2, 3, 4]
        },
        {
          rows: 2,
          columns: 4,
          rowsLabel: ["B", "A"],
          columnsLabel: [1, 2, 3, 4]
        }
      ]
    },
    {
      name: "Económica Premium",
      seatType: 2,
      groups: [
        {
          rows: 3,
          columns: 8,
          rowsLabel: ["G", "F", "E"],
          columnsLabel: [8, 9, 10, 11, 12, 13, 14, 15]
        },
        {
          rows: 3,
          columns: 8,
          rowsLabel: ["C", "B", "A"],
          columnsLabel: [8, 9, 10, 11, 12, 13, 14, 15]
        }
      ]
    },
    {
      name: "Clase Económica",
      seatType: 3,
      groups: [
        {
          rows: 3,
          columns: 16,
          rowsLabel: ["G", "F", "E"],
          columnsLabel: [
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34
          ]
        },
        {
          rows: 3,
          columns: 16,
          rowsLabel: ["C", "B", "A"],
          columnsLabel: [
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34
          ]
        }
      ]
    }
  ],
  totalSeats: 160
};

const airplane2 = {
  type: "AirMax-720",
  airplane_id: 2,
  classes: [
    {
      name: "Primera Clase",
      seatType: 1,
      groups: [
        {
          rows: 1,
          columns: 5,
          rowsLabel: ["I"],
          columnsLabel: [1, 2, 3, 4, 5]
        },
        {
          rows: 1,
          columns: 5,
          rowsLabel: ["E"],
          columnsLabel: [1, 2, 3, 4, 5]
        },
        { rows: 1, columns: 5, rowsLabel: ["A"], columnsLabel: [1, 2, 3, 4, 5] }
      ]
    },
    {
      name: "Económica Premium",
      seatType: 2,
      groups: [
        {
          rows: 2,
          columns: 6,
          rowsLabel: ["I", "H"],
          columnsLabel: [9, 10, 11, 12, 13, 14]
        },
        {
          rows: 3,
          columns: 6,
          rowsLabel: ["F", "E", "D"],
          columnsLabel: [9, 10, 11, 12, 13, 14]
        },
        {
          rows: 1,
          columns: 6,
          rowsLabel: ["B"],
          columnsLabel: [9, 10, 11, 12, 13, 14]
        }
      ]
    },
    {
      name: "Clase Económica",
      seatType: 3,
      groups: [
        {
          rows: 2,
          columns: 14,
          rowsLabel: ["I", "H"],
          columnsLabel: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        },
        {
          rows: 3,
          columns: 14,
          rowsLabel: ["F", "E", "D"],
          columnsLabel: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        },
        {
          rows: 2,
          columns: 14,
          rowsLabel: ["B", "A"],
          columnsLabel: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        }
      ]
    }
  ],
  totalSeats: 155
};

export { airplane1, airplane2 };
