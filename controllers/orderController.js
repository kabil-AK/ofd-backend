
const Order = require("../models/Order");
const Cart = require("../models/Cart"); // import your Cart model
const { addNotification } = require("../utils/addNotification");

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();

        // Send notification to restaurant
        await addNotification(
            "New Order",
            `You have received a new order`,
            savedOrder._id,
            "Restaurant",
            order.restaurant
        );

        await Cart.deleteMany({ userId: order.userId });

        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Optional: Send user a notification on status change
        if (req.body.status) {
            await addNotification(
                "Order Update",
                `Your order status is now ${req.body.status}`,
                updatedOrder._id,
                "User",
                updatedOrder.userId
            );
        }

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order" });
    }
};

exports.getAllOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .sort({ createdAt: -1 })
            .populate("restaurant", "name")
            .populate("items.menuId", "title price image");

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

exports.getAllOrdersByHotelId = async (req, res) => {
    try {
        const orders = await Order.find({ restaurant: req.params.hotelId })
            .sort({ createdAt: -1 })
            .populate("restaurant", "name")
            .populate("items.menuId", "title price image");

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("restaurant", "name")
            .populate("items.menuId", "title price image");

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
};