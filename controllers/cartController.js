const Cart = require('../models/Cart');
const Menu = require('../models/Menu');

// Get Cart for a specific user
exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Cart.find({ userId })
      .populate('menuId', 'title description price category image restaurant') // Populate menu details
      .exec();

    if (cartItems.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, menuId } = req.body;

    // Check if menu exists
    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Check if the item is already in the user's cart
    let cartItem = await Cart.findOne({ userId, menuId });

    if (cartItem) {
      // If item exists, increment quantity
      cartItem.quantity += 1;
      await cartItem.save();
      return res.status(200).json({status:true, message: 'Item added'});
    } else {
      // If item does not exist, create a new cart item
      cartItem = new Cart({ userId, menuId, quantity: 1 });
      await cartItem.save();
      return res.status(201).json({status:true, message: 'Item added'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status:false, message: 'Server Error' });
  }
};

// Update item quantity in cart
exports.updateCart = async (req, res) => {
    try {
      const { userId, menuId, quantity } = req.body;
  
      // Ensure the quantity is valid
      if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than 0' });
      }
  
      // Check if the item exists in the cart
      const cartItem = await Cart.findOne({ userId, menuId });
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      // Update the quantity
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.status(200).json({ status: true, message: 'Cart updated successfully', cartItem });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: 'Server Error' });
    }
  };

// Delete item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, menuId } = req.params;

    const cartItem = await Cart.findOneAndDelete({ userId, menuId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get the total number of items in the user's cart
exports.getCartItemCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemCount = await Cart.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalItems: { $sum: '$quantity' } } }
    ]);

    if (itemCount.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.status(200).json({ totalItems: itemCount[0].totalItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
