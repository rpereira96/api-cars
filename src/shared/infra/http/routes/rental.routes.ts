import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express"; 
import { ensureAutheticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsBuUseController = new ListRentalsByUserController();

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

rentalRoutes.get(
  "/user", 
  ensureAutheticated, 
  listRentalsBuUseController.handle
);

export { rentalRoutes };