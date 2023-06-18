import { Router } from "express";
import flightController from "../../controllers/passengerFly.js";
const router = Router();

router.get("/:id/passengers", flightController);

export default router;
