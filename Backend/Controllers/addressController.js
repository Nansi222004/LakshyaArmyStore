const Address = require('../Models/Address');

// @desc    Get user addresses
// @route   GET /api/addresses
// @access  Private
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new address
// @route   POST /api/addresses
// @access  Private
const createAddress = async (req, res) => {
  try {
    const { name, phone, type, address, pincode } = req.body;
    if (!name || !phone || !address) {
      return res.status(400).json({ success: false, message: 'Please provide name, phone, and address' });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits' });
    }

    const newAddress = await Address.create({
      userId: req.user._id,
      name,
      phone,
      type: type || 'Home',
      address,
      pincode: pincode || ''
    });

    res.status(201).json({ success: true, data: newAddress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update address
// @route   PUT /api/addresses/:id
// @access  Private
const updateAddress = async (req, res) => {
  try {
    const { name, phone, type, address, pincode } = req.body;
    let existingAddress = await Address.findOne({ _id: req.params.id, userId: req.user._id });

    if (!existingAddress) {
      return res.status(404).json({ success: false, message: 'Address not found or unauthorized' });
    }

    if (phone) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits' });
      }
    }

    existingAddress.name = name || existingAddress.name;
    existingAddress.phone = phone || existingAddress.phone;
    existingAddress.type = type || existingAddress.type;
    existingAddress.address = address || existingAddress.address;
    if (pincode !== undefined) existingAddress.pincode = pincode;

    const updatedAddress = await existingAddress.save();
    res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Private
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found or unauthorized' });
    }

    res.status(200).json({ success: true, message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress
};
