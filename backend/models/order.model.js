import mongoose from 'mongoose';
// Create the Order schema
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  email: {
    type: String,
    required: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice:{
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    default: 'Pending',
  },
  paymentMethod:{
    type: String,
    required: true,
  },
  isCancelled:{
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

export default Order;
