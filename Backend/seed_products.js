require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./Models/Product');

const products = [
  {
    name: "Classic Denim Jacket",
    category: "Fashion",
    subCategory: "Jackets",
    description: "A premium quality classic denim jacket for everyday casual wear. Made from high quality cotton blend.",
    sellingPrice: 1499,
    mrp: 2999,
    stock: 120,
    discountLabel: "50% OFF",
    sku: "FSN-DEN-001",
    highlights: {
      packOf: "1",
      fabric: "Cotton Denim Blend",
      sleeve: "Full Sleeve",
      pattern: "Solid",
      collar: "Spred Collar",
      color: "Indigo Blue"
    },
    technicalSpecs: {
      fit: "Regular Fit",
      fabricCare: "Machine wash cold",
      suitableFor: "Western Wear",
      hem: "Straight Hem"
    },
    shippingSpecs: {
      weight: 0.8,
      length: 35,
      width: 25,
      height: 6
    },
    flags: {
      topSection: true,
      crazyDeals: false,
      flashSale: true
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "6201",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop"
    ],
    brandName: "Denim Co",
    tags: ["jacket", "denim", "fashion", "winter"],
    manufacturerInfo: "Denim Apparel Inc, India",
    status: "Approved",
    variations: [
      { sku: "FSN-DEN-001-S", price: 1499, stock: 40, attributes: { Size: "S" } },
      { sku: "FSN-DEN-001-M", price: 1499, stock: 50, attributes: { Size: "M" } },
      { sku: "FSN-DEN-001-L", price: 1499, stock: 30, attributes: { Size: "L" } }
    ]
  },
  {
    name: "Premium Leather Satchel",
    category: "Fashion",
    subCategory: "Bags",
    description: "Elegant and durable authentic leather messenger bag, designed to fit up to 15 inch laptops with quick access pockets.",
    sellingPrice: 2499,
    mrp: 4999,
    stock: 75,
    discountLabel: "50% OFF",
    sku: "FSN-LTH-002",
    highlights: {
      packOf: "1",
      fabric: "Genuine Leather",
      color: "Tan Brown"
    },
    technicalSpecs: {
      suitableFor: "Unisex",
      fabricCare: "Leather cleaner only"
    },
    shippingSpecs: {
      weight: 1.2,
      length: 40,
      width: 30,
      height: 10
    },
    flags: {
      topSection: false,
      crazyDeals: true,
      flashSale: false
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "4202",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop"
    ],
    brandName: "VogueBags",
    tags: ["leather", "bag", "satchel", "fashion"],
    manufacturerInfo: "PureLeather Corp, Kolkata",
    status: "Approved",
    variations: [
      { sku: "FSN-LTH-002-BRN", price: 2499, stock: 45, attributes: { Color: "Brown" } },
      { sku: "FSN-LTH-002-BLK", price: 2599, stock: 30, attributes: { Color: "Black" } }
    ]
  },
  {
    name: "Wireless ANC Headphones",
    category: "Electronics",
    subCategory: "Audio",
    description: "Immersive sound profile with advanced Active Noise Cancellation. Over-ear design with 40-hour long-lasting playback.",
    sellingPrice: 3499,
    mrp: 5999,
    stock: 90,
    discountLabel: "41% OFF",
    sku: "ELE-HP-003",
    highlights: {
      packOf: "1",
      color: "Carbon Black"
    },
    technicalSpecs: {
      suitableFor: "Mobile, Laptop, TV"
    },
    shippingSpecs: {
      weight: 0.4,
      length: 20,
      width: 18,
      height: 8
    },
    flags: {
      topSection: true,
      crazyDeals: true,
      flashSale: false
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "8518",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop"
    ],
    brandName: "Acoustix",
    tags: ["headphones", "wireless", "audio", "anc"],
    manufacturerInfo: "Acoustix Electronics, Shenzhen",
    status: "Approved",
    variations: [
      { sku: "ELE-HP-003-BLK", price: 3499, stock: 50, attributes: { Color: "Black" } },
      { sku: "ELE-HP-003-WHT", price: 3499, stock: 40, attributes: { Color: "White" } }
    ]
  },
  {
    name: "Organic Aloe Vera Gel",
    category: "Beauty",
    subCategory: "Skincare",
    description: "100% pure organic Aloe Vera gel extracted from fresh leaves. Soothes skin irritation and keeps skin hydrated.",
    sellingPrice: 299,
    mrp: 499,
    stock: 200,
    discountLabel: "40% OFF",
    sku: "BTY-AVG-004",
    highlights: {
      packOf: "1",
      color: "Clear Green"
    },
    technicalSpecs: {
      suitableFor: "All Skin Types"
    },
    shippingSpecs: {
      weight: 0.3,
      length: 15,
      width: 6,
      height: 6
    },
    flags: {
      topSection: false,
      crazyDeals: false,
      flashSale: true
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "3304",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop"
    ],
    brandName: "BioFlora",
    tags: ["aloe", "gel", "skincare", "organic"],
    manufacturerInfo: "BioFlora Botanicals, Himachal Pradesh",
    status: "Approved",
    variations: [
      { sku: "BTY-AVG-004-100ML", price: 299, stock: 120, attributes: { Size: "100ml" } },
      { sku: "BTY-AVG-004-250ML", price: 499, stock: 80, attributes: { Size: "250ml" } }
    ]
  },
  {
    name: "Minimalist Ceramic Vase",
    category: "Home Decor",
    subCategory: "Vases",
    description: "Nordic styled ceramic vase with fine matte finish. Perfect centerpiece for flowers, pampas grass, or shelves.",
    sellingPrice: 799,
    mrp: 1499,
    stock: 50,
    discountLabel: "46% OFF",
    sku: "HOM-CVS-005",
    highlights: {
      packOf: "1",
      color: "Matte White"
    },
    technicalSpecs: {
      suitableFor: "Indoor Decor"
    },
    shippingSpecs: {
      weight: 0.6,
      length: 25,
      width: 15,
      height: 15
    },
    flags: {
      topSection: true,
      crazyDeals: false,
      flashSale: false
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "6913",
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&auto=format&fit=crop"
    ],
    brandName: "NordicSpace",
    tags: ["ceramic", "vase", "nordic", "decor"],
    manufacturerInfo: "Ceramica Industries, Gujarat",
    status: "Approved",
    variations: [
      { sku: "HOM-CVS-005-WHT", price: 799, stock: 25, attributes: { Color: "Matte White" } },
      { sku: "HOM-CVS-005-BLK", price: 799, stock: 25, attributes: { Color: "Matte Black" } }
    ]
  },
  {
    name: "Wooden Building Blocks Set",
    category: "Toys",
    subCategory: "Educational",
    description: "50-piece set of natural pine wood blocks. Develops motor skills, logical thinking, and early shape recognition.",
    sellingPrice: 699,
    mrp: 1299,
    stock: 110,
    discountLabel: "46% OFF",
    sku: "TOY-WBB-006",
    highlights: {
      packOf: "50 Blocks",
      fabric: "Natural Pine Wood"
    },
    technicalSpecs: {
      suitableFor: "Kids age 3+"
    },
    shippingSpecs: {
      weight: 1.0,
      length: 30,
      width: 20,
      height: 10
    },
    flags: {
      topSection: false,
      crazyDeals: true,
      flashSale: false
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "9503",
    images: [
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?w=600&auto=format&fit=crop"
    ],
    brandName: "ToyLand",
    tags: ["wooden", "toys", "blocks", "educational"],
    manufacturerInfo: "ToyLand Crafts, Karnataka",
    status: "Approved",
    variations: []
  },
  {
    name: "Premium Bullet Journal",
    category: "Stationery",
    subCategory: "Notebooks",
    description: "Hardcover dot-grid journal with 160 pages of thick 120GSM bleed-resistant paper. Dual bookmarks and elastic strap.",
    sellingPrice: 399,
    mrp: 799,
    stock: 150,
    discountLabel: "50% OFF",
    sku: "STA-PBJ-007",
    highlights: {
      packOf: "1",
      color: "Navy Blue"
    },
    technicalSpecs: {
      suitableFor: "Journaling, Sketching"
    },
    shippingSpecs: {
      weight: 0.35,
      length: 22,
      width: 15,
      height: 2
    },
    flags: {
      topSection: false,
      crazyDeals: false,
      flashSale: true
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "4820",
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop"
    ],
    brandName: "Scribe",
    tags: ["journal", "notebook", "stationery", "dots"],
    manufacturerInfo: "Scribe Paper Co, Delhi",
    status: "Approved",
    variations: [
      { sku: "STA-PBJ-007-NVY", price: 399, stock: 75, attributes: { Color: "Navy" } },
      { sku: "STA-PBJ-007-EMR", price: 399, stock: 75, attributes: { Color: "Emerald" } }
    ]
  },
  {
    name: "Sterling Silver Necklace",
    category: "Jewellery",
    subCategory: "Necklaces",
    description: "Classic 925 sterling silver chain necklace with lobster clasp closure. Hypoallergenic and highly polished.",
    sellingPrice: 999,
    mrp: 1999,
    stock: 60,
    discountLabel: "50% OFF",
    sku: "JWL-SCN-008",
    highlights: {
      packOf: "1",
      fabric: "925 Sterling Silver"
    },
    technicalSpecs: {
      suitableFor: "Daily Wear"
    },
    shippingSpecs: {
      weight: 0.05,
      length: 10,
      width: 8,
      height: 2
    },
    flags: {
      topSection: true,
      crazyDeals: false,
      flashSale: false
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "7113",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop"
    ],
    brandName: "SilverSpark",
    tags: ["silver", "necklace", "jewellery", "chain"],
    manufacturerInfo: "SilverSpark Crafts, Jaipur",
    status: "Approved",
    variations: []
  },
  {
    name: "Custom Wooden Photo Frame",
    category: "Gifting",
    subCategory: "Frames",
    description: "Elegant personalized frame crafted from solid oak wood. Suitable for table display or wall hanging.",
    sellingPrice: 499,
    mrp: 999,
    stock: 80,
    discountLabel: "50% OFF",
    sku: "GFT-WPF-009",
    highlights: {
      packOf: "1",
      fabric: "Oak Wood"
    },
    technicalSpecs: {
      suitableFor: "4x6 photos"
    },
    shippingSpecs: {
      weight: 0.5,
      length: 20,
      width: 15,
      height: 3
    },
    flags: {
      topSection: false,
      crazyDeals: true,
      flashSale: false
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "4414",
    images: [
      "https://images.unsplash.com/photo-1544207240-8b1025eb7aeb?w=600&auto=format&fit=crop"
    ],
    brandName: "GiftCraft",
    tags: ["gift", "frame", "wooden", "personalized"],
    manufacturerInfo: "GiftCraft Creations, Bangalore",
    status: "Approved",
    variations: []
  },
  {
    name: "Smart WiFi LED Bulb",
    category: "Electrical",
    subCategory: "Lighting",
    description: "9W smart LED bulb compatible with Alexa and Google Assistant. Choose from 16 million colors and scheduling features.",
    sellingPrice: 449,
    mrp: 899,
    stock: 130,
    discountLabel: "50% OFF",
    sku: "ELC-SLB-010",
    highlights: {
      packOf: "1",
      color: "RGB Color"
    },
    technicalSpecs: {
      suitableFor: "Standard B22 base"
    },
    shippingSpecs: {
      weight: 0.15,
      length: 12,
      width: 7,
      height: 7
    },
    flags: {
      topSection: true,
      crazyDeals: false,
      flashSale: true
    },
    gstCategory: "GST 18% (Global Default)",
    hsnCode: "8539",
    images: [
      "https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop"
    ],
    brandName: "Lumia",
    tags: ["smart", "led", "bulb", "wifi"],
    manufacturerInfo: "Lumia Smart Lighting, Delhi",
    status: "Approved",
    variations: [
      { sku: "ELC-SLB-010-RGB", price: 449, stock: 70, attributes: { Color: "RGB" } },
      { sku: "ELC-SLB-010-WW", price: 399, stock: 60, attributes: { Color: "Warm White" } }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB.");

    for (const prod of products) {
      // Find if product with sku already exists
      const existing = await Product.findOne({ sku: prod.sku });
      if (existing) {
        console.log(`Product with SKU ${prod.sku} already exists. Skipping.`);
        continue;
      }
      const newProduct = new Product(prod);
      await newProduct.save();
      console.log(`Successfully seeded: ${prod.name}`);
    }

    console.log("Product seeding process completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
}

seed();
