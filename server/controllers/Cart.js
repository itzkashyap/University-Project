import CartModel from "../models/Cart.js";

export const GetItems = async (req, res) => {
    try {
        const cartItems = await CartModel.find().populate('items.productId');
        res.json(cartItems);
        console.log(cartItems)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addItem = async (req, res) => {
    const { userId, productId, quantity, price } = req.body;

    try {
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            cart = new CartModel({ userId, items: [], totalPrice: 0 });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price });
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

        await cart.save();
        res.status(201).json({ message: "Item added to cart", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const UpdateItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity = quantity;
        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

        await cart.save();
        res.json({ message: "Cart updated", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const DeleteItem = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

        await cart.save();
        res.json({ message: "Item removed from cart", cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const CreateCart = async (req, res) => {
    try {
        const { userId, items } = req.body;

        const totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);

        const cart = new CartModel({
            userId,
            items,
            totalPrice
        });

        await cart.save();
        res.status(201).json({ message: "Cart created successfully", cart });
    } catch (error) {
        console.error("Failed to create cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const IncrementItem = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity += 1;
        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

        await cart.save();
        res.json({ message: "Item quantity incremented", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const DecrementItem = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity -= 1;
        if (item.quantity <= 0) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        }
        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

        await cart.save();
        res.json({ message: "Item quantity decremented", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
