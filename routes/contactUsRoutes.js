import express from "express";
import ContactUsController from "../controllers/contactusController.js";
import protectCreator from "../middlewares/creatorProtectMiddleware.js";

const contactUsRouter = express.Router();

contactUsRouter.post('/add', ContactUsController.createContactUs);

contactUsRouter.get('/', ContactUsController.getAllContactUs); //admin

contactUsRouter.get('/single/:id', ContactUsController.getContactUs); //admin

contactUsRouter.delete('/:id', ContactUsController.deleteContactUs); //admin

export default contactUsRouter