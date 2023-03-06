const Controller = {}
import expressAsyncHandler from 'express-async-handler';


Controller.getGoals = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get goals' });
})

Controller.postGoals = expressAsyncHandler(async (req, res) => {
    console.log(req.body.text);
    if (!req.body.text) {
        res.status(400)
        throw new Error('Plase add a text field');
    }

    res.status(200).json({ message: 'Set goals' });
})

Controller.putGoals = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goals ${req.params.id}` });
})

Controller.deleteGoals = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete goals ${req.params.id}` });
})



export default Controller;