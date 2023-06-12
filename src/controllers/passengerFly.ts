import { type Request, type Response } from "express";

const flightController = (req: Request, res: Response): string[] => {
  res.json({ message: "Welcome to api :)" });
};

export default flightController;
