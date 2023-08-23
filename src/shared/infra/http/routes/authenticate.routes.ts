import { Router } from "express"; 
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AutheticateUserUseController";

const autheticateRoutes = Router();

const autheticateUserController = new AuthenticateUserController();
autheticateRoutes.post("/sessions", autheticateUserController.handle);

export { autheticateRoutes }