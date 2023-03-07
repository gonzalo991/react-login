import express from "express";
import dotenv from 'dotenv';
import router from "./routes/goals.routes.js";
import colors from 'colors';
import connectDB from "./databases/mongoose.databases.js";
dotenv.config({ path: './.env' });
import errorHandler from './middlewares/error.middlewares.js';

//Config
const app = express();
const port = process.env.PORT || 3000;
connectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//Routes
app.use('/api/goals', router);


//PORT listening
app.listen(port, () => console.log(`Server runningon port: ${port}`));