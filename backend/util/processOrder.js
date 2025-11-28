import HoldingModel from '../model/HoldingModel.js';

export const processOrder = async (order) => {
  try {
    console.log('Processing order:', order);
    if (order.mode === "BUY") {
      const existingHolding = await HoldingModel.findOne({ name: order.name });
      console.log('Existing holding found:', existingHolding);
      
      if (existingHolding) {
        const totalCost = (existingHolding.avg * existingHolding.qty) + (order.price * order.qty);
        const totalQty = existingHolding.qty + parseInt(order.qty);
        const newAvgPrice = totalCost / totalQty;
        
        existingHolding.qty = totalQty;
        existingHolding.avg = newAvgPrice;
        existingHolding.price = order.price; 
        
        await existingHolding.save();
        console.log('Updated existing holding:', existingHolding);
      } else {
        
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