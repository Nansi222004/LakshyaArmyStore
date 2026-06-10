const mongoose = require('mongoose');

const systemConfigSchema = new mongoose.Schema({
  platformName: { type: String, default: 'Mynzo' },
  supportEmail: { type: String, default: 'support@mynzo.com' },
  helpline: { type: String, default: '+91 1800 123 4567' },
  currency: { type: String, default: 'INR (₹)' },
  commission: { type: Number, default: 10 },
  gstNo: { type: String, default: '07AAAAA0000A1Z5' },
  gstPercentage: { type: Number, default: 18 },
  referralCoinsPerReferral: { type: Number, default: 100 },
  referralEnabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('SystemConfig', systemConfigSchema);
