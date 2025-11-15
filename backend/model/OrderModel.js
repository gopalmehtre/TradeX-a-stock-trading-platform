import mongoose, {Schema} from "mongoose";
const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

const OrderModel = mongoose.model('Order', OrdersSchema);
export default OrderModel;