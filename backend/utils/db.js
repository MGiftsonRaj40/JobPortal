import mongoose from "mongoose";
const connectDB = async () =>{
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is not set. Create backend/.env with your MongoDB connection string.");
    }

    try{
        await mongoose.connect(mongoUri);
        console.log('mongodb connected successfully');
    }catch (error){
        console.log(error);
        throw error;
    } 
}
export default connectDB;
