const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('Menu', menuSchema);
