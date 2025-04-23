const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    shop_image: { type: String },
    shop_banner: { type: String },

    // Additional fields
    opening_hours: { type: String },
    closing_hours: { type: String },
    is_verified: { type: Boolean, default: false },
    rating: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
