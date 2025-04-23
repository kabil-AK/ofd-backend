const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: null },
    phone: { type: String, default: null },
    favMenus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: [] }],
    favHotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', default: [] }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
