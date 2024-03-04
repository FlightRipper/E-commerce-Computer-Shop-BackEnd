import express from "express";
import PostController from "../controllers/postController.js";
import upload from "../middlewares/multer.js";
import protect from "../middlewares/authMiddleware.js";
import protectCreator from "../middlewares/creatorProtectMiddleware.js";

const postRouter = express.Router();

postRouter.get('/', PostController.getallposts);

postRouter.get('/single/:id', PostController.getPost);

postRouter.patch('/image/:id', upload.single("image"), PostController.updatePostimage); //protect
    
postRouter.get('/user/:id', PostController.getuserPosts); //protect

postRouter.patch('/:id', PostController.updatePost); //protect

postRouter.delete('/:id', PostController.deletePost); //protect

postRouter.post('/add', upload.single("image"), PostController.createPost); // protectCreator

export default postRouter;