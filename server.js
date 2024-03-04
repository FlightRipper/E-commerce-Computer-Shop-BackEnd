// installed node packages express and boyd parser and mysql
import express from 'express';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import subcategoryRouter from './routes/subcategoryRoute.js';
import orderRouter from './routes/orderRoutes.js';
import contactUsRouter from './routes/contactUsRoutes.js';
import postRouter from './routes/postRoutes.js';
import cartProductRouter from './routes/cartProductRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from "openai";



const app = express();

app.use(cors());

app.use(bodyParser.json());
//altering the app and refreshing it after in change in the tables

//This middleware is responsible for parsing the JSON data in the request body and making it available in req.body.
app.use(express.json());
// corse middleware is responsible for to handle cors policy between the front and the back

// const openai = new OpenAI({
//   apiKey: "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",
// });
// const response = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   messages: [
//     {
//       "role": "system",
//       "content": "You are TechTrove, a chatbot that reluctantly answers questions with technical responses."
//     },
//     { role: "user", content: "Who won the world series in 2020?" },
//   ]
// });

// app.post('/openai', async (req, res) => {
//   const prompt = req.body.prompt;
//   console.log(req.body)
//   const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: `${prompt}`,
//     max_tokens: 3900,
//     temperature: 0.7,

//   })
//   res.status(200).send(completion.data.choices[0].text)
// })
//middleware for sending static images
app.use('/uploads', express.static('uploads'));
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/contactus', contactUsRouter);
app.use('/subcategories', subcategoryRouter);
app.use('/orders', orderRouter);
app.use('/posts', postRouter);
app.use('/cartproducts', cartProductRouter);

//app connection
app.listen(5000, () => {
  console.log('app is running and listening on port 5000');
});
