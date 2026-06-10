require('dotenv').config({ path: 'd:/Github/Mynzo/Backend/.env' });
const mongoose = require('mongoose');
const Product = require('d:/Github/Mynzo/Backend/Models/Product');

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB.");

    // Update stock levels
    await Product.updateOne({ sku: "ELC-SLB-010" }, { $set: { stock: 2 } });
    await Product.updateOne({ sku: "GFT-WPF-009" }, { $set: { stock: 0 } });
    await Product.updateOne({ sku: "JWL-SCN-008" }, { $set: { stock: 5 } });

    console.log("Updated product stock levels to trigger low-stock alerts successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error updating stock levels:", err);
    process.exit(1);
  }
}

run();
