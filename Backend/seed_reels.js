require('dotenv').config();
const mongoose = require('mongoose');
const Reel = require('./Models/Reel');
const Product = require('./Models/Product');
const User = require('./Models/User');
const Admin = require('./Models/Admin');

const SAMPLE_VIDEOS = [
  '/uploads/videos/fashion_reel.mp4',
  '/uploads/videos/sample_reel.mp4',
];

const CAPTIONS = [
  'Fit check! Rate this streetwear look 1-10? 🔥 #mynzo #fashion #streetwear',
  'Applying the organic face wash. Feels so cooling and refreshing! 🫧✨ #selfcare',
  'Aesthetic room upgrades with these new lights! What do you guys think? 💡🏡 #roomdecor',
  'Unboxing my new favorite gadgets! The audio quality is insane. 🎧🔊 #techreview',
  'Summer styling tips using Mynzo Originals. Essential pieces only. 👗✨ #fashiontrends',
  'Off-roading with the rugged Mynzo RC Car! High-speed, solid shocks. Absolute beast! 🏎️💨',
  'A closer look at this premium leather satchel. Perfect everyday carry. 💼🤎 #menswear',
  'Minimalist wristwatch. Sleek, lightweight, and perfect styling piece. ⌚🖤 #watches',
  'My daily skincare routine. Glowing skin incoming! 💆‍♀️✨ #skincare',
  'Unboxing the perfect running shoes. Cushioning is amazing! 👟🏃‍♂️ #fitness'
];

async function seedReels() {
  try {
    const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/mynzo';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected successfully!');

    // Clear existing reels
    await Reel.deleteMany({});
    console.log('Cleared existing reels.');

    // Get or Create Admin
    let admin = await Admin.findOne({});
    if (!admin) {
      admin = await Admin.create({
        name: 'Vini Admin',
        email: 'admin@mynzo.com',
        password: 'password123',
        role: 'super_admin'
      });
      console.log('Created sample admin:', admin.name);
    }

    // Get or Create User
    let user = await User.findOne({});
    if (!user) {
      user = await User.create({
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '9876543210',
        password: 'password123'
      });
      console.log('Created sample user:', user.name);
    }

    // Fetch products
    const products = await Product.find({}).limit(10);
    if (products.length === 0) {
      console.error('No products found in the database. Please run seed_all_data.js first!');
      process.exit(1);
    }
    console.log(`Found ${products.length} products to map to reels.`);

    // Seed 10 reels
    const reelsToInsert = [];
    for (let i = 0; i < 10; i++) {
      const isForYou = i < 5; // First 5: For You (Admin), Last 5: Following (User Review)
      const product = products[i % products.length];
      const video = SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length];
      const caption = CAPTIONS[i];
      const nameString = isForYou ? (admin.name || 'Admin') : (user.name || 'User');

      reelsToInsert.push({
        productId: product._id,
        uploadedBy: isForYou ? admin._id : user._id,
        userModel: isForYou ? 'Admin' : 'User',
        userType: isForYou ? 'admin' : 'user',
        username: nameString.toLowerCase().replace(/\s+/g, '_'),
        profileImage: isForYou ? '/uploads/admin-avatar.png' : '',
        video,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        caption,
        status: isForYou ? 'approved' : (i === 5 ? 'pending' : 'approved'), // Let one user reel be pending for testing moderation
        section: isForYou ? 'forYou' : 'following',
        likes: [user._id],
        views: Math.floor(Math.random() * 500) + 100,
        comments: [
          {
            userId: user._id,
            username: 'style_guru',
            text: 'This looks incredibly premium! 😍',
            createdAt: new Date()
          },
          {
            userId: user._id,
            username: 'mynzo_buyer',
            text: 'Is this true to size? Might order it today.',
            createdAt: new Date()
          }
        ]
      });
    }

    await Reel.insertMany(reelsToInsert);
    console.log('Successfully seeded 10 reels (5 Admin ForYou, 5 User Following [1 pending])!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding reels:', err);
    process.exit(1);
  }
}

seedReels();
