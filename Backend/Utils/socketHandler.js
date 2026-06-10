const Wishlist = require('../Models/Wishlist');
const Product = require('../Models/Product');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    // Join user room
    socket.on('join', (userId) => {
      if (userId) {
        socket.join(userId);
        console.log(`👤 User joined room: ${userId}`);
      }
    });

    // Send initial wishlist
    socket.on('get_wishlist', async ({ userId }) => {
      try {
        if (!userId) return;
        const items = await Wishlist.find({ userId }).populate('productId');
        const products = items
          .filter(item => item.productId)
          .map(item => item.productId);
        socket.emit('wishlist_data', products);
      } catch (err) {
        console.error('Error fetching wishlist via socket:', err);
      }
    });

    // Toggle like/unlike
    socket.on('toggle_like', async ({ userId, productId }) => {
      try {
        if (!userId || !productId) return;

        const existing = await Wishlist.findOne({ userId, productId });
        if (existing) {
          await Wishlist.deleteOne({ userId, productId });
          
          // Emit to this user's room
          io.to(userId).emit('like_status', { productId, isLiked: false, action: 'removed' });
          console.log(`💔 User ${userId} unliked product ${productId}`);
        } else {
          const newLike = new Wishlist({ userId, productId });
          await newLike.save();

          const product = await Product.findById(productId);
          
          // Emit to this user's room
          io.to(userId).emit('like_status', { productId, isLiked: true, action: 'added', product });
          console.log(`❤️ User ${userId} liked product ${productId}`);
        }
      } catch (err) {
        console.error('Error toggling like via socket:', err);
      }
    });

    // Toggle Reel Like over WebSockets (Saves to DB and broadcasts)
    socket.on('toggle_reel_like', async ({ userId, reelId }) => {
      try {
        if (!userId || !reelId) return;

        const Reel = require('../Models/Reel');
        const reel = await Reel.findById(reelId);
        if (!reel) return;

        const index = reel.likes.indexOf(userId);
        let isLiked = false;

        if (index === -1) {
          reel.likes.push(userId);
          isLiked = true;
        } else {
          reel.likes.splice(index, 1);
        }

        await reel.save();

        // Broadcast to all clients
        io.emit('reel_like_status', { reelId, isLiked, likesCount: reel.likes.length, userId });
        console.log(`❤️ Reel ${reelId} like status toggled by user ${userId} via socket: isLiked=${isLiked}`);
      } catch (err) {
        console.error('Error toggling reel like via socket:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔌 Client disconnected:', socket.id);
    });
  });
};
