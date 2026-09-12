import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config()

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log(`Database connected successfully`)

    } catch (err) {
        console.error("Failure to connect to database: ", err)
        process.exit(1);
    }

}

export default connectDB
