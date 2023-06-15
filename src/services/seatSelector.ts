import prisma from "../config/prisma.js";

// Consulta si existe un asiento = null
// en el litado de pasajeros de un boleto
function findSeats(seatIds: number[]): boolean {
  return seatIds.some((seatId) => seatId === null);
}

// Generates a seat matrix based on the airplane model
async function generateSeatMatrix(airplane: any): Promise<any[]> {
  const airplaneId = airplane.airplane_id;
  const seatList = await prisma.seat.findMany({
    where: {
      airplane_id: airplaneId
    },
    include: {
      boarding_pass: true
    }
  });
  const seatMatrix = [];
  let seatIndex = 0;

  for (const classInfo of airplane.classes) {
    for (const group of classInfo.groups) {
      const seatsInGroup = [];
      const seatsInRow = new Array(group.columns).fill(null);

      for (let row = 0; row < group.rows; row++) {
        if (seatIndex < seatList.length) {
          seatsInRow.fill(
            JSON.parse(JSON.stringify(seatList[seatIndex])),
            0,
            group.columns
          );
          seatIndex++;
        } else {
          break;
        }

        seatsInGroup.push([...seatsInRow]);
      }

      seatMatrix.push(seatsInGroup, []);
    }
  }

  return seatMatrix;
}

export { findSeats, generateSeatMatrix };
