const Controller = {}
import expressAsyncHandler from 'express-async-handler';
import Goals from '../models/goal.models.js';
import User from '../models/user.models.js';

Controller.getGoals = expressAsyncHandler(async (req, res) => {
    const goals = await Goals.find({ user: req.user.id });

    res.status(200).json(goals);
});

Controller.postGoals = expressAsyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error('Plase add a text field');
    }

    const goal = await Goals.create({
        text: req.body.text,
        user: req.user.id
    });

    res.status(200).json(goal);
});

Controller.putGoals = expressAsyncHandler(async (req, res) => {
    const goal = await Goals.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id);

    //Check for user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    //make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedGoal);
});

Controller.deleteGoals = expressAsyncHandler(async (req, res) => {
    const goal = Goals.findById(req.params.id);

    const user = await User.findById(req.user.id);

    //Check for user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    //make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    await goal.remove();

    res.status(200).json({ id: req.params.id });
});

export default Controller;