// utils/addNotification.js
const Notification = require('../models/Notification'); // Adjust the path as necessary

const addNotification = async (title, description, orderId, recipientType, recipientId) => {
  try {
    const notification = new Notification({
      title,
      description,
      orderId,
      recipientType,
      recipientId,
    });
    await notification.save();
    return { success: true, notification };
  } catch (error) {
    console.error('Error adding notification:', error);
    return { success: false, error };
  }
};

module.exports = { addNotification };