const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { name, email, password, address, phone } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            phone
        });

        res.status(201).json({ status: true, message: 'User created successfully', userId: newUser._id });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Return the entire user object excluding the password
        const { password: _, ...userData } = user.toObject(); // Exclude the password field
        res.status(200).json({ status : true, message: 'Login successful', user: userData });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};


exports.getProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password'); // exclude password
        if (!user) return res.status(404).json({ status: false, message: 'User not found' });

        res.status(200).json({ status: true, user });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ status: false, message: 'User not found' });

        user.name = name || user.name;
        user.address = address || user.address;
        user.phone = phone || user.phone;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ status: true, message: 'Profile updated successfully', user: userData });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};

exports.addFavMenu = async (req, res) => {
    const { userId, menuId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ status: false, message: 'User not found' });

        const index = user.favMenus.indexOf(menuId);
        let message = '';

        if (index === -1) {
            user.favMenus.push(menuId);
            message = 'Menu added to favorites';
        } else {
            user.favMenus.splice(index, 1);
            message = 'Menu removed from favorites';
        }

        await user.save();
        res.status(200).json({ status: true, message, favMenus: user.favMenus });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};


exports.addFavHotel = async (req, res) => {
    const { userId, restaurantId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ status: false, message: 'User not found' });

        const index = user.favHotels.indexOf(restaurantId);
        let message = '';

        if (index === -1) {
            user.favHotels.push(restaurantId);
            message = 'Hotel added to favorites';
        } else {
            user.favHotels.splice(index, 1);
            message = 'Hotel removed from favorites';
        }

        await user.save();
        res.status(200).json({ status: true, message, favHotels: user.favHotels });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};
