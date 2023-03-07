import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/mernapp");
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;