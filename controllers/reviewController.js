const Review = require('../models/Review');

// POST: Create a review
const createReview = async (req, res) => {
  try {
    const { userId, restaurantId, stars, comment } = req.body;

    const review = new Review({ userId, restaurantId, stars, comment });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review', error });
  }
};

// GET: Get all reviews for a specific restaurant
const getReviewsByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const reviews = await Review.find({ restaurantId })
      .populate('userId', 'name') // show user name
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
};

// DELETE: Delete a review by ID
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error });
  }
};

module.exports = {
  createReview,
  getReviewsByRestaurantId,
  deleteReview,
};
