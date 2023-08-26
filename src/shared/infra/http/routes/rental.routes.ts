import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express"; 
import { ensureAutheticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post(
  "/",
  ensureAutheticated,
  createRentalController.handle
);

export { rentalRoutes };