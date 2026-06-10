const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const CategoryChip = require('./Models/CategoryChip');
const SubCategoryChip = require('./Models/SubCategoryChip');

const sampleSubcategories = {
  'lehenga-cholis': [
    { name: 'Bridal Lehenga', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&q=80' },
    { name: 'Partywear Lehenga', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80' },
    { name: 'Designer Lehenga', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&q=80' },
    { name: 'Crop Top Lehenga', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200&q=80' },
    { name: 'Casual Lehenga', image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=200&q=80' }
  ],
  'western-wear': [
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&q=80' },
    { name: 'Tops & Tees', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=200&q=80' },
    { name: 'Jeans & Jeggings', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&q=80' },
    { name: 'Skirts', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&q=80' },
    { name: 'Jumpsuits', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=200&q=80' }
  ],
  'tops-tunics': [
    { name: 'Casual Tops', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=200&q=80' },
    { name: 'Printed Tunics', image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=200&q=80' },
    { name: 'Peplum Tops', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200&q=80' },
    { name: 'Short Tunics', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=200&q=80' },
    { name: 'Crop Tops', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80' }
  ],
  'handbags': [
    { name: 'Sling Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&q=80' },
    { name: 'Tote Bags', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&q=80' },
    { name: 'Clutches', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15a7a5?w=200&q=80' },
    { name: 'Backpacks', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80' },
    { name: 'Shoulder Bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&q=80' }
  ],
  'jewellery': [
    { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80' },
    { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80' },
    { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80' },
    { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80' },
    { name: 'Anklets', image: 'https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=200&q=80' }
  ]
};

const getGenericSubcategories = (categoryName) => [
  { name: `${categoryName} Item 1`, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80' },
  { name: `${categoryName} Item 2`, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80' },
  { name: `${categoryName} Item 3`, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80' },
  { name: `${categoryName} Item 4`, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80' },
  { name: `${categoryName} Item 5`, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80' }
];

const seedSubChips = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error('MONGODB_URL is not set in env variables');
    }
    
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB.');

    // Clear existing subcategory chips
    await SubCategoryChip.deleteMany({});
    console.log('Cleared existing SubCategoryChips.');

    // Get all categories
    const categories = await CategoryChip.find({});
    console.log(`Found ${categories.length} categories.`);

    for (const cat of categories) {
      const catId = cat.id;
      const catName = cat.categoryName || cat.name;
      
      const subs = sampleSubcategories[catId] || getGenericSubcategories(catName);
      
      for (let i = 0; i < subs.length; i++) {
        const sub = subs[i];
        const id = `${catId}-${sub.name.toLowerCase().replace(/\s+/g, '-')}`;
        
        await SubCategoryChip.create({
          id,
          categoryId: catId,
          subCategoryName: sub.name,
          image: sub.image,
          active: true,
          order: i + 1
        });
      }
      console.log(`Added 5 subcategories for category: ${catName} (${catId})`);
    }

    console.log('Subcategories seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedSubChips();
