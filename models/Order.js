// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        delivery_instructions: {
            type: String, // optional
            default: "",
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        deliveryDate: {
            type: String, // Format: YYYY-MM-DD
            required: true,
        },
        items: [
            {
                menuId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Menu",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        // Add inside the orderSchema fields
        status: {
            type: String,
            enum: ["pending", "accepted", "cancelled", "preparing", "out for delivery", "delivered"],
            default: "pending",
        },
        
        paymentStatus: {
            type: String,
            enum: ["paid", "pending"],
            default: "pending",
        },
        paymentId: {
            type: String, // Razorpay payment_id like "pay_QLFFEI8f26OITG"
        },
    },
    {
        timestamps: true, // createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("Order", orderSchema);
