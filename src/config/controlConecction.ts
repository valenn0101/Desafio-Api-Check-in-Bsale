import prisma from "./prisma.js";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    // Realiza la reconexión después de un tiempo determinado
    setTimeout(connectToDatabase, 5000);
  }
};

export const disconnectFromDatabase = async () => {
  await prisma.$disconnect();
};
