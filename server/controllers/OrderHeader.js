import OrderModel from "../models/OrderHeader.js"

export const placeOrder = async (req, res) => {
    const { userId, items, totalPrice, address } = req.body;
  
    // Check for validation errors
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  
    try {
      // Create a new order
      const newOrder = new OrderModel({
        userId,
        items,
        totalPrice,
        address,
        status: 'Pending', 
        // paymentIntentId, // here we Store the payment intent ID from Stripe
      });
  
      await newOrder.save();
  
      res.status(201).json({
        message: 'Order placed successfully',
        order: newOrder,
      });
    } catch (err) {
   
      console.error("Error placing order:", err);
      res.status(400).json({ message: err.message });
    }
  };
  
  export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;  // Fix: Use req.params
  
    try {
      const order = await OrderModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json({
        message: `Order status updated to ${status}`,
        order: order,
      });
    } catch (err) {
      console.error("Error updating order status:", err);
      res.status(400).json({ message: err.message });
    }
  };
  