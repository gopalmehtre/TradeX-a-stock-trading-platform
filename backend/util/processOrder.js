import HoldingModel from '../model/HoldingModel.js';

export const processOrder = async (order, userId) => {
  try {
    console.log('Processing order:', order);
    
    if (order.mode === "BUY") {
      const existingHolding = await HoldingModel.findOne({ 
        name: order.name,
      });
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
          day: "+0.00%",
        });
        
        await newHolding.save();
        console.log('Created new holding:', newHolding);
      }
    } 
    else if (order.mode === "SELL") {
      const existingHolding = await HoldingModel.findOne({ 
        name: order.name,
      });
      
      if (!existingHolding) {
        throw new Error('Cannot sell - no holdings found for this stock');
      }
      
      const sellQty = parseInt(order.qty);
      
      if (existingHolding.qty < sellQty) {
        throw new Error(`Cannot sell ${sellQty} shares. You only have ${existingHolding.qty} shares.`);
      }
      
      existingHolding.qty = existingHolding.qty - sellQty;
      existingHolding.price = order.price;  
      
      if (existingHolding.qty === 0) {
        await HoldingModel.deleteOne({ _id: existingHolding._id });
        console.log('All shares sold, holding deleted');
      } else {
        await existingHolding.save();
        console.log('Updated holding after sell:', existingHolding);
      }
    }
  } catch (error) {
    console.error('Error processing order:', error);
    throw error;
  }
};