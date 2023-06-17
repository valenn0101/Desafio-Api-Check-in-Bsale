import {
  Airplane,
  AirplaneClass,
  AirplaneGroup
} from "../interfaces/airplaneInterface.js";

const airplane1 = new Airplane(
  "AirNova-660",
  1,
  [
    new AirplaneClass("Primera Clase", 1, [
      new AirplaneGroup(2, 4, ["", ""], []),
      // ventana
      new AirplaneGroup(2, 4, ["G", "F"], [1, 2, 3, 4]),
      // pasillo
      new AirplaneGroup(2, 4, ["", ""], []),
      // pasillo
      new AirplaneGroup(2, 4, ["B", "A"], [1, 2, 3, 4]),
      // ventana
      new AirplaneGroup(2, 4, ["", ""], [])
    ]),
    new AirplaneClass("Económica Premium", 2, [
      new AirplaneGroup(3, 8, ["", "", ""], []),
      // ventana

      new AirplaneGroup(3, 8, ["G", "F", "E"], [8, 9, 10, 11, 12, 13, 14, 15]),
      // pasillo

      new AirplaneGroup(3, 8, ["", "", ""], []),
      // pasillo

      new AirplaneGroup(3, 8, ["C", "B", "A"], [8, 9, 10, 11, 12, 13, 14, 15]),
      // ventana

      new AirplaneGroup(3, 8, ["", "", ""], [])
    ]),
    new AirplaneClass("Clase Económica", 3, [
      // ventana

      new AirplaneGroup(3, 16, ["", "", ""], []),
      new AirplaneGroup(
        3,
        16,
        ["G", "F", "E"],
        [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
      ),
      // pasillo

      new AirplaneGroup(3, 1, ["", "", ""], []),
      // pasillo

      new AirplaneGroup(
        3,
        16,
        ["C", "B", "A"],
        [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
      ),
      // ventana

      new AirplaneGroup(3, 16, ["", "", ""], [])
    ])
  ],
  160
);

const airplane2 = new Airplane(
  "AirMax-720neo",
  1,
  [
    new AirplaneClass("Primera Clase", 1, [
      new AirplaneGroup(1, 5, ["", ""], []),
      // ventana
      new AirplaneGroup(1, 5, ["I"], [1, 2, 3, 4, 5]),
      // pasillo
      new AirplaneGroup(1, 5, ["", ""], []),
      new AirplaneGroup(1, 5, ["E"], [1, 2, 3, 4, 5]),
      new AirplaneGroup(1, 5, ["", ""], []),
      // pasillo
      new AirplaneGroup(1, 5, ["A"], [1, 2, 3, 4, 5]),
      // ventana
      new AirplaneGroup(1, 5, ["", ""], [])
    ]),
    new AirplaneClass("Económica Premium", 2, [
      new AirplaneGroup(3, 6, ["", "", ""], []),
      // ventana
      new AirplaneGroup(2, 6, ["I", "H"], [9, 10, 11, 12, 13, 14]),
      // pasillo
      new AirplaneGroup(3, 6, ["", "", ""], []),
      new AirplaneGroup(3, 6, ["F", "E", "D"], [9, 10, 11, 12, 13, 14]),
      new AirplaneGroup(3, 6, ["", "", ""], []),
      // pasillo
      new AirplaneGroup(2, 6, ["B", "A"], [9, 10, 11, 12, 13, 14]),
      // ventana
      new AirplaneGroup(3, 6, ["", "", ""], [])
    ]),
    new AirplaneClass("Clase Económica", 3, [
      new AirplaneGroup(3, 16, ["", "", ""], []),
      // ventana
      new AirplaneGroup(
        2,
        14,
        ["I", "H"],
        [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      ),
      // pasillo
      new AirplaneGroup(3, 1, ["", "", ""], []),
      new AirplaneGroup(
        3,
        14,
        ["F", "E", "D"],
        [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      ),
      new AirplaneGroup(3, 1, ["", "", ""], []),
      // pasillo
      new AirplaneGroup(
        2,
        14,
        ["B", "A"],
        [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      ),
      // ventana
      new AirplaneGroup(3, 16, ["", "", ""], [])
    ])
  ],
  160
);
export { airplane1, airplane2 };
