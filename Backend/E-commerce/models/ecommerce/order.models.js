import mongoose from 'mongoose';

// 3:29:58–3:32:37. Local embedded schema: no separate model/collection or timestamps.
const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
});

// 3:26:08–3:37:36. Status capitalization is a documented reconstruction choice.
const orderSchema = new mongoose.Schema(
  {
    orderPrice: { type: Number, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderItems: { type: [orderItemSchema] },
    address: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Cancelled', 'Delivered'], default: 'Pending' },
  },
  { timestamps: true },
);

export const Order = mongoose.model('Order', orderSchema);
