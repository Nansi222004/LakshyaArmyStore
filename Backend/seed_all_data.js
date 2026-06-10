require('dotenv').config();
const mongoose = require('mongoose');
const CategoryChip = require('./Models/CategoryChip');
const SubCategoryChip = require('./Models/SubCategoryChip');
const Product = require('./Models/Product');

const categoriesData = [
  { id: 'electronics', name: 'Electronics', icon: 'smartphone' },
  { id: 'fashion', name: 'Fashion', icon: 'shirt' },
  { id: 'home-kitchen', name: 'Home & Kitchen', icon: 'home' },
  { id: 'beauty-personal-care', name: 'Beauty & Care', icon: 'sparkles' },
  { id: 'sports-outdoors', name: 'Sports & Fitness', icon: 'trophy' },
  { id: 'toys-games', name: 'Toys & Games', icon: 'gamepad2' },
  { id: 'books-stationery', name: 'Books & Stationery', icon: 'book' },
  { id: 'automotive', name: 'Automotive', icon: 'car' },
  { id: 'groceries-gourmet', name: 'Groceries', icon: 'carrot' },
  { id: 'health-wellness', name: 'Health & Wellness', icon: 'heart' },
  { id: 'garden-outdoor', name: 'Garden & Outdoor', icon: 'flower' },
  { id: 'pet-supplies', name: 'Pet Supplies', icon: 'dog' },
  { id: 'baby-products', name: 'Baby Products', icon: 'baby' },
  { id: 'jewelry-accessories', name: 'Jewelry & Watches', icon: 'gem' },
  { id: 'footwear', name: 'Footwear', icon: 'footprints' },
  { id: 'luggage-travel', name: 'Luggage & Travel', icon: 'luggage' },
  { id: 'office-products', name: 'Office Products', icon: 'printer' },
  { id: 'musical-instruments', name: 'Musical Instruments', icon: 'music' },
  { id: 'smart-home', name: 'Smart Home', icon: 'power' },
  { id: 'tools-hardware', name: 'Tools & Hardware', icon: 'hammer' }
];

const subCategoriesData = {
  'electronics': ['Smartphones', 'Laptops', 'Headphones', 'Smartwatches', 'Cameras', 'Chargers', 'Gaming Consoles'],
  'fashion': ["Men's Wear", "Women's Wear", "Kids' Wear", 'Activewear', 'Ethnic Wear', 'Sleepwear', 'Winterwear'],
  'home-kitchen': ['Cookware', 'Tableware', 'Bedding', 'Kitchen Appliances', 'Storage Organizers', 'Home Decor', 'Bath Accessories'],
  'beauty-personal-care': ['Skincare', 'Haircare', 'Makeup', 'Fragrances', 'Bath & Body', 'Grooming Tools', 'Oral Care'],
  'sports-outdoors': ['Fitness Equipment', 'Cycling Gear', 'Camping & Hiking', 'Running Shoes', 'Team Sports', 'Swimming Gear', 'Water Bottles'],
  'toys-games': ['Board Games', 'Action Figures', 'Puzzles', 'Dolls', 'Educational Toys', 'Outdoor Play', 'RC Cars'],
  'books-stationery': ['Fiction Books', 'Self Help Books', 'Notebooks', 'Pens & Pencils', 'Art Supplies', 'Calculators', 'Desk Organizers'],
  'automotive': ['Car Cleaning', 'Interior Car Decor', 'Exterior Accessories', 'Car Gadgets', 'Motorcycle Gear', 'Air Fresheners', 'Tyre Care'],
  'groceries-gourmet': ['Beverages', 'Snacks', 'Breakfast Cereals', 'Cooking Oils', 'Spices & Herbs', 'Pasta & Noodles', 'Chocolates'],
  'health-wellness': ['Vitamins', 'Protein Powders', 'Yoga Mats', 'Massagers', 'First Aid Kits', 'Weight Loss', 'Sanitizers'],
  'garden-outdoor': ['Live Plants', 'Flower Seeds', 'Gardening Tools', 'Watering Cans', 'Plant Pots', 'Garden Decor', 'Soil & Fertilizers'],
  'pet-supplies': ['Dog Food', 'Cat Food', 'Pet Toys', 'Collars & Leashes', 'Grooming Brushes', 'Aquariums', 'Pet Beds'],
  'baby-products': ['Baby Wipes', 'Diapers', 'Baby Lotions', 'Strollers', 'Baby Clothes', 'Baby Bottles', 'Teethers & Pacifiers'],
  'jewelry-accessories': ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Wristwatches', 'Sunglasses', 'Wallets & Belts'],
  'footwear': ["Men's Sneakers", "Women's Heels", 'Running Shoes', 'Casual Loafers', 'Sports Sandals', 'Slippers', 'Boots'],
  'luggage-travel': ['Hard Suitcases', 'Soft Trolleys', 'Duffle Bags', 'Travel Backpacks', 'Passport Holders', 'Neck Pillows', 'Toiletry Pouches'],
  'office-products': ['Office Chairs', 'Desk Lamps', 'Paper Shredders', 'File Folders', 'Whiteboards', 'Label Printers', 'Staplers'],
  'musical-instruments': ['Acoustic Guitars', 'Keyboard Pianos', 'Drum Pads', 'Ukuleles', 'Microphones', 'Violin', 'Flutes'],
  'smart-home': ['Smart Plugs', 'Smart Bulbs', 'Security Cameras', 'Smart Locks', 'Smart Thermostats', 'Smart Speakers', 'Motion Sensors'],
  'tools-hardware': ['Hand Tool Sets', 'Power Drills', 'Flashlights', 'Measuring Tapes', 'Screwdrivers', 'Ladders', 'Wall Hooks']
};

const brandsPool = ['Mynzo Premium', 'Apex', 'Nova', 'Ultra', 'Elite', 'Solace', 'EcoCraft', 'Vortex', 'Zenith', 'Brio'];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/mynzo';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected successfully!');

    // Clean Collections
    console.log('Clearing Category Chips...');
    await CategoryChip.deleteMany({});
    console.log('Clearing SubCategory Chips...');
    await SubCategoryChip.deleteMany({});
    console.log('Clearing Products...');
    await Product.deleteMany({});
    console.log('Database clean up completed successfully!');

    // 1. Seed Categories
    console.log('Seeding Categories...');
    const createdCategories = [];
    for (let i = 0; i < categoriesData.length; i++) {
      const cat = categoriesData[i];
      const imageUrl = `https://picsum.photos/200/200?random=${i + 1}`;
      
      const newCategory = new CategoryChip({
        id: cat.id,
        categoryName: cat.name,
        image: imageUrl,
        active: true,
        order: i + 1
      });
      await newCategory.save();
      createdCategories.push(newCategory);
    }
    console.log(`Successfully seeded ${createdCategories.length} Categories.`);

    // 2. Seed Subcategories & Products
    console.log('Seeding Subcategories and Products...');
    let totalProductsSeeded = 0;
    let totalSubcategoriesSeeded = 0;

    for (const cat of createdCategories) {
      const subs = subCategoriesData[cat.id] || [];
      for (let sIdx = 0; sIdx < subs.length; sIdx++) {
        const subName = subs[sIdx];
        const subId = `${cat.id}-${subName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        const subImageUrl = `https://picsum.photos/200/200?random=${totalSubcategoriesSeeded + 100}`;

        const newSub = new SubCategoryChip({
          id: subId,
          categoryId: cat.id,
          subCategoryName: subName,
          image: subImageUrl,
          active: true,
          order: sIdx + 1
        });
        await newSub.save();
        totalSubcategoriesSeeded++;

        // Seed 10 products per subcategory
        for (let pIdx = 0; pIdx < 10; pIdx++) {
          const productIndex = totalProductsSeeded + 1;
          const brandName = brandsPool[productIndex % brandsPool.length];
          const name = `${brandName} Premium ${subName} ${pIdx + 1}`;
          const description = `This high-quality ${name} is designed to provide maximum value and performance. Made with premium materials, it offers reliability, durability, and a sleek design tailored to your everyday lifestyle needs.`;
          
          // Pricing logic
          const mrp = Math.floor(Math.random() * 5000) + 999;
          const discountPercent = Math.floor(Math.random() * 40) + 15; // 15% to 55%
          const sellingPrice = Math.floor(mrp * (1 - discountPercent / 100));
          const discountLabel = `${discountPercent}% OFF`;
          
          const sku = `MNZ-${cat.id.substring(0,3).toUpperCase()}-${subName.substring(0,3).toUpperCase()}-${productIndex.toString().padStart(4, '0')}`;
          const productImage = `https://picsum.photos/400/400?random=${productIndex + 1000}`;

          // Make some products have flags for home page sections
          const topSection = productIndex % 7 === 0; // Top 10 Buys / Top selections
          const crazyDeals = productIndex % 9 === 0; // Crazy deals
          const flashSale = productIndex % 5 === 0;  // Flash sales

          const newProduct = new Product({
            name,
            category: cat.id,
            subCategory: subName,
            description,
            sellingPrice,
            mrp,
            stock: Math.floor(Math.random() * 200) + 20,
            discountLabel,
            sku,
            highlights: {
              quality: 'Premium Grade',
              warranty: '1 Year Manufacturer Warranty',
              origin: 'Made in India',
              material: 'Premium Quality Materials'
            },
            technicalSpecs: {
              model: `MNZ-${productIndex}`,
              weight: `${(Math.random() * 2 + 0.1).toFixed(2)} kg`,
              dimensions: `${Math.floor(Math.random() * 30 + 10)} x ${Math.floor(Math.random() * 20 + 5)} x ${Math.floor(Math.random() * 15 + 2)} cm`
            },
            shippingSpecs: {
              weight: 1.2,
              length: 25,
              width: 15,
              height: 10
            },
            flags: {
              topSection,
              crazyDeals,
              flashSale
            },
            gstCategory: 'GST 18% (Global Default)',
            hsnCode: `${Math.floor(Math.random() * 9000) + 1000}`,
            images: [productImage],
            brandName,
            tags: [cat.id, subName.toLowerCase(), 'premium', 'mynzo'],
            manufacturerInfo: `${brandName} Industries Pvt Ltd, India`,
            status: 'Approved',
            sales: Math.floor(Math.random() * 500) + 10
          });

          await newProduct.save();
          totalProductsSeeded++;
        }
      }
    }

    console.log(`Successfully seeded ${totalSubcategoriesSeeded} Subcategories.`);
    console.log(`Successfully seeded ${totalProductsSeeded} Products.`);
    console.log('Database Seeding process completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
