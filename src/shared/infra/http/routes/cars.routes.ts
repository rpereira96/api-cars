import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAutheticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import multer from "multer";
import uploadConfig from "@config/upload";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController  = new CreateCarSpecificationController();
const uploadingCarsImageController = new UploadCarImageController();

const uploadImage = multer(uploadConfig.upload("./tmp/cars"));

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

carsRoutes.post(
  "/images/:id", 
  ensureAutheticated, 
  ensureAdmin,
  uploadImage.array("images"),   
  uploadingCarsImageController.handle)

export { carsRoutes }