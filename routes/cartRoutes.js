const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get Cart items for a user
router.get('/:userId', cartController.getCart);

// Add item to Cart
router.post('/add', cartController.addToCart);

router.put('/update', cartController.updateCart);

// Remove item from Cart
router.delete('/:userId/:menuId', cartController.removeFromCart);

// Get total number of items in Cart
router.get('/count/:userId', cartController.getCartItemCount);

module.exports = router;
