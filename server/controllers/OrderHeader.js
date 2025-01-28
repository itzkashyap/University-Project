import OrderModel from "../models/OrderHeader.js";


export const placeOrder = async (req, res) => {
    const { userId, items, totalPrice, address } = req.body;

    try {
       
        const newOrder = new OrderModel({
            userId,
            items,
            totalPrice,
            address,
            status: 'Pending', 
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
