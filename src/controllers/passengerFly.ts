import { type Request, type Response } from "express";
import { getTicketsData } from "../services/baseService.js";

const flightController = async (req: Request, res: Response): Promise<any> => {
  const flightId: any = Number(req.params.id);
  try {
    const flyData = await getTicketsData(flightId);
    if (flyData === false) {
      return res.status(404).json({ code: 404, data: {} });
    }
    res.status(200).json({ code: 200, data: flyData });
  } catch (error) {
    console.error(error);
    res.status(400).json({ code: 500, errors: "could not connect to db" });
  }
};

export default flightController;
