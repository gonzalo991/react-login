import { Router } from "express";
import Controller from "../controllers/goals.controllers.js";
import Authentication from '../middlewares/jsonwebtoken.middlewares.js'

const router = Router();

router.get('/', Authentication, Controller.getGoals);
router.post('/', Authentication, Controller.postGoals);
router.put('/:id', Authentication, Controller.putGoals);
router.delete('/:id', Authentication, Controller.deleteGoals);


export default router;