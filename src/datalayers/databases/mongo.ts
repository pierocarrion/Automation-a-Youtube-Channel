import mongoose from "mongoose";
import 'dotenv/config'

console.log(process.env.DB_HOST )
const connectDB = mongoose.createConnection(process.env.DB_HOST as string)

export {
    connectDB,
}