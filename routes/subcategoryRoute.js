import express from "express";
import SubCategoryController from "../controllers/subcategoryController.js";
import protect from "../middlewares/authMiddleware.js";
import protectCreator from "../middlewares/creatorProtectMiddleware.js";

const subcategoryRouter = express.Router();

// Create a new product
subcategoryRouter.post('/add/:id', SubCategoryController.createSubCategory); //admin only

// Get all products
subcategoryRouter.get('/:id', SubCategoryController.getAllSubCategories);

//get a product by ID
subcategoryRouter.get('/single/:id', SubCategoryController.getSubCategory);

//get all subcategories by category id
subcategoryRouter.get('/', SubCategoryController.getAllSubCategoriesTotal);

export default subcategoryRouter;