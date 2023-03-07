import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a value']
    }
}, {
    timestamps: true,
})

const Goals = mongoose.model('Goal', goalSchema);

export default Goals; 