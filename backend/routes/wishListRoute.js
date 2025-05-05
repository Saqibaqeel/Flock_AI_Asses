const router = require('express').Router();
const protected=require('../middleware/protected')
const {createWishlist,
    editWishlist,
    deleteWishlist,
    getAllWishlists,
    getWishlistById
  } = require('../controllers/wishListController');

router.post('/create-wishlist', protected, createWishlist);
router.put('/edit-wishlist/:id', protected, editWishlist);
router.delete('/delete-wishlist/:id', protected, deleteWishlist);
router.get('/all-wishlists', protected, getAllWishlists);
router.get('/wishlist/:id', protected, getWishlistById);
module.exports = router;
