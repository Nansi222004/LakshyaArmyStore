const Product = require('../Models/Product');
const Coupon = require('../Models/Coupon');
const CouponUsage = require('../Models/CouponUsage');

/**
 * Shared utility to handle order cancellation inventory restoration and coupon refund.
 * Prevents double-increment or race conditions by checking current status.
 * 
 * @param {Object} order - The Order Mongoose document
 */
const handleOrderCancellationStockAndCoupon = async (order) => {
  // Prevent double restoration if already cancelled
  if (order.status === 'Cancelled') {
    return;
  }

  // 1. Restore stock for each item
  for (const item of order.items) {
    if (item.productId) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { 
          stock: item.quantity || 1, 
          sales: -(item.quantity || 1) 
        }
      });
    }
  }

  // 2. Restore coupon usage if order has a coupon code
  if (order.couponCode) {
    const couponCodeClean = order.couponCode.toUpperCase().trim();
    const coupon = await Coupon.findOneAndUpdate(
      { code: couponCodeClean },
      { $inc: { usage: -1 } },
      { new: true }
    );
    if (coupon) {
      await CouponUsage.findOneAndDelete({
        couponId: coupon._id,
        userId: order.userId
      });
    }
  }
};

/**
 * Checks if the order is Delivered and Paid, and awards referral coins
 * if this is the customer's first successfully completed order.
 * 
 * @param {Object} order - The Order Mongoose document
 */
const checkAndTriggerReferral = async (order) => {
  if (order.status === 'Delivered' && order.paymentStatus === 'Paid') {
    const Order = require('../Models/Order');
    
    // Count how many orders have been successfully completed (Delivered + Paid) by this user
    const completedCount = await Order.countDocuments({
      userId: order.userId,
      status: 'Delivered',
      paymentStatus: 'Paid'
    });

    // If this is the first successfully completed order, trigger the referral
    if (completedCount === 1) {
      try {
        const { completeReferral } = require('../Controllers/referralController');
        const SystemConfig = require('../Models/SystemConfig');
        const config = await SystemConfig.findOne({});
        const referralCoins = config ? config.referralCoinsPerReferral : 100;
        
        console.log(`🎁 First order successfully completed for user ${order.userId}. Crediting referral coins.`);
        await completeReferral(order.userId, referralCoins);
      } catch (err) {
        console.error('❌ Error processing referral completion reward:', err.message);
      }
    }
  }
};

module.exports = {
  handleOrderCancellationStockAndCoupon,
  checkAndTriggerReferral
};
