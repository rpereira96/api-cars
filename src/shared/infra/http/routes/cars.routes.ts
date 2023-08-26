import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAutheticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController  = new CreateCarSpecificationController();

carsRoutes.post(
  "/",
  ensureAutheticated, 
  ensureAdmin, 
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id", 
  ensureAutheticated, 
  ensureAdmin, 
  createCarSpecificationController.handle
)

export { carsRoutes }