import express from 'express';
import OrderController from '../controllers/orderController.js';
import protect from '../middlewares/authMiddleware.js';
import Order from '../models/ordermodel.js';
import protectCreator from '../middlewares/creatorProtectMiddleware.js';

const orderRouter = express.Router();

// Create a new product
orderRouter.post('/add', OrderController.createOrder); // protect

// Get all products
orderRouter.get('/', OrderController.getAllOrders); //admin

//get a product by ID
orderRouter.get('/single/:id', OrderController.getOrder); //protect

orderRouter.get('/:id', OrderController.getOrdersOfUser); //protect

orderRouter.patch('/status/:id', OrderController.updateOrderStatus); //admin

orderRouter.patch('/cancel/:id', OrderController.cancelOrder); //protect

orderRouter.delete('/:id', OrderController.deleteOrder); //admin

orderRouter.get('/getactive/:id', OrderController.getActiveOrders); //protect

export default orderRouter;