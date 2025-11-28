import HoldingModel from '../model/HoldingModel.js';
import OrderModel from '../model/OrderModel.js';
import  PositionModel  from '../model/PositionModel.js';

import { processOrder } from '../util/processOrder.js';

const Holdings = async(req , res) => {
    try {
        let Holdings = await HoldingModel.find({});
        res.json(Holdings);
    } catch (error) {
        console.error('Error fetching holdings:', error);
        res.status(500).json({ error: error.message });
    }
};

const Positions = async(req, res)=> {
    let Positions = await PositionModel.find({});
    res.json(Positions);
};

const Order = async (req, res) => {
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
};

const holdingName =  async (req, res) => {
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
};

const getAllOrders = async(req, res) => {
  try {
    let allOrders = await OrderModel.find({});
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {Holdings, Positions, Order, holdingName, getAllOrders};
