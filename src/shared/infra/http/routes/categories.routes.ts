import { Router } from 'express';
import multer from 'multer';

import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ensureAutheticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",   
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post(
  "/", 
  ensureAutheticated, 
  ensureAdmin, 
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post(
  "/import", 
  upload.single("file"), 
  ensureAutheticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes }