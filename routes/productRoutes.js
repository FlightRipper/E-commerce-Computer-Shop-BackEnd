import express from 'express';
import ProductController from '../controllers/productController.js';;
import protect from '../middlewares/authMiddleware.js';
import protectCreator from '../middlewares/creatorProtectMiddleware.js';
import upload from '../middlewares/multer.js';


const productRouter = express.Router();

// Create a new product
productRouter.post('/add', upload.single('image'), ProductController.createProduct); //admin only

// Get all products
productRouter.get('/', ProductController.getAllProducts);

//get a product by ID
productRouter.get('/single/:id', ProductController.getProduct);

//update product
productRouter.patch('/:id', ProductController.updateProduct); //protectCreator only

//delete a product
productRouter.delete('/:id', ProductController.deleteProduct); //protectCreator only

//update product image
productRouter.patch('/image/:id', upload.single('image'), ProductController.UpdateProductImage); //protectCreator only

//update product quantity
productRouter.patch("/quantity/:id", ProductController.updateProductquantity); //protectCreator

productRouter.get('/featured', ProductController.getFeauturedProducts);

productRouter.get('/subcategory/:id', ProductController.getSubcategoryProducts);

export default productRouter;