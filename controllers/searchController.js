const Menu = require('../models/Menu');
const Restaurant = require('../models/Restaurant');

exports.searchEverything = async (req, res) => {
  try {
    const { search } = req.body;

    if (!search || search.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchRegex = new RegExp(search, 'i'); // case-insensitive regex

    // Search restaurants by name
    const restaurants = await Restaurant.find({ name: { $regex: searchRegex } }).select('name _id');

    // Search menus by title
    const menus = await Menu.find({ title: { $regex: searchRegex } }).select('title _id');

    // Format results with type
    const formattedRestaurants = restaurants.map((restaurant) => ({
      _id: restaurant._id,
      name: restaurant.name,
      type: 'restaurant',
    }));

    const formattedMenus = menus.map((menu) => ({
      _id: menu._id,
      title: menu.title,
      type: 'menu',
    }));

    const results = [...formattedRestaurants, ...formattedMenus];

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Something went wrong while searching' });
  }
};
