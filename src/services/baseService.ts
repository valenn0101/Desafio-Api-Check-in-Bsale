import prisma from "../config/prisma.js";
import {
  type BoardingData,
  type purchaseId
} from "../interfaces/flightInterface.js";

import { type purchase } from "../interfaces/dbInterfaces.js";

async function getFlyData(code: purchaseId): Promise<purchase | boolean> {
  const purchaseData = await prisma.purchase.findUnique({
    where: {
      purchase_id: Number(code)
    }
  });
  if (purchaseData == null) return false;

  return purchaseData;
}

export { getFlyData };
