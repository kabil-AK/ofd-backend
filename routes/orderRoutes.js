// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrder,
  getAllOrdersByUserId,
  getAllOrdersByHotelId,
  getOrderById,
} = require("../controllers/orderController");

// POST /orders
router.post("/", createOrder);

// PUT /orders/:id
router.put("/:id", updateOrder);

// GET /orders/user/:userId
router.get("/user/:userId", getAllOrdersByUserId);

router.get("/hotel/:hotelId", getAllOrdersByHotelId);

// GET /orders/:id
router.get("/:id", getOrderById);

module.exports = router;
