import { connect } from "mongoose";
import "dotenv/config";
export const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI as string);
    } catch (error) {
    }
}