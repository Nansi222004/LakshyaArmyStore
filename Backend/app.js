const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin/auth', require('./Utils/adminAuthRoutes'));
app.use('/api/auth', require('./Utils/userAuthRoutes'));
app.use('/api/addresses', require('./Utils/addressRoutes'));
app.use('/api/cart', require('./Utils/cartRoutes'));
app.use('/api/orders', require('./Utils/orderRoutes'));
app.use('/api/referral', require('./Utils/referralRoutes'));
app.use('/api/games', require('./Utils/gameRoutes'));
app.use('/api/reels', require('./Utils/reelRoutes'));

app.use('/api/admin/catalog/chips', require('./Utils/categoryChipRoutes'));
app.use('/api/admin/catalog/subchips', require('./Utils/subCategoryChipRoutes'));
app.use('/api/admin/catalog/banners', require('./Utils/bannerRoutes'));
app.use('/api/admin/catalog/products', require('./Utils/productRoutes'));
app.use('/api/admin/settings', require('./Utils/settingsRoutes'));
app.use('/api/admin/promotions/coupons', require('./Utils/couponRoutes'));
app.use('/api/admin/referrals', require('./Utils/adminReferralRoutes'));
app.use('/api/admin/content/legal', require('./Utils/legalRoutes'));
app.use('/api/admin/content/qna', require('./Utils/qnaRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Mynzo API is running 🚀' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;
