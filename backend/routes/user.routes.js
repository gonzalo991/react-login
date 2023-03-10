import { Router } from "express";
import Controller from "../controllers/user.controllers.js";
import Authentication from '../middlewares/jsonwebtoken.middlewares.js';

const userRouter = Router();

userRouter.post('/', Controller.registerUser);
userRouter.post('/login', Controller.loginUser);
userRouter.get('/me', Authentication, Controller.getMe);

export default userRouter;