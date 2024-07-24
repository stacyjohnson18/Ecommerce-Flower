import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { CategoryController, UpdateCategoryController, deleteCategoryController, getCategoryController, getCategoryPhotoController, singleCategoryController } from "../controllers/CategoryController.js";

import formidable from "express-formidable"
const routes = express.Router();

// add category
routes.post("/create-category", requireSignIn, isAdmin, formidable(), CategoryController);

//update category
routes.put("/update-category/:id", requireSignIn, isAdmin, UpdateCategoryController);

// get All category
routes.get('/get-category', getCategoryController);

routes.get('/category-photo/:pid', getCategoryPhotoController);

//single category
routes.get('/single-category/:slug', singleCategoryController)

//delete category
routes.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);


export default routes;