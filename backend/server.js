import express from "express";
import dotenv from 'dotenv';
import router from "./routes/goals.routes.js";
import userRouter from './routes/user.routes.js';
import colors from 'colors';
import connectDB from "./databases/mongoose.databases.js";
import errorHandler from './middlewares/error.middlewares.js';

//Config
const app = express();
dotenv.config({ path: './.env' });
const port = process.env.PORT || 3000;
connectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//Routes
app.use('/api/goals', router);
app.use('/api/users', userRouter);


//PORT listening
app.listen(port, () => console.log(`Server runningon port: ${port}`));