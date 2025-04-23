const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes'); // Import cart routes
const orderRoutes = require("./routes/orderRoutes");
const notificationRoutes =require('./routes/notifications.js');
const reviewRoutes =require('./routes/reviewRoutes.js');
const {searchEverything} = require('./controllers/searchController.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/users', userRoutes);


app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/cart', cartRoutes); 
app.use('/api/notifications', notificationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes); // Add review routes
app.use('/uploads', express.static('uploads')); // Serve uploaded images
app.post('/api/search', searchEverything);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
