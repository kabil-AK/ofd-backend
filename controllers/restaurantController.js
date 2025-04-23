const Restaurant = require('../models/Restaurant');
const bcrypt = require('bcryptjs');
const path = require('path');

// Register
exports.register = async (req, res) => {
    const { name, description, email, password, phone, address, shop_image, shop_banner } = req.body;
    try {
        const existing = await Restaurant.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Restaurant already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const restaurant = await Restaurant.create({
            name,
            description,
            email,
            password: hashedPassword,
            phone,
            address,
            shop_image,
            shop_banner
        });

        const { password: _, ...restaurantData } = restaurant.toObject();
        res.status(201).json({ message: 'Registered successfully', restaurant: restaurantData });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const restaurant = await Restaurant.findOne({ email });
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

        const isMatch = await bcrypt.compare(password, restaurant.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const { password: _, ...restaurantData } = restaurant.toObject();
        res.status(200).json({ status: true, message: 'Login successful', restaurant: restaurantData });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};

// Get restaurant profile by ID
exports.getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

        const { password: _, ...restaurantData } = restaurant.toObject();  // Exclude password
        res.status(200).json(restaurantData);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().select('-password'); // exclude password
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get favorite restaurants by IDs
exports.getFavRestaurants = async (req, res) => {
    const { restaurantIds } = req.body;

    if (!Array.isArray(restaurantIds) || restaurantIds.length === 0) {
        return res.status(400).json({ message: "No restaurant IDs provided" });
    }

    try {
        const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } }).select("-password");
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


// Update Profile
exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.files) {
        if (req.files.shop_image) {
            updateData.shop_image = req.files.shop_image[0].path;
        }
        if (req.files.shop_banner) {
            updateData.shop_banner = req.files.shop_banner[0].path;
        }
    }

    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    try {
        const updated = await Restaurant.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) return res.status(404).json({ message: 'Restaurant not found' });

        const { password: _, ...updatedData } = updated.toObject();
        res.status(200).json({ status:true, message: 'Profile updated', restaurant: updatedData });
    } catch (err) {
        res.status(500).json({ status:false, message: 'Server error', error: err.message });
    }
};