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
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(bodyParser.json());


app.get('/allHoldings', async(req , res) => {
    let allHoldings = await HoldingModel.find({});
    res.json(allHoldings);
})

app.get('/allPositions', async(req, res)=> {
    let allPositions = await PositionModel.find({});
    res.json(allPositions);
})

app.post('/newOrder', async(req, res) => {
    let newOrder = new OrderModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    });

    newOrder.save();
    res.send('Order Saved');
})


const start = async() => {
    const connectionDb = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MONGODB CONNECTED HOST: ${connectionDb.connection.host}`);

    app.listen(PORT, () => {
        console.log(`LISTENING ON PORT ${PORT}`);
        
    });
    
};

start();
