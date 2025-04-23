const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsByRestaurantId,
  deleteReview
} = require('../controllers/reviewController');

// POST: /api/reviews
router.post('/', createReview);

// GET: /api/reviews/restaurant/:restaurantId
router.get('/restaurant/:restaurantId', getReviewsByRestaurantId);

// DELETE: /api/reviews/:id
router.delete('/:id', deleteReview);

module.exports = router;
