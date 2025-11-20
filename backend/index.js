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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/allHoldings', async(req , res) => {
    try {
        let allHoldings = await HoldingModel.find({});
        res.json(allHoldings);
    } catch (error) {
        console.error('Error fetching holdings:', error);
        res.status(500).json({ error: error.message });
    }
})

app.get('/allPositions', async(req, res)=> {
    let allPositions = await PositionModel.find({});
    res.json(allPositions);
})

app.post("/newOrder", async (req, res) => {
  try {
    let newOrder = new OrderModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    await processOrder(newOrder);
    
    res.json({ message: "Order saved and processed!", orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Process order and update holdings
const processOrder = async (order) => {
  try {
    console.log('Processing order:', order);
    if (order.mode === "BUY") {
      // Check if user already has this stock
      const existingHolding = await HoldingModel.findOne({ name: order.name });
      console.log('Existing holding found:', existingHolding);
      
      if (existingHolding) {
        // Update existing holding: recalculate average price and quantity
        const totalCost = (existingHolding.avg * existingHolding.qty) + (order.price * order.qty);
        const totalQty = existingHolding.qty + parseInt(order.qty);
        const newAvgPrice = totalCost / totalQty;
        
        existingHolding.qty = totalQty;
        existingHolding.avg = newAvgPrice;
        existingHolding.price = order.price; // Update current price
        
        await existingHolding.save();
        console.log('Updated existing holding:', existingHolding);
      } else {
        // Create new holding
        const newHolding = new HoldingModel({
          name: order.name,
          qty: parseInt(order.qty),
          avg: parseFloat(order.price),
          price: parseFloat(order.price),
          net: "+0.00%",
          day: "+0.00%"
        });
        
        await newHolding.save();
        console.log('Created new holding:', newHolding);
      }
    }
  } catch (error) {
    console.error('Error processing order:', error);
    throw error;
  }
};

// Update existing holding
app.put("/holdings/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const updateData = req.body;
    
    const updatedHolding = await HoldingModel.findOneAndUpdate(
      { name: name },
      updateData,
      { new: true }
    );
    
    if (!updatedHolding) {
      return res.status(404).json({ error: "Holding not found" });
    }
    
    res.json(updatedHolding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders
app.get('/allOrders', async(req, res) => {
  try {
    let allOrders = await OrderModel.find({});
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const start = async() => {
    const connectionDb = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MONGODB CONNECTED HOST: ${connectionDb.connection.host}`);

    app.listen(PORT, () => {
        console.log(`LISTENING ON PORT ${PORT}`);
        
    });
    
};

start();
