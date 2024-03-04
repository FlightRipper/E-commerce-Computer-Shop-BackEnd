import express from 'express';
import usersController from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';
import protectCreator from '../middlewares/creatorProtectMiddleware.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router();

// Create a new user
userRouter.post('/register', upload.single('image'), usersController.createUser);

//loging user
userRouter.post('/login', usersController.loginUser);

// Get all users
userRouter.get('/', usersController.getAllUsers); //protectCreator only

//get a user by ID
userRouter.get('/:id', usersController.findUserById); //protectCreator

//update user
userRouter.patch('/:id', usersController.updateUser); //protect

//delete a user
userRouter.delete('/:id', usersController.deleteUser); //protectCreator only

//Update user profile
userRouter.patch('/updatepicture/:id', upload.single('image'), usersController.UpdateUserProfile);

export default userRouter;