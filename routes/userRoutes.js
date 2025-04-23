const express = require('express');
const router = express.Router();
const { signup, login , getProfile, updateProfile, addFavMenu,addFavHotel} = require('../controllers/userController');

router.post('/register', signup);
router.post('/login', login);
router.get('/profile/:id', getProfile);       // Get profile by user ID
router.put('/profile/:id', updateProfile); 
router.post('/fav-menu', addFavMenu);
router.post('/fav-hotel', addFavHotel);

module.exports = router;
