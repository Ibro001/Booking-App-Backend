import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'
const app = express();


dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongoDB');
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!'); 
});  

//middlewares//

app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute); 
app.use('/api/users', usersRoute); 
app.use('/api/hotels', hotelsRoute); 
app.use('/api/rooms', roomsRoute); 

app.use((error,req,res,next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.Message || 'Something went wrong';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack,
    })
})

app.listen(9000, () => {
    connect();
    console.log('server running on port 9000');
})