const router = require('express').Router();
const protected=require('../middleware/protected')
const {getAllProducts, getProductById, createProduct, editProduct, deleteProduct} = require('../controllers/productController');
router.get('/all-product',  getAllProducts);
router.get('/product/:id', getProductById);
router.post('/create-product', protected, createProduct);
router.put('/edit-product/:id', protected, editProduct);    
router.delete('/delete-product/:id', protected, deleteProduct);


module.exports = router;
