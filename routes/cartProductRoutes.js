import express from "express";
import CartController from "../controllers/productCartController.js";
import protect from "../middlewares/authMiddleware.js";

const cartProductRouter = express.Router();

cartProductRouter.post("/add", CartController.CreateCart); //protect

cartProductRouter.delete("/delete/:id", CartController.deleteCart); //protect

cartProductRouter.get("/get/:id", CartController.getCart); //protect

cartProductRouter.get("/getall/:id", CartController.getAllCarts); //protect

export default cartProductRouter