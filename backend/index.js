import dotenv from 'dotenv';
if(process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from "./routes/Routes.js";


const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors({
    origin : ["http://localhost:3000", "http://localhost:5173"],
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

const start = async() => {
    const connectionDb = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MONGODB CONNECTED HOST: ${connectionDb.connection.host}`);

    app.listen(PORT, () => {
        console.log(`LISTENING ON PORT ${PORT}`);
        
    });
    
};

start();
