// controllers/wishlistController.js
const Wishlist = require('../models/WishlistModel');
const Product  = require('../models/productModel');
const User     = require('../models/userModel');
const mongoose = require('mongoose');



createWishlist = async (req, res) => {
  try {
    const { name, collaborators = [], products = [] } = req.body;

    // Convert emails to user ObjectIds
    const users = await User.find({ email: { $in: collaborators } }).select('_id');
    const collaboratorIds = users.map(user => user._id);

    const wishlist = new Wishlist({
      name,
      owner: req.user._id,
      collaborators: collaboratorIds,
      products,
    });

    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (err) {
    console.error('createWishlist error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Update a wishlist (name or collaborators) — owner only
 */
const editWishlist = async (req, res) => {
  try {
    const { name, collaborators = [] } = req.body;
    const wishlistId = req.params.id;
    const userId = req.user._id;

    // Validate request format
    if (!Array.isArray(collaborators)) {
      return res.status(400).json({ 
        msg: 'Collaborators must be an array of email strings',
        invalidEmails: []
      });
    }

    // Normalize emails to lowercase
    const normalizedEmails = collaborators.map(email => email.toLowerCase().trim());

    // Find wishlist and validate ownership
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) return res.status(404).json({ msg: 'Wishlist not found' });
    if (!wishlist.owner.equals(userId)) return res.status(403).json({ msg: 'Unauthorized' });

    // Find existing users
    const users = await User.find({ 
      email: { 
        $in: normalizedEmails,
        $regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
      } 
    });

    // Identify invalid emails
    const validEmails = users.map(u => u.email.toLowerCase());
    const invalidEmails = normalizedEmails.filter(e => !validEmails.includes(e));

    if (invalidEmails.length > 0) {
      return res.status(400).json({
        msg: 'Invalid collaborator emails',
        invalidEmails: invalidEmails
      });
    }

    // Update wishlist
    wishlist.name = name || wishlist.name;
    wishlist.collaborators = users.map(u => u._id);

    const updatedWishlist = await wishlist.save();
    
    // Return populated response
    const populated = await Wishlist.findById(updatedWishlist._id)
      .populate('owner', 'username')
      .populate('collaborators', 'email')
      .populate('products', 'name price imageURL');

    res.status(200).json(populated);
  } catch (err) {
    console.error('editWishlist error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Delete a wishlist — owner only
 */
const deleteWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const userId = req.user._id;

    // 1. Verify wishlist exists and ownership
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ msg: 'Wishlist not found.' });
    }
    if (!wishlist.owner.equals(userId)) {
      return res.status(403).json({ msg: 'Not authorized to delete this wishlist.' });
    }

    // 2. Delete all associated products first
    await Product.deleteMany({ wishlist: wishlistId });

    // 3. Delete the wishlist itself
    await Wishlist.findByIdAndDelete(wishlistId);

    // 4. Return success response
    return res.status(200).json({ 
      msg: 'Wishlist and all associated products deleted successfully.',
      deletedCount: {
        products: wishlist.products.length,
        wishlists: 1
      }
    });

  } catch (err) {
    console.error('deleteWishlist error:', err);
    return res.status(500).json({ 
      msg: 'Server error during deletion',
      error: err.message 
    });
  }
};

/**
 * Get all wishlists current user has access to (owner or collaborator)
 */
const getAllWishlists = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlists = await Wishlist.find({
      $or: [
        { owner: userId },
        { collaborators: userId }
      ]
    })
      .populate('owner', 'username')
      .populate('collaborators', 'username')
      .populate('products', 'name price imageURL');

    return res.status(200).json(wishlists);
  } catch (err) {
    console.error('getAllWishlists error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Get one wishlist by ID (only if owner or collaborator)
 */
const getWishlistById = async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const userId     = req.user._id;

    const wishlist = await Wishlist.findById(wishlistId)
      .populate('owner', 'username')
      .populate('collaborators', 'username')
      .populate('products', 'name price imageURL');

    if (!wishlist) {
      return res.status(404).json({ msg: 'Wishlist not found.' });
    }

    const isMember =
      wishlist.owner.equals(userId) ||
      wishlist.collaborators.some(collabId => collabId.equals(userId));

    if (!isMember) {
      return res.status(403).json({ msg: 'Not authorized to view this wishlist.' });
    }

    return res.status(200).json(wishlist);
  } catch (err) {
    console.error('getWishlistById error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  createWishlist,
  editWishlist,
  deleteWishlist,
  getAllWishlists,
  getWishlistById
};
