import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            required: [true, 'Please add a value']
        }
    }, {
    timestamps: true,
}
)

const Goals = mongoose.model('Goal', goalSchema);

export default Goals; 