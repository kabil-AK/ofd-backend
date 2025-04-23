// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');


// GET /notifications/:recipientType/:id
router.get('/:recipientType/:id', async (req, res) => {
  const { recipientType, id } = req.params;
  try {
    const notifications = await Notification.find({
      recipientType,
      recipientId: id,
    }).sort({ created_at: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// DELETE /notifications/:id
router.delete('/:id', async (req, res) => {
    try {
      await Notification.findByIdAndDelete(req.params.id);
      res.json({ message: 'Notification deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete notification' });
    }
  });

  
module.exports = router;
  