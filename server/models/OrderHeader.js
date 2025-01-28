import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,
     ref: "user",
     required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
         type: Number,
         required: true
         },
      price: { 
        type: Number,
        required: true 
        },
    },
  ],
  totalPrice: { type: Number, required: true },
  address: {
    type:String,required:true
  },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
