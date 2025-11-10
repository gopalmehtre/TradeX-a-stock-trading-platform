import dotenv from 'dotenv';
if(process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import HoldingModel from './model/HoldingModel.js';
import OrderModel from './model/OrderModel.js';
import  PositionModel  from './model/PositionModel.js';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

const start = async() => {
    const connectionDb = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MONGODB CONNECTED HOST: ${connectionDb.connection.host}`);

    app.listen(PORT, () => {
        console.log(`LISTENING ON PORT ${PORT}`);
        
    });
    
};

start();