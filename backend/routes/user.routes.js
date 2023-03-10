import { Router } from "express";
import Controller from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post('/', Controller.registerUser);
userRouter.post('/login', Controller.loginUser);
userRouter.get('/me', Controller.getMe);

export default userRouter;