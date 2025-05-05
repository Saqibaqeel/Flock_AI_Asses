// controllers/productController.js
const Product  = require('../models/productModel');
const Wishlist = require('../models/WishlistModel');

/**
 * Create a new product and add it to a wishlist
 */
createProduct = async (req, res) => {
  try {
    const { name, description, price, imageURL } = req.body;
    const addedBy = req.user._id;

    if (!name || !description || price == null || !imageURL) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      imageURL,
      addedBy
    });

    return res.status(201).json(product);
  } catch (err) {
    console.error('createProduct error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};





editProduct = async (req, res) => {
  try {
    const { name, description, price, imageURL } = req.body;
    const productId = req.params.id;
    const userId    = req.user._id;

    // 1. Validate payload
    if (!name || !description || price == null || !imageURL) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }

    // 2. Load product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found.' });
    }

    // 3. Check ownership
    if (!product.addedBy.equals(userId)) {
      return res.status(403).json({ msg: 'Not authorized to edit this product.' });
    }

    // 4. Update & save
    product.name        = name;
    product.description = description;
    product.price       = price;
    product.imageURL    = imageURL;
    await product.save();

    return res.status(200).json(product);

  } catch (err) {
    console.error('editProduct error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      addedBy: req.user._id
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or unauthorized'
      });
    }

    await product.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};





getAllProducts = async (req, res) => {
  try {
   
    const products = await Product.find()
      .populate('addedBy', 'username');

    return res.status(200).json(products);
  } catch (err) {
    console.error('getAllProducts error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};





getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // 1. Fetch product + creator
    const product = await Product.findById(productId)
      .populate('addedBy', 'username');
    if (!product) {
      return res.status(404).json({ msg: 'Product not found.' });
    }

    // 2. Find all wishlists that include this product
    const wishlists = await Wishlist.find({ products: productId })
      .select('name owner')
      .populate('owner', 'username');

    // 3. Return combined result
    return res.status(200).json({
      ...product.toObject(),
      wishlists
    });
  } catch (err) {
    console.error('getProductById error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};


module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getProductById
};
