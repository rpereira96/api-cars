import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express"; 
import { ensureAutheticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post(
  "/",
  ensureAutheticated,
  createRentalController.handle
);

rentalRoutes.post(
  "/devolution/:id",
  ensureAutheticated,
  devolutionRentalController.handle
);

export { rentalRoutes };