const express = require('express');
const router = express.Router();
const multer = require('multer');
const {storage} = require('../utils/cloudinary.js'); // Import cloudinary storage
const upload = multer({ storage });

const {
    createMenu,
    getMenusByRestaurant,
    getMenuById,
    updateMenu,
    deleteMenu,
    getFavMenus
} = require('../controllers/menuController');



router.post('/', upload.single('image'), createMenu);
router.put('/:id', upload.single('image'), updateMenu);
router.get('/:restaurantId', getMenusByRestaurant);
router.get('/single/:id', getMenuById);  
router.delete('/:id', deleteMenu);
router.post("/favorites", getFavMenus);

module.exports = router;
