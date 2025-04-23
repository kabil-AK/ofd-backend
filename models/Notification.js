// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  recipientType: { type: String, enum: ['User', 'Restaurant'], required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports =  mongoose.model('Notification', notificationSchema);