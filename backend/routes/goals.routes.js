import { Router } from "express";
import Controller from "../controllers/goals.controllers.js";

const router = Router();

router.get('/', Controller.getGoals);
router.post('/', Controller.postGoals);
router.put('/:id', Controller.putGoals);
router.delete('/:id', Controller.deleteGoals);


export default router;