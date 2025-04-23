const express = require('express');
const router = express.Router();
const multer = require('multer');
const {storage} = require('../utils/cloudinary.js');
const upload = multer({ storage });

const {
    register,
    login,
    getRestaurantById,
    getAllRestaurants,
    updateProfile,
    getFavRestaurants
} = require('../controllers/restaurantController');



// Expecting both image files from form-data: shop_image, shop_banner
const uploadFields = upload.fields([
    { name: 'shop_image', maxCount: 1 },
    { name: 'shop_banner', maxCount: 1 }
]);

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllRestaurants);
router.post("/favorites", getFavRestaurants);
router.get('/profile/:id', getRestaurantById); 
router.put('/profile/:id', uploadFields, updateProfile);

module.exports = router;
