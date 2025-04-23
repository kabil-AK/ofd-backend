const Menu = require('../models/Menu');

// Create menu item
exports.createMenu = async (req, res) => {
    try {
        const { title, description, price, category, restaurant } = req.body;
        const image = req.file ? req.file.path  : null;

        const menu = await Menu.create({
            title,
            description,
            price,
            category,
            image,
            restaurant
        });

        res.status(201).json({ message: 'Menu item created', menu });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
// Update menu item
exports.updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (req.file) updateData.image = req.file.path;

        const updated = await Menu.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) return res.status(404).json({ message: 'Menu item not found' });

        res.status(200).json({ message: 'Menu updated', menu: updated });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// Get all menus by restaurant
exports.getMenusByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const menus = await Menu.find({ restaurant: restaurantId });
        res.status(200).json(menus);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get a single menu item by ID
exports.getMenuById = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id);
        if (!menu) return res.status(404).json({ message: 'Menu item not found' });

        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};



// Get favorite menus by IDs
exports.getFavMenus = async (req, res) => {
    const { menuIds } = req.body;

    if (!Array.isArray(menuIds) || menuIds.length === 0) {
        return res.status(400).json({ message: "No menu IDs provided" });
    }

    try {
        const menus = await Menu.find({ _id: { $in: menuIds } });
        res.status(200).json(menus);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


// Delete menu item
exports.deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Menu.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Menu item not found' });

        res.status(200).json({ message: 'Menu deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
