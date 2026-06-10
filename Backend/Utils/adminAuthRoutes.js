const express = require('express');
const router = express.Router();
const { adminLogin, getMe, adminLogout, getUsers, createUser, updateAdminProfile, changeAdminPassword } = require('../Controllers/adminAuthController');
const { protectAdmin } = require('../Middlewares/authMiddleware');

const { uploadImage, processImage, handleUploadError } = require('../Middlewares/uploadMiddleware');

// Public routes
router.post('/login', adminLogin);

// Protected routes
router.get('/me', protectAdmin, getMe);
router.post('/logout', protectAdmin, adminLogout);
router.get('/users', protectAdmin, getUsers);
router.post('/users', protectAdmin, createUser);
router.put('/profile', protectAdmin, uploadImage, processImage, handleUploadError, updateAdminProfile);
router.put('/change-password', protectAdmin, changeAdminPassword);

module.exports = router;
