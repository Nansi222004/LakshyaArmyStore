const Order = require('../Models/Order');
const Cart = require('../Models/Cart');
const Coupon = require('../Models/Coupon');
const Product = require('../Models/Product');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, total, deliveryAddress, paymentMethod, paymentStatus, paymentId, couponCode } = req.body;

    if (!items || items.length === 0 || !total || !deliveryAddress || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const order = await Order.create({
      userId: req.user._id,
      items,
      total,
      deliveryAddress,
      paymentMethod,
      paymentStatus: paymentStatus || 'Pending',
      paymentId: paymentId || '',
      status: paymentMethod === 'Online' && paymentStatus !== 'Paid' ? 'Pending' : 'Processing',
      couponCode: couponCode || null
    });

    // Update product sales and stock
    for (const item of items) {
      if (item.productId) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: {
            sales: item.quantity || 1,
            stock: -(item.quantity || 1)
          }
        });
      }
    }

    // If coupon was used, increment usage count
    if (couponCode) {
      await Coupon.findOneAndUpdate(
        { code: couponCode.toUpperCase().trim() },
        { $inc: { usage: 1 } }
      );
    }

    // Clear user cart
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json({ success: true, message: 'Order placed successfully', order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error fetching all orders for admin:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/admin/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();
    res.status(200).json({ success: true, message: 'Order status updated successfully', order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

